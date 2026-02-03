import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getCustomers } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Customers page component for managing customer relationships
 * @returns {JSX.Element} Customers page
 */
function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCustomers(getCustomers());
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'text-success bg-green-100',
      vip: 'text-purple-600 bg-purple-100',
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <input
          type="text"
          placeholder="Search customers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </Card>

      {/* Customers Table */}
      <Card title={`Customers (${filteredCustomers.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Customer ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Orders</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Total Spent</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Join Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{customer.id}</td>
                  <td className="py-3 px-4 text-sm">{customer.name}</td>
                  <td className="py-3 px-4 text-sm">{customer.email}</td>
                  <td className="py-3 px-4 text-sm">{customer.orders}</td>
                  <td className="py-3 px-4 text-sm font-medium">{formatCurrency(customer.totalSpent)}</td>
                  <td className="py-3 px-4 text-sm">{customer.joinDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusBadge(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-primary hover:text-gray-600 mr-2">👁️</button>
                    <button className="text-primary hover:text-gray-600">✉️</button>
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

export default Customers;
