import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import { getDashboardStats, getOrders, getInventoryAlerts } from '../services/mockData';
import { 
  DollarSign, 
  Package, 
  Users, 
  Tag, 
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Enhanced Dashboard page component showing comprehensive overview statistics and recent activity
 * @returns {JSX.Element} Dashboard page
 */
function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [inventoryAlerts, setInventoryAlerts] = useState([]);

  useEffect(() => {
    // Load dashboard data
    setStats(getDashboardStats());
    setRecentOrders(getOrders(5));
    setInventoryAlerts(getInventoryAlerts());
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Activity className="animate-spin mx-auto mb-4 text-primary dark:text-white" size={48} />
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
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

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'text-success bg-green-100 dark:bg-green-900/30',
      processing: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
      shipped: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
      pending: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400',
      cancelled: 'text-error bg-red-100 dark:bg-red-900/30',
    };
    return colors[status] || 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
  };

  // Calculate additional metrics
  const averageOrderValue = stats.totalRevenue / stats.totalOrders;
  const pendingOrders = recentOrders.filter(o => o.status === 'pending').length;
  const processingOrders = recentOrders.filter(o => o.status === 'processing').length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary dark:text-white mb-2">Welcome back, Admin!</h1>
            <p className="text-secondary dark:text-gray-400">Here's what's happening with your store today.</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-secondary dark:text-gray-400">Today's Date</p>
              <p className="text-lg font-semibold text-primary dark:text-white">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div>
        <h2 className="text-xl font-bold text-primary dark:text-white mb-4">Key Performance Indicators</h2>
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
      </div>

      {/* Secondary Metrics */}
      <div>
        <h2 className="text-xl font-bold text-primary dark:text-white mb-4">Additional Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary dark:text-gray-400 mb-1">Average Order Value</p>
                <p className="text-2xl font-bold text-primary dark:text-white">{formatCurrency(averageOrderValue)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <TrendingUp size={28} className="text-primary dark:text-white" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary dark:text-gray-400 mb-1">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingOrders}</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <Clock size={28} className="text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary dark:text-gray-400 mb-1">Processing Orders</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{processingOrders}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <ShoppingCart size={28} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Inventory Alerts */}
      {inventoryAlerts.length > 0 && (
        <Card>
          <div className="flex items-center mb-4">
            <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-400 mr-2" />
            <h3 className="text-lg font-semibold text-primary dark:text-white">Inventory Alerts</h3>
            <span className="ml-auto bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-medium">
              {inventoryAlerts.length} Alert{inventoryAlerts.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="space-y-3">
            {inventoryAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                    <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-primary dark:text-white">{alert.name}</p>
                    <p className="text-sm text-secondary dark:text-gray-400">
                      Current stock: <span className="font-semibold text-error">{alert.stock}</span> | 
                      Reorder point: {alert.reorderPoint}
                    </p>
                  </div>
                </div>
                <button className="bg-primary dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                  Reorder Now
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Orders and Order Status Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card title="Recent Orders">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-primary dark:text-white">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-primary dark:text-white">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-primary dark:text-white">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-primary dark:text-white">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-primary dark:text-white">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-primary dark:text-white">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{order.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-primary dark:text-white">{formatCurrency(order.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="text-primary dark:text-white hover:underline text-sm font-medium">
                View All Orders →
              </button>
            </div>
          </Card>
        </div>

        {/* Order Status Summary */}
        <div>
          <Card title="Order Status Summary">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-success" />
                  <div>
                    <p className="text-sm text-secondary dark:text-gray-400">Delivered</p>
                    <p className="text-xl font-bold text-success">124</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="flex items-center space-x-3">
                  <Package size={24} className="text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-secondary dark:text-gray-400">Shipped</p>
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">45</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex items-center space-x-3">
                  <ShoppingCart size={24} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-secondary dark:text-gray-400">Processing</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">32</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <div className="flex items-center space-x-3">
                  <Clock size={24} className="text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <p className="text-sm text-secondary dark:text-gray-400">Pending</p>
                    <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">18</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                <div className="flex items-center space-x-3">
                  <XCircle size={24} className="text-error" />
                  <div>
                    <p className="text-sm text-secondary dark:text-gray-400">Cancelled</p>
                    <p className="text-xl font-bold text-error">7</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-primary dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 dark:bg-gray-700 rounded-full">
                  <Tag size={32} className="text-primary dark:text-white" />
                </div>
              </div>
              <h4 className="font-semibold text-primary dark:text-white mb-2 text-lg">Add New Product</h4>
              <p className="text-sm text-secondary dark:text-gray-400 mb-4">Expand your product catalog</p>
              <button className="bg-primary dark:bg-gray-700 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium w-full">
                Create Product
              </button>
            </div>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 dark:bg-gray-700 rounded-full">
                  <Package size={32} className="text-primary dark:text-white" />
                </div>
              </div>
              <h4 className="font-semibold text-primary dark:text-white mb-2 text-lg">Manage Orders</h4>
              <p className="text-sm text-secondary dark:text-gray-400 mb-4">Process and track orders</p>
              <button className="bg-primary dark:bg-gray-700 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium w-full">
                View All Orders
              </button>
            </div>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 dark:bg-gray-700 rounded-full">
                  <TrendingUp size={32} className="text-primary dark:text-white" />
                </div>
              </div>
              <h4 className="font-semibold text-primary dark:text-white mb-2 text-lg">View Analytics</h4>
              <p className="text-sm text-secondary dark:text-gray-400 mb-4">Insights and performance data</p>
              <button className="bg-primary dark:bg-gray-700 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium w-full">
                Go to Analytics
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
