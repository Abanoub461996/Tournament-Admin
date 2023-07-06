import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ModalWrapper } from './Modal.style';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../core/store/slices/loaderSlice';
import { useQuery } from 'react-query';

// Components
import Button from '../../../components/Button/Button';
import Table from '../../../components/Table/Table';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { toastifyWarn } from '../../../core/toaster/toastify';

// ASSETS
import closemodal from './../../../assets/icons/teams/close-modal.png';
import changeIcon from '../../../assets/icons/gallery-edit.svg';
import { createTeam, getSystemUsers } from '../../../core/api/axiosCalls';
import { resetDialogue, setDialogue } from '../../../core/store/slices/dialogueSlice';
import successIcon from '../../../assets/icons/Group 171119.png';
import { ReactComponent as Removeuser } from './../../../assets/icons/teams/remove-circle.svg';
import Spinner from '../../../components/Spinner/Spinner';

const CreateTeam = ({ hideCreate }) => {
	const { t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loading, setLoading]= useState<boolean>(false)

	const schema = yup.object({
		teamName: yup
			.string()
			.trim()
			.required(`${t('required_field')}`)
			.min(1, `${t('min_input', { key: 5, field: 'Team Name' })}`)
			.max(30, `${t('max_input', { key: 30, field: 'Team Name' })}`),
		slogan: yup
			.string()
			.required(`${t('required_field')}`)
			.min(1, `${t('min_input', { key: 8, field: 'Slogan' })}`)
			.max(70, `${t('max_input', { key: 20, field: 'Slogan' })}`),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'all',
	});
	const [newImage, setNewImage] = useState<any>();
	const onSubmit = async (data: any) => {
		if (!lead.leader_id) {
			toastifyWarn('You Need To Select A Team Leader For The Team!');
			return;
		}
		formData.append(`name`, data.teamName);
		formData.append(`photo`, newImage);
		formData.append(`leader_id`, lead.leader_id);
		formData.append(`slogan`, data.slogan);
		members.map((el, i) => {
			formData.append(`members[]`, el.id);
		});
		setLoading(true)
		try {
			const res = await createTeam(formData);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: t('createTeamTitle'),
					text: res.message,
				}),
			);
			dispatch(closeLoader());
			setTimeout(() => dispatch(resetDialogue()), 2000);
			navigate(`/teams/${res.slug}`);
		} catch (error) {}
		dispatch(closeLoader());
		setLoading(false)
		setTimeout(() => dispatch(resetDialogue()), 2000);


	};
	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};

	const [members, setMembers] = useState<Array<Record<string, any>>>([]);
	const teamsPage = useQuery({
		queryKey: [`system-members`],
		queryFn: async () => {
			return await getSystemUsers();
		},
		onSuccess: (data: any) => {
			setSystemMembers(data);
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});
	const cols = [
		{ field: 'details', width: '50%', fontSize: '1.125em' },
		{ field: 'checked', width: '25%', fontSize: '1.125em' },
		{ field: 'remove', width: '10%', fontSize: '1.125em' },
	];
	const removeMemeber = (id) => {
		if (lead && id === lead.leader_id) {
			setLead({});
		}
		setMembers((prev) => {
			return prev.filter((el) => el.id !== id);
		});
		setSystemMembers((prev): any => {
			let thisMemeber = members.filter((el) => el.id === id);
			return [...prev, ...thisMemeber];
		});
	};
	const [lead, setLead] = useState<any>({});
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
							{record.email && record.email.indexOf('@') > 4
								? record.email.slice(0, 5) + '...' + record.email.slice(record.email.indexOf('@'))
								: record.email}
						</span>
					</div>
				</div>
			);
			record.checked = (
				<div className={`leader__check flex text-xs ${lead && lead.leader_id === record.id ? 'checked' : ''}`}>
					<input
						type={'checkbox'}
						checked={lead && lead.leader_id === record.id}
						onChange={(e) => {
							setLead({ leader_id: record.id });
						}}
						className={`me-1`}
					/>
					<>{t('team_lead')}</>
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
	tableRow(members);

	// Photo input
	const [photo, setPhoto] = useState<any>();
	let formData = new FormData();
	const [validImg, setValidImg] = useState<boolean>(true);

	const changeImage = (e) => {
		setNewImage((prev) => e.target.files[0]);
		setPhoto(URL.createObjectURL(e.target.files[0]));
		setValidImg(true);
	};

	// DATA LIST
	const [systemMembers, setSystemMembers] = useState([]);

	const [focused, setFocused] = useState<any>(false);

	const memberSelected = (e) => {
		setFocused(false);
		setMembers((prev) => {
			return [...prev, e];
		});
		setSystemMembers((prev) => {
			return prev.filter((el: any) => el?.id !== e.id);
		});
	};
	const memberTemplate = (option: any) => {
		return (
			<>
				<div className="member__container flex gap-2 items-center">
					<img className="w-[2em] h-[2em] rounded-[50%]" src={import.meta.env.VITE_THUMBNAILS + option.photo} alt="leaderIcon" />
					<div className="flex flex-col">
						<span className="member__name">{option.name}</span>
						<span className="member__email font-light text-[#AFAFAF]">{option.email}</span>
					</div>
				</div>
			</>
		);
	};
	return (
		<ModalWrapper className="top-0 absolute left flex items-center justify-center h-full z-[calc(998)]">
			<form className="modal__container bg-white relative p-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="modal__header flex w-full justify-between items-center">
					<div className="modal__title font-extrabold">{t('create_new', { key: 'Team' })}</div>
					<div
						className="modal__close_btn"
						onClick={() => {
							hideCreate();
						}}
					>
						<img src={closemodal} alt="close_modal" />
					</div>
				</div>
				<div className="modal__body">
					<div className="modal__team__id flex justify-between items-center">
						<div className="team__photo">
							{!photo ? (
								<>
									<img className="upload_image" src={changeIcon} alt="icon" />
									<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => changeImage(e)}></input>
								</>
							) : (
								<>
									<img className="selected_image" src={photo} alt="icon" />
									<div className="change_photo">
										<img className="change_image_icon" src={changeIcon} alt="icon" />
										<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => changeImage(e)}></input>
									</div>
								</>
							)}
						</div>
						<div className="form__field flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Team Name' })}
							</label>
							<InputText
								{...register('teamName')}
								type="teamName"
								id="teamName"
								placeholder={`${t('field_placeholder', { field: 'Team Name' })}`}
								className={`input__field ${errors[`teamName`] ? 'p-invalid' : ''}`}
							/>
							{getFormErrorMessage('teamName')}
						</div>
					</div>
					<div className="modal__team__slogan ">
						<div className="form__field flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Team Slogan' })}
							</label>
							<InputText
								{...register('slogan')}
								type="slogan"
								id="slogan"
								placeholder={`${t('field_placeholder', { field: 'Team Slogan' })}`}
								className={`input__field ${errors[`slogan`] ? 'p-invalid' : ''}`}
							/>
							{getFormErrorMessage('slogan')}
						</div>
					</div>
					<div className="modal__team__add_members">
						<div className="form__field flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Add Members' })}
								<span className="text-[#65A743] "> ({members.length} added)</span>
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
									onChange={(e) => memberSelected(e.value)}
									options={systemMembers}
									optionLabel="model"
									itemTemplate={memberTemplate}
									filterPlaceholder={`${t('users_search')}`}
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
								data={members}
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
					<Button type="submit" label={loading ? 'Loading...' : `${t(`Save Changes`)}`}
					disabled={loading ? true : false} className="form__submit__btn ms-auto bg-primary text-white"></Button>
				</div>
			</form>
		</ModalWrapper>
	);
};

export default CreateTeam;
