import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getProducts, getInventoryAlerts } from '../services/mockData';
import { Package, AlertTriangle, XCircle } from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Inventory page component for managing stock levels and alerts
 * @returns {JSX.Element} Inventory page
 */
function Inventory() {
  const [products, setProducts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
    setAlerts(getInventoryAlerts());
  }, []);

  const getStockStatusColor = (stock) => {
    if (stock === 0) return 'text-error bg-red-100';
    if (stock < 25) return 'text-yellow-600 bg-yellow-100';
    return 'text-success bg-green-100';
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 25) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="space-y-6">
      {/* Inventory Alerts */}
      {alerts.length > 0 && (
        <Card>
          <div className="flex items-center mb-4">
            <AlertTriangle size={20} className="text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-primary">Inventory Alerts</h3>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded">
                <div>
                  <p className="font-medium text-primary">{alert.name}</p>
                  <p className="text-sm text-secondary">
                    Current stock: {alert.stock} | Reorder point: {alert.reorderPoint}
                  </p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Inventory Table */}
      <Card title="Inventory Overview">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Product ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Product Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Category</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-primary">Stock</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{product.id}</td>
                  <td className="py-3 px-4 text-sm">{product.name}</td>
                  <td className="py-3 px-4 text-sm">{product.category}</td>
                  <td className="py-3 px-4 text-sm text-center font-bold">{product.stock}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(product.stock)}`}>
                      {getStockStatus(product.stock)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="bg-primary text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors text-sm">
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Stock Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gray-100 rounded-full">
                <Package size={32} className="text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
            <p className="text-sm text-secondary mt-1">Total Units in Stock</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-yellow-50 rounded-full">
                <AlertTriangle size={32} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{products.filter(p => p.stock < 25 && p.stock > 0).length}</p>
            <p className="text-sm text-secondary mt-1">Low Stock Items</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-red-50 rounded-full">
                <XCircle size={32} className="text-error" />
              </div>
            </div>
            <p className="text-2xl font-bold text-error">{products.filter(p => p.stock === 0).length}</p>
            <p className="text-sm text-secondary mt-1">Out of Stock Items</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Inventory;
