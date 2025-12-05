package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	// 硬编码的5行CSV数据（包含标题行共6行）
	csvData := `ID,Name,Status
1,Alice,Active
2,Bob,Inactive
3,Charlie,Active
4,David,Inactive
5,Eve,Pending`

	// 检查命令行参数
	if len(os.Args) < 2 {
		fmt.Println("错误：请输入 Status 参数")
		os.Exit(1)
	}

	filterStatus := os.Args[1]

	// 解析CSV数据，设置FieldsPerRecord为-1以允许字段数量不一致
	reader := csv.NewReader(strings.NewReader(csvData))
	reader.FieldsPerRecord = -1 // 允许每行有不同数量的字段
	records, err := reader.ReadAll()
	if err != nil {
		log.Fatal("CSV解析错误：", err)
	}

	// 检查是否有数据
	if len(records) < 1 {
		fmt.Println("错误：CSV数据为空")
		os.Exit(1)
	}

	// 找到Status列的索引
	header := records[0]
	statusIndex := -1
	for i, col := range header {
		if col == "Status" {
			statusIndex = i
			break
		}
	}

	if statusIndex == -1 {
		fmt.Println("错误：CSV数据中没有Status字段")
		os.Exit(1)
	}

	// 打印标题行
	fmt.Println(strings.Join(header, ","))

	// 过滤并打印数据行
	for i, record := range records[1:] {
		// 检查字段数量是否一致
		if len(record) != len(header) {
			log.Printf("警告：第%d行字段数量不一致，跳过该行", i+2) // 行号从2开始（标题行是1）
			continue
		}

		// 检查Status是否匹配
		if record[statusIndex] == filterStatus {
			fmt.Println(strings.Join(record, ","))
		}
	}

	// 如果没有匹配项，已经打印了标题行，这里不需要额外操作
}
