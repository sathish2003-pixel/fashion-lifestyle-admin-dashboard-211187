import React from 'react';

// PUBLIC_INTERFACE
/**
 * Stat card component for displaying metrics
 * @param {Object} props - Component props
 * @param {string} props.title - Stat title
 * @param {string|number} props.value - Stat value
 * @param {string} props.icon - Icon to display
 * @param {number} props.growth - Growth percentage
 * @returns {JSX.Element} StatCard component
 */
function StatCard({ title, value, icon, growth }) {
  const isPositive = growth >= 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
          {growth !== undefined && (
            <p className={`text-sm mt-2 ${isPositive ? 'text-success' : 'text-error'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(growth)}% from last month
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

export default StatCard;
