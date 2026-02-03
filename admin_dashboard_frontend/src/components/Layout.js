import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
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
  User,
  Settings as SettingsIcon,
  Moon,
  Sun
} from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Main layout component with sidebar navigation, header, and dark mode toggle
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Layout component
 */
function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/orders', icon: Package, label: 'Orders' },
    { path: '/products', icon: Tag, label: 'Products' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/inventory', icon: ClipboardList, label: 'Inventory' },
    { path: '/discounts', icon: Ticket, label: 'Discounts' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/employees', icon: UserCheck, label: 'Employees' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } bg-primary dark:bg-gray-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold">Fashion Admin</h1>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-700 dark:hover:bg-gray-600 rounded"
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
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors ${
                  isActive(item.path) ? 'bg-gray-700 dark:bg-gray-600 border-r-4 border-success' : ''
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
        <div className="p-4 border-t border-gray-700 dark:border-gray-600">
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
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-primary dark:text-white">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun size={20} className="text-gray-300" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors" aria-label="Notifications">
                <Bell size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary dark:bg-gray-600 rounded-full flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
