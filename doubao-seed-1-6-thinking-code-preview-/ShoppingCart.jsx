import React, { useState } from 'react';

const ShoppingCart = () => {
  // 商品列表状态
  const [items, setItems] = useState([
    { id: 1, name: '默认商品', price: 10.00, quantity: 1 }
  ]);

  // 货币格式化函数
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  // 更新商品数量
  const updateQuantity = (id, newQuantity) => {
    // 处理负数数量，重置为1
    const validQuantity = Math.max(1, parseInt(newQuantity) || 1);

    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: validQuantity } : item
    ));
  };

  // 删除商品
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // 添加新商品（硬编码默认商品）
  const addNewItem = () => {
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    const newItem = {
      id: newId,
      name: '新商品',
      price: 10.00,
      quantity: 1
    };
    setItems([...items, newItem]);
  };

  // 计算总计
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>购物篮</h1>

      {/* 商品列表 */}
      <div style={{ marginBottom: '20px' }}>
        {items.map(item => (
          <div key={item.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px',
            marginBottom: '10px',
            border: '1px solid #ecf0f1',
            borderRadius: '5px',
            backgroundColor: '#f8f9fa'
          }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#34495e' }}>{item.name}</h3>
              <p style={{ margin: 0, color: '#27ae60', fontWeight: 'bold' }}>
                {formatCurrency(item.price)}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', margin: '0 15px' }}>
              <label style={{ marginRight: '10px', color: '#7f8c8d' }}>数量:</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
                style={{
                  width: '60px',
                  padding: '5px',
                  border: '1px solid #bdc3c7',
                  borderRadius: '3px',
                  textAlign: 'center'
                }}
                min="1"
              />
            </div>

            <div style={{ textAlign: 'center', margin: '0 15px' }}>
              <p style={{ margin: 0, color: '#2c3e50', fontWeight: 'bold' }}>小计:</p>
              <p style={{ margin: 0, color: '#e67e22', fontWeight: 'bold' }}>
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              删除
            </button>
          </div>
        ))}
      </div>

      {/* 总计 */}
      <div style={{
        borderTop: '2px solid #3498db',
        paddingTop: '20px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px',
          backgroundColor: '#e8f4fd',
          borderRadius: '5px'
        }}>
          <h2 style={{ margin: 0, color: '#2c3e50' }}>总计:</h2>
          <h2 style={{ margin: 0, color: '#2980b9', fontWeight: 'bold' }}>
            {formatCurrency(calculateTotal())}
          </h2>
        </div>
      </div>

      {/* 添加新商品按钮 */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={addNewItem}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          添加新商品
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
