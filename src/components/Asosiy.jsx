import React, { useState } from 'react';

export default function Asosiy({ products, userRole, onDelete }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedProduct) {
    return (
      <div className="p-4 animate-in">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center'}}>
          <button className="btn-back" style={{margin: 0, width: 'auto', padding: '0.5rem 1rem'}} onClick={() => setSelectedProduct(null)}>← Orqaga</button>
          {userRole === 'admin' && (
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <button className="btn btn-secondary" style={{width: 'auto', padding: '0.5rem 1rem'}} onClick={() => { 
                window.dispatchEvent(new CustomEvent('editProduct', { detail: selectedProduct }));
              }}>✏️</button>
              <button className="btn" style={{background: 'var(--danger-red)', width: 'auto', padding: '0.5rem 1rem'}} onClick={() => { onDelete(selectedProduct.id); setSelectedProduct(null); }}>🗑️</button>
            </div>
          )}
        </div>
        
        <div className="card" style={{padding: 0, overflow: 'hidden'}}>
          <img src={selectedProduct.image} alt={selectedProduct.name} style={{width: '100%', height: '350px', objectFit: 'cover'}} />
          <div style={{padding: '1.5rem'}}>
            <h2 style={{fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem'}}>{selectedProduct.name}</h2>
            <div style={{fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-color)', marginBottom: '1.5rem'}}>{selectedProduct.price.toLocaleString()} UZS</div>
            
            <div className="card" style={{background: 'var(--bg-main)', border: 'none', padding: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                <span style={{color: 'var(--text-muted)'}}>Ombordagi qoldiq:</span> 
                <strong style={{color: selectedProduct.qoldiq < 5 ? 'var(--danger-red)' : 'var(--success-green)'}}>{selectedProduct.qoldiq} ta</strong>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: 'var(--text-muted)'}}>Kategoriya:</span> 
                <strong>Mahsulot</strong>
              </div>
            </div>
            
            <div style={{marginTop: '1.5rem'}}>
              <h4 style={{marginBottom: '0.5rem'}}>Mahsulot tavsifi</h4>
              <p style={{color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem'}}>{selectedProduct.tavsif || "Ushbu mahsulot haqida qo'shimcha ma'lumot berilmagan."}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 animate-in">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <h2 style={{margin: 0, fontSize: '1.2rem'}}>Barcha mahsulotlar</h2>
        {userRole === 'admin' && (
          <button className="btn" style={{width: 'auto', padding: '0.5rem 1rem', fontSize: '0.8rem'}} onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'MAHSULOTLAR' }))}>
            + Yangi
          </button>
        )}
      </div>

      <div style={{position: 'sticky', top: '0', zIndex: 10, background: 'var(--bg-main)', paddingBottom: '1rem'}}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Mahsulotlarni qidirish..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '12px'}}
        />
      </div>

      <div className="products-grid">
        {filteredProducts.map(p => (
          <div key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
            {p.qoldiq < 5 && <div className="product-badge">Kam qoldi</div>}
            <img src={p.image} alt={p.name} className="product-image" />
            <div className="product-info">
              <div>
                <div className="product-title">{p.name}</div>
                <div className="product-price">{p.price.toLocaleString()} UZS</div>
              </div>
              <div className="product-stock">Omborda: {p.qoldiq} ta</div>
            </div>
            <div className="add-btn">＋</div>
          </div>
        ))}
      </div>
    </div>
  );
}
