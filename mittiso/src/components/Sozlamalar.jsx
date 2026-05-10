import React, { useState } from 'react';

export default function Sozlamalar({ userRole, theme, toggleTheme, designStyle, setDesignStyle, lang, setLang, onLogout }) {
  const [name, setName] = useState('Ozodjon Ozodjon');
  const [email, setEmail] = useState('ozodjon0492@gmail.com');
  const [profilePic, setProfilePic] = useState(null);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('O\'zgarishlar saqlandi!');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4" style={{maxWidth: '600px', margin: '0 auto'}}>
      <div className="green-card" style={{position: 'relative', textAlign: 'center', paddingTop: '2rem'}}>
        
        <div style={{position: 'relative', display: 'inline-block', marginBottom: '1rem'}}>
          <div style={{width: '100px', height: '100px', borderRadius: '50%', border: '4px solid #1e3a8a', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {profilePic ? (
              <img src={profilePic} alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            ) : (
              <span style={{color: '#1e3a8a', fontWeight: 'bold', fontSize: '1.2rem'}}>EduLand</span>
            )}
          </div>
          <label style={{position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderRadius: '50%', background: '#f3f4f6', border: '1px solid #d1d5db', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            📷
            <input type="file" accept="image/*" style={{display: 'none'}} onChange={handleImageChange} />
          </label>
        </div>
        <div style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem'}}>Rasmni o'zgartirish uchun bosing</div>

        <form onSubmit={handleSaveProfile} style={{textAlign: 'left'}}>
          <div className="form-group" style={{position: 'relative', marginBottom: '1.5rem'}}>
            <label style={{position: 'absolute', top: '-10px', left: '15px', background: 'var(--bg-card)', padding: '0 5px', fontSize: '0.75rem', color: 'var(--text-muted)'}}>Ism *</label>
            <div style={{display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem 1rem'}}>
              <span style={{marginRight: '0.5rem', color: 'var(--text-muted)'}}>👤</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{border: 'none', background: 'transparent', width: '100%', color: 'var(--text-main)', outline: 'none', fontSize: '1rem'}} required />
            </div>
          </div>

          <div className="form-group" style={{position: 'relative', marginBottom: '1.5rem'}}>
            <label style={{position: 'absolute', top: '-10px', left: '15px', background: 'var(--bg-card)', padding: '0 5px', fontSize: '0.75rem', color: 'var(--text-muted)'}}>Telefon raqami</label>
            <div style={{display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem 1rem', background: 'var(--bg-main)', opacity: 0.7}}>
              <span style={{marginRight: '0.5rem', color: 'var(--text-muted)'}}>📞</span>
              <input type="text" value="" disabled style={{border: 'none', background: 'transparent', width: '100%', color: 'var(--text-main)', outline: 'none', fontSize: '1rem'}} />
            </div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginLeft: '0.5rem'}}>Telefon raqamni o'zgartirib bo'lmaydi</div>
          </div>

          <div className="form-group" style={{position: 'relative', marginBottom: '2rem'}}>
            <label style={{position: 'absolute', top: '-10px', left: '15px', background: 'var(--bg-card)', padding: '0 5px', fontSize: '0.75rem', color: 'var(--text-muted)'}}>Elektron pochta</label>
            <div style={{display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem 1rem'}}>
              <span style={{marginRight: '0.5rem', color: 'var(--text-muted)'}}>✉️</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{border: 'none', background: 'transparent', width: '100%', color: 'var(--text-main)', outline: 'none', fontSize: '1rem'}} />
            </div>
          </div>

          <button type="submit" className="btn" style={{background: '#6366f1', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', borderRadius: '12px'}}>
            💾 O'zgarishlarni saqlash
          </button>
        </form>
      </div>

      <div className="green-card mt-2">
        <h3 className="mb-2">Tizim Sozlamalari</h3>
        
        <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem'}}>
          <label style={{margin: 0, fontSize: '1rem', color: 'var(--text-main)', fontWeight: 'bold'}}>Tizim tili</label>
          <select className="form-control" style={{width: 'auto', background: 'var(--bg-main)'}} value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="uz_latn">O'zbek (Lotin)</option>
            <option value="uz_cyrl">Ўзбек (Кирил)</option>
            <option value="en">English</option>
          </select>
        </div>
        
        <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingTop: '1rem', paddingBottom: '1rem'}}>
          <label style={{margin: 0, fontSize: '1rem', color: 'var(--text-main)', fontWeight: 'bold'}}>Mavzu (Kun/Tun)</label>
          <button className="theme-toggle" onClick={toggleTheme} style={{background: 'var(--bg-main)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
            {theme === 'light' ? '🌙 Qorong\'i rejim' : '☀️ Yorug\' rejim'}
          </button>
        </div>

        <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingTop: '1rem', paddingBottom: '1rem'}}>
          <label style={{margin: 0, fontSize: '1rem', color: 'var(--text-main)', fontWeight: 'bold'}}>Dizayn Uslubi</label>
          <select className="form-control" style={{width: 'auto', background: 'var(--bg-main)'}} value={designStyle} onChange={(e) => setDesignStyle(e.target.value)}>
            <option value="minimalist">Minimalist (Asosiy)</option>
            <option value="classic">Klassik (Yashil hoshiya)</option>
            <option value="glass">Glass (Shishasimon)</option>
            <option value="neumorph">Neumorphism (Hajmli)</option>
            <option value="material">Material (Google uslubi)</option>
          </select>
        </div>
        
        <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem'}}>
          <label style={{margin: 0, fontSize: '1rem', color: 'var(--text-main)', fontWeight: 'bold'}}>Tizimdan chiqish</label>
          <button className="btn" style={{background: 'var(--danger-red)', width: 'auto'}} onClick={onLogout}>Chiqish</button>
        </div>
      </div>
    </div>
  );
}
