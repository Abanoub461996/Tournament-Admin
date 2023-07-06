import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import { useAppDispatch } from '../../core/hooks/hooks';
import moment from 'moment';

// Components
import Popup from '../../components/Popup/Popup';
import Table from '../../components/Table/Table';
import BreadcrumbsComp from '../../components/BreadCrumb/BreadCrumb';
import CreateBtn from '../../components/CreateBtn/CreateBtn';
import Spinner from '../../components/Spinner/Spinner';
import { deleteTournment, getAllTournments } from '../../core/api/axiosCalls';
import QuerySearch from '../../components/QuerySearch/QuerySearch';
import Pagination from '../../components/Pagination/Pagination';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';
import QueryDropdown from '../../components/QueryDropdown/QueryDropdown';

// ASSETS
import { MainLayout, InnerContainer, MainLayoutHeader, PaginationContainer } from '../../layouts/MainLayout.style';
import empty_standing from '../../assets/images/empty_standing.svg';
import successIcon from '../../assets/icons/Group 171119.png';
import deleteUserIcon from '../../assets/icons/Group172565.png';
import TournamentPopUp from './TournamentPopUp';
import { routeModel } from '../../core/enum/routeModels';

const filterOptions = [
	{ name: 'All Tournaments', value: '*' },
	{ name: 'Started', value: 'started' },
	{ name: 'Pending', value: 'pending' },
	{ name: 'Finished', value: 'finished' },
];

