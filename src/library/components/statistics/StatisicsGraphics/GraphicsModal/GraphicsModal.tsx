import { FC, memo } from 'react';
import { parseISO } from 'date-fns';
import { format } from 'date-fns/esm';
import { ru } from 'date-fns/locale';
import { Statistics } from 'library/models/statistics';
import { GraphType, Mode } from 'library/types/statistics';
import { startCase } from 'lodash';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { useStatisticsTooltip } from 'library/hooks/statistics';
import { CustomTooltip } from '../frames';

interface Props {
	normalizeList: Statistics[];
	graphicsType: GraphType;
	tab: Mode;
}

const GraphicsModal: FC<Props> = ({ normalizeList, graphicsType, tab }) => {
	const tooltip = useStatisticsTooltip(tab);

	// форматер нижней шкалы графиков в ModalStatistics
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

								onMouseOver: () => {
									tooltip.setShowToolTip(true);
								},
								onMouseMove: (data: any) => {
									tooltip.setPayload(data.payload);

									tooltip.setCoordinate({ x: data.cx - 71, y: data.cy - 112 + 35 });
								},
								onMouseLeave: () => {
									tooltip.setShowToolTip(false);
								},
							}}
						/>

						<Tooltip
							wrapperStyle={{ position: 'absolute' }}
							allowEscapeViewBox={{ x: true, y: true }}
							position={tooltip.coordinate}
							isAnimationActive={false}
							cursor={false}
							active={tooltip.showToolTip}
							content={() =>
								tooltip.showToolTip ? (
									<CustomTooltip
										tab={tooltip.tab}
										payload={tooltip.payload}
										label={tooltip.getTooltipTitle(tooltip.titleModal ?? '', tooltip.payload.count)}
									/>
								) : null
							}
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
							onMouseOver={(data: any) => {
								tooltip.setShowToolTip(true);
								tooltip.setCoordinate({
									x: data.x - 60,
									y: data.y - 70,
								});
							}}
							onMouseMove={(data: any) => {
								tooltip.setPayload(data.payload);
							}}
							onMouseLeave={() => {
								tooltip.setShowToolTip(false);
							}}
						/>
						<Tooltip
							wrapperStyle={{ position: 'absolute' }}
							allowEscapeViewBox={{ x: true, y: true }}
							position={tooltip.coordinate}
							isAnimationActive={false}
							cursor={false}
							active={tooltip.showToolTip}
							content={() =>
								tooltip.showToolTip ? (
									<CustomTooltip
										tab={tooltip.tab}
										payload={tooltip.payload}
										label={tooltip.getTooltipTitle(tooltip.titleModal ?? '', tooltip.payload.count)}
									/>
								) : null
							}
						/>
					</BarChart>
				</ResponsiveContainer>
			)}
		</>
	);
};

export default memo(GraphicsModal);
