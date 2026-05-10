import React, { useState } from 'react';

export default function Savdolar({ sales, products, customers, onAddSale, userRole }) {
  const [showForm, setShowForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(null); // Selected sale for receipt
  
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('To\'langan');

  const selectedProduct = products.find(p => p.id === productId);
  const total = selectedProduct ? selectedProduct.price * quantity : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userRole !== 'admin') return;
    if (!productId || !customerId) return;
    
    const newSale = {
      id: `SALE-${Date.now()}`,
      customerId,
      productId,
      quantity: Number(quantity),
      total,
      status,
      date: new Date().toLocaleString('uz-UZ')
    };
    
    onAddSale(newSale);
    setShowForm(false);
    setProductId('');
    setQuantity(1);
  };

  const ReceiptModal = ({ sale }) => {
    const product = products.find(p => p.id === sale.productId);
    const customer = customers.find(c => c.id === sale.customerId);
    
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        background: 'rgba(0,0,0,0.8)', zIndex: 1000, 
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
      }}>
        <div className="animate-in" style={{
          background: 'white', padding: '2rem', borderRadius: '4px', 
          width: '100%', maxWidth: '350px', color: 'black', fontFamily: 'monospace'
        }}>
          <div style={{textAlign: 'center', borderBottom: '1px dashed #ccc', paddingBottom: '1rem', marginBottom: '1rem'}}>
            <h2 style={{color: 'black', margin: 0}}>MITTISO</h2>
            <div style={{fontSize: '0.8rem'}}>Savdo cheki</div>
          </div>
          
          <div style={{fontSize: '0.8rem', marginBottom: '1rem'}}>
            <div>Sana: {sale.date}</div>
            <div>Mijoz: {customer?.name}</div>
            <div>Chek #: {sale.id.split('-').pop()}</div>
          </div>
          
          <table style={{width: '100%', fontSize: '0.8rem', borderBottom: '1px dashed #ccc', marginBottom: '1rem'}}>
            <thead>
              <tr>
                <th style={{textAlign: 'left'}}>Nomi</th>
                <th style={{textAlign: 'center'}}>Soni</th>
                <th style={{textAlign: 'right'}}>Narxi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{product?.name}</td>
                <td style={{textAlign: 'center'}}>{sale.quantity}</td>
                <td style={{textAlign: 'right'}}>{sale.total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          
          <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.1rem'}}>
            <span>JAMI:</span>
            <span>{sale.total.toLocaleString()} UZS</span>
          </div>
          
          <div style={{marginTop: '1rem', fontSize: '0.7rem', textAlign: 'center', color: '#666'}}>
            Xaridingiz uchun rahmat! <br/>
            Diler: Boboxonov Ozodjon
          </div>
          
          <button className="btn mt-4" onClick={() => setShowReceipt(null)}>Yopish</button>
        </div>
      </div>
    );
  };

  if (showForm && userRole === 'admin') {
    return (
      <div className="p-4 animate-in">
        <button className="btn-back" onClick={() => setShowForm(false)}>← Orqaga</button>
        <div className="card mt-2">
          <h2 style={{marginBottom: '1.5rem'}}>Yangi savdo rasmiylashtirish</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Mijozni tanlang</label>
              <select className="form-control" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Mahsulotni tanlang</label>
              <div style={{display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.5rem 0'}}>
                {products.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => setProductId(p.id)}
                    style={{
                      minWidth: '120px', 
                      border: productId === p.id ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      cursor: 'pointer',
                      background: productId === p.id ? 'var(--accent-soft)' : 'white',
                      textAlign: 'center'
                    }}
                  >
                    <img src={p.image} alt={p.name} style={{width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem'}} />
                    <div style={{fontSize: '0.8rem', fontWeight: '700'}}>{p.name}</div>
                    <div style={{fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: '700'}}>{p.price.toLocaleString()} UZS</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div className="form-group">
                <label>Soni</label>
                <input type="number" className="form-control" min="1" max={selectedProduct?.qoldiq || 999} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="form-group">
                <label>To'lov holati</label>
                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="To'langan">To'langan</option>
                  <option value="Qarz">Qarz</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn mt-4">Savdoni tasdiqlash</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 animate-in">
      {showReceipt && <ReceiptModal sale={showReceipt} />}
      
      <div className="flex justify-between items-center mb-4">
        <h2>Savdolar tarixi</h2>
        {userRole === 'admin' && (
          <button className="btn" style={{width: 'auto', padding: '0.5rem 1rem', fontSize: '0.8rem'}} onClick={() => setShowForm(true)}>
            + Yangi savdo
          </button>
        )}
      </div>
      
      <div className="mt-2">
        {sales.map(sale => {
          const product = products.find(p => p.id === sale.productId);
          const customer = customers.find(c => c.id === sale.customerId);
          return (
            <div key={sale.id} className="card" style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <img src={product?.image} alt={product?.name} style={{width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover'}} />
              <div style={{flexGrow: 1}}>
                <div style={{fontWeight: '700', fontSize: '1rem'}}>{product?.name || 'Noma\'lum'}</div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{customer?.name}</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{sale.date}</div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontWeight: '800', color: 'var(--text-main)'}}>{sale.total.toLocaleString()} UZS</div>
                <button 
                  onClick={() => setShowReceipt(sale)}
                  style={{background: 'var(--accent-soft)', border: 'none', color: 'var(--accent-color)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer', marginTop: '4px'}}
                >
                  📄 Chek
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
