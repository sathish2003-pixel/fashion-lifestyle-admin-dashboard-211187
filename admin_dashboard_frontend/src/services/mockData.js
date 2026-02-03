// Mock data service for the admin dashboard

// In-memory products array to simulate database
let productsData = [
  { id: 'PRD-001', name: 'Classic White T-Shirt', category: 'Tops', price: 29.99, stock: 145, status: 'active', image: '/assets/product-placeholder.jpg' },
  { id: 'PRD-002', name: 'Slim Fit Jeans', category: 'Bottoms', price: 79.99, stock: 67, status: 'active', image: '/assets/product-placeholder.jpg' },
  { id: 'PRD-003', name: 'Leather Jacket', category: 'Outerwear', price: 249.99, stock: 23, status: 'active', image: '/assets/product-placeholder.jpg' },
  { id: 'PRD-004', name: 'Running Sneakers', category: 'Footwear', price: 119.99, stock: 0, status: 'out-of-stock', image: '/assets/product-placeholder.jpg' },
  { id: 'PRD-005', name: 'Summer Dress', category: 'Dresses', price: 89.99, stock: 54, status: 'active', image: '/assets/product-placeholder.jpg' },
  { id: 'PRD-006', name: 'Wool Sweater', category: 'Tops', price: 64.99, stock: 12, status: 'low-stock', image: '/assets/product-placeholder.jpg' },
  { id: 'PRD-007', name: 'Designer Handbag', category: 'Accessories', price: 299.99, stock: 34, status: 'active', image: '/assets/product-placeholder.jpg' },
  { id: 'PRD-008', name: 'Sunglasses', category: 'Accessories', price: 149.99, stock: 89, status: 'active', image: '/assets/product-placeholder.jpg' },
];

// PUBLIC_INTERFACE
/**
 * Get dashboard statistics
 * @returns {Object} Dashboard statistics including revenue, orders, customers, and products
 */
export const getDashboardStats = () => {
  return {
    totalRevenue: 125840.50,
    totalOrders: 1248,
    totalCustomers: 3842,
    totalProducts: productsData.length,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    customersGrowth: 15.2,
    productsGrowth: 5.7,
  };
};

// PUBLIC_INTERFACE
/**
 * Get recent orders list
 * @param {number} limit - Number of orders to return
 * @returns {Array} Array of recent orders
 */
export const getOrders = (limit = 10) => {
  const orders = [
    { id: 'ORD-001', customer: 'Emma Wilson', date: '2024-01-15', status: 'delivered', total: 245.00, items: 3 },
    { id: 'ORD-002', customer: 'James Smith', date: '2024-01-15', status: 'processing', total: 189.50, items: 2 },
    { id: 'ORD-003', customer: 'Sophia Brown', date: '2024-01-14', status: 'shipped', total: 320.00, items: 4 },
    { id: 'ORD-004', customer: 'Oliver Davis', date: '2024-01-14', status: 'pending', total: 156.75, items: 1 },
    { id: 'ORD-005', customer: 'Ava Johnson', date: '2024-01-13', status: 'delivered', total: 412.00, items: 5 },
    { id: 'ORD-006', customer: 'William Garcia', date: '2024-01-13', status: 'cancelled', total: 98.50, items: 2 },
    { id: 'ORD-007', customer: 'Isabella Martinez', date: '2024-01-12', status: 'delivered', total: 567.00, items: 6 },
    { id: 'ORD-008', customer: 'Lucas Rodriguez', date: '2024-01-12', status: 'processing', total: 234.25, items: 3 },
    { id: 'ORD-009', customer: 'Mia Hernandez', date: '2024-01-11', status: 'shipped', total: 445.50, items: 4 },
    { id: 'ORD-010', customer: 'Ethan Lopez', date: '2024-01-11', status: 'delivered', total: 178.00, items: 2 },
  ];
  return orders.slice(0, limit);
};

// PUBLIC_INTERFACE
/**
 * Get products list
 * @returns {Array} Array of products
 */
export const getProducts = () => {
  return [...productsData];
};

// PUBLIC_INTERFACE
/**
 * Add a new product to the catalog
 * @param {Object} product - Product data including name, category, price, and stock
 * @returns {Object} The newly created product with generated ID
 */
export const addProduct = (product) => {
  // Generate new product ID
  const maxId = productsData.reduce((max, p) => {
    const num = parseInt(p.id.split('-')[1]);
    return num > max ? num : max;
  }, 0);
  
  const newId = `PRD-${String(maxId + 1).padStart(3, '0')}`;
  
  // Determine status based on stock
  let status = 'active';
  if (product.stock === 0) {
    status = 'out-of-stock';
  } else if (product.stock < 25) {
    status = 'low-stock';
  }
  
  const newProduct = {
    id: newId,
    name: product.name,
    category: product.category,
    price: parseFloat(product.price),
    stock: parseInt(product.stock),
    status: status,
    image: '/assets/product-placeholder.jpg'
  };
  
  productsData.push(newProduct);
  return newProduct;
};

// PUBLIC_INTERFACE
/**
 * Get available product categories
 * @returns {Array} Array of category names
 */
