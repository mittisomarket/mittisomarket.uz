import React, { useState } from 'react';

export default function Mijozlar({ customers, setCustomers, sales, userRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerTotal = (customerId) => {
    return sales
      .filter(s => s.customerId === customerId)
      .reduce((sum, sale) => sum + sale.total, 0);
  };

  const handleSave = (e) => {
    e.preventDefault();
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
    alert('Mijoz muvaffaqiyatli saqlandi!');
  };

  if (showForm) {
    return (
      <div className="p-4">
        <button className="btn-back" onClick={() => setShowForm(false)}>← Orqaga</button>
        <div className="green-card">
          <div className="card-title-badge">Custom Form</div>
          <h3 className="mb-2">Yangi Mijoz Qo'shish</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Mijoz Ismi</label>
              <input type="text" className="form-control" placeholder="Ismi" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Telefon raqami</label>
              <input type="text" className="form-control" placeholder="+998..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Manzil</label>
              <input type="text" className="form-control" placeholder="Manzil" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button type="submit" className="btn mt-2">Saqlash</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {userRole === 'admin' && (
        <div className="flex justify-between items-center mb-2">
          <button className="btn" style={{width: 'auto'}} onClick={() => setShowForm(true)}>+ Mijoz Qo'shish</button>
        </div>
      )}
      
      <div className="green-card">
        <h3 className="mb-2" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem'}}>List</h3>
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Mijozlarni qidirish..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {filteredCustomers.map(c => (
          <div key={c.id} className="list-item">
            <div className="list-item-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '32px'}}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="list-item-info">
              <div><strong>Ismi:</strong> {c.name}</div>
              <div><strong>Telefon:</strong> {c.phone}</div>
              <div><strong>Manzil:</strong> {c.address}</div>
              <div><strong>Jami Xarid:</strong> <span className="text-accent">{getCustomerTotal(c.id).toLocaleString()} $</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
