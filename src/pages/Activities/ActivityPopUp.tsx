import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../core/hooks/hooks';
import changeIcon from '../../assets/icons/gallery-edit.svg';
import { InputText } from 'primereact/inputtext';
import QueryDropdown from '../../components/QueryDropdown/QueryDropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { ReactComponent as DropDown } from '../../assets/icons/general/dropDown.svg';
import calenderIcon from '../../assets/icons/timer.svg';
import { Button } from 'primereact/button';
import { PopUpContainer } from '../Users/UserPopUp/UserPopUp.style';
import { ModalBody } from './Acivities.style';
import { InputMask } from 'primereact/inputmask';
import durationIcon from '../../assets/icons/timer.svg';
import { useQuery } from 'react-query';
import { getAssignees } from '../../core/api/axiosCalls';
import { all } from 'axios';
import { routeModel } from '../../core/enum/routeModels';
import { toastifyWarn } from '../../core/toaster/toastify';
import TimeConverter from '../../core/utils/TimeConverter';

export type activityDataType = {
	photo: string;
	name: string;
	type: string;
	assignees: string;
	duration: string;
	description: string;
};
export type popUpProps = {
	action: string;
	data?: any;
	show?: boolean;
	setShow?: any;
	getData?: any;
	slug?: string;
	tournamentSlug?: string;
	assignedTeams?: [any];
	stateData;
	editedActivities: any;
};

const typeOptions = [
	{ value: 'standard', label: 'Custom' },
	{ value: 'game', label: 'Game' },
	{ value: 'quiz', label: 'Quiz' },
];
const AssigneesOptions = [
	{ value: 'all', label: 'All Team Members' },
	{ value: 'leader', label: 'Leader' },
	{ value: 'members', label: 'Members ' },
];

