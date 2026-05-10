import React, { useState } from 'react';

export default function Savdolar({ sales, products, customers, onAddSale }) {
  const [showForm, setShowForm] = useState(false);
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('To\'langan');

  const selectedProduct = products.find(p => p.id === productId);
  const total = selectedProduct ? selectedProduct.price * quantity : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId || !customerId) return;
    
    const newSale = {
      id: `SALE-${Date.now()}`,
      customerId,
      productId,
      quantity: Number(quantity),
      total,
      status,
      date: new Date().toISOString().split('T')[0]
    };
    
    onAddSale(newSale);
    setShowForm(false);
    setProductId('');
    setQuantity(1);
  };

  if (showForm) {
    return (
      <div className="p-4">
        <button className="btn-back" onClick={() => setShowForm(false)}>← Orqaga</button>
        <div className="green-card" style={{position: 'relative'}}>
          <div className="card-title-badge">Custom Form</div>
          <h3 className="mb-2">Yangi Sotuv</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Mijoz ismi</label>
              <select className="form-control" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Mahsulotni tanlang</label>
              <div style={{display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem'}}>
                {products.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => setProductId(p.id)}
                    style={{
                      minWidth: '100px', 
                      border: productId === p.id ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      background: 'var(--bg-main)',
                      textAlign: 'center',
                      opacity: p.qoldiq === 0 ? 0.5 : 1
                    }}
                  >
                    <img src={p.image} alt={p.name} style={{width: '100%', height: '60px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem'}} />
                    <div style={{fontSize: '0.75rem', fontWeight: 'bold'}}>{p.name}</div>
                    <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>{p.price} $</div>
                    {p.qoldiq < 5 && <div style={{fontSize: '0.6rem', color: 'var(--danger-red)', fontWeight: 'bold'}}>Kam qoldi</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Miqdori</label>
              <input type="number" className="form-control" min="1" max={selectedProduct?.qoldiq || 999} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Umumiy Summa (AI computed)</label>
              <div className="form-control flex items-center gap-2">
                🤖 <strong className="text-accent">{total.toLocaleString()} $</strong>
              </div>
            </div>

            <div className="form-group">
              <label>Holati</label>
              <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="To'langan">To'langan</option>
                <option value="Qarz">Qarz</option>
              </select>
            </div>

            <button type="submit" className="btn mt-2" disabled={!productId || (selectedProduct && selectedProduct.qoldiq < quantity)}>Saqlash</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <button className="btn" style={{width: 'auto'}} onClick={() => setShowForm(true)}>+ Yangi Sotuv</button>
      </div>
      
      <div className="green-card">
        <h3 className="mb-2" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem'}}>Filterd sales</h3>
        {sales.map(sale => {
          const product = products.find(p => p.id === sale.productId);
          return (
            <div key={sale.id} className="list-item">
              <div className="list-item-avatar" style={{width: '40px', height: '40px'}}>
                <img src={product?.image} alt={product?.name} />
              </div>
              <div className="list-item-info">
                <div className="list-item-title">{product?.name || 'Noma\'lum'}</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Soni: {sale.quantity}</div>
              </div>
              <div className={`list-item-value ${sale.status === 'Qarz' ? 'text-red' : 'text-green'}`}>
                {sale.status}
                <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal'}}>
                  {sale.total} $
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
