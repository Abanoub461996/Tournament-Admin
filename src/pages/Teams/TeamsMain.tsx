import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import { useAppDispatch } from '../../core/hooks/hooks';
import { getAllTeams, removeTeam } from '../../core/api/axiosCalls';
import moment from 'moment';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';
import { Link } from 'react-router-dom';

// Components
import BreadcrumbsComp from '../../components/BreadCrumb/BreadCrumb';
import CreateBtn from '../../components/CreateBtn/CreateBtn';
import QueryDropdown from '../../components/QueryDropdown/QueryDropdown';
import QuerySearch from '../../components/QuerySearch/QuerySearch';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import Table from '../../components/Table/Table';
import TeamMembersImgs from '../../components/TeamMembersImgs/TeamMembersImgs';

// ASSETS
import { InnerContainer, MainLayout, MainLayoutHeader, PaginationContainer } from '../../layouts/MainLayout.style';
import empty_standing from '../../assets/images/empty_standing.svg';
import CreateTeam from './CreateTeam/CreateTeamModal';
import deleteUserIcon from '../../assets/icons/Group172565.png';
import successIcon from '../../assets/icons/Group 171119.png';
import EditTeam from './EditTeam/EditTeam';

const TeamsMain = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [teams, setTeams] = useState<Array<Record<string, any>>>([]);
	const location = useLocation();

	const [paginationHelper, setPaginationHelper] = useState({
		start: 1,
		current_page: 1,
		end: 1,
		total: 6,
		per_page: 6,
	});
	// !REQUEST QUERIES
	// * 1. Pagination
	const setQueryPage = (page) => {
		setPaginationHelper((prev) => ({
			...prev,
			current_page: page,
		}));
	};

	// * 2. Filter
	const [filter, setFilter] = useState<any>({ name: 'Sort Ascending', dir: 'asc', by: 'name', value: 0 });
	const [options] = useState<Array<Record<string, any>>>([
		{ name: 'Sort Ascending', dir: 'asc', by: 'name', value: 0 },
		{ name: 'Sort Descending', dir: 'desc', by: 'name', value: 1 },
		{ name: 'Latest Joined', dir: 'desc', by: 'created_at', value: 2 },
	]);

	// * 3. Search
	const [searchVal, setSearchVal] = useState('');
	const [search, setSearch] = useState<string>('');
	// OnClick Function
	const handleSearch = () => {
		setSearch(searchVal);
		setQueryPage(1);
	};
	// OnChange Function
	const searchQueries = (value) => {
		setSearchVal(value);
	};

	// !REACT QUERY
	const teamsPage = useQuery({
		queryKey: [`teams-page${paginationHelper.current_page}${filter.name}${search}`, paginationHelper.current_page, filter, search],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await getAllTeams(paginationHelper.current_page, filter, search);
		},
		onSuccess: (data: any) => {
			const modified = tableRow(data.data);
			setTeams(modified);
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

	// TABLE GENERATOR

	const cols = [
		{ field: 'name', header: t('table_team_name'), width: '25%', fontSize: '1.125em' },
		{ field: 'leader', header: t('table_team_leader'), width: '30%', fontSize: '1.125em' },
		{ field: 'members', header: t('table_team_members'), width: '22%', fontSize: '1.125em' },
		{ field: 'created_at', header: t('table_created_on'), width: '15%', fontSize: '1.125em' },
	];
	const showTeam = (slug) => {
		navigate(`/teams/${slug}`);
	};
	const tableRow = (data) => {
		const editedData = data.map((record: Record<string, any>) => {
			record.name = (
				<div className="team__name__container cursor-pointer" onClick={() => showTeam(record.slug)}>
					<img className="img rounded-[50%]" src={import.meta.env.VITE_THUMBNAILS + record.photo} alt="teamIcon" />
					<span className="team__name ">{record.name}</span>
				</div>
			);
			record.leader = (
				<div className="team__leader__container">
					<img className=" rounded-[50%]" src={import.meta.env.VITE_THUMBNAILS + record.leader.photo} alt="leaderIcon" />
					<div className="flex flex-col">
						<span className="leader__name ">{record.leader.name}</span>
						<span className="leader__email ">{record.leader.email}</span>
					</div>
				</div>
			);
			record.created_at = <span className="team__created_at table_def__text">{moment(record.created_at).format('MMMM Do,YYYY')}</span>;
			record.members = <TeamMembersImgs leftRatio={8} width={2.5} clearmembersCount={4} members={record.members} />;
			return record;
		});
		return editedData;
	};
	// Delete Team
	const handleDelete = async (slug: string) => {
		try {
			dispatch(resetDialogue());
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			const res = await removeTeam(slug);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('removeUserTitle')}`,
					text: res.message,
				}),
			);
		} catch (error) {}
		dispatch(resetDialogue());
		dispatch(closeLoader());
		teamsPage.refetch();
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
				title: `${t('DeleteTeamTitle')}`,
				text: `${t('DeleteTeamText')}`,
			}),
		);
	};
	const [createOpened, setCreateOpened] = useState<boolean>(false);
	const [editOpened, setEditOpened] = useState<boolean>(false);
	const [teamSlug, setTeamSlug] = useState<string>('');
	const hidePopup = () => {
		setCreateOpened(false);
		setEditOpened(false);
	};
	const editTeam = (slug: any) => {
		setEditOpened(true);
		setTeamSlug(slug);
	};
	return (
		<>
			{createOpened && <CreateTeam hideCreate={hidePopup} />}
			{editOpened && <EditTeam hideEdit={hidePopup} slug={teamSlug} />}

			<MainLayout>
				<MainLayoutHeader>
					<div>
						<BreadcrumbsComp />
						<p className="page__title">{t('Teams')}</p>
					</div>
					<div onClick={() => setCreateOpened(true)}>
						<CreateBtn label={t('create_new', { key: 'Team' })} />
					</div>
				</MainLayoutHeader>
				<InnerContainer>
					<div className="">
						<div className="inner__controls flex justify-between items-center">
							<div className="inner__search">
								<QuerySearch
									placeholder={`${t('team_search')}`}
									searchQueries={(inputValue: string) => {
										searchQueries(inputValue);
									}}
									handleSearch={handleSearch}
								/>
							</div>
							<QueryDropdown
								sorting={true}
								classNames={'standingDropdown'}
								options={options}
								searchQueries={(inputValue: Record<string, any>) => {
									setFilter(() => options.filter((el) => el.value === inputValue)[0]);
									setQueryPage(1);
								}}
							/>
						</div>
						{teams.length ? (
							<div className="inner__page__content">
								<Table
									cols={cols}
									data={teams}
									actions={{
										hasActions: true,
										hasEdit: true,
										hasDelete: true,
									}}
									editAction={(slug) => editTeam(slug)}
									deleteAction={confirmDeleteUser}
									deleteBtn="Delete Team"
									editBtn="Edit Team"
									hasPaginator={false}
								/>
							</div>
						) : (
							<img className="h-[35vh] m-auto" src={empty_standing} alt="empty" />
						)}
					</div>
				</InnerContainer>

				<PaginationContainer>
					<Pagination paginator={paginationHelper} setQueryPage={(page: number) => setQueryPage(page + 1)} />
				</PaginationContainer>
			</MainLayout>
		</>
	);
};

export default TeamsMain;
