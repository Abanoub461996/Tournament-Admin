import React, { useState } from 'react';
import {  useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import Button from '../../../../components/Button/Button';
import { assignTeamMembers, getSystemUsers } from '../../../../core/api/axiosCalls';
import { closeLoader, showLoader } from '../../../../core/store/slices/loaderSlice';
// Components

import { ListBox } from 'primereact/listbox';
import Table from '../../../../components/Table/Table';
import Spinner from '../../../../components/Spinner/Spinner';
// ASSETS
import closemodal from './../../../../assets/icons/teams/close-modal.png';
import { AddMemberWrapper } from './AddMember.style';
import { useAppDispatch } from '../../../../core/hooks/hooks';
import { ReactComponent as Removeuser } from './../../../../assets/icons/teams/remove-circle.svg';
import { toastifySuccess } from '../../../../core/toaster/toastify';



const AddTeamMember = ({ show, setShow, slug, members,assignedMembers }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [teamMembers, setTeamMembers] = useState<Array<Record<string, any>>>([]);
	const [membersIds] = useState<Array<number>>(members.map((el) => el.id));
	const teamsPage = useQuery({
		queryKey: [`system-members`],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));

			return await getSystemUsers();
		},
		onSuccess: (data: any) => {
			setSystemMembers(
				data.filter((el) => {
					return !membersIds.includes(el.id);
				}),
			);
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});
	const cols = [
		{ field: 'details', width: '80%', fontSize: '1.125em' },
		{ field: 'remove', width: '20%', fontSize: '1.125em' },
	];
	const removeMemeber = (id) => {
		setTeamMembers((prev) => {
			return prev.filter((el) => el.id !== id);
		});
		setSystemMembers((prev): any => {
			let thisMemeber = teamMembers.filter((el) => el.id === id);
			return [...prev, ...thisMemeber];
		});
	};
	const tableRow = (data) => {
		const editedData = data.map((record: Record<string, any>) => {
			record.details = (
				<div className="member__container flex gap-2 text-xs">
					<img
						className="w-[2.5em] h-[2.5em] rounded-[50%]  border-[1px] border-[#0000001A]"
						src={import.meta.env.VITE_THUMBNAILS + record.photo}
						alt="leaderIcon"
					/>
					<div className="flex flex-col">
						<span className="member__name">{record.name}</span>
						<span className="member__email font-light text-[#AFAFAF]">
							{(record.email && record.email.indexOf('@') > 4) ? record.email.slice(0, 5) + '...' + record.email.slice(record.email.indexOf('@')):record.email}
						</span>
					</div>
				</div>
			);
			record.remove = (
				<div className="remove__member flex text-xs gap-1 items-center cursor-pointer" onClick={() => removeMemeber(record.id)}>
					<Removeuser className={`w-[20px] h-[20px] m-0 stroke-[0.5px]`} />
					<div className="font-semibold">{t('remove')}</div>
				</div>
			);
			return record;
		});
		return editedData;
	};
	tableRow(teamMembers);

	// DATA LIST
	const [systemMembers, setSystemMembers] = useState([]);

	const [focused, setFocused] = useState<any>(false);

	const memberSelected = (e) => {
		setFocused(false);
		setTeamMembers((prev) => {
			return [...prev, e];
		});
		setSystemMembers((prev) => {
			return prev.filter((el: any) => el?.id !== e.id);
		});
	};
	const memberTemplate = (option: any) => {
		return (
			<>
				<div className="member__container flex gap-2 text-xs items-center">
					<img className="w-[2em] h-[2em] rounded-[50%]" src={import.meta.env.VITE_THUMBNAILS + option.photo} alt="leaderIcon" />
					<div className="flex flex-col">
						<span className="member__name">{option.name}</span>
						<span className="member__email font-light text-[#AFAFAF]">{option.email}</span>
					</div>
				</div>
			</>
		);
	};
	const assignMembers = async () => {
		const data=[...teamMembers.map((el) => el.id)]
		const appended = data.filter(el=> !membersIds.includes(el))
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		try {
			const res = await assignTeamMembers(slug, {members:appended});
			setShow(false)
			assignedMembers()
			toastifySuccess('Members of the Team Has Been Updated.')
		} catch (error) {
		}
		dispatch(closeLoader())

		
	};
	

	return (
		<AddMemberWrapper className="top-0 absolute left flex items-center justify-center h-full z-[calc(998)]">
			<form className="modal__container bg-white w-[45%] relative p-4">
				<div className="modal__header flex w-full justify-between items-center">
					<div className="modal__title font-extrabold">{t('add_member')}</div>
					<div className="modal__close_btn" onClick={() => setShow(false)}>
						<img src={closemodal} alt="close_modal" />
					</div>
				</div>
				<div className="modal__body">
					<div className="modal__team__add_members">
						<div className="form__field flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Add Members' })}
								
							</label>
							<div className="datalist__parent">
								<img
									onClick={() => {
										setFocused(false);
									}}
									className="datalist_close_btn"
									src={closemodal}
									alt="closePopup"
								/>
								<ListBox
									filter
									value={systemMembers}
									filterPlaceholder={`${t('users_search')}`}
									onChange={(e) => memberSelected(e.value)}
									options={systemMembers}
									optionLabel="model"
									itemTemplate={memberTemplate}
									onFocus={(e) => {
										setFocused(true);
									}}
									filterBy="name,email"
									className={`w-full md:w-14rem datalist__container ${focused ? '' : 'hide'}`}
									listStyle={{ maxHeight: '160px' }}
								/>
							</div>
						</div>
					</div>
					<div className="modal__team__members">
						<div className="form__field flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Members' })}
							</label>
							<Table
								cols={cols}
								data={teamMembers}
								heightControl={20}
								actions={{
									hasActions: false,
									hasEdit: false,
									hasDelete: false,
								}}
								hasPaginator={false}
							/>
						</div>
					</div>
				</div>
				<div className="modal__footer w-full">
					<Button
						type="button"
						onClick={assignMembers}
						label={t('save_changes')}
						className="form__submit__btn ms-auto bg-primary text-white"
					></Button>
				</div>
			</form>
		</AddMemberWrapper>
	);
};

export default AddTeamMember;
