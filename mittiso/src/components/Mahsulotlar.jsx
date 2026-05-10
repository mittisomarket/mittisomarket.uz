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

  React.useEffect(() => {
    const handleGlobalEdit = (e) => {
      handleEdit(e.detail);
    };
    window.addEventListener('editProduct', handleGlobalEdit);
    return () => window.removeEventListener('editProduct', handleGlobalEdit);
  }, []);

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
      setProducts([...products, newProduct]);
    }
    
    setName('');
    setPrice('');
    setQoldiq('');
    setTavsif('');
    setImage('');
    alert('Mahsulot muvaffaqiyatli saqlandi!');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setQoldiq('');
    setTavsif('');
    setImage('');
  };

  return (
    <div className="p-4">
      <div className="green-card" style={{position: 'relative'}}>
        <div className="card-title-badge" style={{background: '#10b981'}}>{editingId ? 'Tahrirlash' : 'Qo\'shish'}</div>
        <h3 className="mb-2">{editingId ? 'Mahsulotni Tahrirlash' : 'Yangi Mahsulot Qo\'shish'}</h3>
        
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Mahsulot Nomi</label>
            <input type="text" className="form-control" placeholder="Nomi" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label>Narxi ($ yosi UZS)</label>
            <input type="number" className="form-control" placeholder="Narxi" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label>Qoldiq (Soni)</label>
            <input type="number" className="form-control" placeholder="Qoldiq" value={qoldiq} onChange={(e) => setQoldiq(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label>Tavsif</label>
            <textarea className="form-control" rows="3" placeholder="Tavsif" value={tavsif} onChange={(e) => setTavsif(e.target.value)}></textarea>
          </div>
          
          <div className="form-group">
            <label>Mahsulot Rasmi</label>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
              <div style={{textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)'}}>yoki havola (URL) orqali:</div>
              <input type="text" className="form-control" placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            {image && <img src={image} alt="Preview" style={{width: '100%', maxHeight: '200px', objectFit: 'contain', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)'}} />}
          </div>
          
          <div style={{display: 'flex', gap: '1rem'}}>
            <button type="submit" className="btn mt-2">{editingId ? 'O\'zgarishlarni saqlash' : 'Saqlash'}</button>
            {editingId && (
              <button type="button" className="btn mt-2" style={{background: 'var(--border-color)', color: 'var(--text-main)'}} onClick={cancelEdit}>Bekor qilish</button>
            )}
          </div>
        </form>
      </div>

      <div className="green-card mt-2">
        <h3>Mavjud Mahsulotlar (Tahrirlash uchun bosing)</h3>
        {products.map(p => (
          <div key={p.id} className="list-item" style={{background: 'var(--bg-main)', cursor: 'pointer'}} onClick={() => handleEdit(p)}>
             <img src={p.image} alt={p.name} style={{width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', marginRight: '1rem'}} />
             <div style={{flex: 1}}>
                <div style={{fontWeight: 'bold'}}>{p.name}</div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Qoldiq: {p.qoldiq} ta | Narxi: {p.price} $</div>
             </div>
             <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }} style={{background: 'none', border: 'none', color: 'var(--danger-red)', cursor: 'pointer', fontWeight: 'bold'}}>
                O'chirish
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}
