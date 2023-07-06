import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';

// Components
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';

import { useAppDispatch } from '../../../core/hooks/hooks';
import { toastifyWarn } from '../../../core/toaster/toastify';
import { resetDialogue, setDialogue } from '../../../core/store/slices/dialogueSlice';
import { AssignTeamsToTournment, getSystemMembers } from '../../../core/api/axiosCalls';

// ASSETS
import { PopUpContainer } from '../Tournament.style';
import closemodal from '../../../assets/icons/teams/close-modal.png';
import successIcon from '../../../assets/icons/Group 171119.png';
import { ReactComponent as Removeuser } from '../../../assets/icons/teams/remove-circle.svg';

export const typeName = {
	teams: { name: 'Teams' },
	individual: { name: 'Members' },
};

type AssignPopUpProps = {
	data: any;
	show: boolean;
	setShow: any;
	getData: any;
	slug: string;
};

const AssignPopUp = ({ data, show, setShow, getData, slug }: AssignPopUpProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [focused, setFocused] = useState<any>(false);
	const [searchedList, setSearchedList] = useState<any>([]);
	const [assignedList, setAssignedList] = useState<[]>(data.teams);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		mode: 'all',
	});
	const getMemebers = useQuery({
		queryKey: [`members`],
		queryFn: async () => {
			setFocused(false);
			data = {
				type: data.type,
			};
			return await getSystemMembers(data);
		},
		onSuccess: (data: any) => {
			const res = data.map((i) => ({ ...i, name: i.name, code: i.id }));
			setSearchedList(res);
		},
		onSettled: () => {},
	});

	const handleSelectmember = (e) => {
		setFocused(false);

		setAssignedList((prev) => {
			let arr: any = [...prev];
			arr.push(e);
			return arr;
		});
		setSearchedList((prev) => {
			return prev.filter((el: any) => el?.id !== e.id);
		});
	};

	const removeMemeber = (member) => {
		setAssignedList((prev: any) => {
			return prev.filter((el: any) => el.id !== member.id);
		});

		setSearchedList((prev): any => {
			let arr: any = [...prev];
			arr.push(member);
			return arr;
		});
	};

	const memberTemplate = (option: any) => {
		return (
			<div className="flex gap-2 text-xs items-center  p-0 ">
				<img className="w-[2em] h-[2em]  rounded-[50%]" src={`${import.meta.env.VITE_THUMBNAILS}${option.photo}`} alt="leaderIcon" />
				<span className="member__name">{option.name}</span>
			</div>
		);
	};

	//================================ submit ===========================================//

	const onSubmit = async (data) => {
		try {
			setLoading(true);
			if (assignedList.length === 0) {
				toastifyWarn(t('complete_form'));
				setLoading(false);
				return;
			}
			const assignData: any = {
				teams: assignedList.map((i: any) => i.id),
			};
			const res = await AssignTeamsToTournment(assignData, slug);

			setShow(!show);
			getData.refetch();
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('assignTitle')}`,
					text: res.message,
				}),
			);
			setTimeout(() => dispatch(resetDialogue()), 2500);
		} catch (error) {}
		setLoading(false);
	};

	return (
		<PopUpContainer>
			<form className="flex flex-col mt-[1em] gap-[1.5em] max-h-[100%] Tournament__Form" onSubmit={handleSubmit(onSubmit)}>
				<div className="modal__team__add_members">
					<div className="form__field flex flex-col mb-2">
						<label className={`input__label text-[#1E1E1E] font-[1em] font-[700] mb-[0.5em]`} htmlFor="email">
							{t('field_label', { field: `Add ${typeName[data.type].name} ` })}
							<span className="ms-2 text-[#65A743] font-[700] text-sm">({assignedList.length} added)</span>
						</label>
						<div className="datalist__parent ">
							<img
								onClick={() => {
									setFocused(false);
								}}
								className="datalist_close_btn"
								src={closemodal}
								alt="closePopup"
							/>
							<Controller
								control={control}
								name="assignedList"
								render={({ field }) => (
									<ListBox
										filter
										id="teams"
										// value={systemMembers}
										onChange={(e) => handleSelectmember(e.value)}
										options={searchedList}
										optionLabel="model"
										itemTemplate={memberTemplate}
										onFocus={(e) => {
											setFocused(true);
										}}
										filterBy="name,email"
										className={`w-full md:w-14rem datalist__container ${errors[`name`] ? 'p-invalid' : ''} ${focused ? '' : 'hide'}`}
										listStyle={{ maxHeight: '250px' }}
										filterPlaceholder={`${t(`${data.type}_search`)}`}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{assignedList.length === 0 && <div className="h-12"></div>}
				{assignedList.length > 0 && (
					<div className="selected__List ">
						<label className={`input__label text-[#1E1E1E] font-[1em] font-[700]`} htmlFor="email">
							{t('field_label', { field: 'Members' })}
						</label>
						{assignedList.map((member: any, i) => (
							<div className="flex justify-between items-center " key={i}>
								<div className="team__name__container w-[50%] ">
									<img className="mr-[.75em] rounded-[50%] img member_img" src={`${import.meta.env.VITE_THUMBNAILS}${member.photo}`} alt="teamIcon" />
									<span className="team__name ">{member.name}</span>
								</div>
								{member?.members_count && (
									<div className="w-[35%]">
										<p className="p-2 text-[0.9em] text-[#01ABC1] bg-[#01ABC11A] font-[700]  w-fit rounded">{member?.members_count || ''} Members</p>
									</div>
								)}

								<div className="remove__member w-[15%] flex text-xs gap-1 items-center cursor-pointer" onClick={() => removeMemeber(member)}>
									<Removeuser className={`w-[18px] h-[18px] m-0 stroke-[0.5px]`} />
									<p className="font-[700] members__count ">{t('remove')}</p>
								</div>
							</div>
						))}
					</div>
				)}
				<Button
					type="submit"
					label={loading ? 'Loading...' : `${t(`Save Changes `)}`}
					className="custom__button ml-auto"
					disabled={loading ? true : false}
				></Button>
			</form>
		</PopUpContainer>
	);
};

export default AssignPopUp;
