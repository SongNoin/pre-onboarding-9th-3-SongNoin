import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { IChartData } from '../../types/IChartData';
import { CustomDot } from './\bDots/CustomDot';

interface ChartProps {
  data: IChartData[];
  selectedOptions: string[];
}

export const Chart = ({ data, selectedOptions }: ChartProps) => {
  return (
    <ComposedChart
      width={1000}
      height={500}
      data={data}
      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
    >
      <XAxis
        dataKey='date'
        label={{
          value: '2023-02-05일자',
          position: 'insideBottom',
          offset: -8,
        }}
      />
      <YAxis
        dataKey='value_area'
        yAxisId='area'
        domain={[0, 200]}
        label={{
          value: 'area',
          angle: -90,
          position: 'insideLeft',
        }}
      />
      <YAxis
        dataKey='value_bar'
        yAxisId='bar'
        orientation='right'
        label={{
          value: 'bar',
          angle: -90,
          offset: -10,
          position: 'insideRight',
        }}
      />

      <Tooltip

      // content={<CustomTooltip external={external} />}
      />
      <Legend align='left' />
      <CartesianGrid stroke='#f5f5f5' />

      <Bar
        dataKey='value_bar'
        yAxisId='bar'
        barSize={20}
        fill='#EBAD30'
        stroke='#EBAD30'
      >
        {data.map((entry) => (
          <Cell
            key={entry.id}
            fill={selectedOptions?.includes(entry.id) ? '#A7B3CD' : '#E6DA9E'}
            stroke={selectedOptions?.includes(entry.id) ? '#A7B3CD' : '#E6DA9E'}
          />
        ))}
      </Bar>
      <Area
        type='monotone'
        yAxisId='area'
        dataKey='value_area'
        fill='#CDB296'
        fillOpacity={0.8}
        stroke='#CDB296'
        dot={
          <CustomDot
            stroke={'#A53E1F'}
            strokeWidth={3}
            selectedOptions={selectedOptions}
          />
        }
      ></Area>
    </ComposedChart>
  );
};
