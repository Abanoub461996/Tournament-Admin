import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import { useAppDispatch } from '../../core/hooks/hooks';
import moment from 'moment';

// Components
import { deleteUser, getAllUsers } from '../../core/api/axiosCalls';
import BreadcrumbsComp from '../../components/BreadCrumb/BreadCrumb';
import CreateBtn from '../../components/CreateBtn/CreateBtn';
import QueryDropdown from '../../components/QueryDropdown/QueryDropdown';
import QuerySearch from '../../components/QuerySearch/QuerySearch';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import Table from '../../components/Table/Table';
import Popup from '../../components/Popup/Popup';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';

// ASSETS
import { MainLayout, InnerContainer, MainLayoutHeader, PaginationContainer } from '../../layouts/MainLayout.style';
import empty_standing from '../../assets/images/empty_standing.svg';
import deleteUserIcon from '../../assets/icons/Group172565.png';
import successIcon from '../../assets/icons/Group 171119.png';
import UserPopUp from './UserPopUp/UserPopUp';

const filterOptions = [
	{ name: 'Sort Ascending', param: 'dir', value: 'asc' },
	{ name: 'Sort Descending', param: 'dir', value: 'desc' },
	{ name: 'Latest Joined', param: 'by', value: 'created_at' },
];

const UsersMainPage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [action, setAction] = useState<string>('');
	const [editedUser, setEditedUsers] = useState<any>({});
	const [users, setUsers] = useState<Array<Record<string, any>>>([]);
	const [filter, setFilter] = useState<any>({ name: 'Sort Ascending', param: 'dir', value: 'asc' });

	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [paginationHelper, setPaginationHelper] = useState({
		start: 1,
		current_page: 1,
		end: 6,
		total: 6,
		per_page: 6,
	});
	// * 3. Search
	const [searchVal, setSearchVal] = useState('');
	// OnClick Function
	const handleSearch = (e) => {
		setSearchVal(e);
		setQueryPage(1);
	};

	const usersPage = useQuery({
		queryKey: [`user-page${paginationHelper.current_page}${filter.name}${searchVal}`, paginationHelper.current_page, filter.value],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			let data: any = {
				page: paginationHelper.current_page,
				[filter.param]: filter.value,
			};
			if (searchVal !== '') {
				data.search = searchVal;
			}
			if (filter.param === 'by') {
				data.dir = 'desc';
			}

			return await getAllUsers(data);
		},
		onSuccess: (data: any) => {
			const modified = tableRow(data.data);
			setUsers(modified);
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
		usersPage.refetch();
	}, [paginationHelper.current_page]);

	const cols = [
		{ field: 'nameRow', header: t('User name'), width: '20%', fontSize: '1.125em' },
		{ field: 'emailRow', header: t('Email'), width: '15%', fontSize: '1.125em' },
		{ field: 'genderRow', header: t('Gender'), width: '8%', fontSize: '1.125em' },
		{ field: 'birthDate', header: t('Birth Date'), width: '10%', fontSize: '1.125em' },
		{ field: 'cityRow', header: t('City'), width: '12%', fontSize: '1.125em' },
		{ field: 'countryRow', header: t('Country'), width: '12%', fontSize: '1.125em' },
	];

	const tableRow = (data) => {
		const editedData = data.map((record: Record<string, any>) => {
			record.nameRow = (
				<div className="team__name__container ">
					<img className=" rounded-[50%] img" src={`${import.meta.env.VITE_THUMBNAILS}${record.photo}`} alt="teamIcon" />
					<span className="team__name ">{record.name}</span>
				</div>
			);
			record.cityRow = (
				<div className="team__name__container">
					<span className="team__name ">{record.city.name}</span>
				</div>
			);
			record.countryRow = (
				<div className="team__name__container">
					<span className="team__name ">{record.country.name}</span>
				</div>
			);
			record.birthDate = (
				<div className="team__name__container">
					<span className="team__name ">{moment(record.date_of_birth).format('MMM DD, YYYY')}</span>
				</div>
			);
			record.emailRow = (
				<div className="team__name__container">
					<span className="team__name ">{record.email}</span>
				</div>
			);
			record.genderRow = (
				<div className="team__name__container">
					<span className="team__name capitalize">{record.gender}</span>
				</div>
			);
			return record;
		});

		return editedData;
	};

	const renderPopUp = () =>
		showPopUp === true && (
			<Popup
				title={`${action} New User`}
				content={
					<UserPopUp
						show={showPopUp}
						setShow={setShowPopUp}
						getData={usersPage}
						action={action}
						data={action === 'create' ? null : editedUser}
						slug={action === 'create' ? null : editedUser.slug}
					/>
				}
				show={showPopUp}
				setShow={setShowPopUp}
			/>
		);

	const handleEdit = (slug: string) => {
		const editedUserData = users.find((item) => item.slug === slug);
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
				title: `${t('DeleteUserTitle')}`,
				text: `${t('DeleteUserText')}`,
			}),
		);
	};

	const handleDelete = async (slug: string) => {
		try {
			dispatch(resetDialogue());
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			const res = await deleteUser(slug);
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
		usersPage.refetch();
	};

	return (
		<>
			<MainLayout>
				<MainLayoutHeader>
					<div>
						<BreadcrumbsComp />
						<p className="page__title">{t('Users')}</p>
					</div>
					{/* <CreateBtn hanleAction={() => navigate(`/users/${action}/${slug}`)} /> */}
					<CreateBtn
						label="Create New User"
						handleAction={() => {
							setShowPopUp(true);
							setAction('create');
						}}
					/>
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
					{users.length ? (
						<div className="">
							<div className="inner__page__content">
								<Table
									cols={cols}
									data={users}
									actions={{
										hasActions: true,
										hasEdit: true,
										hasDelete: true,
									}}
									editAction={handleEdit}
									editBtn="Edit User"
									deleteBtn="Delete User"
									deleteAction={confirmDeleteUser}
									hasPaginator={false}
									className="userTable"
								/>
							</div>
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

export default UsersMainPage;
