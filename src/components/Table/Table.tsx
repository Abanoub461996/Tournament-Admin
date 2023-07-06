import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Warper, ActionsButtonWarper } from './Table.style';
import { useTranslation } from 'react-i18next';
import menu from '../../assets/icons/teams/menu.png';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import edit from '../../assets/icons/teams/edit.png';
import deleteIcon from '../../assets/icons/teams/delete.png';
import { PopoverInnerWrapper } from './PopOver.style';

type TableType = {
	data: any;
	cols: any;
	actions: {
		hasActions: boolean;
		hasEdit: boolean;
		hasDelete: boolean;
	};
	className?: string;
	editAction?: (slug: string) => void;
	deleteAction?: (slug: string) => void;
	editBtn?: string;
	deleteBtn?: string;
	totalRecords?: number;
	setPage?: Function | undefined;
	page?: number | undefined;
	hasPaginator?: boolean;
	hasIndexIndecator?: boolean;
	heightControl?: number;
	handleRowClick?: (e) => void;
};

const Table = ({ data, cols, actions, editAction, deleteAction, editBtn, deleteBtn, heightControl, className, handleRowClick }: TableType) => {
	const { t } = useTranslation();

	const [sortFiled, setSortFiled] = useState('');
	const [sortOrder, setSortOrder] = useState(null);

	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(6);

	const onSort = (event: any) => {
		setSortFiled(event.sortField);
		setSortOrder(event.sortOrder);
	};

	const actionsButtons = (data: any) => {
		const [showPopUp, setShowPopup] = useState(false);
		const handleClick = (event) => {
			setShowPopup(!showPopUp);
		};
		useEffect(() => {
			// FAHMY WAS HERE
			document.addEventListener('click', handleClickOutside, true);
			return () => {
				document.removeEventListener('click', handleClickOutside, true);
			};
		}, []);
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setShowPopup(false);
			}
		};
		const ref: any = useRef(null);

		return data.status && data.competition_type !== 'tournament' && data.status !== 'pending' ? (
			<div>
				<img
					className="m-2"
					alt="menuIcons"
					onClick={(e) => {
						e.stopPropagation();
					}}
					src={menu}
				/>
			</div>
		) : (
			<OverlayTrigger
				placement="left"
				show={showPopUp}
				delay={{ show: 250, hide: 400 }}
				trigger="click"
				rootClose
				overlay={
					<Popover className="popover">
						<Popover.Body className="p-0 ">
							<PopoverInnerWrapper className="m-0 flex flex-col gap-0 items-start font-semibold">
								{editAction && (
									<div
										onClick={(e) => {
											e.stopPropagation();
											editAction(data.slug);
										}}
										className=" edit__btn hover:bg-[#0000001A]"
									>
										<img src={edit} alt="edit icon" />
										<div>{editBtn} </div>
									</div>
								)}
								{deleteAction && (
									<div
										onClick={(e) => {
											e.stopPropagation();
											deleteAction(data.slug);
										}}
										className="delete__btn hover:bg-[#0000001A]"
									>
										<img src={deleteIcon} alt="delete icon" />
										<div>{deleteBtn}</div>
									</div>
								)}
							</PopoverInnerWrapper>
						</Popover.Body>
					</Popover>
				}
			>
				<ActionsButtonWarper>
					<div
						className="menu_icon__btn"
						onClick={(e) => {
							e.stopPropagation();
							handleClick(e);
						}}
						ref={ref}
					>
						<img className="m-2" alt="menuIcons" src={menu} />
					</div>
				</ActionsButtonWarper>
			</OverlayTrigger>
		);
	};

	const rowClass = (data: any) => {
		return {
			activeRow: data.is_my_team === true,
		};
	};

	const dynamicColumns = cols.map((col: any, i: number, data) => {
		return (
			<Column
				style={{
					color: col.color,
					width: col.width,
					cursor: handleRowClick && 'pointer',
				}}
				key={col.field}
				field={col.field}
				header={col.header}
				align={col.align || 'left'}
			/>
		);
	});

	return (
		<Warper heightControl={heightControl}>
			<DataTable
				onRowClick={(e) => handleRowClick && handleRowClick(e.data.slug)}
				className={className}
				value={data}
				lazy
				rowClassName={rowClass}
				emptyMessage={() => <></>}
			>
				{dynamicColumns}

				{actions.hasActions ? <Column field="" header="" body={actionsButtons}></Column> : null}
			</DataTable>
		</Warper>
	);
};

export default Table;
