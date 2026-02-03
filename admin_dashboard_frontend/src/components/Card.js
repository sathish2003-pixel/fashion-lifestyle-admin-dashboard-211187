import React from 'react';

// PUBLIC_INTERFACE
/**
 * Reusable card component for dashboard UI with dark mode support
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside card
 * @param {string} props.title - Optional card title
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Card component
 */
function Card({ children, title, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-200 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-primary dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">{title}</h3>
      )}
      {children}
    </div>
  );
}

export default Card;
