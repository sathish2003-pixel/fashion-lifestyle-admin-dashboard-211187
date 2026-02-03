import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

// PUBLIC_INTERFACE
/**
 * Reusable pie chart component with dark/light mode support
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of data points for the chart
 * @param {string} props.dataKey - Key for the data values
 * @param {string} props.nameKey - Key for the data labels
 * @param {Array} props.colors - Array of colors for the pie segments
 * @param {Function} props.formatter - Optional formatter function for tooltip values
 * @returns {JSX.Element} PieChart component
 */
function PieChart({ data, dataKey, nameKey, colors, formatter }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-primary dark:text-white mb-1">{data.name}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Value: <span className="font-medium">
              {formatter ? formatter(data.value) : data.value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill={isDark ? '#F9FAFB' : '#111827'} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: '600' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ 
            fontSize: '14px',
            color: isDark ? '#F9FAFB' : '#111827'
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

export default PieChart;
