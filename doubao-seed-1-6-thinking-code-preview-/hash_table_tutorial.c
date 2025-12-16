/*
 * C语言哈希表(Hash Table)教学示例
 * 这是一个完整的哈希表实现,包含详细的中文注释和教学说明
 *
 * 哈希表是一种高效的数据结构,它通过哈希函数将键(key)映射到值(value)
 * 平均情况下,插入、查找、删除操作的时间复杂度都是O(1)
 *
 * 本示例使用链地址法(Chaining)解决哈希冲突
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

// ==================== 常量定义 ====================

// 哈希表的初始大小
#define INITIAL_CAPACITY 16
// 扩容因子:当元素数量达到容量的75%时进行扩容
#define LOAD_FACTOR_THRESHOLD 0.75

// ==================== 数据结构定义 ====================

// 哈希表中的键值对节点
typedef struct HashNode {
    char* key;               // 键(字符串类型)
    int value;               // 值(整数类型)
    struct HashNode* next;  // 指向下一个节点的指针(用于解决哈希冲突)
} HashNode;

// 哈希表结构体
typedef struct HashTable {
    HashNode** buckets;  // 桶数组,每个元素是一个链表的头指针
    size_t capacity;      // 哈希表的容量(桶的数量)
    size_t size;          // 哈希表中当前存储的键值对数量
} HashTable;

// ==================== 哈希函数 ====================

/*
 * 哈希函数:将字符串键转换为哈希值
 * 使用DJB2哈希算法,这是一种简单且高效的字符串哈希算法
 *
 * 参数:
 *   key - 要哈希的字符串
 *
 * 返回:
 *   计算得到的哈希值
 */
uint32_t hash_function(const char* key) {
    uint32_t hash = 5381;  // DJB2算法的初始值
    int c;

    // 遍历字符串中的每个字符
    while ((c = *key++)) {
        // 哈希更新公式:hash = hash * 33 + c
        // 使用位运算优化:hash << 5 相当于 hash * 32,加上 hash 就是 hash * 33
        hash = ((hash << 5) + hash) + c;
    }

    return hash;
}

// ==================== 哈希表操作函数 ====================

/*
 * 创建一个新的哈希表
 *
 * 返回:
 *   指向新哈希表的指针,如果内存分配失败则返回NULL
 */
HashTable* hash_table_create(void) {
    // 分配哈希表结构体的内存
    HashTable* table = (HashTable*)malloc(sizeof(HashTable));
    if (table == NULL) {
        fprintf(stderr, "内存分配失败:无法创建哈希表结构体\n");
        return NULL;
    }

    // 初始化哈希表的容量为初始容量
    table->capacity = INITIAL_CAPACITY;
    table->size = 0;

    // 分配桶数组的内存
    // 每个桶是一个HashNode指针,初始值为NULL
    table->buckets = (HashNode**)calloc(table->capacity, sizeof(HashNode*));
    if (table->buckets == NULL) {
        fprintf(stderr, "内存分配失败:无法创建桶数组\n");
        free(table);  // 释放已经分配的哈希表结构体
        return NULL;
    }

    printf("哈希表创建成功!初始容量: %zu\n", table->capacity);
    return table;
}

/*
 * 哈希表扩容
 * 当哈希表中的元素数量达到容量的LOAD_FACTOR_THRESHOLD时,
 * 需要将哈希表的容量扩大一倍,并重新哈希所有元素
 *
 * 参数:
 *   table - 要扩容的哈希表
 *
 * 返回:
 *   成功返回0,失败返回-1
 */
int hash_table_resize(HashTable* table) {
    if (table == NULL) {
        fprintf(stderr, "错误:哈希表指针为空\n");
        return -1;
    }

    // 计算新的容量(扩大一倍)
    size_t new_capacity = table->capacity * 2;
    printf("哈希表扩容中... 旧容量: %zu, 新容量: %zu\n", table->capacity, new_capacity);

    // 分配新的桶数组
    HashNode** new_buckets = (HashNode**)calloc(new_capacity, sizeof(HashNode*));
    if (new_buckets == NULL) {
        fprintf(stderr, "内存分配失败:无法创建新的桶数组\n");
        return -1;
    }

    // 重新哈希所有元素到新的桶数组中
    for (size_t i = 0; i < table->capacity; i++) {
        HashNode* node = table->buckets[i];

        // 遍历当前桶中的所有节点
        while (node != NULL) {
            HashNode* next_node = node->next;  // 保存下一个节点的指针

            // 使用新的容量计算哈希值和桶索引
            uint32_t hash = hash_function(node->key);
            size_t new_index = hash % new_capacity;

            // 将节点插入到新桶的链表头部
            node->next = new_buckets[new_index];
            new_buckets[new_index] = node;
            node = next_node;  // 处理下一个节点
        }
    }

    // 释放旧的桶数组(注意:不要释放节点,节点已经被移动到新桶中)
    free(table->buckets);

    // 更新哈希表的属性
    table->buckets = new_buckets;
    table->capacity = new_capacity;

    printf("哈希表扩容完成!新容量: %zu\n", table->capacity);
    return 0;
}

