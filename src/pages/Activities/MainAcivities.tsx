import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import { useAppDispatch } from '../../core/hooks/hooks';
import moment from 'moment';
import { CompetitionHeader, InnerDetailsContainer, MainDetailsLayout } from '../../layouts/TournamentLayout/CompetationDetails.style';
import { InnerContainer, MainLayout, MainLayoutHeader, PaginationContainer } from '../../layouts/MainLayout.style';
import CreateBtn from '../../components/CreateBtn/CreateBtn';
import Spinner from '../../components/Spinner/Spinner';
import QuerySearch from '../../components/QuerySearch/QuerySearch';
import QueryDropdown from '../../components/QueryDropdown/QueryDropdown';
import Table from '../../components/Table/Table';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';

import emptyImg from '../../assets/images/no-run-acts.png';
import successIcon from '../../assets/icons/Group 171119.png';
import deleteUserIcon from '../../assets/icons/Group172565.png';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Popup';
import { deleteActivity, getAllActivities, publishRoundScores, startCupRound, startTournamentRound } from '../../core/api/axiosCalls';
import ActivityPopUp from './ActivityPopUp';
import { routeModel } from '../../core/enum/routeModels';
import TimeConverter from '../../core/utils/TimeConverter';
import { BsPlayFill } from 'react-icons/bs';
import { toastifySuccess } from '../../core/toaster/toastify';
import DateTimePicker from '../../components/DateTime/DateTimePicker';

const filterOptions = [
	{ name: 'All Activites', value: 'all' },
	{ name: 'Running', value: 'running' },
	{ name: 'Pending', value: 'pending' },
	{ name: 'Under Review', value: 'under_review' },
	{ name: 'Published', value: 'published' },
];

type activitiesType = {
	slug: string;
};

