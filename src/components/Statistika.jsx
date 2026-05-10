import React from 'react';

export default function Statistika({ customers, sales, expenses = [] }) {
  const mijozlarCount = customers.length;
  
  // Qarzlar miqdorini hisoblash
  const totalDebt = sales.filter(s => s.status === 'Qarz').reduce((sum, s) => sum + s.total, 0);
  const umumiyKirim = sales.filter(s => s.status === 'To\'langan').reduce((sum, s) => sum + s.total, 0);
  const umumiyChiqim = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  // Eng ko'p sotilgan mahsulotlar reytingi
  const productSales = {};
  sales.forEach(sale => {
    productSales[sale.productId] = (productSales[sale.productId] || 0) + sale.quantity;
  });

  const topProducts = Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="p-4 animate-in">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <h2>Statistika</h2>
        <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Bugun: {new Date().toLocaleDateString('uz-UZ')}</div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem'}}>
        <div className="card" style={{borderLeft: '4px solid var(--success-green)'}}>
          <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px'}}>Umumiy Kirim</div>
          <div style={{fontSize: '1.1rem', fontWeight: '800', color: 'var(--success-green)'}}>{umumiyKirim.toLocaleString()} UZS</div>
        </div>

        <div className="card" style={{borderLeft: '4px solid var(--danger-red)'}}>
          <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px'}}>Umumiy Chiqim</div>
          <div style={{fontSize: '1.1rem', fontWeight: '800', color: 'var(--danger-red)'}}>{umumiyChiqim.toLocaleString()} UZS</div>
        </div>

        <div className="card" style={{borderLeft: '4px solid var(--uzum-yellow)'}}>
          <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px'}}>Qarzlar</div>
          <div style={{fontSize: '1.1rem', fontWeight: '800', color: 'var(--uzum-yellow)'}}>{totalDebt.toLocaleString()} UZS</div>
        </div>

        <div className="card" style={{borderLeft: '4px solid var(--accent-color)'}}>
          <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px'}}>Mijozlar</div>
          <div style={{fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-color)'}}>{mijozlarCount} ta</div>
        </div>
      </div>

      <h3 style={{marginBottom: '1rem'}}>🏆 Eng ko'p sotilganlar</h3>
      <div className="card">
        {topProducts.length === 0 ? (
          <p className="text-center text-muted p-4">Sotuvlar hali mavjud emas</p>
        ) : (
          topProducts.map(([id, qty], index) => (
            <div key={id} style={{
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '0.75rem 0',
              borderBottom: index === topProducts.length - 1 ? 'none' : '1px solid var(--border-color)'
            }}>
              <div style={{
                width: '30px', 
                height: '30px', 
                borderRadius: '50%', 
                background: 'var(--accent-soft)', 
                color: 'var(--accent-color)', 
                display: 'flex', 
                alignItems: 'center', 
                justify-content: 'center', 
                fontWeight: '800',
                fontSize: '0.8rem'
              }}>
                {index + 1}
              </div>
              <div style={{flexGrow: 1}}>
                <div style={{fontWeight: '700', fontSize: '0.9rem'}}>Mahsulot #{id.split('-').pop()}</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Sotilgan miqdor: {qty} ta</div>
              </div>
              <div style={{fontWeight: '800', color: 'var(--text-main)'}}>{qty} ta</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