/*
 * 向哈希表中插入键值对
 * 如果键已经存在,则更新对应的值
 *
 * 参数:
 *   table - 要插入的哈希表
 *   key   - 要插入的键(字符串)
 *   value - 要插入的值(整数)
 *
 * 返回:
 *   成功返回0,失败返回-1
 */
int hash_table_insert(HashTable* table, const char* key, int value) {
    if (table == NULL || key == NULL) {
        fprintf(stderr, "错误:哈希表指针或键为空\n");
        return -1;
    }

    // 检查是否需要扩容
    // 当前负载因子 = size / capacity
    double load_factor = (double)table->size / (double)table->capacity;
    if (load_factor >= LOAD_FACTOR_THRESHOLD) {
        if (hash_table_resize(table) != 0) {
            return -1;  // 扩容失败
        }
    }

    // 计算键的哈希值
    uint32_t hash = hash_function(key);
    // 根据哈希值和当前容量计算桶索引
    size_t index = hash % table->capacity;

    // 检查键是否已经存在于哈希表中
    HashNode* current = table->buckets[index];
    while (current != NULL) {
        // 如果键已经存在,则更新对应的值
        if (strcmp(current->key, key) == 0) {
            printf("键 '%s' 已存在,更新值: %d -> %d\n", key, current->value, value);
            current->value = value;
            return 0;
        }
        current = current->next;
    }

    // 如果键不存在,则创建新的节点
    HashNode* new_node = (HashNode*)malloc(sizeof(HashNode));
    if (new_node == NULL) {
        fprintf(stderr, "内存分配失败:无法创建新节点\n");
        return -1;
    }

    // 为键分配内存并复制字符串
    new_node->key = strdup(key);
    if (new_node->key == NULL) {
        fprintf(stderr, "内存分配失败:无法复制键字符串\n");
        free(new_node);  // 释放已经分配的节点内存
        return -1;
    }

    // 设置节点的值和next指针
    new_node->value = value;
    new_node->next = NULL;

    // 将新节点插入到桶的链表头部
    if (table->buckets[index] == NULL) {
        // 如果桶为空,直接将新节点作为桶的头节点
        table->buckets[index] = new_node;
    } else {
        // 如果桶不为空,将新节点插入到链表头部
        // 这种方式插入效率更高,时间复杂度为O(1)
        new_node->next = table->buckets[index];
        table->buckets[index] = new_node;
        printf("发生哈希冲突!键 '%s' 被插入到桶 %zu 的链表头部\n", key, index);
    }

    // 更新哈希表的大小
    table->size++;

    printf("插入成功!键: '%s', 值: %d, 当前大小: %zu/%zu\n",
           key, value, table->size, table->capacity);

    return 0;
}

/*
 * 根据键查找对应的值
 *
 * 参数:
 *   table - 要查找的哈希表
 *   key   - 要查找的键(字符串)
 *   value - 用于存储找到的值的指针(输出参数)
 *
 * 返回:
 *   找到返回0,未找到返回-1
 */
int hash_table_find(HashTable* table, const char* key, int* value) {
    if (table == NULL || key == NULL || value == NULL) {
        fprintf(stderr, "错误:哈希表指针、键或值指针为空\n");
        return -1;
    }

    // 计算键的哈希值
    uint32_t hash = hash_function(key);
    // 根据哈希值和当前容量计算桶索引
    size_t index = hash % table->capacity;

    // 在对应的桶中查找键
    HashNode* current = table->buckets[index];
    int compare_count = 0;  // 用于统计比较次数,展示哈希表的效率

    while (current != NULL) {
        compare_count++;

        if (strcmp(current->key, key) == 0) {
            // 找到键,将对应的值存储到输出参数中
            *value = current->value;
            printf("查找成功!键: '%s', 值: %d, 比较次数: %d\n",
                   key, *value, compare_count);
            return 0;
        }

        current = current->next;
    }

    // 未找到键
    printf("查找失败!键: '%s' 不存在于哈希表中,比较次数: %d\n",
           key, compare_count);
    return -1;
}

