import React, { useState, useMemo, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const PaymentBehaviorChart = ({ paymentData = [] }) => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6months');

  // Ensure paymentData is always an array with fallback data
  const safePaymentData = useMemo(() => {
    if (!Array.isArray(paymentData) || paymentData?.length === 0) {
      return [
        { month: 'Jan', onTimePayments: 0, latePayments: 0, totalPayments: 0, averageAmount: 0 },
        { month: 'Feb', onTimePayments: 0, latePayments: 0, totalPayments: 0, averageAmount: 0 },
        { month: 'Mar', onTimePayments: 0, latePayments: 0, totalPayments: 0, averageAmount: 0 },
        { month: 'Apr', onTimePayments: 0, latePayments: 0, totalPayments: 0, averageAmount: 0 },
        { month: 'May', onTimePayments: 0, latePayments: 0, totalPayments: 0, averageAmount: 0 },
        { month: 'Jun', onTimePayments: 0, latePayments: 0, totalPayments: 0, averageAmount: 0 }
      ];
    }
    
    // Ensure each item has all required fields with defaults
    return paymentData?.map(item => ({
      month: item?.month || 'N/A',
      onTimePayments: Number(item?.onTimePayments || 0),
      latePayments: Number(item?.latePayments || 0),
      totalPayments: Number(item?.totalPayments || (Number(item?.onTimePayments || 0) + Number(item?.latePayments || 0))),
      averageAmount: Number(item?.averageAmount || 0)
    }));
  }, [paymentData]);

  const getChartData = useCallback(() => {
    if (!Array.isArray(safePaymentData) || safePaymentData?.length === 0) {
      return [];
    }

    try {
      switch (timeRange) {
        case '3months':
          return safePaymentData?.slice(-3) || [];
        case '6months':
          return safePaymentData?.slice(-6) || [];
        case '12months':
          return safePaymentData || [];
        default:
          return safePaymentData?.slice(-6) || [];
      }
    } catch (error) {
      console.error('Error in getChartData:', error);
      return [];
    }
  }, [safePaymentData, timeRange]);

  const chartData = useMemo(() => {
    try {
      const data = getChartData();
      // Validate each data point before returning
      return data?.map(item => ({
        ...item,
        onTimePayments: Number(item?.onTimePayments) || 0,
        latePayments: Number(item?.latePayments) || 0,
        totalPayments: Number(item?.totalPayments) || 0,
        averageAmount: Number(item?.averageAmount) || 0
      })) || [];
    } catch (error) {
      console.error('Error processing chart data:', error);
      return [];
    }
  }, [getChartData]);

  const calculateStats = useCallback(() => {
    if (!Array.isArray(chartData) || chartData?.length === 0) {
      return {
        onTimeRate: 0,
        avgAmount: 0,
        totalPayments: 0
      };
    }

    try {
      const onTimePayments = chartData?.reduce((sum, month) => {
        const value = Number(month?.onTimePayments || 0);
        return sum + (isNaN(value) ? 0 : value);
      }, 0) || 0;
      
      const totalPayments = chartData?.reduce((sum, month) => {
        const value = Number(month?.totalPayments || 0);
        return sum + (isNaN(value) ? 0 : value);
      }, 0) || 0;
      
      const avgAmount = chartData?.length > 0 ? 
        (chartData?.reduce((sum, month) => {
          const value = Number(month?.averageAmount || 0);
          return sum + (isNaN(value) ? 0 : value);
        }, 0) || 0) / chartData?.length : 0;
      
      const onTimeRate = totalPayments > 0 ? Math.round((onTimePayments / totalPayments) * 100) : 0;
      
      return {
        onTimeRate: isNaN(onTimeRate) ? 0 : onTimeRate,
        avgAmount: isNaN(avgAmount) ? 0 : Math.round(avgAmount),
        totalPayments: isNaN(totalPayments) ? 0 : totalPayments
      };
    } catch (error) {
      console.error('Error calculating payment stats:', error);
      return {
        onTimeRate: 0,
        avgAmount: 0,
        totalPayments: 0
      };
    }
  }, [chartData]);

  const stats = useMemo(() => calculateStats(), [calculateStats]);

  const getOnTimeRateColor = useCallback((rate) => {
    const safeRate = Number(rate) || 0;
    if (safeRate >= 90) return 'text-success';
    if (safeRate >= 70) return 'text-warning';
    return 'text-error';
  }, []);

  const hasValidData = useMemo(() => {
    return Array.isArray(chartData) && chartData?.length > 0 && 
      chartData?.some(item => (Number(item?.onTimePayments) || 0) > 0 || (Number(item?.latePayments) || 0) > 0);
  }, [chartData]);

  const handleChartTypeChange = useCallback((newType) => {
    setChartType(newType);
  }, []);

  const handleTimeRangeChange = useCallback((e) => {
    const value = e?.target?.value;
    if (value) {
      setTimeRange(value);
    }
  }, []);

  const tooltipFormatter = useCallback((value, name) => {
    const safeValue = Number(value) || 0;
    if (name === 'onTimePayments' || name === 'latePayments') {
      return [`${safeValue} payments`, name === 'onTimePayments' ? 'On-Time' : 'Late'];
    }
    return [`₹${safeValue?.toLocaleString('en-IN')}`, 'Average Amount'];
  }, []);

  const areaTooltipFormatter = useCallback((value, name) => [
    `${Number(value) || 0} payments`,
    name === 'onTimePayments' ? 'On-Time' : 'Late'
  ], []);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Payment Behavior Analysis
        </h3>
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Period:</span>
            <select
              value={timeRange}
              onChange={handleTimeRangeChange}
              className="text-sm border border-border rounded-md px-2 py-1 bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="12months">12 Months</option>
            </select>
          </div>
          
          {/* Chart Type Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => handleChartTypeChange('line')}
              className={`p-2 rounded-md transition-smooth ${
                chartType === 'line' ? 'bg-background text-primary shadow-sm' : 'text-text-secondary hover:text-primary'
              }`}
              title="Line Chart"
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => handleChartTypeChange('area')}
              className={`p-2 rounded-md transition-smooth ${
                chartType === 'area' ? 'bg-background text-primary shadow-sm' : 'text-text-secondary hover:text-primary'
              }`}
              title="Area Chart"
            >
              <Icon name="BarChart3" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-text-primary">
              On-Time Rate
            </span>
          </div>
          <div className={`text-2xl font-bold ${getOnTimeRateColor(stats?.onTimeRate)}`}>
            {stats?.onTimeRate || 0}%
          </div>
          <div className="text-xs text-text-secondary">
            {chartData?.length || 0} month average
          </div>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="IndianRupee" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">
              Avg Payment
            </span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            ₹{(stats?.avgAmount || 0)?.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-text-secondary">
            Monthly average
          </div>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">
              Total Payments
            </span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            {stats?.totalPayments || 0}
          </div>
          <div className="text-xs text-text-secondary">
            In selected period
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
        {!hasValidData ? (
          <div className="flex items-center justify-center h-full bg-muted rounded-lg">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary text-lg font-medium mb-2">No Payment Data Available</p>
              <p className="text-text-secondary text-sm">
                Payment behavior data will appear here once transactions are recorded
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData} key={`line-${chartData?.length}-${timeRange}`}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
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
                  formatter={tooltipFormatter}
                />
                <Line 
                  type="monotone" 
                  dataKey="onTimePayments" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="latePayments" 
                  stroke="#DC2626" 
                  strokeWidth={2}
                  dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#DC2626', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="averageAmount" 
                  stroke="#1E40AF" 
                  strokeWidth={2}
                  dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
                  yAxisId="right"
                />
              </LineChart>
            ) : (
              <AreaChart data={chartData} key={`area-${chartData?.length}-${timeRange}`}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <YAxis 
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
                  formatter={areaTooltipFormatter}
                />
                <Area
                  type="monotone"
                  dataKey="onTimePayments"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="latePayments"
                  stackId="1"
                  stroke="#DC2626"
                  fill="#DC2626"
                  fillOpacity={0.6}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      {/* Payment Pattern Insights */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-text-primary">Payment Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">
                Payment Consistency
              </span>
            </div>
            <div className="text-sm text-text-secondary">
              {!hasValidData ? 'No payment history available for analysis' :
               (stats?.onTimeRate || 0) >= 90 ? 'Excellent payment consistency with minimal delays' :
               (stats?.onTimeRate || 0) >= 70 ? 'Good payment behavior with occasional delays': 'Irregular payment pattern requiring attention'}
            </div>
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">
                Payment Trend
              </span>
            </div>
            <div className="text-sm text-text-secondary">
              {!hasValidData ? 'Payment trends will be available with sufficient data' :
               Array.isArray(chartData) && chartData?.length >= 3 && 
               (Number(chartData?.[chartData?.length - 1]?.onTimePayments) || 0) > (Number(chartData?.[chartData?.length - 3]?.onTimePayments) || 0) ?
               'Improving payment behavior over recent months' : 'Stable payment pattern with consistent behavior'}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-sm text-text-secondary">On-Time Payments</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded-full"></div>
          <span className="text-sm text-text-secondary">Late Payments</span>
        </div>
        {chartType === 'line' && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary">Average Amount</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentBehaviorChart;