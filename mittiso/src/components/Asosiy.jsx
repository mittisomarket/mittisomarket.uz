import React, { useState } from 'react';

export default function Asosiy({ products, userRole, onDelete }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (selectedProduct) {
    return (
      <div className="p-4">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
          <button className="btn-back" style={{margin: 0}} onClick={() => setSelectedProduct(null)}>← Orqaga</button>
          <button className="btn-back" style={{margin: 0}} onClick={() => setSelectedProduct(null)}>← Orqaga</button>
          {userRole === 'admin' && (
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <button className="btn" style={{background: 'var(--accent-color)', width: 'auto'}} onClick={() => { 
                // Set the tab to MAHSULOTLAR and pass the product to edit
                window.dispatchEvent(new CustomEvent('editProduct', { detail: selectedProduct }));
              }}>Tahrirlash</button>
              <button className="btn" style={{background: 'var(--danger-red)', width: 'auto'}} onClick={() => { onDelete(selectedProduct.id); setSelectedProduct(null); }}>O'chirish</button>
            </div>
          )}
        </div>
        <div className="green-card">
          <img src={selectedProduct.image} alt={selectedProduct.name} style={{width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem', background: '#3f3f46'}} />
          <h2 style={{marginBottom: '0.5rem'}}>{selectedProduct.name}</h2>
          <div className="text-accent" style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem'}}>{selectedProduct.price.toLocaleString()} UZS</div>
          
          <div style={{marginBottom: '1rem'}}>
            <span style={{color: 'var(--text-muted)'}}>Ombordagi qoldiq:</span> 
            <strong style={{marginLeft: '0.5rem'}}>{selectedProduct.qoldiq} ta</strong>
          </div>
          
          <div>
            <span style={{color: 'var(--text-muted)'}}>Tavsif:</span>
            <p style={{marginTop: '0.5rem', color: 'var(--text-main)', lineHeight: '1.5'}}>{selectedProduct.tavsif}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="green-card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem'}}>
          <h3 style={{margin: 0}}>Barcha mahsulotlar (Reklamalar)</h3>
          {userRole === 'admin' && (
            <button className="btn" style={{width: 'auto', padding: '0.4rem 1rem', fontSize: '0.8rem'}} onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'MAHSULOTLAR' }))}>+ Yangi mahsulot</button>
          )}
        </div>
        <div className="products-grid">
          {products.map(p => (
            <div key={p.id} className="product-card" style={{cursor: 'pointer'}} onClick={() => setSelectedProduct(p)}>
              <div style={{position: 'relative'}}>
                <img src={p.image} alt={p.name} className="product-image" />
                {p.qoldiq < 5 && (
                  <div style={{position: 'absolute', top: '5px', left: '5px', background: 'var(--accent-color)', color: '#fff', fontSize: '0.6rem', padding: '2px 5px', borderRadius: '4px', fontWeight: 'bold'}}>
                    Sotuvda kam qoldi!
                  </div>
                )}
              </div>
              <div className="product-info">
                <div className="product-title" title={p.name}>{p.name}</div>
                <div className="product-price">Narxi: {p.price.toLocaleString()} $</div>
                <div className="product-stock">Qoldiq: {p.qoldiq} ta</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
