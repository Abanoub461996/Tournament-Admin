import React, { useState } from 'react';
import { TabPanel, TabView } from 'primereact/tabview';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../core/store/slices/loaderSlice';
import Spinner from '../../../components/Spinner/Spinner';
import { endTournament, getTournment } from '../../../core/api/axiosCalls';
import { Button } from 'primereact/button';

// ASSETS
import settingsIcon from './../../../assets/icons/tournaments/setting.png';
import { CompetitionHeader, InnerDetailsContainer, MainDetailsLayout } from '../../../layouts/TournamentLayout/CompetationDetails.style';
import '../../../core/GlobalDigitalStyle/global.css';
import Popup from '../../../components/Popup/Popup';
import AssignPopUp, { typeName } from './AssignPopUp';
import TournamentRounds from './TournamentRounds/TournamentRounds';
import TournamentStanding from './TournamentStanding/TournamentStanding';
import { resetDialogue, setDialogue } from '../../../core/store/slices/dialogueSlice';
import deleteUserIcon from '../../../assets/icons/Group172565.png';
import successIcon from '../../../assets/icons/Group 171119.png';


type tournamentInfoType = {
	status: string;
	name: string;
	photo: string;
	rounds: [];
	type: string;
	slug: string;
	id: number | null;
	teams: [];
};

const TournamentDetails = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { t } = useTranslation();
	const { slug } = useParams();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState(0);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [activeRound, setActiveRound] = useState<string>();

	const [tournamentInfo, setTournamentInfo] = useState<tournamentInfoType>({
		name: '',
		photo: '',
		rounds: [],
		type: '',
		slug: '',
		id: null,
		teams: [],
		status:''
	});

	const tournamentPage = useQuery({
		queryKey: [`tournament`],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await getTournment(slug);
		},
		onSuccess: (data: any) => {
			dispatch(closeLoader());
			setTournamentInfo(data.record);
			setActiveRound(data.record.rounds.filter((el) => el.status === 'started')[0]?.name);
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});

	const renderPopUp = () =>
		showPopUp === true && (
			<Popup
				title={`Assign ${typeName[tournamentInfo.type]?.name}`}
				content={<AssignPopUp data={tournamentInfo} show={showPopUp} setShow={setShowPopUp} getData={tournamentPage} slug={tournamentInfo.slug} />}
				show={showPopUp}
				setShow={setShowPopUp}
				width="30"
			/>
		);
	const handleConfirm = async (slug:string|undefined) => {
		if(slug){
			try {
				dispatch(resetDialogue());
				dispatch(showLoader({ show: true, animation: <Spinner /> }));
				const res = await endTournament(slug);
				dispatch(
					setDialogue({
						show: true,
						type: 'Confirmation',
						acceptColor: '#65A743',
						textColor: '#65A743',
						image: successIcon,
						hasAction: false,
						title: `${t('tournament_ended')}`,
						text: res.message,
					}),
				);
				setTimeout(() => {
					dispatch(resetDialogue());
					navigate('/tournament');
				}, 2500);
			} catch (error) {}
			dispatch(closeLoader());

		}
	};
	const confirmEndTour = () => {
		dispatch(
			setDialogue({
				show: true,
				type: 'Confirmation',
				acceptLabel: `${t('Confirm')}`,
				acceptColor: 'var(--main-color)',
				textColor: 'var(--main-color)',
				image: deleteUserIcon,
				hasAction: true,
				onAccept: () => {handleConfirm(slug)},
				onReject: () => dispatch(resetDialogue()),
				rejectLabel: `${t('Cancel')}`,
				title: `${t('sure_title')}`,
				text: `${t('end_tour_msg')}`,
			}),
		);
	};

	return (
		<>
			<MainDetailsLayout>
				<CompetitionHeader>
					<div className="header__container">
						<div className="competition__identifier">
							<figure className="header__image">
								{tournamentInfo.photo && <img src={`${import.meta.env.VITE_THUMBNAILS}${tournamentInfo.photo}`} alt="competition logo image" />}
							</figure>
							<div className="header__text">
								<div className="tournament__name">{tournamentInfo.name}</div>
								<div className="round__number">{activeRound ? activeRound : t('no_rounds')}</div>
							</div>
						</div>
						{tournamentInfo?.status ==="pending" && !tournamentInfo?.rounds.length && (
							<div onClick={() => setShowPopUp(true)} className="settings__btn">
								<img src={settingsIcon} alt="settingsIcon" />
								<div className="capitalize">{`${t(`Assign ${typeName[tournamentInfo.type]?.name || 'Teams'}`)}`} </div>
							</div>
						)}
						{(tournamentInfo?.status ==="started" && !!tournamentInfo?.rounds.length && tournamentInfo?.rounds.every((el:any)=>el?.result_published)) && (
							<div onClick={() => confirmEndTour()} className="settings__btn">
								<img src={settingsIcon} alt="settingsIcon" />
								<div className="capitalize">{`${t(`end__tournament`)}`} </div>
							</div>
						)}
					</div>
				</CompetitionHeader>
				<InnerDetailsContainer className="relative">
					<TabView onTabChange={(e) => setActiveTab(e.index)} activeIndex={activeTab}>
						<TabPanel className="tabParentContainer" header={`${t('tour__rounds', { key: 'Tournament' })}`}>
							<TournamentRounds
								slug={slug}
								id={tournamentInfo.id}
								assignedTeams={tournamentInfo.teams}
								tournamentName={tournamentInfo.name}
								tournamentPhoto={tournamentInfo.photo}
							/>
						</TabPanel>
						<TabPanel className="tabParentContainer" header={`${t('Standing Table')}`}>
							<TournamentStanding slug={slug} />
						</TabPanel>
					</TabView>
					{/* <pre>{JSON.stringify(location.state)}</pre> */}
				</InnerDetailsContainer>
			</MainDetailsLayout>
			{renderPopUp()}
			{!!activeTab && <div className="h-2"></div>}
		</>
	);
};

export default TournamentDetails;
