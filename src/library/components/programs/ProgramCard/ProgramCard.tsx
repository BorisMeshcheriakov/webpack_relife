import React from 'react';
import cn from 'classnames';
import SVG from 'react-inlinesvg';
import { Link, useRouteMatch } from 'react-router-dom';

import { ProgramList } from 'library/models/programs';
import { getInitial } from 'library/helpers/user';
import { useProgramMenu } from 'library/hooks/programs';
import { icons } from 'resources/icons/program';
import { Card as BlankCard } from 'library/components/ui';
import {
	ProgramMenu,
	ProgramModeration,
	ProgramDescription,
	RentalStatus,
} from 'library/components/programs';

import st from './ProgramCard.module.scss';
import { useCommonSettings } from 'library/hooks/common';

interface Props {
	program: ProgramList;
}

const ProgramCard: React.FC<Props> = ({ program }) => {
	const { url } = useRouteMatch();
	const { isAuthor } = useProgramMenu(program);
	const { moderation } = useCommonSettings();

	const {
		published,
		moderation_status: { abbr_status = 'N' },
	} = program;

	const getStyles = () => {
		/**
		 * Подсвечиваем левую границу карточки
		 * Если модерация отключена, показываем только статус "не опубликовано"
		 */
		let style = '';

		if (!published && (abbr_status === 'N' || abbr_status === 'A')) {
			style = st.hidden;
		}

		if (!moderation) {
			return style;
		}

		if (published && abbr_status === 'N') {
			style = st.moderation;
		}

		if (abbr_status === 'D') {
			style = st.rejected;
		}

		return style;
	};

	return (
		<BlankCard className={cn(st.card, getStyles())}>
			<Link to={`${url}/program/${program.pk}`} className={st.card__image}>
				<img src={program.promo_image} alt="" />
			</Link>
			<div className={st.card__data}>
				<section className={st.card__top}>
					<Link to={`${url}/program/${program.pk}`} className={st.card__title}>
						<h3> {program.title}</h3>
						<p>
							{getInitial(
								program.author.first_name,
								program.author.middle_name,
								program.author.last_name
							)}
						</p>
					</Link>

					<div className={st.card__menu}>
						<ProgramMenu program={program} />
					</div>
				</section>
				<div className={st.card__bottom}>
					<Link to={`${url}/program/${program.pk}`} className={st.card__details}>
						<div className={st.card__description}>
							{/* Добавил дополнительную проверку на нулевое значение, чтобы не писался просто 0 в карточке */}
							{!program?.is_payed && (program.cost > 0 || program.cost_coach > 0) && (
								<ProgramDescription program={program} type="cost" isAuthor={isAuthor()} />
							)}
						</div>
					</Link>
					{/* <div>{program.individual?.id && 'Recommended'}</div> */}
					<div className={st.card__status}>
						{isAuthor() ? (
							(moderation || !published) && <ProgramModeration program={program} />
						) : program.is_payed ? (
							<RentalStatus program={program} />
						) : (
							program.favorite && (
								<div className={st.favorite}>
									<SVG src={icons.favourites} />
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</BlankCard>
	);
};

export default ProgramCard;
