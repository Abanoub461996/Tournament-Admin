import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { useAppDispatch } from '../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import { getAssignedTeams } from '../../core/api/axiosCalls';

// COMPONENTS
import Accordions from './TeamsAccordion/TeamsAccordion';
import Spinner from '../../components/Spinner/Spinner';

// ASSETS
import coverImg from '../../assets/images/activity_cover.png';
import { useTranslation } from 'react-i18next';
import ActivityDetails from './ActivityDetails/ActivityDetails';
import { InputNumber } from 'primereact/inputnumber';
import { ActivityProfile, MyActivityContainer, PageContainer, TeamHeader } from './ActivityScore.style';

const ActivityScore = () => {
	const { t } = useTranslation();
	const { slug } = useParams();
	const [safari] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const [teams, setTeams] = useState<any>();
	const [activity, setActivity] = useState<any>({ name: '', photo: '' });
	const [memberAnswerId, setMemberAnswerID] = useState<number>(0);
	const [member, setMember] = useState<string>('');

	const activityAnswers = useQuery({
		queryKey: [`Activity-members-answers-${slug}`],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await getAssignedTeams(slug || ' ');
		},
		onSuccess: (data: any) => {
			setTeams(data.teams);
			setActivity(data.activity);
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});
	const scoreSent = (id: number) => {
		const yarab = teams.map((team) => {
			return{
				...team,
				members: team.members.map((el) => {
					if (el.answer_id == id) {
						return {
							...el,
							scored: true
						};
					} else {
						return el;
					}
				})
			}
		});
		setTeams(yarab);
	};

	return (
		<MyActivityContainer>
			<TeamHeader>
				<img
					src={coverImg}
					alt="activity-covwe"
					className={`cov-img ${safari ? 'cov-img-safari' : ''}`}
				/>
			</TeamHeader>
			<PageContainer>
				<ActivityProfile>
					<div className="team-identity">
						<figure className="team-avatar">
							{activity.photo&&<img
								src={`${import.meta.env.VITE_THUMBNAILS}${activity.photo}`}
								alt="activity avatar"
							/>}
						</figure>
						<div className="team-content">
							<div className="team-name">{activity.name}</div>
							<div className="team-slogan">
								<p className="activityRole">{activity.type}</p>
							</div>
						</div>
					</div>
					<div className="activity__max_score ms-auto me-0 flex gap-2 items-center">
						<div className="score__text">Activity Max. Score :</div>
						<div className="score__input__parent">
							<InputNumber className="score__input" value={activity.total_score} useGrouping={false} disabled={true} />
						</div>
					</div>
				</ActivityProfile>
			</PageContainer>

			<div className="pageContent">
				<div className="rightSec">
					<div className="sec__header">{t('activity_teams')}</div>
					<Accordions teams={teams} setMemberAnswerID={setMemberAnswerID} setMember={setMember} selectedMember={member} />
				</div>
				<div className="leftSec">
					<div className="sec__header">{t('member_answer', { key: member || 'Member' })}</div>
					<ActivityDetails
						memberAnswerId={memberAnswerId}
						scoreSent={(id) => {
							scoreSent(id);
						}}
					/>
				</div>
			</div>
		</MyActivityContainer>
	);
};

export default ActivityScore;
