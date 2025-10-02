import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, description }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-md transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        {description && (
          <p className="text-xs text-text-secondary">{description}</p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;