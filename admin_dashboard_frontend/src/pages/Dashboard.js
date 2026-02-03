import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import { getDashboardStats, getOrders } from '../services/mockData';
import { DollarSign, Package, Users, Tag, Plus, ClipboardList, Ticket } from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Dashboard page component showing overview statistics and recent activity
 * @returns {JSX.Element} Dashboard page
 */
function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Load dashboard data
    setStats(getDashboardStats());
    setRecentOrders(getOrders(5));
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'text-success bg-green-100',
      processing: 'text-blue-600 bg-blue-100',
      shipped: 'text-purple-600 bg-purple-100',
      pending: 'text-yellow-600 bg-yellow-100',
      cancelled: 'text-error bg-red-100',
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          growth={stats.revenueGrowth}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          icon={Package}
          growth={stats.ordersGrowth}
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          icon={Users}
          growth={stats.customersGrowth}
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts.toLocaleString()}
          icon={Tag}
          growth={stats.productsGrowth}
        />
      </div>

      {/* Recent Orders */}
      <Card title="Recent Orders">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-primary">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{order.id}</td>
                  <td className="py-3 px-4 text-sm">{order.customer}</td>
                  <td className="py-3 px-4 text-sm">{order.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gray-100 rounded-full">
                <Plus size={32} className="text-primary" />
              </div>
            </div>
            <h4 className="font-semibold text-primary mb-2">Add New Product</h4>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
              Create Product
            </button>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gray-100 rounded-full">
                <ClipboardList size={32} className="text-primary" />
              </div>
            </div>
            <h4 className="font-semibold text-primary mb-2">Manage Orders</h4>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
              View All Orders
            </button>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gray-100 rounded-full">
                <Ticket size={32} className="text-primary" />
              </div>
            </div>
            <h4 className="font-semibold text-primary mb-2">Create Discount</h4>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
              New Discount
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
