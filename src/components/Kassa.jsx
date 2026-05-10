import React, { useState } from 'react';

export default function Kassa({ sales, expenses, setExpenses }) {
  const [activeTab, setActiveTab] = useState('Chiqimlar');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseType, setExpenseType] = useState('Naqd'); // Naqd, Karta
  const [expenseReason, setExpenseReason] = useState('');

  // Calculate totals
  const umumiyKirim = sales.filter(s => s.status === 'To\'langan').reduce((sum, s) => sum + s.total, 0);
  const naqdKirim = umumiyKirim; // Assuming all sales are naqd for now, could be split if needed
  
  const umumiyChiqim = expenses.reduce((sum, e) => sum + e.amount, 0);
  const naqdChiqim = expenses.filter(e => e.type === 'Naqd').reduce((sum, e) => sum + e.amount, 0);
  const kartaChiqim = expenses.filter(e => e.type === 'Karta').reduce((sum, e) => sum + e.amount, 0);

  const balans = umumiyKirim - umumiyChiqim;
  const naqdBalans = naqdKirim - naqdChiqim;
  const kartaBalans = 0 - kartaChiqim; // No karta kirim tracked yet

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseAmount) return;
    
    setExpenses([...expenses, {
      id: Date.now(),
      amount: Number(expenseAmount),
      type: expenseType,
      reason: expenseReason,
      date: new Date().toISOString().split('T')[0]
    }]);
    
    setExpenseAmount('');
    setExpenseReason('');
    setShowExpenseForm(false);
  };

  return (
    <div className="p-4" style={{background: 'var(--bg-main)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <h2 style={{display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0}}>
          <span style={{color: '#6366f1'}}>🧮</span> Kassa
        </h2>
        <select className="form-control" style={{width: 'auto', padding: '0.25rem 0.5rem'}}>
          <option value="UZS">UZS</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <div className="kassa-grid">
        <div className="kassa-card border-green" style={{background: 'rgba(34, 197, 94, 0.05)'}}>
          <div className="kassa-card-title">Umumiy kirim ( UZS )</div>
          <div className="kassa-card-val text-green">{umumiyKirim.toLocaleString()}</div>
        </div>
        <div className="kassa-card border-red" style={{background: 'rgba(239, 68, 68, 0.05)'}}>
          <div className="kassa-card-title">Umumiy chiqim ( UZS )</div>
          <div className="kassa-card-val text-red">{umumiyChiqim.toLocaleString()}</div>
        </div>
        <div className="kassa-card border-green">
          <div className="kassa-card-title">Balanslar ( UZS )</div>
          <div className="kassa-card-val text-green">{balans.toLocaleString()}</div>
        </div>
        <div className="kassa-card border-green">
          <div className="kassa-card-title">Naqd ( UZS )</div>
          <div style={{fontSize: '0.75rem', color: 'var(--success-green)'}}>+ {naqdKirim.toLocaleString()}</div>
          <div style={{fontSize: '0.75rem', color: 'var(--danger-red)'}}>- {naqdChiqim.toLocaleString()}</div>
          <div className="kassa-card-val">{naqdBalans.toLocaleString()}</div>
        </div>
        <div className="kassa-card border-blue">
          <div className="kassa-card-title">Karta ( UZS )</div>
          <div style={{fontSize: '0.75rem', color: 'var(--success-green)'}}>+ 0</div>
          <div style={{fontSize: '0.75rem', color: 'var(--danger-red)'}}>- {kartaChiqim.toLocaleString()}</div>
          <div className="kassa-card-val">{kartaBalans.toLocaleString()}</div>
        </div>
      </div>

      <div className="kassa-tabs">
        <div className={`kassa-tab ${activeTab === 'Chiqimlar' ? 'active' : ''}`} onClick={() => setActiveTab('Chiqimlar')}>
          📉 Chiqimlar
        </div>
        <div className={`kassa-tab ${activeTab === 'Kirimlar' ? 'active' : ''}`} onClick={() => setActiveTab('Kirimlar')}>
          📈 Kirimlar
        </div>
      </div>

      {activeTab === 'Chiqimlar' && (
        <>
          <div className="kassa-grid" style={{marginBottom: '1rem'}}>
            <div className="kassa-card border-red" style={{background: 'rgba(239, 68, 68, 0.05)'}}>
              <div className="kassa-card-val text-red" style={{fontSize: '1rem'}}>{umumiyChiqim.toLocaleString()}</div>
              <div className="kassa-card-title" style={{marginTop: '0.25rem'}}>Umumiy chiqim ( UZS )</div>
            </div>
            <div className="kassa-card border-red" style={{background: 'rgba(239, 68, 68, 0.05)'}}>
              <div className="kassa-card-val text-red" style={{fontSize: '1rem'}}>{umumiyChiqim.toLocaleString()}</div>
              <div className="kassa-card-title" style={{marginTop: '0.25rem'}}>Bugungi chiqim ( UZS )</div>
            </div>
            <div className="kassa-card border-red" style={{background: 'rgba(239, 68, 68, 0.05)'}}>
              <div className="kassa-card-val text-red" style={{fontSize: '1rem'}}>{naqdChiqim.toLocaleString()}</div>
              <div className="kassa-card-title" style={{marginTop: '0.25rem'}}>Naqd xarajatlar ( UZS )</div>
            </div>
            <div className="kassa-card border-red" style={{background: 'rgba(239, 68, 68, 0.05)'}}>
              <div className="kassa-card-val text-red" style={{fontSize: '1rem'}}>{kartaChiqim.toLocaleString()}</div>
              <div className="kassa-card-title" style={{marginTop: '0.25rem'}}>Karta xarajat ( UZS )</div>
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <h3>Chiqimlar</h3>
            <button className="btn" style={{background: '#6366f1', width: 'auto'}} onClick={() => setShowExpenseForm(true)}>+ Chiqim qo'shish</button>
          </div>

          {showExpenseForm && (
            <div className="green-card" style={{border: '1px solid #6366f1', marginBottom: '1rem'}}>
              <h3 style={{color: '#6366f1', marginBottom: '1rem'}}>Yangi chiqim (xarajat) kiritish</h3>
              <form onSubmit={handleAddExpense}>
                <div className="form-group">
                  <label>Summa (UZS)</label>
                  <input type="number" className="form-control" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>To'lov turi</label>
                  <select className="form-control" value={expenseType} onChange={(e) => setExpenseType(e.target.value)}>
                    <option value="Naqd">Naqd</option>
                    <option value="Karta">Karta</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Sababi (Izoh)</label>
                  <input type="text" className="form-control" value={expenseReason} onChange={(e) => setExpenseReason(e.target.value)} />
                </div>
                <div style={{display: 'flex', gap: '1rem'}}>
                  <button type="submit" className="btn" style={{background: '#6366f1'}}>Saqlash</button>
                  <button type="button" className="btn" style={{background: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border-color)'}} onClick={() => setShowExpenseForm(false)}>Bekor qilish</button>
                </div>
              </form>
            </div>
          )}

          {expenses.map(e => (
            <div key={e.id} className="list-item" style={{background: 'var(--bg-main)'}}>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 'bold'}}>{e.reason || 'Izohsiz'}</div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{e.type} | {e.date}</div>
              </div>
              <div style={{color: 'var(--danger-red)', fontWeight: 'bold'}}>- {e.amount.toLocaleString()} UZS</div>
            </div>
          ))}
        </>
      )}

      {activeTab === 'Kirimlar' && (
        <div>
          {sales.filter(s => s.status === 'To\'langan').map(s => (
             <div key={s.id} className="list-item" style={{background: 'var(--bg-main)'}}>
               <div style={{flex: 1}}>
                 <div style={{fontWeight: 'bold'}}>Sotuv kirimi ({s.id})</div>
                 <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Naqd | {s.date}</div>
               </div>
               <div style={{color: 'var(--success-green)', fontWeight: 'bold'}}>+ {s.total.toLocaleString()} UZS</div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
