import React, { useState } from 'react';

export default function AddSaleForm({ customer, products, onSave, onCancel }) {
  const [productId, setProductId] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('To\'landi');

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = products.find(p => p.id === productId);
    const total = product.price * quantity;
    
    const newSale = {
      id: `SALE-${Date.now()}`,
      customerId: customer.id,
      productId,
      quantity: Number(quantity),
      total,
      status,
      date: new Date().toISOString().split('T')[0]
    };
    
    onSave(newSale);
  };

  const selectedProduct = products.find(p => p.id === productId);
  const calculatedTotal = selectedProduct ? selectedProduct.price * quantity : 0;

  return (
    <div className="p-4">
      <button className="btn-back" style={{margin: '0 0 1rem 0'}} onClick={onCancel}>← Bekor qilish</button>
      <h2>{customer.name} uchun xarid qo'shish</h2>
      
      <form onSubmit={handleSubmit} className="card" style={{margin: '1rem 0', boxShadow: 'none'}}>
        <div className="form-group">
          <label>Mahsulotni tanlang</label>
          <select 
            className="form-control" 
            value={productId} 
            onChange={(e) => setProductId(e.target.value)}
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.price.toLocaleString()} UZS)</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Soni</label>
          <input 
            type="number" 
            className="form-control" 
            min="1" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label>Holati</label>
          <select 
            className="form-control" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To'landi">To'landi</option>
            <option value="Qarz">Qarz</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Umumiy summa</label>
          <div className="form-control" style={{background: 'var(--bg-main)', color: 'var(--accent-color)'}}>
            <strong>{calculatedTotal.toLocaleString()} UZS</strong>
          </div>
        </div>
        
        <button type="submit" className="btn mt-2">Saqlash</button>
      </form>
    </div>
  );
}
