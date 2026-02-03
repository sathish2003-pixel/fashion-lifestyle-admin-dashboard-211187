import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  Users, 
  ClipboardList, 
  Ticket, 
  TrendingUp,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Bell,
  User
} from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Main layout component with sidebar navigation and header
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Layout component
 */
function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/orders', icon: Package, label: 'Orders' },
    { path: '/products', icon: Tag, label: 'Products' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/inventory', icon: ClipboardList, label: 'Inventory' },
    { path: '/discounts', icon: Ticket, label: 'Discounts' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/employees', icon: UserCheck, label: 'Employees' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } bg-primary text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold">Fashion Admin</h1>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-700 rounded"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${
                  isActive(item.path) ? 'bg-gray-700 border-r-4 border-success' : ''
                }`}
              >
                <IconComponent size={20} />
                {!sidebarCollapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          {!sidebarCollapsed && (
            <div className="text-xs text-gray-400">
              <p>© 2024 Fashion Admin</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-primary">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Notifications">
                <Bell size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
