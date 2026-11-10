import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SpecData } from '../types';

interface SpecsChartProps {
  data: SpecData[];
  isDark: boolean;
}

const SpecsChart: React.FC<SpecsChartProps> = ({ data, isDark }) => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barSize={48}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontFamily: 'Manrope', 
              fontSize: 10, 
              fill: isDark ? '#71717a' : '#a1a1aa', 
              fontWeight: 600, 
              letterSpacing: '1px',
              style: { textTransform: 'uppercase' }
            }}
            dy={10}
          />
          <Tooltip 
            cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
            contentStyle={{ 
              backgroundColor: isDark ? '#09090b' : '#fff', 
              borderRadius: '0px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Manrope',
              fontSize: '12px',
              color: isDark ? '#fff' : '#000'
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
             {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={isDark ? '#0ea5e9' : '#0284c7'} />
              ))}
          </Bar>
          <Bar dataKey="standard" radius={[4, 4, 0, 0]} fill={isDark ? '#27272a' : '#e4e4e7'} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpecsChart;