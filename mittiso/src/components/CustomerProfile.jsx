import React from 'react';

export default function CustomerProfile({ customer, sales, products, onBack, onAddSale }) {
  const customerSales = sales.filter(s => s.customerId === customer.id);
  
  let totalDebt = 0;
  let totalPaid = 0;
  
  customerSales.forEach(sale => {
    if (sale.status === 'Qarz') totalDebt += sale.total;
    if (sale.status === 'To\'landi') totalPaid += sale.total;
  });

  return (
    <div className="p-4">
      <button className="btn-back" style={{margin: '0 0 1rem 0'}} onClick={onBack}>← Orqaga</button>
      
      <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
        <div style={{width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem auto', fontWeight: 'bold'}}>
          {customer.name.charAt(0)}
        </div>
        <h2>{customer.name}</h2>
        <p>📞 {customer.phone} <br/> 📍 {customer.address}</p>
      </div>
      
      <div className="dashboard-cards" style={{padding: '0'}}>
        <div className="dash-card debt">
          <h3>{totalDebt.toLocaleString()} UZS</h3>
          <p>Jami Qarz</p>
        </div>
        <div className="dash-card paid">
          <h3>{totalPaid.toLocaleString()} UZS</h3>
          <p>Jami To'langan</p>
        </div>
      </div>
      
      <div className="list-header" style={{textAlign: 'left', padding: '0', marginTop: '1.5rem'}}>
        <h3>Oxirgi Xaridlar</h3>
      </div>

      {customerSales.length === 0 ? <p>Hali xaridlar yo'q.</p> : (
        <div style={{marginTop: '1rem'}}>
          {customerSales.map(sale => {
            const product = products.find(p => p.id === sale.productId);
            const isDebt = sale.status === 'Qarz';
            return (
              <div key={sale.id} className="list-item" style={{margin: '0 0 0.75rem 0'}}>
                <div className="list-item-avatar" style={{borderRadius: '8px'}}>
                  🛒
                </div>
                <div className="list-item-info">
                  <div className="list-item-title">{product?.name || 'Noma\'lum'}</div>
                  <div className="list-item-subtitle">{sale.date}</div>
                </div>
                <div className={`list-item-value ${isDebt ? 'text-red' : 'text-green'}`}>
                  {sale.total.toLocaleString()} UZS
                  <div style={{fontSize: '0.65rem'}}>{sale.status}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-2" style={{position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '600px', padding: '0 1rem'}}>
        <button className="btn" style={{boxShadow: '0 4px 12px rgba(14, 165, 233, 0.4)'}} onClick={() => onAddSale(customer)}>+ Xarid Qo'shish</button>
      </div>
      <div style={{height: '60px'}}></div>
    </div>
  );
}
