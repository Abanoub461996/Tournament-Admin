import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import { useAppDispatch } from '../../core/hooks/hooks';
import { deleteCup, getAllTeams, getCupsPages, removeTeam } from '../../core/api/axiosCalls';
import moment from 'moment';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';
import {routeModel} from "./../../core/enum/routeModels";
// Components
import BreadcrumbsComp from '../../components/BreadCrumb/BreadCrumb';
import CreateBtn from '../../components/CreateBtn/CreateBtn';
import QueryDropdown from '../../components/QueryDropdown/QueryDropdown';
import QuerySearch from '../../components/QuerySearch/QuerySearch';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import Table from '../../components/Table/Table';
import CreateCup from './CreateCup/CreateCup';

// ASSETS
import { InnerContainer, MainLayout, MainLayoutHeader, PaginationContainer } from '../../layouts/MainLayout.style';
import empty_standing from '../../assets/images/empty_standing.svg';
import deleteUserIcon from '../../assets/icons/Group172565.png';
import successIcon from '../../assets/icons/Group 171119.png';
import { toastifySuccess } from '../../core/toaster/toastify';
import EditCup from './EditCup/EditCup';

const CupsMain = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [cups, setCups] = useState<Array<Record<string, any>>>([]);

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
	const [filter, setFilter] = useState<any>({ name: 'All Champions', value: '*'});
	const [options] = useState<Array<Record<string, any>>>([
		{ name: 'All Cups', value: '*'},
		{ name: 'Started', value: 'started'},
		{ name: 'Pending', value: 'pending' },
		{ name: 'Finished', value: 'finished'},
	]);
	const [dbCups,setDbCups] = useState<Array<any>>([])

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
	const cupsPage = useQuery({
		queryKey: [`cupss-page${paginationHelper.current_page}${filter.value}${search}`, paginationHelper.current_page, filter.value, search],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await getCupsPages(paginationHelper.current_page, filter.value, search);
		},
		onSuccess: (data: any) => {
			setDbCups(JSON.parse(JSON.stringify(data.data)))
			const modified = tableRow(data.data);
			setCups(modified);
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
		{ field: 'identification', header: t('cup_id'), width: '25%', fontSize: '1.125em' },
		{ field: 'teamsNo', header: t('teams_joined'), width: '10%', fontSize: '1.125em' },
		{ field: 'type', header: t('cup_type'), width: '10%', fontSize: '1.125em' },
		{ field: 'created_at', header: t('table_created_on'), width: '10%', fontSize: '1.125em' },
		{ field: 'started_at', header: t('table_started_at'), width: '10%', fontSize: '1.125em' },
		{ field: 'state', header: t('status'), width: '10%', fontSize: '1.125em' },
    ];
	const showCup = (cup) => {
		if(cup.status === "pending"){
			navigate(`/${routeModel.championsCup}/${cup.slug}`,{state:{status:'pending',slug:cup.slug}});

		}else{
			navigate(`/${routeModel.championsCup}/${cup.slug}`);
		}
		
	};
	const tableRow = (data) => {
		const editedData = data.map((record: Record<string, any>) => {
			record.identification = (
				<div className="team__name__container cursor-pointer" onClick={() => showCup(record)}>
					<img className="rounded-[50%] img" src={import.meta.env.VITE_THUMBNAILS + record.photo} alt="teamIcon" />
					<span className="team__name ">{record.name}</span>
				</div>
			);
			record.teamsNo = <span className="cup__teams_count table_def__text">{t("teams_count",{key:record.teams_count})}</span>;
			
			record.type = <span className="cup__type table_def__text">{record.type.charAt(0).toUpperCase() + record.type.slice(1)}</span>;
			record.created_at = <span className="cup__created_at table_def__text">{moment(record.created_at).format('MMMM Do, YYYY')}</span>;
			record.started_at = <span className="cup__started_at table_def__text">{moment(record.start_date).format('MMMM Do, YYYY')}</span>;
			record.state = <span className={`cup__status table_def__text ${record.status}`}>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}</span>;
			return record;
		});
		return editedData;
	};
	
	// Delete Team
	const handleDelete = async (slug: string) => {
		try {
			dispatch(resetDialogue());
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			const res = await deleteCup(slug);
			toastifySuccess(res.message)
		} catch (error) {}
		dispatch(closeLoader());
		cupsPage.refetch();
	};
	const handleRecall = ()=>{
		cupsPage.refetch();

	}

	const confirmDeleteCup = (slug: string) => {
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
				title: `${t('DeleteCupTitle')}`,
				text: `${t('DeleteCupText')}`,
			}),
		);
	};
	const [createOpened, setCreateOpened] = useState<boolean>(false);
	const [editOpened, setEditOpened] = useState<boolean>(false);
	const [cupSlug, setCupSlug] = useState<string>('');
	const [cup, setCup] = useState<any>(null);

	const hidePopup = () => {
		setCreateOpened(false);
		setEditOpened(false);
	};
	const editCup = (slug: any) => {
		setEditOpened(true);
		setCupSlug(slug);
		setCup(()=>{
			return dbCups.filter((el,i)=>el.slug === slug)[0]
		});
	};
	return (
		<>
			{createOpened && <CreateCup hideCreate={hidePopup} />}
			{editOpened && <EditCup hideEdit={hidePopup} slug={cupSlug} cup={cup} callRefetch={handleRecall}/>}

			<MainLayout>
				<MainLayoutHeader>
					<div>
						<BreadcrumbsComp />
						<p className="page__title">{t('Champions_Cup')}</p>
					</div>
					<div onClick={() => setCreateOpened(true)}>
						<CreateBtn label={t('create_new', { key: 'Cup' })} />
					</div>
				</MainLayoutHeader>
				<InnerContainer className='inner' >
					<div className=" ">
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
							<div className="">
								<QueryDropdown
                                sorting={false}
									classNames={'standingDropdown'}
									options={options}
									searchQueries={(inputValue: Record<string, any>) => {
										setFilter(() => options.filter((el) => el.value === inputValue)[0]);
										setQueryPage(1);
									}}
								/>
							</div>
						</div>
						{cups.length ? (
							<div className="inner__page__content">
								<Table
									cols={cols}
									data={cups}
									actions={{
										hasActions: true,
										hasEdit: true,
										hasDelete: true,
									}}
									editAction={(slug) => editCup(slug)}
									deleteAction={confirmDeleteCup}
									deleteBtn="Delete Cup"
									editBtn="Edit Cup"
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

export default CupsMain;
