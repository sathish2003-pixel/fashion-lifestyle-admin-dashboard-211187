import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getProducts, addProduct, getProductCategories } from '../services/mockData';
import { Tag, Plus, X } from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Products page component for managing product catalog
 * @returns {JSX.Element} Products page
 */
function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [categories] = useState(getProductCategories());

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      errors.stock = 'Stock must be 0 or greater';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Add product using mock data service
    addProduct(formData);
    
    // Update local state
    setProducts(getProducts());
    
    // Reset form and close modal
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: ''
    });
    setFormErrors({});
    setShowAddModal(false);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: ''
    });
    setFormErrors({});
  };

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
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
        </div>
      </Card>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Add New Product</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.name ? 'border-error' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Designer T-Shirt"
                  />
                  {formErrors.name && (
                    <p className="text-error text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-primary mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.category ? 'border-error' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className="text-error text-sm mt-1">{formErrors.category}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-primary mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.price ? 'border-error' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {formErrors.price && (
                    <p className="text-error text-sm mt-1">{formErrors.price}</p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-primary mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.stock ? 'border-error' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {formErrors.stock && (
                    <p className="text-error text-sm mt-1">{formErrors.stock}</p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <div className="aspect-square bg-gray-100 rounded mb-4 flex items-center justify-center">
              <Tag size={48} className="text-gray-400" />
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
