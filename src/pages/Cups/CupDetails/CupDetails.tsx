import React, { useState } from 'react';
import axiosInstance from '../../../core/api/axiosInstance';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { CupInterface, Team, cupinit, teamInit } from '../../../core/interfaces/cupInterface';
import { resetDialogue, setDialogue } from '../../../core/store/slices/dialogueSlice';
import { routeModel } from '../../../core/enum/routeModels';
import { reAssignTeams, startCup } from '../../../core/api/axiosCalls';
// Components
import Button from '../../../components/Button/Button';
import Knockouts from '../CreateCup/CreateKnockOuts/KnockOuts/KnockOuts';
import { closeLoader, showLoader } from '../../../core/store/slices/loaderSlice';
import Spinner from '../../../components/Spinner/Spinner';
import { TabPanel, TabView } from 'primereact/tabview';
import StartedKnockouts from './startedCup/StartedKnockOuts';
import CupRounds from './CupRounds/CupRounds';
import { toastifyError, toastifySuccess } from '../../../core/toaster/toastify';

// ASSETS
import settingsIcon from './../../../assets/icons/tournaments/setting.png';
import { CompetitionHeader, InnerDetailsContainer, MainDetailsLayout } from '../../../layouts/TournamentLayout/CompetationDetails.style';
import { BsPlayFill } from 'react-icons/bs';
import successIcon from '../../../assets/icons/Group 171119.png';

interface FinalTeamsInt {
	teams: Array<Team>;
}

const CupDetails = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [cup, setCup] = useState<CupInterface>(cupinit);
	const [finalTeams, setFinalTeams] = useState<FinalTeamsInt>({ teams: [] });
	const [baseTeams, setBaseTeams] = useState<FinalTeamsInt>({ teams: [] });
	const [rounds, setRounds] = useState<any>([]);
	const [activeRound, setActiveRound] = useState<string>();
	const [teamsType, setTeamsType] = useState<string>('teams');
	// !the Cyp sent as state to the child
	const { slug } = useParams();
	// !REACT QUERY
	const cupdetailspage = useQuery({
		queryKey: [`cup_profile-${slug}`],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await axiosInstance.get(`cups/${slug}`);
		},
		onSuccess: (data: any) => {
			if (data.data.cup) {
				setCup(data.data.cup);
				setRounds(data.data.rounds);
				setActiveRound(data.data.rounds.filter((el) => el.status === 'started')[0]?.name);
			} else if (data.data.record) {
				setCup(data.data.record);
				setTeamsType(data.data.record.type);
				setFinalTeams((prev) => {
					const temp = data.data.record.teams.map((el, i) => el);
					return { teams: temp };
				});
				setBaseTeams((prev) => {
					const temp = data.data.record.teams.map((el, i) => el);
					return { teams: temp };
				});
			}
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});

	const handleCreate = async () => {
		const ids:(number|null)[] = finalTeams.teams.map((el) => el.id)
		if (slug && cup) {
			if(cup.teams_count === ids.length){
				try {
					dispatch(resetDialogue());
					dispatch(showLoader({ show: true, animation: <Spinner /> }));
					const res = await reAssignTeams(slug,{teams:ids,teams_count:cup.teams_count});
					dispatch(
						setDialogue({
							show: true,
							type: 'Confirmation',
							acceptColor: '#65A743',
							textColor: '#65A743',
							image: successIcon,
							hasAction: false,
							title: `${t('Changes Saved')}`,
							text: 'You Have Changed The Teams successfully, You Can Start The Champions cup now.',
						}),
					);
				} catch (error) {}
			}else{
				toastifyError("Fill All Teams First!")
			}
		}
		dispatch(closeLoader());
		setTimeout(() => {
			dispatch(resetDialogue());
		}, 2500);
	};
	const startCupHandler = async () => {
		if (slug) {
			try {
				dispatch(resetDialogue());
				dispatch(showLoader({ show: true, animation: <Spinner /> }));
				const res = await startCup(slug);
				toastifySuccess(res.message);
				cupdetailspage.refetch()
				// navigate(`/${routeModel.championsCup}`);
			} catch (error) {}
			dispatch(closeLoader());
		}
	};
	return (
		<MainDetailsLayout>
			<CompetitionHeader>
				<div className="header__container">
					<div className="competition__identifier">
						<figure className="header__image">
							{cup.photo && <img src={`${import.meta.env.VITE_THUMBNAILS}${cup.photo}`} alt="competition logo image" />}
						</figure>
						<div className="header__text">
							<div className="tournament__name">{cup?.name || `Champions Cup`}</div>
							<div className="round__number">{activeRound ? activeRound : t('no_rounds')}</div>
						</div>
					</div>
					{cup.status === 'pending' && (
						<div className="settings__btn" onClick={startCupHandler}>
							<BsPlayFill />
							<div>Start Champions Cup</div>
						</div>
					)}
				</div>
			</CompetitionHeader>
			<InnerDetailsContainer>
				{cup.status === 'pending' && (
					<div className="cup__controllers flex">
						<Button
							onClick={() => handleCreate()}
							type="submit"
							label={t('save_changes')}
							className="cup__create ms-auto bg-primary text-white"
						></Button>
					</div>
				)}
				{cup.slug && (
					<TabView activeIndex={cup.status === 'pending' ? 1 : 0}>
						<TabPanel
							disabled={cup.status === 'pending' ? true : false}
							className=" hover:bg-[#f9f9f9]"
							header={`${t('tour__rounds', { key: 'Champions Cup' })}`}
						>
							<CupRounds cup={cup} slug={cup.slug} teams={finalTeams}/>
						</TabPanel>
						<TabPanel className="tabParentContainer cursor-default" header={`${t('knockout_stage')}`}>
							{cup.status === 'pending' && <Knockouts teamsType={teamsType} finalTeams={finalTeams} setFinalTeams={setFinalTeams} />}
							{cup.status && cup.status !== 'pending' && <StartedKnockouts rounds={rounds} teamsCount={cup.teams_count} />}
						</TabPanel>
					</TabView>
				)}
			</InnerDetailsContainer>
		</MainDetailsLayout>
	);
};

export default CupDetails;
