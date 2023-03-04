import { FC, memo } from 'react';
import { GraphType, List, Mode } from 'library/types/statistics';
import { Statistics } from 'library/models/statistics';
import { getStatisticsTitleNull } from 'library/helpers/statistics/statisticsTitle';
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomTooltip } from '../frames';
import { useStatisticsTooltip } from 'library/hooks/statistics';

import st from './GraphicsCard.module.scss';

interface Props {
	statistics: List;
	normalizeList: Statistics[];
	nullableList: Statistics[];
	graphicsType: GraphType;
	tab: Mode;
}

const GraphicsCard: FC<Props> = ({
	normalizeList,
	nullableList,
	graphicsType,
	statistics,
	tab,
}) => {
	const tooltip = useStatisticsTooltip(tab);
	return (
		<div className={st.svg}>
			{statistics.list.length ? (
				graphicsType === 'graphic' ? (
					<div className={st.wrap}>
						<div className={st.graph}>
							<ResponsiveContainer>
								<AreaChart data={normalizeList}>
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
													label={tooltip.getTooltipTitle(
														statistics.title ?? '',
														tooltip.payload.count
													)}
												/>
											) : null
										}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
						<div className={st.border} />
						<div className={st.helper}>
							{!statistics.list.length && <p>{getStatisticsTitleNull(statistics.title)}</p>}
						</div>
					</div>
				) : (
					<ResponsiveContainer height={158}>
						<BarChart data={normalizeList}>
							<Bar
								type="plainline"
								dataKey="count"
								stroke="#DDEEFF"
								fill="#DDEEFF"
								strokeWidth={1}
								isAnimationActive={false}
								onMouseOver={(data: any) => {
									tooltip.setShowToolTip(true);
									tooltip.setCoordinate({
										x: data.x - (tooltip.tab === 'year' ? 53 : 63),
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
											label={tooltip.getTooltipTitle(statistics.title ?? '', tooltip.payload.count)}
										/>
									) : null
								}
							/>
						</BarChart>
					</ResponsiveContainer>
				)
			) : (
				<div className={st.wrap}>
					<div className={st.graph}>
						<ResponsiveContainer>
							<AreaChart data={nullableList}>
								<Area
									dataKey="count"
									stroke="#CDCDCD"
									fill="#F5F9FF"
									strokeWidth={2}
									activeDot={false}
									isAnimationActive={false}
									dot={{
										stroke: '#CDCDCD',
										fill: 'white',
										fillOpacity: 1,
										strokeWidth: 2,
									}}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
					<div className={st.border} />
					<div className={st.helper}>
						{!statistics.list.length && <p>{getStatisticsTitleNull(statistics.title)}</p>}
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(GraphicsCard);
