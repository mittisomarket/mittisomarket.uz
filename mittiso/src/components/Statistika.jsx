import React from 'react';

export default function Statistika({ customers, sales, expenses = [] }) {
  const mijozlarCount = customers.length;
  
  // Basic calculations based on current data shape
  // For qarzdorlar, anyone with "Qarz" status in sales
  const qarzdorlar = sales.filter(s => s.status === 'Qarz').length; // Simplification: count of unpaid sales, ideally group by customer
  
  const haqdorlar = 0; // Not tracked in current simple schema
  const muddatiOtgan = 0; // Not tracked
  
  const umumiyKirim = sales.filter(s => s.status === 'To\'langan').reduce((sum, s) => sum + s.total, 0);
  const umumiyChiqim = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  const kirimBalans = umumiyKirim; // Simplification
  const chiqimBalans = umumiyChiqim;

  return (
    <div className="p-4">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <h2>Statistika</h2>
        <select className="form-control" style={{width: 'auto', padding: '0.25rem 0.5rem'}}>
          <option value="UZS">UZS - O'zbekiston so'mi</option>
        </select>
      </div>

      <div className="statistika-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem'}}>
        
        <div className="stat-card">
          <div className="stat-icon" style={{background: '#6366f1'}}>👥</div>
          <div className="stat-info">
            <div className="stat-title">Mijozlar</div>
            <div className="stat-val">{mijozlarCount}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: 'var(--danger-red)'}}>🧾</div>
          <div className="stat-info">
            <div className="stat-title">Qarzdorlar</div>
            <div className="stat-val">{qarzdorlar}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: 'var(--success-green)'}}>💲</div>
          <div className="stat-info">
            <div className="stat-title">Haqdorlar</div>
            <div className="stat-val">{haqdorlar}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: 'var(--danger-red)'}}>⚠️</div>
          <div className="stat-info">
            <div className="stat-title">Muddati o'tgan qarzlar</div>
            <div className="stat-val">{muddatiOtgan}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: 'var(--success-green)'}}>💲</div>
          <div className="stat-info">
            <div className="stat-title">Kirim balanslari</div>
            <div className="stat-val">{kirimBalans.toLocaleString()} UZS</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: 'var(--danger-red)'}}>🧾</div>
          <div className="stat-info">
            <div className="stat-title">Chiqim balanslari</div>
            <div className="stat-val">{chiqimBalans.toLocaleString()} UZS</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: 'var(--success-green)'}}>📈</div>
          <div className="stat-info">
            <div className="stat-title">Umumiy kirim</div>
            <div className="stat-val">{umumiyKirim.toLocaleString()} UZS</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: 'var(--danger-red)'}}>⚠️</div>
          <div className="stat-info">
            <div className="stat-title">Umumiy chiqim</div>
            <div className="stat-val">{umumiyChiqim.toLocaleString()} UZS</div>
          </div>
        </div>

      </div>
    </div>
  );
}