const MainActivities = () => {
	const [activitiesInfo, setActivitiesInfo] = useState<any[]>([]);
	const [roundInfo, setRoundInfo] = useState<any>();
	const [editedActivities, setEditedActivities] = useState<any>({});
	const { slug } = useParams();
	const { state } = useLocation();
	const { assignedTeams, photo, roundId, roundName, roundSlug, tournamentName, tournamentSlug, type, status, result_published } = state;
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [action, setAction] = useState<string>('');
	const [editedUser, setEditedUsers] = useState<any>({});
	const [filter, setFilter] = useState<any>({ name: 'All Activites', value: 'all' });

	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [searchVal, setSearchVal] = useState('');
	const [paginationHelper, setPaginationHelper] = useState({
		start: 1,
		current_page: 1,
		end: 1,
		total: 6,
		per_page: 6,
	});

	const activitiesPage = useQuery({
		queryKey: [`activities-page${paginationHelper.current_page}${filter.name}${searchVal}`, paginationHelper.current_page, filter.value],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			let data: any = {
				page: paginationHelper.current_page,
				status: filter.value,
			};
			const body = {
				slug,
				type: type,
				round: roundId,
			};
			if (searchVal !== '') {
				data.search = searchVal;
			}

			return await getAllActivities(data, body);
		},
		onSuccess: (data: any) => {
			dispatch(closeLoader());
			const modified = tableRow(data.records.data);
			setActivitiesInfo(modified);
			setRoundInfo(data.round);
			setPaginationHelper((prev) => ({
				...prev,
				current_page: data.records.current_page || 1,
				end: data.records.last_page,
				total: data.records.total,
				per_page: data.records.per_page,
			}));
			dispatch(closeLoader());
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});

	// * 3. Search
	// OnClick Function
	const handleSearch = (e) => {
		setSearchVal(e);
		setQueryPage(1);
	};

	const setQueryPage = (page) => {
		setPaginationHelper((prev) => ({
			...prev,
			current_page: page,
		}));
	};
	useEffect(() => {
		activitiesPage.refetch();
	}, [paginationHelper.current_page]);

	const handleEdit = (slug: string) => {
		const editedRoundData: any = activitiesInfo.find((item: any) => item.slug === slug);
		setEditedActivities(editedRoundData);
		setShowPopUp(true);
		setAction('edit');
	};

	const handleRout = (record) => {
		navigate(`/${routeModel.activity}/${record.slug}`);
	};

	const confirmDeleteUser = (slug: string) => {
		dispatch(
			setDialogue({
				show: true,
				type: 'Confirmation',
				acceptLabel: `${t('Remove')}`,
				acceptColor: '#FF4A4A',
				textColor: '#FF4A4A',
				image: deleteUserIcon,
				hasAction: true,
				onAccept: () => handleDelete(slug),
				onReject: () => dispatch(resetDialogue()),
				rejectLabel: `${t('Cancel')}`,
				title: `${t('DeleteActivityTitle')}`,
				text: `${t('DeleteActivityText')}`,
			}),
		);
	};

	const handleDelete = async (slug: string) => {
		try {
			dispatch(resetDialogue());
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			const res = await deleteActivity(slug);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('removeActivityTitle')}`,
					text: res.message,
				}),
			);
		} catch (error) {}
		dispatch(resetDialogue());
		dispatch(closeLoader());
		activitiesPage.refetch();
	};

	const renderPopUp = () =>
		showPopUp === true && (
			<Popup
				title={`${action} Activity`}
				content={
					<ActivityPopUp
						data={editedActivities}
						show={showPopUp}
						setShow={setShowPopUp}
						getData={activitiesPage}
						slug={editedActivities.slug}
						editedActivities={editedActivities}
						tournamentSlug={tournamentSlug}
						action={action}
						assignedTeams={assignedTeams}
						stateData={state}
					/>
				}
				show={showPopUp}
				setShow={setShowPopUp}
				width="30"
			/>
		);

	const cols = [
		{ field: 'nameRow', header: t('Round name'), width: '17%', fontSize: '1.125em' },
		{ field: 'typeRow', header: t('Activity type'), width: '21%', fontSize: '1.125em', align: 'center' },
		{ field: 'durationRow', header: t('Activity Duration'), width: '16%', fontSize: '1.125em', align: 'center' },
		{ field: 'participantsRow', header: t('Participants'), width: '16%', fontSize: '1.125em', align: 'center' },
		{ field: 'scoreRow', header: t('Activity Score'), width: '15%', fontSize: '1.125em', align: 'center' },
		{ field: 'statusRow', header: t('Status'), width: '15%', fontSize: '1.125em' },
	];

	const tableRow = (data) => {
		const editedData = data.map((record: Record<string, any>) => {
			record.nameRow = (
				<div
					className={`Tournament__container p-1 ${record.status !== 'Pending' ? 'cursor-pointer' : 'none'}  `}
					onClick={(e) => (record.status !== 'Pending' ? handleRout(record) : null)}
				>
					<span className="Tournament__name ">{record.name}</span>
				</div>
			);
			record.typeRow = (
				<div className="Tournament__container p-1 justify-center">
					<span className="Tournament__name capitalize px-4 py-2 text-[#01ABC1] bg-[#01ABC11A] w-fit rounded-3xl ">{record.type}</span>
				</div>
			);

			record.durationRow = (
				<div className="Tournament__container p-1 justify-center">
					<span className="Tournament__name ">{moment.utc().startOf('day').add(record.duration, 'minutes').format('HH:mm:ss')} </span>
				</div>
			);
			record.participantsRow = (
				<div className="Tournament__container p-1 justify-center">
					<span className="Tournament__name ">Team {record.played_by}</span>
				</div>
			);
			record.scoreRow = (
				<div className="Tournament__container p-1 justify-center ">
					<span className="Tournament__name ">{record.total_score || '-'}</span>
				</div>
			);
			record.statusRow = (
				<div className="Tournament__container p-1">
					<span className={`Tournament__name capitalize ${record.status}`}>
						<span className="dot"></span> {record.status}
					</span>
				</div>
			);
			return record;
		});

		return editedData;
	};
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const showDatePicker =()=>{
		return (
			<Popup
				title={`Round End Time`}
				content={
					<DateTimePicker setShowPicker={setShowPicker} cupSlug={roundInfo.tournament.slug}/>
				}
				show={showPicker}
				setShow={setShowPicker}
				width="30"
			/>
		);
	}
	const startRound = async () => {
		
		if (roundInfo.cup_id) {
			setShowPicker(true);
		} else {
			await startTourRound()
		}
	};
	
	const startTourRound = async ()=>{
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		try {
			const res = await startTournamentRound(roundInfo.slug);
			toastifySuccess(t('round__started'));
			activitiesPage.refetch();
		} catch (error) {}
		dispatch(closeLoader());
	}
	const publishScores = async () => {
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		const type: string = roundInfo.cup_id ? 'cup' : 'tournament';
		try {
			const res = await publishRoundScores(type, roundSlug);
			toastifySuccess(t('round__score__published'));
			navigate(-1);
		} catch (error) {}
		dispatch(closeLoader());
	};

	return (
		<>
			<MainDetailsLayout>
				{showPicker && showDatePicker()}
				<CompetitionHeader>
					<div className="header__container flex justify-between">
						<div className="competition__identifier">
							<figure className="header__image">
								{roundInfo?.tournament.photo && (
									<img src={`${import.meta.env.VITE_THUMBNAILS}${roundInfo?.tournament.photo}`} alt="competition logo image" />
								)}
							</figure>
							<div className="header__text">
								<div className="tournament__name">{roundInfo?.tournament.name}</div>
								<div className="round__number">{roundInfo?.name}</div>
							</div>
						</div>
						<div className="tour__action__btn">
							{roundInfo?.status === 'pending' && !!activitiesInfo.length && (
								<div className="settings__btn" onClick={() => startRound()}>
									<BsPlayFill />
									<div>Start Round</div>
								</div>
							)}
							{roundInfo?.status === 'finished' && !roundInfo.result_published && (
								<div className="settings__btn" onClick={() => publishScores()}>
									<BsPlayFill />
									<div>Publish Scores</div>
								</div>
							)}
						</div>
					</div>
				</CompetitionHeader>
				<InnerDetailsContainer>
					<MainLayout width="100">
						<MainLayoutHeader>
							<div className="h-full border-b-2 border-[#01ABC1] text-[#01ABC1] py-2 font-[700] text-[1em]">Round Activities</div>
							{status !== 'finished' && (
								<div className="ml-auto">
									<CreateBtn
										label="Create New Activity"
										handleAction={() => {
											setShowPopUp(true);
											setAction('create');
										}}
									/>
								</div>
							)}
						</MainLayoutHeader>
						<InnerContainer>
							<div className="inner__controls flex justify-between items-center">
								<div className="inner__search">
									<QuerySearch placeholder={`${t('users_search')}`} handleSearch={handleSearch} />
								</div>
								<div className=" ">
									<QueryDropdown
										classNames={'standingDropdown'}
										options={filterOptions}
										searchQueries={(inputValue: Record<string, any>) => {
											setFilter(() => filterOptions.filter((el: any) => el.value === inputValue)[0]);
											setQueryPage(1);
										}}
										sorting={true}
									/>
								</div>
							</div>
							{activitiesInfo.length ? (
								<div className="">
									<div className="inner__page__content">
										<Table
											cols={cols}
											data={activitiesInfo}
											actions={{
												hasActions: true,
												hasEdit: true,
												hasDelete: true,
											}}
											editAction={handleEdit}
											editBtn="Edit Activity"
											deleteBtn="Delete Activity"
											deleteAction={confirmDeleteUser}
											hasPaginator={false}
											className="userTable"
										/>
									</div>
								</div>
							) : (
								<img className="h-[35vh] m-auto" src={emptyImg} alt="empty" />
							)}
						</InnerContainer>

						<PaginationContainer>
							<Pagination paginator={paginationHelper} setQueryPage={(page: number) => setQueryPage(page + 1)} />
						</PaginationContainer>
					</MainLayout>
					{renderPopUp()}
				</InnerDetailsContainer>
			</MainDetailsLayout>
			{/* {renderPopUp()} */}
		</>
	);
};

export default MainActivities;
