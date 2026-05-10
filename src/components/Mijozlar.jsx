import React, { useState } from 'react';

export default function Mijozlar({ customers, setCustomers, sales, userRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showOnlyDebtors, setShowOnlyDebtors] = useState(false);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm);
    if (showOnlyDebtors) {
      const total = sales.filter(s => s.customerId === c.id && s.status === 'Qarz').reduce((sum, s) => sum + s.total, 0);
      return matchesSearch && total > 0;
    }
    return matchesSearch;
  });

  const getCustomerTotal = (customerId) => {
    return sales
      .filter(s => s.customerId === customerId)
      .reduce((sum, sale) => sum + sale.total, 0);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (userRole !== 'admin') return; // Double security
    if (!name || !phone) return;
    
    const newCustomer = {
      id: `CUST-${Date.now()}`,
      name,
      phone,
      address
    };
    
    setCustomers([newCustomer, ...customers]);
    setName('');
    setPhone('');
    setAddress('');
    setShowForm(false);
  };

  if (showForm && userRole === 'admin') {
    return (
      <div className="p-4 animate-in">
        <button className="btn-back" onClick={() => setShowForm(false)}>← Orqaga</button>
        <div className="card mt-2">
          <h2 style={{marginBottom: '1.5rem'}}>Yangi mijoz ma'lumotlari</h2>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Mijozning to'liq ismi</label>
              <input type="text" className="form-control" placeholder="Ism familiya" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Telefon raqami</label>
              <input type="tel" className="form-control" placeholder="+998" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Manzil (ixtiyoriy)</label>
              <input type="text" className="form-control" placeholder="Shahar, tuman, ko'cha" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button type="submit" className="btn mt-4">Mijozni saqlash</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 animate-in">
      <div className="flex justify-between items-center mb-4">
        <h2>Mijozlar bazasi</h2>
        {userRole === 'admin' && (
          <button className="btn" style={{width: 'auto', padding: '0.5rem 1rem', fontSize: '0.8rem'}} onClick={() => setShowForm(true)}>
            + Yangi mijoz
          </button>
        )}
      </div>

      <div style={{position: 'sticky', top: '0', zIndex: 10, background: 'var(--bg-main)', paddingBottom: '1rem'}}>
        <div className="flex gap-2 mb-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Ism yoki telefon orqali qidirish..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '12px', flexGrow: 1}}
          />
          <button 
            className={`btn ${showOnlyDebtors ? '' : 'btn-secondary'}`} 
            style={{width: 'auto', padding: '0 1rem', fontSize: '0.7rem'}}
            onClick={() => setShowOnlyDebtors(!showOnlyDebtors)}
          >
            {showOnlyDebtors ? 'Hammasi' : 'Qarzlar'}
          </button>
        </div>
      </div>
      
      <div className="mt-2">
        {filteredCustomers.map(c => (
          <div key={c.id} className="card" style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <div style={{
              width: '50px', 
              height: '50px', 
              borderRadius: '50%', 
              background: 'var(--accent-soft)', 
              color: 'var(--accent-color)',
              display: 'flex',
              alignItems: 'center',
              justify-content: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              {c.name.charAt(0)}
            </div>
            <div style={{flexGrow: 1}}>
              <div style={{fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-main)'}}>{c.name}</div>
              <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px'}}>{c.phone}</div>
              <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{c.address}</div>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Xaridlar:</div>
              <div style={{fontWeight: '700', color: 'var(--accent-color)'}}>{getCustomerTotal(c.id).toLocaleString()} UZS</div>
            </div>
          </div>
        ))}
        {filteredCustomers.length === 0 && (
          <div className="text-center p-8 text-muted">Mijoz topilmadi</div>
        )}
      </div>
    </div>
  );
}
