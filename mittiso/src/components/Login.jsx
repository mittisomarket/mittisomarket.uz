import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [pin, setPin] = useState('');
  const [loginMode, setLoginMode] = useState('gmail'); // 'gmail' or 'pin'
  const [email, setEmail] = useState('');

  const handleKeyPress = (num) => {
    if (pin.length < 10) {
      setPin(pin + num);
    }
  };

  const handleClear = () => {
    setPin('');
  };
  
  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmitPin = () => {
    if (pin === '911061234') {
      onLogin({ role: 'admin' });
    } else {
      alert('Xato PIN kod kiritildi');
      setPin('');
    }
  };

  const handleSubmitGmail = (e) => {
    e.preventDefault();
    if (email.includes('@gmail.com')) {
      onLogin({ role: 'user', email });
    } else {
      alert('Iltimos, to\'g\'ri Gmail manzilini kiriting!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="text-accent" style={{marginBottom: '0.5rem'}}>Mittiso</h1>
        
        {loginMode === 'gmail' ? (
          <>
            <h2>Tizimga kirish</h2>
            <p style={{marginBottom: '1.5rem'}}>Gmail orqali kiring</p>
            <form onSubmit={handleSubmitGmail}>
              <div className="form-group" style={{textAlign: 'left'}}>
                <label>Elektron pochta</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="misol@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn mt-2">Kirish</button>
            </form>
            <div style={{marginTop: '2rem'}}>
              <button 
                onClick={() => setLoginMode('pin')} 
                style={{background: 'none', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer'}}
              >
                Admin sifatida kirish
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Admin paneli</h2>
            <p>Admin PIN kodini kiriting</p>
            
            <div style={{margin: '1.5rem 0', fontSize: '1.5rem', letterSpacing: '0.5rem', fontWeight: 'bold', minHeight: '35px', background: 'var(--bg-main)', borderRadius: '8px', padding: '0.5rem'}}>
              {pin.replace(/./g, '*')}
            </div>

            <div className="numpad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button key={num} onClick={() => handleKeyPress(num.toString())}>{num}</button>
              ))}
              <button onClick={handleBackspace} style={{fontSize: '1rem'}}>⌫</button>
              <button onClick={() => handleKeyPress('0')}>0</button>
              <button onClick={handleClear} style={{fontSize: '1rem', color: 'var(--danger-red)'}}>C</button>
            </div>
            
            <button className="btn mt-2" onClick={handleSubmitPin}>Kirish</button>
            
            <div style={{marginTop: '1.5rem'}}>
              <button 
                onClick={() => setLoginMode('gmail')} 
                style={{background: 'none', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer'}}
              >
                Orqaga qaytish
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
