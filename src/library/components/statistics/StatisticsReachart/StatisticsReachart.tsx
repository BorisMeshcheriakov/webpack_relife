import { parseISO } from 'date-fns';
import { format } from 'date-fns/esm';
import { ru } from 'date-fns/locale';
import { GraphType, Mode } from 'library/types/statistics';
import { startCase } from 'lodash';
import { FC, memo } from 'react';
// import { useParams } from 'react-router-dom';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';

interface Props {
	normalizeList: any;
	graphicsType: GraphType;
	tab: Mode;
}

const StatisticsReachart: FC<Props> = ({ normalizeList, graphicsType, tab }) => {
	// const { tabQuery } = useParams<{ tabQuery: string }>();

	const tickFormatter = (date: string, index: number) => {
		const parseDate = parseISO(date);
		return tab === 'year'
			? startCase(format(parseDate, 'LLLL', { locale: ru }))
			: index === 0
			? startCase(format(parseDate, 'd  LLLL', { locale: ru }))
			: index === normalizeList.length - 1
			? startCase(format(parseDate, 'LLLL  d', { locale: ru }))
			: `${index + 1}`;
	};

	return (
		<>
			{graphicsType === 'graphic' ? (
				<ResponsiveContainer>
					<AreaChart data={normalizeList} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
						<XAxis
							dataKey={'date'}
							axisLine={false}
							tickLine={false}
							tickFormatter={tickFormatter}
							interval={0}
							domain={['dataMin', 'dataMax']}
							tick={{
								fontWeight: '600',
								fontSize: '10',
								color: '#161718',
							}}
							height={40}
							dy={13}
						/>

						<YAxis
							dataKey="count"
							axisLine={false}
							tickLine={false}
							domain={[0, (dataMax: number) => (Math.round(dataMax / 10) + 1) * 10]}
							interval={0}
							tick={{
								fontWeight: '600',
								fontSize: '10',
								color: '#161718',
							}}
							dx={-13}
						/>

						<CartesianGrid stroke="#f0f0f0" />
						<Area
							dataKey="count"
							stroke="#4198C5"
							fill="#F5F9FF"
							strokeWidth={2}
							activeDot={false}
							isAnimationActive={false}
							dot={{
								stroke: '#4198C5',
								fill: 'white',
								fillOpacity: 1,
								strokeWidth: 2,
							}}
						/>
					</AreaChart>
				</ResponsiveContainer>
			) : (
				<ResponsiveContainer>
					<BarChart data={normalizeList} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
						<XAxis
							dataKey={'date'}
							axisLine={false}
							tickLine={false}
							tickFormatter={(date: string, index: number) => tickFormatter(date, index)}
							interval={0}
							domain={['dataMin', 'dataMax']}
							tick={{
								fontWeight: '600',
								fontSize: '10',
								color: '#161718',
							}}
							height={40}
							dy={13}
						/>

						<YAxis
							dataKey="count"
							axisLine={false}
							tickLine={false}
							domain={[0, (dataMax: number) => (Math.round(dataMax / 10) + 1) * 10]}
							tick={{
								fontWeight: '600',
								fontSize: '10',
								color: '#161718',
							}}
							dx={-13}
						/>

						<CartesianGrid stroke="#f0f0f0" />
						<Bar
							type="plainline"
							stroke="#DDEEFF"
							fill="#DDEEFF"
							isAnimationActive={false}
							dataKey="count"
							strokeWidth={2}
							barSize={21}
						/>
					</BarChart>
				</ResponsiveContainer>
			)}
		</>
	);
};

export default memo(StatisticsReachart);