/*
 * 根据键删除对应的键值对
 *
 * 参数:
 *   table - 要删除的哈希表
 *   key   - 要删除的键(字符串)
 *
 * 返回:
 *   成功返回0,失败返回-1
 */
int hash_table_delete(HashTable* table, const char* key) {
    if (table == NULL || key == NULL) {
        fprintf(stderr, "错误:哈希表指针或键为空\n");
        return -1;
    }

    // 计算键的哈希值
    uint32_t hash = hash_function(key);
    // 根据哈希值和当前容量计算桶索引
    size_t index = hash % table->capacity;

    HashNode* current = table->buckets[index];
    HashNode* prev = NULL;  // 用于保存当前节点的前一个节点

    // 在对应的桶中查找要删除的键
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            // 找到要删除的节点

            if (prev == NULL) {
                // 如果要删除的是桶的头节点
                table->buckets[index] = current->next;
            } else {
                // 如果要删除的是桶中间或末尾的节点
                prev->next = current->next;
            }

            // 释放节点占用的内存
            free(current->key);  // 释放键字符串的内存
            free(current);        // 释放节点结构体的内存

            // 更新哈希表的大小
            table->size--;

            printf("删除成功!键: '%s', 当前大小: %zu/%zu\n",
                   key, table->size, table->capacity);
            return 0;
        }

        // 移动到下一个节点
        prev = current;
        current = current->next;
    }

    // 未找到要删除的键
    printf("删除失败!键: '%s' 不存在于哈希表中\n", key);
    return -1;
}

/*
 * 打印哈希表的所有内容
 * 用于调试和教学演示
 */
void hash_table_print(HashTable* table) {
    if (table == NULL) {
        fprintf(stderr, "错误:哈希表指针为空\n");
        return;
    }

    printf("\n================ 哈希表内容 ================\n");
    printf("容量: %zu, 大小: %zu, 负载因子: %.2f\n",
           table->capacity, table->size,
           (double)table->size / (double)table->capacity);

    // 遍历所有桶
    for (size_t i = 0; i < table->capacity; i++) {
        HashNode* current = table->buckets[i];

        if (current == NULL) {
            // 如果桶为空,打印空桶标记
            printf("桶 %zu: [空]\n", i);
        } else {
            // 如果桶不为空,打印桶中的所有键值对
            printf("桶 %zu: ", i);

            while (current != NULL) {
                printf("('%s' => %d)", current->key, current->value);

                if (current->next != NULL) {
                    printf(" -> ");
                }

                current = current->next;
            }

            printf("\n");
        }
    }

    printf("==============================================\n\n");
}

/*
 * 销毁哈希表,释放所有内存
 *
 * 参数:
 *   table - 要销毁的哈希表
 */
void hash_table_destroy(HashTable* table) {
    if (table == NULL) {
        return;  // 哈希表已经为空,直接返回
    }

    printf("正在销毁哈希表...\n");

    // 遍历所有桶,释放每个节点的内存
    for (size_t i = 0; i < table->capacity; i++) {
        HashNode* current = table->buckets[i];

        while (current != NULL) {
            HashNode* next_node = current->next;  // 保存下一个节点的指针

            // 释放节点占用的内存
            free(current->key);
            free(current);

            current = next_node;  // 处理下一个节点
        }
    }

    // 释放桶数组的内存
    free(table->buckets);

    // 释放哈希表结构体的内存
    free(table);

    printf("哈希表销毁完成!所有内存已释放\n");
}

/*
 * 清空哈希表中的所有键值对,但保留哈希表结构体
 *
 * 参数:
 *   table - 要清空的哈希表
 */
void hash_table_clear(HashTable* table) {
    if (table == NULL) {
        fprintf(stderr, "错误:哈希表指针为空\n");
        return;
    }

    printf("正在清空哈希表...\n");

    // 遍历所有桶,释放每个节点的内存
    for (size_t i = 0; i < table->capacity; i++) {
        HashNode* current = table->buckets[i];

        while (current != NULL) {
            HashNode* next_node = current->next;

            free(current->key);
            free(current);

            current = next_node;
        }

        // 将桶指针设置为NULL
        table->buckets[i] = NULL;
    }

    // 重置哈希表的大小
    table->size = 0;

    printf("哈希表清空完成!当前大小: %zu/%zu\n", table->size, table->capacity);
}

// ==================== 教学演示主函数 ====================

