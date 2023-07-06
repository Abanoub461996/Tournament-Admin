import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import moment from 'moment';
import { Button } from 'primereact/button';

//Component
import CreateBtn from '../../../../components/CreateBtn/CreateBtn';
import QuerySearch from '../../../../components/QuerySearch/QuerySearch';
import Table from '../../../../components/Table/Table';
import QueryDropdown from '../../../../components/QueryDropdown/QueryDropdown';
import Pagination from '../../../../components/Pagination/Pagination';
import Spinner from '../../../../components/Spinner/Spinner';
import Popup from '../../../../components/Popup/Popup';
import RoundPopUp from './RoundPopUp';
import { useAppDispatch } from '../../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../../core/store/slices/loaderSlice';
import { resetDialogue, setDialogue } from '../../../../core/store/slices/dialogueSlice';
import { deleteTournmentRound, getTournmentRounds } from '../../../../core/api/axiosCalls';

//Assets
import { InnerContainer, PaginationContainer } from '../../../../layouts/MainLayout.style';

import emptyImg from '../../../../assets/images/no-run-acts.png';
import successIcon from '../../../../assets/icons/Group 171119.png';
import deleteUserIcon from '../../../../assets/icons/Group172565.png';
import { useNavigate } from 'react-router';
import { routeModel } from '../../../../core/enum/routeModels';

const filterOptions = [
	{ name: 'All Rounds', value: '*' },
	{ name: 'Started', value: 'started' },
	{ name: 'Pending', value: 'pending' },
	{ name: 'Finished', value: 'finished' },
];

