import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getAnalyticsData } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Analytics page component for viewing business metrics and insights
 * @returns {JSX.Element} Analytics page
 */
function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    setAnalyticsData(getAnalyticsData());
  }, []);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <Card title="Revenue & Orders Trend (Last 12 Months)">
        <div className="overflow-x-auto">
          <div className="min-w-[800px] h-64 flex items-end justify-between gap-2 p-4">
            {analyticsData.revenueChart.map((data, index) => {
              const maxRevenue = Math.max(...analyticsData.revenueChart.map(d => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-primary hover:bg-gray-700 transition-colors rounded-t relative group cursor-pointer"
                    style={{ height: `${height}%` }}>
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs">
                      <div>Revenue: {formatCurrency(data.revenue)}</div>
                      <div>Orders: {data.orders}</div>
                    </div>
                  </div>
                  <span className="text-xs mt-2 text-secondary">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Top Products */}
      <Card title="Top Selling Products">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Product</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-primary">Sales</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-primary">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-bold text-primary">#{index + 1}</td>
                  <td className="py-3 px-4 text-sm">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-right">{product.sales}</td>
                  <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(product.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Traffic Sources */}
      <Card title="Traffic Sources">
        <div className="space-y-4">
          {analyticsData.trafficSources.map((source, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">{source.source}</span>
                <span className="text-sm text-secondary">{source.visitors.toLocaleString()} visitors ({source.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(analyticsData.revenueChart.reduce((sum, d) => sum + d.revenue, 0))}
            </p>
            <p className="text-sm text-secondary mt-1">Total Annual Revenue</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-2xl font-bold text-primary">
              {analyticsData.revenueChart.reduce((sum, d) => sum + d.orders, 0).toLocaleString()}
            </p>
            <p className="text-sm text-secondary mt-1">Total Orders</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(
                analyticsData.revenueChart.reduce((sum, d) => sum + d.revenue, 0) /
                analyticsData.revenueChart.reduce((sum, d) => sum + d.orders, 0)
              )}
            </p>
            <p className="text-sm text-secondary mt-1">Average Order Value</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;
