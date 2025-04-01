import React from 'react';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      icon: 'location_on',
      label: 'Share Location',
      action: () => window.open('https://maps.google.com/?q=123+Coffee+Lane+Brew+City+CA+90210', '_blank')
    },
    {
      icon: 'phone',
      label: 'Call Us',
      action: () => window.location.href = 'tel:+15551234567'
    },
    {
      icon: 'language',
      label: 'Visit Website',
      action: () => window.open('https://www.aromabeanscoffee.com', '_blank')
    },
    {
      icon: 'menu_book',
      label: 'View Menu',
      action: () => onActionClick('menu')
    },
    {
      icon: 'schedule',
      label: 'Business Hours',
      action: () => onActionClick('hours')
    }
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <button 
          key={index}
          className="quick-action-btn"
          onClick={action.action}
        >
          <span className="material-symbols-rounded">{action.icon}</span>
          <span className="action-label">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions; 