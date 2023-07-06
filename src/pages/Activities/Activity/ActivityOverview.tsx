import React from 'react';
import { ActivityDataContainer } from './MainActivity.style';
import { useTranslation } from 'react-i18next';
import TeamMembersImgs from '../../../components/TeamMembersImgs/TeamMembersImgs';
import moment from 'moment';

const ActivityData = ({ activity }) => {
	const { t } = useTranslation();

	return (
		<ActivityDataContainer>
			<RenderContent className="full" head={t('Task Overview')} des={activity.description} />
			<RenderContent className="half" head={t('Due Date')} des={moment(activity.roundEndDate).format('DD MMM yyyy')} />
			<RenderContent className="half" head={t('Round No.')} des={activity.roundName} />
			<RenderContent className="full" head={t('Competition')} des={activity.tournamentName} />
			{/* <RenderContent className="full" head={t('Assignees')} type="renderCom" activity={activity} /> */}
		</ActivityDataContainer>
	);
};

export default ActivityData;

type RenderContentType = {
	className: string;
	head: string;
	des?: any;
	type?: string;
	activity?: any;
};

const RenderContent = ({ className, head, des, type, activity }: RenderContentType) => {
	return (
		<div className={className}>
			<p className="head">{head}</p>

			{type === 'renderCom' ? (
				<div className="imgsContainer">
					<TeamMembersImgs leftRatio={5} width={40} clearmembersCount={4} members={activity.assignees} />
				</div>
			) : (
				<span className="des">{des}</span>
			)}
		</div>
	);
};
