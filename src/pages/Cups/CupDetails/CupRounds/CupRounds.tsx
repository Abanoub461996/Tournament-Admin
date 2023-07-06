import React, { useState, useEffect } from 'react';
import CreateBtn from '../../../../components/CreateBtn/CreateBtn';
import { InnerContainer, PaginationContainer } from '../../../../layouts/MainLayout.style';
import QuerySearch from '../../../../components/QuerySearch/QuerySearch';
import QueryDropdown from '../../../../components/QueryDropdown/QueryDropdown';
import Table from '../../../../components/Table/Table';
import Pagination from '../../../../components/Pagination/Pagination';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import emptyImg from '../../../../assets/images/no-run-acts.png';
import { useQuery } from 'react-query';
import { useAppDispatch } from '../../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../../core/store/slices/loaderSlice';
import Spinner from '../../../../components/Spinner/Spinner';
import { deleteTournmentRound, getCupRounds, getTournmentRounds } from '../../../../core/api/axiosCalls';
import moment from 'moment';
import Popup from '../../../../components/Popup/Popup';
import { resetDialogue, setDialogue } from '../../../../core/store/slices/dialogueSlice';
import successIcon from '../../../../assets/icons/Group 171119.png';
import deleteUserIcon from '../../../../assets/icons/Group172565.png';
import { routeModel } from '../../../../core/enum/routeModels';
import { useNavigate } from 'react-router';
// import RoundPopUp from './RoundPopUp';

const filterOptions = [
	{ name: 'All Rounds', value: '*' },
	{ name: 'Started', value: 'started' },
	{ name: 'Pending', value: 'pending' },
	{ name: 'Finished', value: 'finished' },
];
interface CupRoundsProps {
	slug: string;
	id?: number;
	teams?: any;
	cup?: any;
}

const CupRounds = ({ slug, id, cup, teams }: CupRoundsProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [rounds, setRounds] = useState([]);
	const [editedRounds, setEditetdRounds] = useState<any>({});
	const [action, setAction] = useState<string>('');

	const [searchVal, setSearchVal] = useState('');
	const [filter, setFilter] = useState<any>({ name: 'All Rounds', value: '*' });

	const roundsTable = useQuery({
		queryKey: [`cupRounds-table${filter.name}${searchVal}`, filter.value],
		queryFn: async () => {
			let params: any = {
				status: filter.value,
			};
			if (searchVal !== '') {
				params.search = searchVal;
			}
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await getCupRounds(params, slug);
		},
		onSuccess: (data: any) => {
			dispatch(closeLoader());
			const modified = tableRow(data.records.data);
			setRounds(modified);
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});

	// OnClick Function
	const handleSearch = (e) => {
		setSearchVal(e);
	};

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
	const navigate = useNavigate();

	const handleRowClick = (record) => {
		const data = {
			roundId: record.id,
			roundSlug: record.slug,
			roundName: record.name,
			tournamentName: cup.name,
			assignedTeams: teams,
			tournamentSlug: slug,
			photo: cup.photo,
			type: 'CupRound',
			roundEndDate: record.end_date,
			status:record.status
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
				<div
					className={`Tournament__container ${record.can_access_activities ? 'cursor-pointer' : 'pointer-events-none'}`}
					onClick={(e) => handleRowClick(record)}
				>
					<span className="Tournament__name ">{record.name}</span>
				</div>
			);
			record.publishedOnRow = (
				<div className="Tournament__container">
					<span className="Tournament__name ">{record.started_at ? moment(record.started_at).format('HH:mm, DD/M/YYYY') : 'not started yet'}</span>
				</div>
			);
			record.activities_count = (
				<div className="Tournament__container">
					<span className="Tournament__name capitalize">{`${record.activities_count}`}</span>
				</div>
			);

			record.endDateRow = (
				<div className="Tournament__container">
					<span className="Tournament__name ">{moment(record.end_date).format('HH:mm, DD/M/YYYY')}</span>
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
			<InnerContainer>
				<div className="inner__controls  flex justify-between items-center">
					<div className="inner__search">
						<QuerySearch placeholder={`${t('round_search')}`} handleSearch={handleSearch} searchQueries={(e) => {}} />
					</div>
					<div className=" flex items-center gap-2">
						<p className="font-[1em] text-[#1E1E1E] font-[700] ">{t('Select Status')}</p>
						<QueryDropdown
							classNames={'standingDropdown'}
							options={filterOptions}
							searchQueries={(inputValue: Record<string, any>) => {
								setFilter(() => filterOptions.filter((el: any) => el.value === inputValue)[0]);
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
							hasActions: false,
							hasEdit: false,
							hasDelete: false,
						}}
						hasPaginator={false}
					/>
				</div>
			</InnerContainer>
		</>
	);
};

export default CupRounds;