export const getProductCategories = () => {
  return ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Dresses', 'Accessories'];
};

// PUBLIC_INTERFACE
/**
 * Get customers list
 * @returns {Array} Array of customers
 */
export const getCustomers = () => {
  return [
    { id: 'CUS-001', name: 'Emma Wilson', email: 'emma.wilson@email.com', orders: 12, totalSpent: 2456.00, joinDate: '2023-03-15', status: 'active' },
    { id: 'CUS-002', name: 'James Smith', email: 'james.smith@email.com', orders: 8, totalSpent: 1890.50, joinDate: '2023-05-22', status: 'active' },
    { id: 'CUS-003', name: 'Sophia Brown', email: 'sophia.brown@email.com', orders: 15, totalSpent: 3420.00, joinDate: '2023-01-10', status: 'active' },
    { id: 'CUS-004', name: 'Oliver Davis', email: 'oliver.davis@email.com', orders: 5, totalSpent: 856.75, joinDate: '2023-08-05', status: 'active' },
    { id: 'CUS-005', name: 'Ava Johnson', email: 'ava.johnson@email.com', orders: 20, totalSpent: 4512.00, joinDate: '2022-11-18', status: 'vip' },
    { id: 'CUS-006', name: 'William Garcia', email: 'william.garcia@email.com', orders: 3, totalSpent: 398.50, joinDate: '2023-10-12', status: 'active' },
    { id: 'CUS-007', name: 'Isabella Martinez', email: 'isabella.martinez@email.com', orders: 18, totalSpent: 3967.00, joinDate: '2023-02-28', status: 'vip' },
  ];
};

// PUBLIC_INTERFACE
/**
 * Get inventory alerts
 * @returns {Array} Array of inventory alerts
 */
export const getInventoryAlerts = () => {
  return [
    { id: 'PRD-004', name: 'Running Sneakers', stock: 0, status: 'out-of-stock', reorderPoint: 20 },
    { id: 'PRD-006', name: 'Wool Sweater', stock: 12, status: 'low-stock', reorderPoint: 25 },
    { id: 'PRD-003', name: 'Leather Jacket', stock: 23, status: 'low-stock', reorderPoint: 30 },
  ];
};

// PUBLIC_INTERFACE
/**
 * Get active discounts
 * @returns {Array} Array of discount codes
 */
export const getDiscounts = () => {
  return [
    { id: 'DSC-001', code: 'WINTER25', type: 'percentage', value: 25, status: 'active', used: 145, limit: 500, expiryDate: '2024-02-28' },
    { id: 'DSC-002', code: 'FREESHIP', type: 'free-shipping', value: 0, status: 'active', used: 892, limit: null, expiryDate: '2024-03-31' },
    { id: 'DSC-003', code: 'SAVE50', type: 'fixed', value: 50, status: 'active', used: 234, limit: 1000, expiryDate: '2024-01-31' },
    { id: 'DSC-004', code: 'FIRST10', type: 'percentage', value: 10, status: 'active', used: 567, limit: null, expiryDate: '2024-12-31' },
    { id: 'DSC-005', code: 'VIP20', type: 'percentage', value: 20, status: 'expired', used: 500, limit: 500, expiryDate: '2023-12-31' },
  ];
};

// PUBLIC_INTERFACE
/**
 * Get analytics data for charts
 * @returns {Object} Analytics data including revenue, orders, and traffic
 */
export const getAnalyticsData = () => {
  return {
    revenueChart: [
      { month: 'Jan', revenue: 12500, orders: 145 },
      { month: 'Feb', revenue: 15200, orders: 178 },
      { month: 'Mar', revenue: 13800, orders: 162 },
      { month: 'Apr', revenue: 16400, orders: 192 },
      { month: 'May', revenue: 18900, orders: 215 },
      { month: 'Jun', revenue: 17200, orders: 198 },
      { month: 'Jul', revenue: 19500, orders: 223 },
      { month: 'Aug', revenue: 21000, orders: 241 },
      { month: 'Sep', revenue: 18700, orders: 209 },
      { month: 'Oct', revenue: 22400, orders: 256 },
      { month: 'Nov', revenue: 24100, orders: 278 },
      { month: 'Dec', revenue: 26800, orders: 302 },
    ],
    topProducts: [
      { name: 'Classic White T-Shirt', sales: 456, revenue: 13672.44 },
      { name: 'Slim Fit Jeans', sales: 289, revenue: 23117.11 },
      { name: 'Leather Jacket', sales: 123, revenue: 30748.77 },
      { name: 'Designer Handbag', sales: 167, revenue: 50098.33 },
      { name: 'Sunglasses', sales: 234, revenue: 35097.66 },
    ],
    trafficSources: [
      { source: 'Direct', visitors: 4521, percentage: 35 },
      { source: 'Organic Search', visitors: 3894, percentage: 30 },
      { source: 'Social Media', visitors: 2597, percentage: 20 },
      { source: 'Email', visitors: 1299, percentage: 10 },
      { source: 'Referral', visitors: 649, percentage: 5 },
    ],
  };
};
