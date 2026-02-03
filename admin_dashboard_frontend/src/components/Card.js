import React from 'react';

// PUBLIC_INTERFACE
/**
 * Reusable card component for dashboard UI
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside card
 * @param {string} props.title - Optional card title
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Card component
 */
function Card({ children, title, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}

export default Card;
