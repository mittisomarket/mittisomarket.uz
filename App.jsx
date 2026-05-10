import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { initialCustomers, initialProducts, initialSales, initialNews } from './data';

// Components
import Asosiy from './components/Asosiy';
import Mijozlar from './components/Mijozlar';
import Savdolar from './components/Savdolar';
import Statistika from './components/Statistika';
import Mahsulotlar from './components/Mahsulotlar';
import News from './components/News';
import Login from './components/Login';
import Sozlamalar from './components/Sozlamalar';
import Kassa from './components/Kassa';

export default function App() {
  const [tab, setTab] = useState('ASOSIY');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [designStyle, setDesignStyle] = useState(localStorage.getItem('designStyle') || 'minimalist');
  const [layoutStyle, setLayoutStyle] = useState(localStorage.getItem('layoutStyle') || 'default');
  const [lang, setLang] = useState('uz_latn');
  
  // Data States
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom Events for navigation
  useEffect(() => {
    const handleChangeTab = (e) => setTab(e.detail);
    window.addEventListener('changeTab', handleChangeTab);
    return () => window.removeEventListener('changeTab', handleChangeTab);
  }, []);

  // 1. Firebase-dan ma'lumotlarni yuklash (Real-time)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "mittiso_data", "global"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCustomers(data.customers || []);
        setProducts(data.products || []);
        setSales(data.sales || []);
        setExpenses(data.expenses || []);
        setNews(data.news || []);
      } else {
        // Agar baza bo'sh bo'lsa, boshlang'ich ma'lumotlarni yuklash
        setCustomers(initialCustomers);
        setProducts(initialProducts);
        setSales(initialSales);
        setExpenses([]);
        setNews(initialNews);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase Snapshot Error:", error);
      // Xatolik bo'lsa ham local ma'lumotlarni yuklash
      setCustomers(initialCustomers);
      setProducts(initialProducts);
      setSales(initialSales);
      setExpenses([]);
      setNews(initialNews);
      setLoading(false);
    });

    // Fallback: Agar 4 sekund ichida Firebase javob bermasa
    const timer = setTimeout(() => {
      if (loading) {
        setCustomers(initialCustomers);
        setProducts(initialProducts);
        setSales(initialSales);
        setExpenses([]);
        setNews(initialNews);
        setLoading(false);
      }
    }, 4000);

    return () => {
      unsub();
      clearTimeout(timer);
    };
  }, []);

  // 2. Bulutga saqlash funksiyasi
  const saveToCloud = async (c, p, s, e, n) => {
    try {
      await setDoc(doc(db, "mittiso_data", "global"), {
        customers: c,
        products: p,
        sales: s,
        expenses: e,
        news: n
      });
    } catch (e) {
      console.error("Cloud Error:", e);
    }
  };

  // 3. State o'zgarganda bulutga yuborish
  useEffect(() => {
    if (!loading) {
      saveToCloud(customers, products, sales, expenses, news);
    }
  }, [customers, products, sales, expenses, news, loading]);
  
  useEffect(() => {
    document.body.className = `${theme} ${designStyle} layout-${layoutStyle}`;
    localStorage.setItem('theme', theme);
    localStorage.setItem('designStyle', designStyle);
    localStorage.setItem('layoutStyle', layoutStyle);
  }, [theme, designStyle, layoutStyle]);

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Mahsulotni o'chirmoqchimisiz?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  if (!userRole) return <Login onLogin={({role}) => handleLogin(role)} />;
  if (loading) return <div style={{display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', color: 'var(--accent-color)', fontWeight: '800'}}>Yuklanmoqda...</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top">
          <div className="logo">MITTISO</div>
          <div className="user-badge" onClick={handleLogout}>
            {userRole === 'admin' ? 'Diler Ozodjon' : 'Sotuvchi'} 🚪
          </div>
        </div>
      </header>

      <main className="app-content">
        {tab === 'ASOSIY' && <Asosiy products={products} news={news} userRole={userRole} onDelete={handleDeleteProduct} />}
        {tab === 'MIJOZLAR' && <Mijozlar customers={customers} setCustomers={setCustomers} sales={sales} userRole={userRole} />}
        {tab === 'SAVDOLAR' && <Savdolar sales={sales} products={products} customers={customers} onAddSale={(s) => setSales([s, ...sales])} userRole={userRole} />}
        {tab === 'STATISTIKA' && userRole === 'admin' && <Statistika customers={customers} sales={sales} expenses={expenses} />}
        {tab === 'KASSA' && userRole === 'admin' && <Kassa sales={sales} expenses={expenses} setExpenses={setExpenses} />}
        {tab === 'MAHSULOTLAR' && userRole === 'admin' && <Mahsulotlar products={products} setProducts={setProducts} />}
        {tab === 'NEWS' && <News news={news} setNews={setNews} userRole={userRole} />}
        {tab === 'SOZLAMALAR' && (
          <Sozlamalar 
            onLogout={handleLogout} 
            userRole={userRole} 
            theme={theme} 
            setTheme={setTheme}
            designStyle={designStyle}
            setDesignStyle={setDesignStyle}
            layoutStyle={layoutStyle}
            setLayoutStyle={setLayoutStyle}
            lang={lang}
            setLang={setLang}
          />
        )}
      </main>

      <nav className="bottom-nav">
        <div className={`nav-item ${tab === 'ASOSIY' ? 'active' : ''}`} onClick={() => setTab('ASOSIY')}>
          <div className="nav-icon">🏠</div>
          <div className="nav-label">Asosiy</div>
        </div>
        <div className={`nav-item ${tab === 'SAVDOLAR' ? 'active' : ''}`} onClick={() => setTab('SAVDOLAR')}>
          <div className="nav-icon">🛍️</div>
          <div className="nav-label">Savdolar</div>
        </div>
        <div className={`nav-item ${tab === 'MIJOZLAR' ? 'active' : ''}`} onClick={() => setTab('MIJOZLAR')}>
          <div className="nav-icon">👥</div>
          <div className="nav-label">Mijozlar</div>
        </div>
        <div className={`nav-item ${tab === 'NEWS' ? 'active' : ''}`} onClick={() => setTab('NEWS')}>
          <div className="nav-icon">📰</div>
          <div className="nav-label">Yangiliklar</div>
        </div>
        {userRole === 'admin' && (
          <div className={`nav-item ${tab === 'STATISTIKA' ? 'active' : ''}`} onClick={() => setTab('STATISTIKA')}>
            <div className="nav-icon">📊</div>
            <div className="nav-label">Statistika</div>
          </div>
        )}
        {userRole === 'admin' && (
          <div className={`nav-item ${tab === 'KASSA' ? 'active' : ''}`} onClick={() => setTab('KASSA')}>
            <div className="nav-icon">💰</div>
            <div className="nav-label">Kassa</div>
          </div>
        )}
        <div className={`nav-item ${tab === 'SOZLAMALAR' ? 'active' : ''}`} onClick={() => setTab('SOZLAMALAR')}>
          <div className="nav-icon">⚙️</div>
          <div className="nav-label">Menu</div>
        </div>
      </nav>
    </div>
  );
}

