import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

//Component
import { useAppDispatch } from '../../../../core/hooks/hooks';
import Spinner from '../../../../components/Spinner/Spinner';
import Table from '../../../../components/Table/Table';
import { getTournamentStanding } from '../../../../core/api/axiosCalls';
import { closeLoader, showLoader } from '../../../../core/store/slices/loaderSlice';
import TeamMembersImgs from '../../../../components/TeamMembersImgs/TeamMembersImgs';

//Assets
import empty_tournament from '../../../../assets/images/empty_tournament.svg';
import { InnerContainer } from '../../../../layouts/MainLayout.style';
import arrow_down from '../../../../assets/images/down.svg';
import arrow_up from '../../../../assets/images/up.svg';

const TournamentStanding = ({ slug }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [standingData, setStandingData] = useState<Array<Record<string, any>>>([]);
	const rankStatus = {
		same: <span className="w-[10px] font-[700]">-</span>,
		up: <img className="w-[10px]" src={arrow_up} alt="arrow_up" />,
		down: <img className="w-[10px] " src={arrow_down} alt="arrow_down" />,
	};

	const cols = [
		{ field: 'rank', header: t('Rank'), width: '7%', fontSize: '1.125em' },
		{ field: 'team_name', header: t('Team Name'), width: '25%', fontSize: '1.125em' },
		{ field: 'team_leader', header: t('Team Leader'), width: '15%', fontSize: '1.125em' },
		{ field: 'members', header: t('Team Members'), width: '15%', fontSize: '1.125em' },
		{ field: 'played', header: t('Rounds Played'), width: '10%', fontSize: '1.125em', align: 'center' },
		{ field: 'round_score', header: t('Last Score'), color: '#65A743', width: '8%', fontSize: '1.125em', align: 'center' },
		{ field: 'total_score', header: t('Total Points'), width: '10%', fontSize: '1.125em', align: 'center' },
	];

	useQuery({
		queryKey: ['standing'],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await getTournamentStanding(slug);
		},
		onSuccess: (data: any) => {
			dispatch(closeLoader());
			setStandingData(data.records);

			data.records.map((record: Record<string, any>) => {
				record.rank = (
					<div className="Tournament__container gap-3">
						<span className="Tournament__name ">{record.rank}</span>
						{rankStatus[record.status]}
					</div>
				);
				record.members = (
					<div className="Tournament__container">
						<TeamMembersImgs leftRatio={25} width={2.75} height={2.75} clearmembersCount={4} members={record.members} />
					</div>
				);
				record.team_name = (
					<div className="Tournament__container">
						<img className="rounded-[50%] img " src={import.meta.env.VITE_THUMBNAILS + record.team_photo} alt="teamIcon" />
						<span className="Tournament__name ">{record.team_name}</span>
					</div>
				);
				record.team_name = (
					<div className="Tournament__container">
						<span className="Tournament__name ">{record.team_name}</span>
					</div>
				);
				record.team_leader = (
					<div className="Tournament__container">
						<span className="Tournament__name ">{record.team_leader}</span>
					</div>
				);
				record.played = (
					<div className="Tournament__container justify-center">
						<span className="Tournament__name ">{record.played}</span>
					</div>
				);
				record.round_score = (
					<div className="Tournament__container justify-center">
						<span className="Tournament__name ">{'+' + record.round_score}</span>
					</div>
				);
				record.total_score = (
					<div className="Tournament__container justify-center">
						<span className="Tournament__name ">{record.total_score}</span>
					</div>
				);
				return record;
			});
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});

	return (
		<InnerContainer className="standing ">
			{standingData.length > 0 ? (
				<div className="inner__page__content">
					<Table
						cols={cols}
						data={standingData}
						actions={{
							hasActions: false,
							hasEdit: false,
							hasDelete: false,
						}}
						hasPaginator={false}
					/>
				</div>
			) : (
				<div className="m-20">
					<img src={empty_tournament} className="m-auto w-1/5 opacity-80" alt="" />
					<p className="mt-4 text-center font-manropeSemiBold text-lg text-[#AFAFAF]">
						{t('Empty Tournaments pt1')}
						<br />
						{t('Empty Tournaments pt2')}
					</p>
				</div>
			)}
		</InnerContainer>
	);
};

export default TournamentStanding;
