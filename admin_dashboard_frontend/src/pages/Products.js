import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getProducts } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Products page component for managing product catalog
 * @returns {JSX.Element} Products page
 */
function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success bg-green-100',
      'out-of-stock': 'text-error bg-red-100',
      'low-stock': 'text-yellow-600 bg-yellow-100',
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
            + Add Product
          </button>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <div className="aspect-square bg-gray-100 rounded mb-4 flex items-center justify-center text-4xl">
              🏷️
            </div>
            <h3 className="font-semibold text-primary mb-2">{product.name}</h3>
            <p className="text-sm text-secondary mb-2">{product.category}</p>
            <p className="text-lg font-bold text-primary mb-2">{formatCurrency(product.price)}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-secondary">Stock: {product.stock}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                {product.status}
              </span>
            </div>
            <div className="flex gap-2 mt-auto">
              <button className="flex-1 bg-gray-100 text-primary px-3 py-2 rounded hover:bg-gray-200 transition-colors text-sm">
                Edit
              </button>
              <button className="flex-1 bg-primary text-white px-3 py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                View
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
