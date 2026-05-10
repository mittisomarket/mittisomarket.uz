import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Asosiy from './components/Asosiy';
import Mijozlar from './components/Mijozlar';
import Savdolar from './components/Savdolar';
import Mahsulotlar from './components/Mahsulotlar';
import Fikrlar from './components/Fikrlar';
import Sozlamalar from './components/Sozlamalar';
import Kassa from './components/Kassa';
import Statistika from './components/Statistika';
import News from './components/News';
import { initialCustomers, initialProducts, initialSales, initialNews } from './data';

function App() {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole')); 
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [designStyle, setDesignStyle] = useState(() => localStorage.getItem('designStyle') || 'minimalist');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'uz_latn');
  
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('sales');
    return saved ? JSON.parse(saved) : initialSales;
  });
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('news');
    return saved ? JSON.parse(saved) : initialNews;
  });
  
  const [tab, setTab] = useState('ASOSIY');

  useEffect(() => {
    document.body.className = `${theme} ${designStyle}`;
    localStorage.setItem('theme', theme);
    localStorage.setItem('designStyle', designStyle);
    localStorage.setItem('lang', lang);
    if (userRole) localStorage.setItem('userRole', userRole);
    else localStorage.removeItem('userRole');
  }, [theme, designStyle, lang, userRole]);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('sales', JSON.stringify(sales));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('news', JSON.stringify(news));
  }, [customers, products, sales, expenses, news]);

  useEffect(() => {
    const handleChangeTab = (e) => setTab(e.detail);
    const handleEditProduct = (e) => {
      setTab('MAHSULOTLAR');
      // We will need to signal Mahsulotlar to enter edit mode
      // For now, let's just switch the tab
    };
    
    window.addEventListener('changeTab', handleChangeTab);
    window.addEventListener('editProduct', handleEditProduct);
    return () => {
      window.removeEventListener('changeTab', handleChangeTab);
      window.removeEventListener('editProduct', handleEditProduct);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const t = {
    uz_latn: { stat: "Statistika", main: "Asosiy", prod: "Mahsulotlar", cust: "Mijozlar", cash: "Kassa", sales: "Savdolar", feed: "Takliflar", set: "Sozlamalar", dealer: "Ish boshqaruvchi diler", tel: "Tel", news: "Yangiliklar" },
    uz_cyrl: { stat: "Статистика", main: "Асосий", prod: "Маҳсулотлар", cust: "Мижозлар", cash: "Касса", sales: "Савдолар", feed: "Таклифлар", set: "Созламалар", dealer: "Иш бошқарувчи дилер", tel: "Тел" },
    en: { stat: "Statistics", main: "Home", prod: "Products", cust: "Customers", cash: "Cashier", sales: "Sales", feed: "Feedback", set: "Settings", dealer: "Managing Dealer", tel: "Phone" }
  };
  const texts = t[lang] || t['uz_latn'];

  const handleAddSale = (newSale) => {
    setSales([newSale, ...sales]);
    // Also deduct product stock
    setProducts(products.map(p => {
      if (p.id === newSale.productId) {
        return { ...p, qoldiq: Math.max(0, p.qoldiq - newSale.quantity) };
      }
      return p;
    }));
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Rostdan ham ushbu mahsulotni o'chirmoqchimisiz?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  if (!userRole) {
    return <Login onLogin={({ role }) => setUserRole(role)} />;
  }

  return (
    <>
      <div className="header" style={{flexDirection: 'column', alignItems: 'stretch'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <div style={{width: '32px', height: '32px', background: 'var(--accent-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold'}}>M</div>
            <h1 className="text-accent" style={{margin: 0, textAlign: 'left', fontSize: '1.2rem'}}>Mittiso</h1>
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {userRole === 'admin' && (
              <div className="h-avatar">O</div>
            )}
          </div>
        </div>
        
        {userRole === 'admin' && (
          <div className="header-badges">
            <div className="h-badge">
              💬 SMS: 25/25 <button className="h-badge-btn">+</button>
            </div>
            <div className="h-badge-fill">
              💳 0 UZS <button className="h-badge-btn">+</button>
            </div>
            <button className="h-icon-btn" style={{position: 'relative'}} onClick={() => setTab('TAKLIFLAR')}>
              🔔
              <span style={{position: 'absolute', top: '0px', right: '0px', width: '10px', height: '10px', background: 'var(--danger-red)', borderRadius: '50%', border: '2px solid var(--nav-bg)'}}></span>
            </button>
            <button className="h-icon-btn">🌐</button>
          </div>
        )}

        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-green)', fontSize: '0.8rem'}}>
          <strong>{texts.dealer}:</strong> Boboxonov Ozodjon <br/>
          <strong>{texts.tel}:</strong> +998 99 911 04 92
        </div>
      </div>

      <div className="top-nav">
        {userRole === 'admin' && (
          <div className={`nav-item ${tab === 'STATISTIKA' ? 'active' : ''}`} onClick={() => setTab('STATISTIKA')}>
            {texts.stat}
          </div>
        )}
        <div className={`nav-item ${tab === 'ASOSIY' ? 'active' : ''}`} onClick={() => setTab('ASOSIY')}>
          {texts.main}
        </div>
        {userRole === 'admin' && (
          <div className={`nav-item ${tab === 'MAHSULOTLAR' ? 'active' : ''}`} onClick={() => setTab('MAHSULOTLAR')}>
            {texts.prod}
          </div>
        )}
        <div className={`nav-item ${tab === 'MIJOZLAR' ? 'active' : ''}`} onClick={() => setTab('MIJOZLAR')}>
          {texts.cust}
        </div>
        {userRole === 'admin' && (
          <div className={`nav-item ${tab === 'KASSA' ? 'active' : ''}`} onClick={() => setTab('KASSA')}>
            {texts.cash}
          </div>
        )}
        <div className={`nav-item ${tab === 'SAVDOLAR' ? 'active' : ''}`} onClick={() => setTab('SAVDOLAR')}>
          {texts.sales}
        </div>
        <div className={`nav-item ${tab === 'TAKLIFLAR' ? 'active' : ''}`} onClick={() => setTab('TAKLIFLAR')}>
          {texts.feed}
        </div>
        <div className={`nav-item ${tab === 'YANGILIKLAR' ? 'active' : ''}`} onClick={() => setTab('YANGILIKLAR')}>
          {texts.news}
        </div>
        <div className={`nav-item ${tab === 'SOZLAMALAR' ? 'active' : ''}`} onClick={() => setTab('SOZLAMALAR')}>
          {texts.set}
        </div>
      </div>

      <div style={{paddingBottom: '2rem'}}>
        {tab === 'STATISTIKA' && userRole === 'admin' && (
          <Statistika customers={customers} sales={sales} expenses={expenses} />
        )}

        {tab === 'ASOSIY' && (
          <Asosiy products={products} userRole={userRole} onDelete={handleDeleteProduct} />
        )}

        {tab === 'MAHSULOTLAR' && userRole === 'admin' && (
          <Mahsulotlar products={products} setProducts={setProducts} />
        )}

        {tab === 'MIJOZLAR' && userRole === 'admin' && (
          <Mijozlar customers={customers} setCustomers={setCustomers} sales={sales} userRole={userRole} />
        )}

        {tab === 'KASSA' && userRole === 'admin' && (
          <Kassa sales={sales} expenses={expenses} setExpenses={setExpenses} />
        )}

        {tab === 'SAVDOLAR' && (
          <Savdolar sales={sales} products={products} customers={customers} onAddSale={handleAddSale} userRole={userRole} />
        )}

        {tab === 'TAKLIFLAR' && (
          <Fikrlar userRole={userRole} />
        )}

        {tab === 'YANGILIKLAR' && (
          <News news={news} setNews={setNews} userRole={userRole} />
        )}

        {tab === 'SOZLAMALAR' && (
          <Sozlamalar 
            userRole={userRole} 
            theme={theme} 
            toggleTheme={toggleTheme} 
            designStyle={designStyle}
            setDesignStyle={setDesignStyle}
            lang={lang}
            setLang={setLang}
            onLogout={() => setUserRole(null)} 
          />
        )}
      </div>
    </>
  );
}

export default App;

