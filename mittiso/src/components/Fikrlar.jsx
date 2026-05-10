import React, { useState } from 'react';

export default function Fikrlar({ userRole }) {
  const [text, setText] = useState('');
  // Simulating saved feedbacks. In real app, this comes from backend.
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, text: 'Dastur juda zo\'r ishlayapti, rahmat!', date: '2023-11-01' },
    { id: 2, text: 'Mahsulot qidirish funksiyasini qo\'shish kerak.', date: '2023-11-05' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setFeedbacks([{
      id: Date.now(),
      text,
      date: new Date().toISOString().split('T')[0]
    }, ...feedbacks]);
    
    setText('');
    alert('Fikringiz yuborildi. Rahmat!');
  };

  const handleDelete = (id) => {
    if (window.confirm("Fikrni o'chirmoqchimisiz?")) {
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    }
  };

  return (
    <div className="p-4">
      <div className="green-card" style={{position: 'relative'}}>
        <div className="card-title-badge" style={{background: 'var(--accent-color)'}}>Taklif va Savollar</div>
        <h3 className="mb-2">Savol yoki Taklif yozish</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Sizning fikringiz</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Shu yerga yozing..." 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              required
            ></textarea>
          </div>
          <button type="submit" className="btn mt-2">Yuborish</button>
        </form>
      </div>

      {feedbacks.length > 0 && userRole === 'admin' && (
        <div className="green-card mt-2">
          <h3>Barcha Takliflar</h3>
          {feedbacks.map(f => (
            <div key={f.id} className="list-item" style={{background: 'var(--bg-main)', alignItems: 'flex-start', flexDirection: 'column'}}>
               <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                 <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{f.date}</span>
                 <button onClick={() => handleDelete(f.id)} style={{background: 'none', border: 'none', color: 'var(--danger-red)', cursor: 'pointer', fontWeight: 'bold'}}>
                   O'chirish
                 </button>
               </div>
               <div style={{fontSize: '0.9rem'}}>{f.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