const ActivityPopUp = ({ action, data, show, setShow, getData, slug, tournamentSlug, assignedTeams, stateData, editedActivities }: popUpProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [photo, setPhoto] = useState<any>();
	const [newImage, setNewImage] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);
	const [validImg, setValidImg] = useState<boolean>(true);
	const [activityData, setActivityData] = useState<activityDataType>({
		photo: data?.image ? `${import.meta.env.VITE_THUMBNAILS}${data?.image}` : '',
		name: data?.name || '',
		type: data?.type || 'standard',
		assignees: data?.played_by || '',
		duration: data?.duration ? new Date(data?.duration * 60 * 1000).toISOString().substr(11, 8) : '',
		description: data?.description || '',
	});
	const Schema = yup.object({
		name: yup
			.string()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Name' })}`)
			.max(40, `${t('max_input', { key: 40, field: 'Name' })}`),

		type: yup.string().required(`${t('required_field')}`),
		assignees: yup.string().required(`${t('required_field')}`),
		duration: yup.string().required(`${t('required_field')}`),
		description: yup
			.string()
			.min(5, `${t('min_input', { key: 5, field: 'About' })}`)
			.max(1000, `${t('max_input', { key: 1000, field: 'About' })}`),
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: activityData || {},
		resolver: yupResolver(Schema),
		mode: 'all',
	});

	const handellChangeImage = async (e: any) => {
		setNewImage(e.target.files[0]);
		setPhoto(URL.createObjectURL(e.target.files[0]));
		setActivityData((prev) => ({ ...prev, photo: URL.createObjectURL(e.target.files[0]) }));
		setValidImg(true);
		// resetInput();
	};

	const onSubmit = async (submitData) => {
		if (photo === '') {
			toastifyWarn(t('complete_form'));
			setValidImg(false);
			return;
		} else {

			const { assignees, description, duration, name, type } = submitData;
			let body = {
				description,
				duration,
				name,
				type,
				activityType: activityData.type,
				photo: activityData.photo,
				played_by: assignees,
				action,
				imageFile: newImage,
				activityImg: activityData.photo,
				activitySlug: data?.slug,
				...stateData,
			};
			// if (data?.url) {
			// 	body.activityRowData = data;
			// }

			navigate(`/${routeModel.activity}`, { state: body });
		}
	};
	//===============================================================================//

	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};

	//================================ Create User ===========================================//

	return (
		<ModalBody utlineColor={validImg ? '#1E1E1E1A' : '#f44336'}>
			<form className="flex flex-col gap-2 " onSubmit={handleSubmit(onSubmit)}>
				<div className="row__parent">
					<div className="team__photo">
						{!activityData.photo ? (
							<>
								<img className="upload_image" src={changeIcon} alt="icon" />
								<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => handellChangeImage(e)}></input>
							</>
						) : (
							<>
								<img className="selected_image" src={activityData.photo} alt="icon" />
								<div className="change_photo">
									<img className="change_image_icon" src={changeIcon} alt="icon" />
									<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => handellChangeImage(e)}></input>
								</div>
							</>
						)}
					</div>
					<div className="form__field flex flex-col w-[10%]">
						<label className={`input__label`} htmlFor="name">
							{t('field_label', { field: 'Activity Name' })}
						</label>
						<Controller
							control={control}
							name="name"
							render={({ field, fieldState }) => (
								<InputText
									{...register('name')}
									type="text"
									id="name"
									placeholder={`${t('new_field_placeholder', { field: 'Activity Name' })}`}
									className={`input__field ${errors[`name`] ? 'p-invalid' : ''}`}
								/>
							)}
						/>
						{getFormErrorMessage('name')}
					</div>
					<div className="form__field flex flex-col w-[10%]">
						<label className={`input__label`} htmlFor="type">
							{t('field_label', { field: 'Type' })}
						</label>
						<Controller
							control={control}
							name="type"
							render={({ field }) => (
								<Dropdown
									{...register('type')}
									{...field}
									dropdownIcon={<DropDown />}
									id="type"
									placeholder={`${t('field_placeholder', { field: 'type' })}`}
									options={typeOptions}
									onChange={(e) => {
										field.onChange(e);
										setActivityData((prev) => ({ ...prev, type: e.target.value }));
									}}
									className={`input__field activity__drop__down ${errors[`type`] ? 'p-invalid' : ''}`}
								/>
							)}
						/>

						{getFormErrorMessage('type')}
					</div>
				</div>

				<div className="row__parent">
					<div className="form__field flex flex-col w-[50%]">
						<label className={`input__label`} htmlFor="assignees">
							{t('field_label', { field: 'Assignees' })}
						</label>
						<Controller
							control={control}
							name="assignees"
							render={({ field }) => (
								<Dropdown
									{...register('assignees')}
									{...field}
									dropdownIcon={<DropDown />}
									id="assignees"
									placeholder={`${t('field_placeholder', { field: 'Assignees' })}`}
									options={AssigneesOptions}
									className={`input__field activity__drop__down ${errors[`assignees`] ? 'p-invalid' : ''}`}
								/>
							)}
						/>

						{getFormErrorMessage('assignees')}
					</div>
					<div className="form__field flex flex-col w-[50%]">
						<label className={`input__label`} htmlFor="duration">
							{t('field_label', { field: 'Duration' })}
						</label>
						<Controller
							control={control}
							name="duration"
							render={({ field }) => (
								<div className="relative">
									<InputMask
										{...register('duration')}
										{...field}
										mask="99:99:99"
										slotChar="HH:MM:SS"
										id="duration"
										disabled={activityData.type === 'game'}
										placeholder={`${t('field_placeholder', { field: 'duration' })}`}
										className={`input__field actvity__date__picker w-full ${errors[`duration`] ? 'p-invalid' : ''}`}
									/>
									<button type="button" tabIndex={-1} className="eye_btn absolute right-5 h-[100%] lg:right-2  md:right-2  sm:right-[0.25em]">
										<img src={durationIcon} alt="eye" />
									</button>
								</div>
							)}
						/>

						{getFormErrorMessage('duration')}
					</div>
				</div>
				<div className="form__field flex flex-col w-full">
					<label className={`input__label`} htmlFor="description">
						{t('field_label', { field: 'Description' })}
					</label>
					<Controller
						control={control}
						name="description"
						render={({ field, fieldState }) => (
							<InputTextarea
								{...register('description')}
								rows={3}
								id="description"
								placeholder={`${t('new_field_placeholder', { field: 'About' })}`}
								className={`input__field ${errors[`description`] ? 'p-invalid' : ''}`}
								style={{ maxHeight: 'none' }}
							/>
						)}
					/>
					{getFormErrorMessage('description')}
				</div>
				<Button type="submit" label={`${t(`Continue`)}`} className="custom__button ml-auto"></Button>
			</form>
		</ModalBody>
	);
};

export default ActivityPopUp;
