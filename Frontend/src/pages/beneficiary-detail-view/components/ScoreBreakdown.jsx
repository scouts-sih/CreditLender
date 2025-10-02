import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ScoreBreakdown = ({ scoreData }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-success';
    if (score >= 650) return 'text-warning';
    return 'text-error';
  };

  const getProgressColor = (score) => {
    if (score >= 75) return 'bg-success';
    if (score >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const pieColors = ['#10B981', '#F59E0B', '#DC2626', '#6B7280'];

  const factorData = [
    { name: 'Repayment History', value: scoreData?.repaymentHistory, weight: 35 },
    { name: 'Utility Data', value: scoreData?.utilityData, weight: 30 },
    { name: 'Recharge Patterns', value: scoreData?.rechargeData, weight: 25 },
    { name: 'Income Stability', value: scoreData?.incomeStability, weight: 10 }
  ];

  const monthlyTrendData = [
    { month: 'Jan', score: 680 },
    { month: 'Feb', score: 695 },
    { month: 'Mar', score: 710 },
    { month: 'Apr', score: 725 },
    { month: 'May', score: 740 },
    { month: 'Jun', score: scoreData?.compositeScore }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 45, color: '#10B981' },
    { name: 'Medium Risk', value: 35, color: '#F59E0B' },
    { name: 'High Risk', value: 15, color: '#DC2626' },
    { name: 'Unknown', value: 5, color: '#6B7280' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Credit Score Analysis
        </h3>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(scoreData?.compositeScore)}`}>
              {scoreData?.compositeScore}
            </div>
            <div className="text-sm text-text-secondary">Composite Score</div>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(scoreData?.compositeScore / 850) * 175.93} 175.93`}
                className={getScoreColor(scoreData?.compositeScore)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-text-primary">
                {Math.round((scoreData?.compositeScore / 850) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Score Factors */}
      <div className="space-y-4 mb-8">
        <h4 className="text-md font-medium text-text-primary">Contributing Factors</h4>
        {factorData?.map((factor, index) => (
          <div key={factor?.name} className="space-y-2">
            <div 
              className="flex items-center justify-between cursor-pointer hover:bg-muted p-2 rounded-lg transition-smooth"
              onClick={() => toggleSection(factor?.name)}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={expandedSection === factor?.name ? "ChevronDown" : "ChevronRight"} 
                  size={16} 
                  className="text-text-secondary" 
                />
                <span className="text-sm font-medium text-text-primary">
                  {factor?.name}
                </span>
                <span className="text-xs text-text-secondary">
                  ({factor?.weight}% weight)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProgressColor(factor?.value)} transition-all duration-300`}
                    style={{ width: `${factor?.value}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-text-primary w-8">
                  {factor?.value}
                </span>
              </div>
            </div>

            {expandedSection === factor?.name && (
              <div className="ml-6 p-4 bg-muted rounded-lg">
                <div className="space-y-3">
                  {factor?.name === 'Repayment History' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">On-time payments:</span>
                        <span className="text-text-primary">92%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Late payments:</span>
                        <span className="text-text-primary">8%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Defaults:</span>
                        <span className="text-text-primary">0%</span>
                      </div>
                    </div>
                  )}
                  {factor?.name === 'Utility Data' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Regular payments:</span>
                        <span className="text-text-primary">95%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Average monthly bill:</span>
                        <span className="text-text-primary">₹2,450</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Payment consistency:</span>
                        <span className="text-text-primary">High</span>
                      </div>
                    </div>
                  )}
                  {factor?.name === 'Recharge Patterns' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Monthly recharge:</span>
                        <span className="text-text-primary">₹599</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Recharge frequency:</span>
                        <span className="text-text-primary">Regular</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Plan consistency:</span>
                        <span className="text-text-primary">Stable</span>
                      </div>
                    </div>
                  )}
                  {factor?.name === 'Income Stability' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Income variance:</span>
                        <span className="text-text-primary">Low</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Employment type:</span>
                        <span className="text-text-primary">Salaried</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Tenure:</span>
                        <span className="text-text-primary">3.5 years</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend Chart */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-text-primary">Score Trend (6 Months)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <YAxis 
                  domain={[600, 800]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="score" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-text-primary">Risk Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {riskDistribution?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-xs text-text-secondary">
                  {item?.name}: {item?.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Confidence Level */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-text-primary">
              Confidence Level
            </h4>
            <p className="text-xs text-text-secondary">
              Based on data quality and completeness
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-success transition-all duration-300"
                style={{ width: `${scoreData?.confidenceLevel}%` }}
              />
            </div>
            <span className="text-sm font-medium text-text-primary">
              {scoreData?.confidenceLevel}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;