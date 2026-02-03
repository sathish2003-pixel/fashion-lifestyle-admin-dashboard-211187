import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { getAnalyticsData } from '../services/mockData';
import { TrendingUp, Package, DollarSign, Activity } from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Analytics page component for viewing business metrics and insights with comprehensive charts
 * @returns {JSX.Element} Analytics page
 */
function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    setAnalyticsData(getAnalyticsData());
  }, []);

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Activity className="animate-spin mx-auto mb-4 text-primary dark:text-white" size={48} />
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Calculate totals
  const totalRevenue = analyticsData.revenueChart.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = analyticsData.revenueChart.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  // Prepare data for category pie chart (from top products)
  const categoryData = analyticsData.topProducts.map((product, index) => ({
    name: product.name,
    value: product.sales,
  }));

  const categoryColors = ['#111827', '#16A34A', '#6B7280', '#10B981', '#059669'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary/10 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary dark:text-white mb-2">Analytics Dashboard</h1>
            <p className="text-secondary dark:text-gray-400">Comprehensive insights into your business performance</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-secondary dark:text-gray-400">Period</p>
              <p className="text-lg font-semibold text-primary dark:text-white">Last 12 Months</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-primary/10 dark:bg-gray-700 rounded-full">
                <TrendingUp size={32} className="text-primary dark:text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary dark:text-white">
              {formatCurrency(totalRevenue)}
            </p>
            <p className="text-sm text-secondary dark:text-gray-400 mt-1">Total Annual Revenue</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-primary/10 dark:bg-gray-700 rounded-full">
                <Package size={32} className="text-primary dark:text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary dark:text-white">
              {formatNumber(totalOrders)}
            </p>
            <p className="text-sm text-secondary dark:text-gray-400 mt-1">Total Orders</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-primary/10 dark:bg-gray-700 rounded-full">
                <DollarSign size={32} className="text-primary dark:text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary dark:text-white">
              {formatCurrency(avgOrderValue)}
            </p>
            <p className="text-sm text-secondary dark:text-gray-400 mt-1">Average Order Value</p>
          </div>
        </Card>
      </div>

      {/* Revenue & Orders Trend - Line Chart */}
      <Card title="Revenue & Orders Trend (Last 12 Months)">
        <LineChart
          data={analyticsData.revenueChart}
          xAxisKey="month"
          lines={[
            { dataKey: 'revenue', color: '#111827', name: 'Revenue ($)' },
            { dataKey: 'orders', color: '#16A34A', name: 'Orders' }
          ]}
          formatter={(value, dataKey) => {
            if (dataKey === 'revenue') {
              return formatCurrency(value);
            }
            return value;
          }}
        />
      </Card>

      {/* Monthly Comparison - Bar Chart */}
      <Card title="Monthly Revenue Comparison">
        <BarChart
          data={analyticsData.revenueChart}
          xAxisKey="month"
          bars={[
            { dataKey: 'revenue', color: '#111827', name: 'Revenue' }
          ]}
          formatter={(value) => formatCurrency(value)}
        />
      </Card>

      {/* Top Products and Sales Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Performance - Bar Chart */}
        <Card title="Top Products Performance">
          <BarChart
            data={analyticsData.topProducts}
            xAxisKey="name"
            bars={[
              { dataKey: 'sales', color: '#16A34A', name: 'Units Sold' }
            ]}
            formatter={(value) => formatNumber(value)}
          />
        </Card>

        {/* Sales Distribution - Pie Chart */}
        <Card title="Product Sales Distribution">
          <PieChart
            data={categoryData}
            dataKey="value"
            nameKey="name"
            colors={categoryColors}
            formatter={(value) => `${formatNumber(value)} units`}
          />
        </Card>
      </div>

      {/* Top Selling Products Table */}
      <Card title="Top Selling Products Details">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary dark:text-white">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary dark:text-white">Product</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-primary dark:text-white">Sales</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-primary dark:text-white">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4 text-sm font-bold text-primary dark:text-white">#{index + 1}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-700 dark:text-gray-300">{product.sales}</td>
                  <td className="py-3 px-4 text-sm text-right font-medium text-primary dark:text-white">{formatCurrency(product.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Traffic Sources */}
      <Card title="Traffic Sources Analysis">
        <div className="space-y-4">
          {analyticsData.trafficSources.map((source, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary dark:text-white">{source.source}</span>
                <span className="text-sm text-secondary dark:text-gray-400">{source.visitors.toLocaleString()} visitors ({source.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary dark:bg-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Analytics;
