import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

// PUBLIC_INTERFACE
/**
 * Reusable bar chart component with dark/light mode support
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of data points for the chart
 * @param {Array} props.bars - Array of bar configurations with dataKey, color, and name
 * @param {string} props.xAxisKey - Key for x-axis data
 * @param {Function} props.formatter - Optional formatter function for tooltip values
 * @returns {JSX.Element} BarChart component
 */
function BarChart({ data, bars, xAxisKey, formatter }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-primary dark:text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
              <span style={{ color: entry.color }}>{entry.name}: </span>
              <span className="font-medium">
                {formatter ? formatter(entry.value) : entry.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={isDark ? '#374151' : '#e5e7eb'} 
        />
        <XAxis 
          dataKey={xAxisKey} 
          stroke={isDark ? '#9CA3AF' : '#6B7280'}
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke={isDark ? '#9CA3AF' : '#6B7280'}
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ 
            fontSize: '14px',
            color: isDark ? '#F9FAFB' : '#111827'
          }}
        />
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            fill={bar.color}
            name={bar.name}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export default BarChart;
