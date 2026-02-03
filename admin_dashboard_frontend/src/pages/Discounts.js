import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getDiscounts } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Discounts page component for managing discount codes and promotions
 * @returns {JSX.Element} Discounts page
 */
function Discounts() {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    setDiscounts(getDiscounts());
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success bg-green-100',
      expired: 'text-error bg-red-100',
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const getTypeIcon = (type) => {
    const icons = {
      percentage: '🎯',
      fixed: '💵',
      'free-shipping': '🚚',
    };
    return icons[type] || '🎫';
  };

  const formatDiscountValue = (type, value) => {
    if (type === 'percentage') return `${value}%`;
    if (type === 'fixed') return `$${value}`;
    return 'Free Shipping';
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-primary">Manage Discounts</h3>
            <p className="text-sm text-secondary mt-1">Create and manage discount codes for your store</p>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
            + Create Discount
          </button>
        </div>
      </Card>

      {/* Discounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((discount) => (
          <Card key={discount.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{getTypeIcon(discount.type)}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(discount.status)}`}>
                {discount.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">{discount.code}</h3>
            <p className="text-2xl font-bold text-success mb-4">
              {formatDiscountValue(discount.type, discount.value)}
            </p>
            <div className="space-y-2 text-sm text-secondary">
              <p>Type: <span className="font-medium capitalize">{discount.type}</span></p>
              <p>Used: <span className="font-medium">{discount.used} {discount.limit ? `/ ${discount.limit}` : ''}</span></p>
              <p>Expires: <span className="font-medium">{discount.expiryDate}</span></p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-gray-100 text-primary px-3 py-2 rounded hover:bg-gray-200 transition-colors text-sm">
                Edit
              </button>
              <button className="flex-1 bg-error text-white px-3 py-2 rounded hover:bg-red-600 transition-colors text-sm">
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl mb-2">🎫</div>
            <p className="text-2xl font-bold text-primary">{discounts.length}</p>
            <p className="text-sm text-secondary mt-1">Total Discounts</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-2xl font-bold text-success">{discounts.filter(d => d.status === 'active').length}</p>
            <p className="text-sm text-secondary mt-1">Active</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl mb-2">❌</div>
            <p className="text-2xl font-bold text-error">{discounts.filter(d => d.status === 'expired').length}</p>
            <p className="text-sm text-secondary mt-1">Expired</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-2xl font-bold text-primary">{discounts.reduce((sum, d) => sum + d.used, 0)}</p>
            <p className="text-sm text-secondary mt-1">Total Uses</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Discounts;
