import React, { useState } from 'react';

export default function News({ news, setNews, userRole }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    if (editingId) {
      setNews(news.map(item => item.id === editingId ? {
        ...item, title, content, image
      } : item));
    } else {
      const newItem = {
        id: `NEWS-${Date.now()}`,
        title,
        content,
        image,
        date: new Date().toLocaleDateString('uz-UZ')
      };
      setNews([newItem, ...news]);
    }
    
    resetForm();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setImage(item.image || '');
    setShowAdd(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Ushbu yangilikni o'chirmoqchimisiz?")) {
      setNews(news.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImage('');
    setShowAdd(false);
  };

  if (showAdd) {
    return (
      <div className="p-4 animate-in">
        <button className="btn-back" onClick={resetForm}>← Orqaga</button>
        <h2 className="px-4">{editingId ? 'Yangilikni tahrirlash' : "Yangi yangilik qo'shish"}</h2>
        <form onSubmit={handleSave} className="card mt-2">
          <div className="form-group">
            <label>Rasm yuklash</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control" />
            {image && <img src={image} alt="Preview" style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginTop: '0.5rem'}} />}
          </div>
          <div className="form-group">
            <label>Sarlavha</label>
            <input 
              type="text" 
              className="form-control" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Aksiya yoki muhim xabar..."
            />
          </div>
          <div className="form-group">
            <label>Tafsilotlar</label>
            <textarea 
              className="form-control" 
              rows="4"
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              placeholder="Yangilik matni..."
            ></textarea>
          </div>
          <button type="submit" className="btn mt-2">
            {editingId ? 'Yangilash' : 'Nashr qilish'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-in">
      <div className="p-4 flex justify-between items-center">
        <h2>Yangiliklar</h2>
        {userRole === 'admin' && (
          <button className="btn" style={{width: 'auto', padding: '0.5rem 1rem', fontSize: '0.8rem'}} onClick={() => setShowAdd(true)}>
            + Yangilik
          </button>
        )}
      </div>

      <div className="px-4">
        {news.length === 0 && <p className="text-muted text-center p-8">Hozircha yangiliklar yo'q</p>}
        {news.map(item => (
          <div key={item.id} className="card" style={{padding: 0, overflow: 'hidden'}}>
            {item.image && (
              <img src={item.image} alt={item.title} style={{width: '100%', height: '200px', objectFit: 'cover'}} />
            )}
            <div style={{padding: '1.25rem'}}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)'}}>{item.title}</h3>
                  <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{item.date}</span>
                </div>
                {userRole === 'admin' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem'}}>✏️</button>
                    <button onClick={() => handleDelete(item.id)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem'}}>🗑️</button>
                  </div>
                )}
              </div>
              <p style={{marginTop: '0.75rem', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.5'}}>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
