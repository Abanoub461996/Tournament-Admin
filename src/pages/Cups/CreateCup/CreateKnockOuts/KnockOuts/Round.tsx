import { useEffect, useState } from 'react';
import trophy from '../../../../../assets/images/Cup.svg';
import CupTeam from './CupTeam';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Team, teamInit } from '../CreateKnockOuts';
import { useQuery } from 'react-query';
import { closeLoader, showLoader } from '../../../../../core/store/slices/loaderSlice';
import Spinner from '../../../../../components/Spinner/Spinner';
import { useAppDispatch } from '../../../../../core/hooks/hooks';
import { getSystemTeams } from '../../../../../core/api/axiosCalls';

interface RoundProps {
	teamsType?: string;
	handleCreate: any;
	randomized: number;
	finalTeams: any;
	setFinalTeams: any;
}

const Round = ({ round, games, totalRounds, finalTeams, setFinalTeams, handleCreate, randomized , teamsType}) => {
	const location = useLocation();
	const state = location.state;
	const { t } = useTranslation();
	const [cupTeams, setCupTeams] = useState<Array<Team>>([]);
	const [gamesArr, setGamesArr] = useState<Array<number>>([]);
	const [finalTeamsIds,setFinalTeamsIds] = useState<number[]>(finalTeams.teams.map(el=>el.id))
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (!state.status) {
			setCupTeams(state.teams);
		}
		setGamesArr(new Array(games).fill(games));
	}, [games]);
	useEffect(() => {
		if (randomized || state.status) {
			setCupTeams(new Array());
		}
	}, [randomized]);
	const getunassignedteams = useQuery({
		queryKey: [`system-query-${teamsType}`,teamsType],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await getSystemTeams(teamsType);
		},
		onSuccess: (data: any) => {
			setCupTeams(data.filter(el=>{
				return !finalTeamsIds.includes(el.id)
			}));
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});
	const addTeamHandler = (index: number, childTeam): void => {
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
			<div className={`grid-round`} data-round={games}>
				{games === 1 && (
					<>
						<div className={`final__trophy__parent absolute w-full ${totalRounds === 4 ? 'bottom-[calc(55%_+_1em)]' : 'bottom-[calc(60%_+_1em)]'}`}>
							<figure className={`final__trophy my-0 mx-auto ${totalRounds === 4 ? 'w-[calc(40%_-_1em)]' : 'w-[calc(27%_-_1em)]'} `}>
								<img src={trophy} alt="cup-trophy" />
							</figure>
						</div>
					</>
				)}
				{games === finalTeams.teams.length / 2 &&
					finalTeams.teams.map((team, i) => {
						return (
							!(i % 2) && (
								<div className="round-game" key={`round-${i}`}>
									<div className={`game-pointer ${round.status === 'pending' ? 'pending' : ''}`}></div>
									<CupTeam
										teams={cupTeams}
										teamIndx={i}
										team={finalTeams.teams[i]}
										unAssignTeamHandler={unAssignTeamHandler}
										addTeamHandler={addTeamHandler}
									/>
									<CupTeam
										teams={cupTeams}
										teamIndx={i + 1}
										team={finalTeams.teams[i + 1]}
										unAssignTeamHandler={unAssignTeamHandler}
										addTeamHandler={addTeamHandler}
									/>
								</div>
							)
						);
					})}
				{games !== finalTeams.teams.length / 2 &&
					gamesArr.map((team, i: number) => {
						return (
							<div className="round-game" key={`round-${i}`}>
								<div className={`game-pointer`}></div>
								<div className={`cup__addteam__card flex justify-center gap-2 text-[#AFAFAF] items-end`}></div>
								<div className={`cup__addteam__card flex justify-center gap-2 text-[#AFAFAF] items-end`}></div>
							</div>
						);
					})}
			</div>
		</>
	);
};
export default Round;
