import React, { useState } from 'react';

export default function News({ news, setNews }) {
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    const newItem = {
      id: `NEWS-${Date.now()}`,
      title,
      content,
      date: new Date().toISOString().split('T')[0]
    };
    
    setNews([newItem, ...news]);
    setTitle('');
    setContent('');
    setShowAdd(false);
  };

  if (showAdd) {
    return (
      <div className="p-4">
        <button className="btn-back" onClick={() => setShowAdd(false)}>← Orqaga</button>
        <h2>Yangilik qo'shish</h2>
        <form onSubmit={handleSave} className="card mt-2">
          <div className="form-group">
            <label>Sarlavha</label>
            <input 
              type="text" 
              className="form-control" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Masalan: Yangi mahsulot..."
            />
          </div>
          <div className="form-group">
            <label>Matn</label>
            <textarea 
              className="form-control" 
              rows="4"
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              placeholder="Yangilik matni..."
            ></textarea>
          </div>
          <button type="submit" className="btn mt-2">Saqlash</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 flex justify-between items-center">
        <h2>Yangiliklar</h2>
        <button className="btn" style={{width: 'auto', padding: '0.5rem 1rem'}} onClick={() => setShowAdd(true)}>
          + Qo'shish
        </button>
      </div>

      {news.map(item => (
        <div key={item.id} className="card">
          <div className="card-header">
            <h3>{item.title}</h3>
            <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{item.date}</span>
          </div>
          <p style={{marginTop: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem'}}>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