int main(void) {
    printf("=========================================\n");
    printf("      C语言哈希表(Hash Table)教学\n");
    printf("=========================================\n\n");

    // 1. 创建哈希表
    printf("【步骤1】创建哈希表\n");
    HashTable* table = hash_table_create();
    if (table == NULL) {
        return EXIT_FAILURE;
    }
    hash_table_print(table);

    // 2. 插入键值对
    printf("\n【步骤2】向哈希表中插入键值对\n");
    hash_table_insert(table, "apple", 10);
    hash_table_insert(table, "banana", 20);
    hash_table_insert(table, "orange", 30);
    hash_table_insert(table, "grape", 40);
    hash_table_insert(table, "watermelon", 50);
    hash_table_print(table);

    // 3. 测试哈希冲突
    printf("\n【步骤3】测试哈希冲突\n");
    // 这些键经过哈希后可能会映射到同一个桶
    hash_table_insert(table, "listen", 100);
    hash_table_insert(table, "silent", 200);
    hash_table_insert(table, "elvis", 300);
    hash_table_insert(table, "lives", 400);
    hash_table_print(table);

    // 4. 查找键值对
    printf("\n【步骤4】查找哈希表中的键值对\n");
    int value;
    hash_table_find(table, "banana", &value);
    hash_table_find(table, "listen", &value);
    hash_table_find(table, "silent", &value);
    hash_table_find(table, "nonexistent", &value);  // 查找不存在的键

    // 5. 更新键值对
    printf("\n【步骤5】更新已存在的键值对\n");
    hash_table_insert(table, "apple", 15);  // 更新apple的值从10到15
    hash_table_insert(table, "banana", 25); // 更新banana的值从20到25
    hash_table_print(table);

    // 6. 删除键值对
    printf("\n【步骤6】删除哈希表中的键值对\n");
    hash_table_delete(table, "orange");      // 删除存在的键
    hash_table_delete(table, "grape");        // 删除存在的键
    hash_table_delete(table, "nonexistent");  // 删除不存在的键
    hash_table_print(table);

    // 7. 测试扩容
    printf("\n【步骤7】测试哈希表扩容\n");
    // 插入足够多的元素,触发扩容
    for (int i = 0; i < 20; i++) {
        char key[20];
        sprintf(key, "key_%d", i);
        hash_table_insert(table, key, i * 10);
    }
    hash_table_print(table);

    // 8. 清空哈希表
    printf("\n【步骤8】清空哈希表\n");
    hash_table_clear(table);
    hash_table_print(table);

    // 9. 销毁哈希表
    printf("\n【步骤9】销毁哈希表\n");
    hash_table_destroy(table);

    printf("\n=========================================\n");
    printf("        哈希表教学演示结束\n");
    printf("=========================================\n");

    return EXIT_SUCCESS;
}

/*
 * 哈希表教学总结:
 *
 * 1. 哈希表的基本概念:
 *    - 哈希表是一种通过键直接访问值的数据结构
 *    - 它使用哈希函数将键映射到数组的特定索引(桶)
 *
 * 2. 哈希函数:
 *    - 一个好的哈希函数应该将键均匀地分布到各个桶中
 *    - 本示例使用DJB2哈希算法,它简单高效且分布均匀
 *
 * 3. 哈希冲突解决方法:
 *    - 本示例使用链地址法(Chaining):
 *      * 每个桶是一个链表的头指针
 *      * 如果多个键哈希到同一个桶,它们会被插入到该桶的链表中
 *      * 查找时需要遍历链表中的节点,比较键是否相等
 *
 * 4. 哈希表的扩容:
 *    - 当哈希表中的元素数量达到容量的一定比例(负载因子)时,需要扩容
 *    - 扩容通常是将容量扩大一倍,并重新哈希所有元素
 *    - 扩容可以保持哈希表的性能,避免链表过长导致查找效率下降
 *
 * 5. 哈希表的时间复杂度:
 *    - 平均情况下:插入、查找、删除操作都是O(1)
 *    - 最坏情况下:所有元素都哈希到同一个桶,时间复杂度退化为O(n)
 *
 * 6. 哈希表的优缺点:
 *    优点:
 *    - 插入、查找、删除操作高效
 *    - 适合需要频繁进行这些操作的场景
 *
 *    缺点:
 *    - 需要额外的内存空间来存储桶和链表
 *    - 哈希函数的选择会影响性能
 *    - 哈希冲突会降低性能
 *
 * 7. 哈希表的应用场景:
 *    - 数据库索引
 *    - 缓存系统
 *    - 编译器的符号表
 *    - 路由表
 *    - 计数器
 */
