import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useMount } from 'react-use';
// Components
import Spinner from '../../../../../components/Spinner/Spinner';
import { closeLoader, showLoader } from '../../../../../core/store/slices/loaderSlice';
import CupTeam from './CupTeam';

// ASSETS
import { A4TeamsCup, SmallCup } from './Cup4Teams.style';
import trophy from '../../../../../assets/images/Cup.svg';
import { Team, teamInit } from '../CreateKnockOuts';
import successIcon from '../../../../../assets/icons/Group 171119.png';
import { useAppDispatch } from '../../../../../core/hooks/hooks';
import { resetDialogue, setDialogue } from '../../../../../core/store/slices/dialogueSlice';
import { getSystemTeams, swapCupTeams } from '../../../../../core/api/axiosCalls';
import { useQuery } from 'react-query';

interface SmallCupsProps{
	handleCreate?:any,
	finalTeams?:any,
	randomized?:number,
	setFinalTeams?:any,
	teamsType?:number
}

const Cup4Teams = ({ handleCreate, finalTeams, setFinalTeams, randomized,teamsType }) => {
	const location = useLocation();
	const dispatch = useAppDispatch()
	const state = location.state;
	const { t } = useTranslation();
	const [cupTeams, setCupTeams] = useState<Array<Team>>(state.teams);
	const [finalTeamsIds,setFinalTeamsIds] = useState<number[]>(finalTeams.teams.map(el=>el.id))

	useMount(() => {
		if (!state.teams) {
			setCupTeams(new Array());
		}
	});
	useEffect(() => {
		if (randomized) {
			setCupTeams(new Array());
		}
	}, [randomized]);

	const addTeamHandler = async (index: number, childTeam) => {
		setFinalTeams((prev) => {
			const temp = prev.teams.map((el, i) => {
				if (i === index) {
					return childTeam;
				} else {
					return el;
				}
			});
			return { teams: temp };
		});
		setCupTeams((prev) => {
			return prev.filter((el, i) => el.id !== childTeam.id);
		});
	};
	const getunassignedteams = useQuery({
		queryKey: [`system-query-${teamsType}`,teamsType],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await getSystemTeams(teamsType);
		},
		onSuccess: (data: any) => {
			if(!state.teams){
				setCupTeams(data.filter(el=>{
					return !finalTeamsIds.includes(el.id)
				}));
			}
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});
	const unAssignTeamHandler = (index: number, team): void => {
		setFinalTeams((prev) => {
			const temp = prev.teams.map((el, i) => {
				if (i === index) {
					return teamInit;
				} else {
					return el;
				}
			});
			return { teams: temp };
		});

		setCupTeams((prev) => {
			return [...prev, team];
		});
	};

	return (
		<>
			<A4TeamsCup>
				<div className="round__header semi__final w-25">
					<div className="m-auto py-2">{t('semi-final')}</div>
				</div>
				<div className="round__header final w-50">
					<div className="m-auto py-2">{t('final')}</div>
				</div>
				<div className="round__header semi__final w-25">
					<div className="m-auto py-2">{t('semi-final')}</div>
				</div>
			</A4TeamsCup>

			<SmallCup>
				<div className="trophy__container">
					<figure className="trophy__image mb-[1em]">
						<img src={trophy} alt="" />
					</figure>
				</div>

				<A4TeamsCup className="relative">
					<div className="small__cup__round w-25 ">
						<div className="round__game left">
							<div className={`game-pointer`}></div>
							<>
								<CupTeam
									teams={cupTeams}
									teamIndx={0}
									team={finalTeams.teams[0]}
									unAssignTeamHandler={unAssignTeamHandler}
									addTeamHandler={addTeamHandler}
								/>
								<CupTeam
									teams={cupTeams}
									teamIndx={1}
									team={finalTeams.teams[1]}
									unAssignTeamHandler={unAssignTeamHandler}
									addTeamHandler={addTeamHandler}
								/>
							</>
						</div>
					</div>
					<div className="small__cup__round cup__final w-50 ">
						<div className="round__game w-50">
							<div className={`cup__addteam__card flex justify-center gap-2 text-[#AFAFAF] items-end`}></div>
						</div>
						<div>x</div>
						<div className="round__game cup__final w-50">
							<div className={`cup__addteam__card flex justify-center gap-2 text-[#AFAFAF] items-end`}></div>
						</div>
					</div>
					<div className="small__cup__round w-25 ">
						<div className="round__game right">
							<div className={`game-pointer`}></div>
							<>
								<CupTeam
									teams={cupTeams}
									teamIndx={2}
									team={finalTeams.teams[2]}
									unAssignTeamHandler={unAssignTeamHandler}
									addTeamHandler={addTeamHandler}
								/>
								<CupTeam
									teams={cupTeams}
									teamIndx={3}
									team={finalTeams.teams[3]}
									unAssignTeamHandler={unAssignTeamHandler}
									addTeamHandler={addTeamHandler}
								/>
							</>
						</div>
					</div>
				</A4TeamsCup>
			</SmallCup>
		</>
	);
};

export default Cup4Teams;