const MainTournaments = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [action, setAction] = useState<string>('');
	const [editedUser, setEditedUsers] = useState<any>({});
	const [tournments, setTournments] = useState<Array<Record<string, any>>>([]);
	const [filter, setFilter] = useState<any>({ name: 'All Tournaments', value: '*' });

	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [paginationHelper, setPaginationHelper] = useState({
		start: 1,
		current_page: 1,
		end: 1,
		total: 6,
		per_page: 6,
	});
	const [searchVal, setSearchVal] = useState('');
	// OnClick Function
	const handleSearch = (e) => {
		setSearchVal(e);
		setQueryPage(1);
	};

	const tournamentsPage = useQuery({
		queryKey: [`user-page${paginationHelper.current_page}${filter.name}${searchVal}`, paginationHelper.current_page, filter.value],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			let data: any = {
				page: paginationHelper.current_page,
				status: filter.value,
			};
			if (searchVal !== '') {
				data.search = searchVal;
			}
			return await getAllTournments(data);
		},
		onSuccess: (data: any) => {
			dispatch(closeLoader());
			const modified = tableRow(data.data);
			setTournments(modified);
			setPaginationHelper((prev) => ({
				...prev,
				current_page: data.current_page,
				end: data.last_page,
				total: data.total,
				per_page: data.per_page,
			}));
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});

	const setQueryPage = (page) => {
		setPaginationHelper((prev) => ({
			...prev,
			current_page: page,
		}));
	};
	useEffect(() => {
		tournamentsPage.refetch();
	}, [paginationHelper.current_page]);

	const renderPopUp = () =>
		showPopUp === true && (
			<Popup
				title={`${action} New Tournament`}
				content={
					<TournamentPopUp
						show={showPopUp}
						setShow={setShowPopUp}
						getData={tournamentsPage}
						action={action}
						data={action === 'create' ? null : editedUser}
						slug={action === 'create' ? null : editedUser.slug}
					/>
				}
				show={showPopUp}
				setShow={setShowPopUp}
				width="22"
			/>
		);

	const handleEdit = (slug: string) => {
		const editedUserData = tournments.find((item) => item.slug === slug);
		setEditedUsers(editedUserData);
		setShowPopUp(true);
		setAction('edit');
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
				title: `${t('DeleteTournmentTitle')}`,
				text: `${t('DeleteTournmentText')}`,
			}),
		);
	};

	const handleDelete = async (slug: string) => {
		try {
			dispatch(resetDialogue());
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			const res = await deleteTournment(slug);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('removeTournmentTitle')}`,
					text: res.message,
				}),
			);
		} catch (error) {}
		dispatch(resetDialogue());
		dispatch(closeLoader());
		tournamentsPage.refetch();
	};

	const handleRowClick = (record) => {
		navigate(`/${routeModel.tournament}/${record.slug}`, { state: record });
	};

	const cols = [
		{ field: 'nameRow', header: t('Tournament name'), width: '25%', fontSize: '1.125em' },
		{ field: 'teams_count', header: t('Teams joined'), width: '15%', fontSize: '1.125em' },
		{ field: 'typeRow', header: t('Tournament type'), width: '12%', fontSize: '1.125em' },
		{ field: 'created', header: t('Created on'), width: '12%', fontSize: '1.125em' },
		{ field: 'started', header: t('Started at'), width: '12%', fontSize: '1.125em' },
		{ field: 'statusRow', header: t('Status'), width: '10%', fontSize: '1.125em' },
	];
	const tableRow = (data) => {
		const editedData = data.map((record: Record<string, any>) => {
			record.nameRow = (
				<div className="Tournament__container cursor-pointer" onClick={() => handleRowClick(record)}>
					<img className="img border-2 border-[#01ABC1] rounded-[50%]" src={`${import.meta.env.VITE_THUMBNAILS}${record.photo}`} alt="teamIcon" />
					<span className="Tournament__name ">{record.name}</span>
				</div>
			);
			record.typeRow = (
				<div className="Tournament__container">
					<span className="Tournament__name ">{record.type}</span>
				</div>
			);
			record.typeRow = (
				<div className="Tournament__container">
					<span className="Tournament__name capitalize">{record.type}</span>
				</div>
			);
			record.teams_count = (
				<div className="Tournament__container ">
					<span className="Tournament__name px-4 py-2 text-[#01ABC1] bg-[#01ABC11A] w-fit rounded-3xl">{record.teams_count} Teams </span>
				</div>
			);
			record.created = (
				<div className="Tournament__container">
					<span className="Tournament__name ">{moment(record.created).format('MMM DD, YYYY')}</span>
				</div>
			);
			record.started = (
				<div className="Tournament__container">
					<span className="Tournament__name ">
						{record.start_date === 'Not yet!' ? record.start_date : moment(record.start_date).format('MMM DD, YYYY')}
					</span>
				</div>
			);
			record.statusRow = (
				<div className="Tournament__container">
					<span className={`cup__status Tournament__name capitalize ${record.status}`}>
						<span className="dot"></span> {record.status}
					</span>
				</div>
			);
			return record;
		});

		return editedData;
	};

	return (
		<>
			<MainLayout>
				<MainLayoutHeader>
					<div>
						<BreadcrumbsComp />
						<p className="page__title">{t('Tournaments')}</p>
					</div>
					{/* <CreateBtn hanleAction={() => navigate(`/users/${action}/${slug}`)} /> */}

					<CreateBtn
						label="Create New Tournament"
						handleAction={() => {
							setShowPopUp(true);
							setAction('create');
						}}
					/>
				</MainLayoutHeader>
				<InnerContainer>
					<div className="inner__controls flex justify-between items-center">
						<div className="inner__search">
							<QuerySearch placeholder={`${t('tournament_Search')}`} handleSearch={handleSearch} />
						</div>
						<div className="flex items-center gap-2">
							<p className="font-[1em] text-[#1E1E1E] font-[700] ">{t('Select Status')}</p>
							<QueryDropdown
								classNames={'standingDropdown'}
								options={filterOptions}
								searchQueries={(inputValue: Record<string, any>) => {
									setFilter(() => filterOptions.filter((el: any) => el.value === inputValue)[0]);
									setQueryPage(1);
								}}
								sorting={false}
							/>
						</div>
					</div>
					{tournments.length ? (
						<div className="inner__page__content">
							<Table
								cols={cols}
								data={tournments}
								actions={{
									hasActions: true,
									hasEdit: true,
									hasDelete: true,
								}}
								editAction={handleEdit}
								editBtn="Edit Tournament"
								deleteBtn="Delete Tournament"
								deleteAction={confirmDeleteUser}
								hasPaginator={false}
							/>
						</div>
					) : (
						<img className="h-[35vh] m-auto" src={empty_standing} alt="empty" />
					)}
				</InnerContainer>

				<PaginationContainer>
					<Pagination paginator={paginationHelper} setQueryPage={(page: number) => setQueryPage(page + 1)} />
				</PaginationContainer>
			</MainLayout>
			{renderPopUp()}
		</>
	);
};

export default MainTournaments;
