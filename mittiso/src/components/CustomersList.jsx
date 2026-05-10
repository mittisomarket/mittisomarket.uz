import React from 'react';

export default function CustomersList({ customers, sales, onSelectCustomer }) {
  
  const getCustomerTotals = (customerId) => {
    const customerSales = sales.filter(s => s.customerId === customerId);
    let totalDebt = 0;
    let totalPaid = 0;
    
    customerSales.forEach(sale => {
      if (sale.status === 'Qarz') totalDebt += sale.total;
      if (sale.status === 'To\'landi') totalPaid += sale.total;
    });
    
    return { totalDebt, totalPaid };
  };

  return (
    <div>
      <div className="list-header">
        <span style={{background: 'var(--bg-card)', padding: '0.2rem 1rem', borderRadius: '12px', fontSize: '0.8rem', border: '1px solid var(--border-color)'}}>
          Barcha mijozlar
        </span>
      </div>
      {customers.map(customer => {
        const { totalDebt, totalPaid } = getCustomerTotals(customer.id);
        const hasDebt = totalDebt > 0;
        
        return (
          <div key={customer.id} className="list-item" onClick={() => onSelectCustomer(customer)} style={{cursor: 'pointer'}}>
            <div className="list-item-avatar">
              {customer.name.charAt(0)}
            </div>
            <div className="list-item-info">
              <div className="list-item-title">{customer.name}</div>
              <div className="list-item-subtitle">{customer.phone}</div>
            </div>
            <div className={`list-item-value ${hasDebt ? 'text-red' : 'text-green'}`}>
              {hasDebt ? `Qarz: -${totalDebt.toLocaleString()} UZS` : 'Qarzi yo\'q'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
