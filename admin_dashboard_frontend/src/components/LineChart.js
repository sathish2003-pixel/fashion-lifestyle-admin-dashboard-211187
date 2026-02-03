import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

// PUBLIC_INTERFACE
/**
 * Reusable line chart component with dark/light mode support
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of data points for the chart
 * @param {Array} props.lines - Array of line configurations with dataKey, color, and name
 * @param {string} props.xAxisKey - Key for x-axis data
 * @param {Function} props.formatter - Optional formatter function for tooltip values
 * @returns {JSX.Element} LineChart component
 */
function LineChart({ data, lines, xAxisKey, formatter }) {
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
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={2}
            name={line.name}
            dot={{ fill: line.color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export default LineChart;
