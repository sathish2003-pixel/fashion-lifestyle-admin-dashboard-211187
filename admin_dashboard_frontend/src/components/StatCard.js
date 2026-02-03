import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Stat card component for displaying metrics
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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
          {growth !== undefined && (
            <p className={`text-sm mt-2 flex items-center ${isPositive ? 'text-success' : 'text-error'}`}>
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
          <div className="text-primary">
            <IconComponent size={40} strokeWidth={1.5} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
