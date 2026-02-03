import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getOrders } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Orders page component for managing customer orders
 * @returns {JSX.Element} Orders page
 */
function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setOrders(getOrders(100));
  }, []);

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

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded capitalize ${
                filter === status 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </Card>

      {/* Orders Table */}
      <Card title={`Orders (${filteredOrders.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Items</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-primary">Total</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                  <td className="py-3 px-4 text-sm">{order.customer}</td>
                  <td className="py-3 px-4 text-sm">{order.date}</td>
                  <td className="py-3 px-4 text-sm">{order.items}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(order.total)}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-primary hover:text-gray-600 mr-2">👁️</button>
                    <button className="text-primary hover:text-gray-600">✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default Orders;
