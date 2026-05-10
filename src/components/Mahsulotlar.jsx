import React, { useState } from 'react';

export default function Mahsulotlar({ products, setProducts }) {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qoldiq, setQoldiq] = useState('');
  const [tavsif, setTavsif] = useState('');
  const [image, setImage] = useState('');

  const handleEdit = (p) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setQoldiq(p.qoldiq);
    setTavsif(p.tavsif);
    setImage(p.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Mahsulotni o'chirmoqchimisiz?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? {
        ...p, name, price: Number(price), qoldiq: Number(qoldiq), tavsif, image: image || 'https://via.placeholder.com/150'
      } : p));
      setEditingId(null);
    } else {
      const newProduct = {
        id: `PROD-${Date.now()}`,
        name,
        price: Number(price),
        qoldiq: Number(qoldiq),
        tavsif,
        image: image || 'https://via.placeholder.com/150'
      };
      setProducts([newProduct, ...products]); // Yangi mahsulot tepada chiqadi
    }
    
    setName('');
    setPrice('');
    setQoldiq('');
    setTavsif('');
    setImage('');
  };

  return (
    <div className="p-4 animate-in">
      <div className="card">
        <h2 style={{marginBottom: '1.5rem'}}>{editingId ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Mahsulot nomi</label>
            <input type="text" className="form-control" placeholder="Masalan: Mittiso sumka" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div className="form-group">
              <label>Sotuv narxi (UZS)</label>
              <input type="number" className="form-control" placeholder="Narxi" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Ombordagi qoldiq</label>
              <input type="number" className="form-control" placeholder="Soni" value={qoldiq} onChange={(e) => setQoldiq(e.target.value)} required />
            </div>
          </div>
          
          <div className="form-group">
            <label>Tavsif (ixtiyoriy)</label>
            <textarea className="form-control" rows="2" placeholder="Mahsulot haqida batafsil..." value={tavsif} onChange={(e) => setTavsif(e.target.value)}></textarea>
          </div>
          
          <div className="form-group">
            <label>Mahsulot rasmi</label>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
              <div style={{textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)'}}>yoki rasm havolasi:</div>
              <input type="text" className="form-control" placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            {image && <img src={image} alt="Preview" style={{width: '100px', height: '100px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '12px'}} />}
          </div>
          
          <div style={{display: 'flex', gap: '1rem'}}>
            <button type="submit" className="btn mt-2">{editingId ? 'Saqlash' : 'Mahsulotni qo\'shish'}</button>
            {editingId && (
              <button type="button" className="btn mt-2 btn-secondary" onClick={() => setEditingId(null)}>Bekor qilish</button>
            )}
          </div>
        </form>
      </div>

      <h3 style={{marginTop: '2rem', marginBottom: '1rem'}}>Mavjud mahsulotlar</h3>
      <div>
        {products.map(p => (
          <div key={p.id} className="card" style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <img src={p.image} alt={p.name} style={{width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover'}} />
            <div style={{flexGrow: 1}}>
              <div style={{fontWeight: '700'}}>{p.name}</div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Narxi: {p.price.toLocaleString()} UZS | Qoldiq: {p.qoldiq} ta</div>
            </div>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <button onClick={() => handleEdit(p)} className="btn-secondary" style={{padding: '0.4rem 0.8rem', fontSize: '0.75rem'}}>✏️</button>
              <button onClick={() => handleDelete(p.id)} className="btn-secondary" style={{padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: 'var(--danger-red)'}}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
