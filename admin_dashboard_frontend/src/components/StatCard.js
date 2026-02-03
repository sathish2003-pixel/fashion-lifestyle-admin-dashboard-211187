import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Stat card component for displaying metrics with dark mode support
 * @param {Object} props - Component props
 * @param {string} props.title - Stat title
 * @param {string|number} props.value - Stat value
 * @param {React.ComponentType} props.icon - Icon component from lucide-react
 * @param {number} props.growth - Growth percentage
 * @returns {JSX.Element} StatCard component
 */
function StatCard({ title, value, icon: IconComponent, growth }) {
  const isPositive = growth >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-secondary dark:text-gray-400 mb-2 font-medium">{title}</p>
          <p className="text-2xl font-bold text-primary dark:text-white mb-3">{value}</p>
          {growth !== undefined && (
            <p className={`text-sm flex items-center font-medium ${isPositive ? 'text-success' : 'text-error'}`}>
              {isPositive ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              {Math.abs(growth)}% from last month
            </p>
          )}
        </div>
        {IconComponent && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
            <IconComponent size={32} strokeWidth={1.5} className="text-primary dark:text-white" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
