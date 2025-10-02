import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsCharts = () => {
  const riskDistributionData = [
    { name: 'Low Risk', value: 45, count: 1250, color: '#10B981' },
    { name: 'Medium Risk', value: 35, count: 975, color: '#F59E0B' },
    { name: 'High Risk', value: 20, count: 556, color: '#DC2626' }
  ];

  const approvalMetricsData = [
    { month: 'Jan', approved: 85, pending: 12, rejected: 8 },
    { month: 'Feb', approved: 88, pending: 10, rejected: 7 },
    { month: 'Mar', approved: 92, pending: 8, rejected: 5 },
    { month: 'Apr', approved: 89, pending: 11, rejected: 6 },
    { month: 'May', approved: 94, pending: 6, rejected: 4 },
    { month: 'Jun', approved: 91, pending: 9, rejected: 5 }
  ];

  const loanVolumeData = [
    { month: 'Jan', volume: 2.5 },
    { month: 'Feb', volume: 3.2 },
    { month: 'Mar', volume: 4.1 },
    { month: 'Apr', volume: 3.8 },
    { month: 'May', volume: 4.5 },
    { month: 'Jun', volume: 5.2 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
              {entry?.name === 'volume' ? ' Cr' : '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground">{data?.name}</p>
          <p className="text-sm text-text-secondary">
            {data?.count} beneficiaries ({data?.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Risk Distribution Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Risk Distribution</h3>
            <p className="text-sm text-text-secondary">Current portfolio risk breakdown</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
        </div>
        
        <div className="h-64" aria-label="Risk Distribution Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {riskDistributionData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          {riskDistributionData?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm text-text-secondary">{item?.name}</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {item?.count} ({item?.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Approval Metrics Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Approval Metrics</h3>
            <p className="text-sm text-text-secondary">Monthly approval rates</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="BarChart3" size={20} className="text-success" />
          </div>
        </div>
        
        <div className="h-64" aria-label="Monthly Approval Metrics Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={approvalMetricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="approved" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" fill="var(--color-warning)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="rejected" fill="var(--color-error)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-text-secondary">Approved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm text-text-secondary">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-sm text-text-secondary">Rejected</span>
          </div>
        </div>
      </div>
      {/* Loan Volume Trend */}
      <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Loan Volume Trend</h3>
            <p className="text-sm text-text-secondary">Monthly disbursement volume in Crores</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="TrendingUp" size={20} className="text-accent" />
          </div>
        </div>
        
        <div className="h-64" aria-label="Monthly Loan Volume Line Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={loanVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="var(--color-accent)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;