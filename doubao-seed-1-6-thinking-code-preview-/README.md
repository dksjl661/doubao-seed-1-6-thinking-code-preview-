# 购物篮小计组件

一个基于 React 的现代化购物篮管理组件，支持实时计算商品小计和总计。

## 功能特性

### 核心功能
- ✅ 维护商品列表的本地状态管理
- ✅ 实时修改商品数量，自动更新小计
- ✅ 实时计算并显示购物篮总计金额
- ✅ 提供添加新商品功能（默认添加 $10.00 的商品）

### 边缘情况处理
- ✅ **负数数量处理**：用户输入负数时自动重置为 1
- ✅ **删除商品功能**：每个商品都有删除按钮
- ✅ **货币格式化**：所有金额精确到小数点后两位，格式为 $XX.XX

### 界面设计
- ✅ 响应式设计，适配不同屏幕尺寸
- ✅ 现代化 UI 设计，提供良好的用户体验
- ✅ 清晰的视觉层次和空间分隔

## 文件结构

```
.
├── ShoppingCart.jsx       # React 购物篮组件（模块化版本）
├── shopping-cart-demo.html # 完整的 HTML 示例文件（包含组件）
└── README.md               # 组件说明文档
```

## 使用方法

### 方法一：直接打开 HTML 示例文件

1. 下载 `shopping-cart-demo.html` 文件
2. 在浏览器中直接打开该文件
3. 即可体验完整的购物篮功能

### 方法二：在 React 项目中使用组件

1. 复制 `ShoppingCart.jsx` 文件到您的 React 项目中
2. 在需要使用的地方导入组件：

```jsx
import ShoppingCart from './ShoppingCart';
```

3. 在 JSX 中使用组件：

```jsx
function App() {
  return (
    <div className="App">
      <ShoppingCart />
    </div>
  );
}

export default App;
```

## 组件 API

### 状态管理

组件使用 React 的 `useState` Hook 管理商品列表：

```jsx
const [items, setItems] = useState([
  { id: 1, name: '默认商品', price: 10.00, quantity: 1 }
]);
```

### 商品对象结构

```javascript
{
  id: Number,     // 商品唯一标识
  name: String,    // 商品名称
  price: Number,   // 商品单价
  quantity: Number // 商品数量
}
```

### 核心方法

- `formatCurrency(amount)`: 货币格式化函数
- `updateQuantity(id, newQuantity)`: 更新商品数量
- `removeItem(id)`: 删除商品
- `addNewItem()`: 添加新商品
- `calculateTotal()`: 计算总计金额

## 浏览器兼容性

组件使用 React 18 和现代 JavaScript 特性，建议在以下浏览器中使用：

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 自定义配置

您可以根据需要自定义以下内容：

### 修改默认商品

在 `ShoppingCart.jsx` 中修改初始状态：

```jsx
const [items, setItems] = useState([
  { id: 1, name: '您的商品名称', price: 19.99, quantity: 1 }
]);
```

### 修改添加的新商品

在 `addNewItem()` 方法中修改新商品的属性：

```jsx
const newItem = {
  id: newId,
  name: '新商品名称',
  price: 29.99,
  quantity: 1
};
```

### 自定义样式

组件使用内联样式，您可以根据需要修改样式属性。

## 示例演示

您可以通过打开 `shopping-cart-demo.html` 文件来查看完整的功能演示。演示页面包含：

- 购物篮组件的完整功能
- 组件特性介绍
- 实时功能演示

## 开发和扩展

如果您需要进一步开发或扩展这个组件，可以考虑以下方向：

1. **数据持久化**：添加 localStorage 或其他方式保存购物车数据
2. **商品分类**：支持商品分类和筛选功能
3. **优惠券功能**：添加优惠券和折扣计算
4. **API 集成**：与后端 API 集成，实现真实的商品数据获取
5. **购物车同步**：支持多设备购物车同步功能

## 许可证

MIT License
