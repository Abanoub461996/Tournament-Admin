import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../core/store/slices/loaderSlice';
import { useQuery } from 'react-query';
import {  getTeam, unassignTeamMember, updateTeam } from '../../../core/api/axiosCalls';
import { resetDialogue, setDialogue } from '../../../core/store/slices/dialogueSlice';
// Components
import Button from '../../../components/Button/Button';
import Table from '../../../components/Table/Table';
import { InputText } from 'primereact/inputtext';
import Spinner from '../../../components/Spinner/Spinner';
import { toastifyWarn } from '../../../core/toaster/toastify';
// ASSETS
import closemodal from './../../../assets/icons/teams/close-modal.png';
import changeIcon from '../../../assets/icons/gallery-edit.svg';
import successIcon from '../../../assets/icons/Group 171119.png';
import { ModalWrapper } from '../CreateTeam/Modal.style';
import { ReactComponent as Removeuser } from './../../../assets/icons/teams/remove-circle.svg';



const EditTeam = ({ hideEdit, slug }: { hideEdit: any; slug: string }) => {
	const { t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [newImage, setNewImage] = useState<any>();
	let formData = new FormData();
	const [loading, setLoading] = useState<boolean>(false)

	// !Form Initiation
	const schema = yup.object({
		teamName: yup
			.string()
			.trim()
			.required(`${t('required_field')}`)
			.min(1, `${t('min_input', { key: 5, field: 'Team Name' })}`)
			.max(30, `${t('max_input', { key: 120, field: 'Team Name' })}`),
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
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'all',
	});

	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error font-semibold text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};

	// ?Submit The Form

	const onSubmit = async (data: any) => {
		formData.append(`name`, data.teamName);
		newImage && formData.append(`photo`, newImage);
		formData.append(`leader_id`, lead.leader_id);
		data.slogan && formData.append(`slogan`, data.slogan);
		formData.append(`_method`, 'PUT');
		setLoading(true)
		try {
			const res = await updateTeam(slug, formData);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: t('team_edit'),
					text: res.message,
				}),
			);
			setTimeout(() => dispatch(resetDialogue()), 2500);
			hideEdit();
			navigate(`/teams/${slug}`);
		} catch (error) {}
		dispatch(closeLoader());
		setLoading(false)

	};

	// *Getting Team To Edit
	const [members, setMembers] = useState<Array<Record<string, any>>>([]);
	const teamsPage = useQuery({
		queryKey: [`teams-page${slug}`, slug],
		queryFn: async () => {
			setLoading(true)
			return await getTeam(slug);
		},
		onSuccess: (data: any) => {
			setMembers(data.record.members);
			setPhoto(`${import.meta.env.VITE_THUMBNAILS}${data.record.photo}`);
			setValue('teamName', data.record.name);
			setValue('slogan', data.record.slogan);
			setLead({ leader_id: data.record.leader.id });
		},
		onSettled: () => {
			dispatch(closeLoader());
			setLoading(false)
		},
	});
	const cols = [
		{ field: 'details', width: '45%', fontSize: '1.125em' },
		{ field: 'checked', width: '25%', fontSize: '1.125em' },
		{ field: 'remove', width: '15%', fontSize: '1.125em' },
	];
	const removeMemeber = async (id: number) => {
		if (lead && id === lead.leader_id) {
			// setLead({});
			toastifyWarn("You Can't Remove a Team Lead Before Assigning another Team Lead");
		} else {
			try {
				dispatch(showLoader({ show: true, animation: <Spinner /> }));
				const res = await unassignTeamMember(slug, { member: id });
				setMembers((prev) => {
					return prev.filter((el) => el.id !== id);
				});
			} catch (error) {
			}
			dispatch(closeLoader());
		}
	};
	const [lead, setLead] = useState<any>({});
	const [hover, setHover] = useState<boolean>(false);

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
							{record.email && record.email.indexOf('@') > 4 && record.email.slice(0, 5) + '...' + record.email.slice(record.email.indexOf('@'))}
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
				<div className="remove__member flex text-xs items-center cursor-pointer" onClick={() => removeMemeber(record.id)}>
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
	const changeImage = (e) => {
		setNewImage(() => e.target.files[0]);
		setPhoto(URL.createObjectURL(e.target.files[0]));
	};

	return (
		<ModalWrapper className="top-0 absolute left flex items-center justify-center h-full z-10">
			<form className="modal__container bg-white w-[45%] relative p-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="modal__header flex w-full justify-between items-center">
					<div className="modal__title font-extrabold">{t('edit', { key: 'Team' })}</div>
					<div
						className="modal__close_btn"
						onClick={() => {
							hideEdit();
						}}
					>
						<img src={closemodal} alt="close_modal" />
					</div>
				</div>
				<div className="modal__body">
					<div className="modal__team__id flex justify-between items-center">
						<div className="team__photo">
							<>
								<img className="selected_image" src={photo} alt="icon" />
								<div className="change_photo">
									<img className="change_image_icon" src={changeIcon} alt="icon" />
									<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => changeImage(e)}></input>
								</div>
							</>
						</div>
						<div className="form__field flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Team Name' })}
							</label>
							<InputText
								{...register('teamName')}
								type="teamName"
								style={{ color: '#000' }}
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
								type="text"
								style={{ color: '#000' }}
								id="slogan"
								placeholder={`${t('field_placeholder', { field: 'Team Slogan' })}`}
								className={`input__field ${errors[`slogan`] ? 'p-invalid' : ''}`}
							/>
							{getFormErrorMessage('slogan')}
						</div>
					</div>

					<div className="modal__team__members">
						<div className="form__field flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Members' })}
								<span className='text-[#65A743]'>
								{' '}({members.length} added)
								</span>
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

export default EditTeam;