const TournamentRounds = ({ slug, id, tournamentName, tournamentPhoto, assignedTeams }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [rounds, setRounds] = useState([]);
	const [editedRounds, setEditetdRounds] = useState<any>({});
	const [action, setAction] = useState<string>('');
	const [paginationHelper, setPaginationHelper] = useState({
		start: 1,
		current_page: 1,
		end: 1,
		total: 6,
		per_page: 6,
	});
	const [searchVal, setSearchVal] = useState('');
	const [filter, setFilter] = useState<any>({ name: 'All Rounds', value: '*' });
	const navigate = useNavigate();
	const roundsTable = useQuery({
		queryKey: [`rounds-table${paginationHelper.current_page}${filter.name}${searchVal}`, paginationHelper.current_page, filter.value],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			let data: any = {
				page: paginationHelper.current_page,
				status: filter.value,
			};
			if (searchVal !== '') {
				data.search = searchVal;
			}
			return await getTournmentRounds(data, slug);
		},
		onSuccess: (data: any) => {
			dispatch(closeLoader());
			const modified = tableRow(data.records.data);
			setRounds(modified);
			setPaginationHelper((prev) => ({
				...prev,
				current_page: data.records.current_page,
				end: data.records.last_page,
				total: data.records.total,
				per_page: data.records.per_page,
			}));
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});

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
		roundsTable.refetch();
	}, [paginationHelper.current_page]);

	const renderPopUp = () =>
		showPopUp === true && (
			<Popup
				title={`${action} New Round`}
				content={
					<RoundPopUp
						show={showPopUp}
						setShow={setShowPopUp}
						getData={roundsTable}
						action={action}
						data={action === 'create' ? null : editedRounds}
						slug={action === 'create' ? null : editedRounds.slug}
						id={id}
					/>
				}
				show={showPopUp}
				setShow={setShowPopUp}
				width="22"
			/>
		);

	const handleEdit = (slug: string) => {
		const editedRoundData: any = rounds.find((item: any) => item.slug === slug);
		setEditetdRounds(editedRoundData);
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
			const res = await deleteTournmentRound(slug);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('removeRoundTitle')}`,
					text: res.message,
				}),
			);
		} catch (error) {}
		dispatch(resetDialogue());
		dispatch(closeLoader());
		roundsTable.refetch();
	};
	const handleRowClick = (record) => {
		const data = {
			roundId: record.id,
			roundSlug: record.slug,
			roundName: record.name,
			tournamentName,
			assignedTeams,
			tournamentSlug: slug,
			photo: tournamentPhoto,
			type: 'TournamentRound',
			roundEndDate:record.end_date,
			status:record.status,
			result_published:record.result_published
		};
		navigate(`/${routeModel.activities}/${record.slug}`, { state: data });
	};

	const cols = [
		{ field: 'nameRow', header: t('Round name'), width: '20%', fontSize: '1.125em' },
		{ field: 'publishedOnRow', header: t('Published on'), width: '20%', fontSize: '1.125em' },
		{ field: 'endDateRow', header: t('Due Date'), width: '15%', fontSize: '1.125em' },
		{ field: 'activities_count', header: t('Total Activities'), width: '15%', fontSize: '1.125em' },
		{ field: 'statusRow', header: t('Status'), width: '15%', fontSize: '1.125em' },
	];

	const tableRow = (data) => {
		const editedData = data.map((record: Record<string, any>) => {
			record.nameRow = (
				<div className="Tournament__container p-1 cursor-pointer" onClick={(e) => handleRowClick(record)}>
					<span className="Tournament__name ">{record.name}</span>
				</div>
			);
			record.publishedOnRow = (
				<div className="Tournament__container p-1">
					<span className="Tournament__name ">{record.started_at ? moment(record.started_at).format('HH:mm, DD/M/YYYY') : 'not started yet'}</span>
				</div>
			);
			record.activities_count = (
				<div className="Tournament__container p-1">
					<span className="Tournament__name capitalize">{`${record.activities_count}`}</span>
				</div>
			);

			record.endDateRow = (
				<div className="Tournament__container p-1">
					<span className="Tournament__name ">{moment(record.end_date).format('HH:mm, DD/M/YYYY')}</span>
				</div>
			);
			record.statusRow = (
				<div className="Tournament__container p-1">
					<span className={`cup__status Tournament__name capitalize ${record.status}`}>
						<span className="dot"></span> {record.status}
					</span>
				</div>
			);
			return record;
		});

		return editedData;
	};

	if (rounds.length === 0) {
		return (
			<>
				{renderPopUp()}
				<EmptyRounds
					action={() => {
						setAction('create');
						setShowPopUp(true);
					}}
				/>
			</>
		);
	}

	return (
		<>
			<div className="absolute ml-auto w-fit right-0 top-[1em] 2xl:top-[1.5em] xl:top-[1.8em] lg:top-[1.75em] md:top-[1.2em] sm:top-[2em]  ">
				{<CreateBtn
					label="Create New Round"
					handleAction={() => {
						setAction('create');
						setShowPopUp(true);
					}}
				/>}
			</div>

			<InnerContainer>
				<div className="inner__controls  flex justify-between items-center">
					<div className="inner__search">
						<QuerySearch placeholder={`${t('round_search')}`} handleSearch={handleSearch} />
					</div>
					<div className=" flex items-center gap-2">
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
				<div className="inner__page__content">
					<Table
						cols={cols}
						data={rounds}
						actions={{
							hasActions: true,
							hasEdit: true,
							hasDelete: true,
						}}
						editAction={handleEdit}
						editBtn="Edit Round"
						deleteBtn="Delete Round"
						deleteAction={confirmDeleteUser}
						hasPaginator={false}
					/>
				</div>
			</InnerContainer>

			<PaginationContainer>
				<Pagination paginator={paginationHelper} setQueryPage={(page: number) => setQueryPage(page + 1)} />
			</PaginationContainer>
			{renderPopUp()}
		</>
	);
};

export default TournamentRounds;

const EmptyRounds = ({ action }) => {
	const { t } = useTranslation();

	return (
		<div className="w-full flex flex-col justify-center items-center p-8 gap-4 lg:text-[14px] md:text-[13px] sm:text-[11px]  ">
			<img className="w-[20%] h-auto" src={emptyImg} alt="empty" />
			<p className="w-[20em] text-[#AFAFAF] text-[1.25em] font-[600] text-center ">
				There is no round created yet, click create new round to be shown here
			</p>
			<Button onClick={() => action()} type="submit" label={`${t('Create New Round')}`} className="custom__button"></Button>
		</div>
	);
};
