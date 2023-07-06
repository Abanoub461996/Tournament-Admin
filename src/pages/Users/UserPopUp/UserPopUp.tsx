import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser, getCitiesbyId, getCountries, updateUser, uplaodAdminPhoto } from '../../../core/api/axiosCalls';

// Components
import MiniProfile from '../../../components/ReusableComponent/MiniProfile/MiniProfile';
import { resetDialogue, setDialogue } from '../../../core/store/slices/dialogueSlice';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

// ASSETS
import { PopUpContainer } from './UserPopUp.style';

import successIcon from '../../../assets/icons/Group 171119.png';
import calenderIcon from '../../../assets/icons/calendar(2).png';
import changeIcon from '../../../assets/icons/gallery-edit.svg';
import { ReactComponent as DropDown } from '../../../assets/icons/general/dropDown.svg';
import { useMount } from 'react-use';

export type mainObjType = {
	about: string;
	name: string;
	email: string;
	password?: string;
	password_confirmation?: string;
	gender: string;
	dateOfBirth: any;
	photo?: any;
	city: string;
	country: string;
};

const genderOptions = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
];

export type UserPopUpProps = {
	action: string;
	data?: any;
	show?: boolean;
	setShow?: any;
	getData?: any;
	slug?: string;
};

const UserPopUp = ({ action, data, show, setShow, getData, slug }: UserPopUpProps) => {
	const { t } = useTranslation();
	let formData = new FormData();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const aRef: any = useRef(null);
	const [loadingImg, setLoadingImg] = useState<boolean>(false);
	const [photo, setPhoto] = useState<any>();
	const [newImage, setNewImage] = useState<any>();

	const [personalInfo, setPersonalInfo] = useState<mainObjType>({
		about: data?.about || '',
		name: data?.name || '',
		email: data?.email || '',
		gender: data?.gender || '',
		country: data?.country?.id || '',
		dateOfBirth: data ? new Date(moment(data?.date_of_birth, 'YYYY-MM-DD').format('YYYY/MM/DD')) : '',
		password: '',
		password_confirmation: '',
		photo: data?.photo ? `${import.meta.env.VITE_THUMBNAILS}${data?.photo}` : '',
		city: data?.city?.id || '',
	});
	useMount(() => {
		if (personalInfo.photo) {
			setPhoto(`${import.meta.env.VITE_THUMBNAILS}${data?.photo}`);
		}
	});

	const [countries, setCountries] = useState<[]>([]);
	const [cities, setCities] = useState<[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [validImg, setValidImg] = useState<boolean>(true);

	const createSchema = yup.object({
		about: yup
			.string()
			// .min(5, `${t('min_input', { key: 5, field: 'About' })}`)
			.max(1000, `${t('max_input', { key: 1000, field: 'About' })}`),
		name: yup
			.string()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Name' })}`)
			.max(40, `${t('max_input', { key: 40, field: 'Name' })}`),
		email: yup
			.string()
			.required(`${t('required_field')}`)
			// .min(8, `${t('min_input', { key: 8, field: 'Email' })}`)
			.max(120, `${t('max_input', { key: 120, field: 'Email' })}`),
		password: yup
			.string()
			.required(`${t('required_field')}`)
			.min(8, `${t('min_input', { key: 8, field: 'Password' })}`)
			.max(20, `${t('max_input', { key: 20, field: 'Password' })}`),
		password_confirmation: yup
			.string()
			.required(`${t('required_field')}`)
			.min(8, `${t('min_input', { key: 8, field: 'Password' })}`)
			.max(20, `${t('max_input', { key: 20, field: 'Password' })}`)
			.oneOf([yup.ref('password')], `${t('Password_matching')}`),
		gender: yup.string().required(`${t('required_field')}`),
		dateOfBirth: yup
			.string()
			.test('dateOfBirth', 'Should be greater than 18 yaers old', (value: any, ctx) => {
				const dob = new Date(value);
				const validDate = new Date();
				const valid = validDate.getFullYear() - dob.getFullYear() >= 18;
				return !valid ? ctx.createError() : valid;
			})
			.required(`${t('required_field')}`),
		city: yup.string().required(`${t('required_field')}`),
		country: yup.string().required(`${t('required_field')}`),
	});

	const updateSchema = yup.object({
		about: yup
			.string()
			// .min(5, `${t('min_input', { key: 5, field: 'About' })}`)
			.max(1000, `${t('max_input', { key: 1000, field: 'About' })}`),
		name: yup
			.string()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Name' })}`)
			.max(40, `${t('max_input', { key: 40, field: 'Name' })}`),
		gender: yup.string().required(`${t('required_field')}`),
		dateOfBirth: yup.string().required(`${t('required_field')}`),
		city: yup.string().required(`${t('required_field')}`),
		country: yup.string().required(`${t('required_field')}`),
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: personalInfo || {},
		resolver: yupResolver(action === 'create' ? createSchema : updateSchema),
		mode: 'all',
	});

	const handellChangeImage = async (e: any) => {
		setNewImage(e.target.files[0]);
		setPhoto(URL.createObjectURL(e.target.files[0]));
		setPersonalInfo((prev) => ({ ...prev, photo: URL.createObjectURL(e.target.files[0]) }));
		setValidImg(true);
		// resetInput();
	};

	const resetInput = () => {
		aRef.current.value = null;
	};

	// ============================= Countries & Cities ========================= //

	useEffect(() => {
		if (personalInfo?.country !== '') {
			getCitiesbyId(Number(personalInfo.country)).then((res) => {
				const resData = res.records.map((i: any) => ({
					value: i.id,
					label: i.name,
				}));
				setCities(resData);
			});
		}
	}, [personalInfo?.country]);

	const getCountriesData = async () => {
		const res = await getCountries();
		const resData = res.records.map((i: any) => ({
			value: i.id,
			label: i.name,
		}));
		setCountries(resData);
	};

	useEffect(() => {
		getCountriesData();
	}, []);

	//===============================================================================//

	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};

	//================================ Create User ===========================================//

	const onSubmit = async (data) => {
		if (photo === '') {
			setValidImg(false);
			return;
		} else {
			setLoading(true);
			try {
				const { name, about, gender, country, city, dateOfBirth, email, password, password_confirmation } = data;

				if (action === 'create') {
					formData.append(`name`, name);
					formData.append(`photo`, newImage);
					formData.append(`about`, about);
					formData.append(`email`, email);
					formData.append(`date_of_birth`, moment(dateOfBirth).format('YYYY-MM-DD'));
					formData.append(`password`, password);
					formData.append(`password_confirmation`, password_confirmation);
					formData.append(`gender`, gender);
					formData.append(`country_id`, country);
					formData.append(`city_id`, city);
				} else if (action === 'edit') {
					formData.append(`_method`, 'put');
					formData.append(`name`, name);
					formData.append(`about`, about);
					if (newImage) {
						formData.append(`photo`, newImage);
					}
					formData.append(`date_of_birth`, moment(dateOfBirth).format('YYYY-MM-DD'));
					formData.append(`gender`, gender);
					formData.append(`country_id`, country);
					formData.append(`city_id`, city);
				}

				const res = action === 'create' ? await createUser(formData) : await updateUser(formData, slug);

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
						title: `${action === 'create' ? t('createUserTitle') : t('editUserTitle')}`,
						text: res.message,
					}),
				);
				setTimeout(() => dispatch(resetDialogue()), 2500);
			} catch (error) {}
			setLoading(false);
		}
	};

	return (
		<PopUpContainer outlineColor={validImg ? '#1E1E1E1A' : '#f44336'}>
			<form className="modal__body flex flex-col" onSubmit={handleSubmit(onSubmit)}>
				<div className="form__inner__container">
					<div className="modal__team__id flex justify-between items-center">
						<div className="team__photo">
							{!photo ? (
								<>
									<img className="upload_image" src={changeIcon} alt="icon" />
									<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => handellChangeImage(e)}></input>
								</>
							) : (
								<>
									<img className="selected_image" src={photo} alt="icon" />
									<div className="change_photo">
										<img className="change_image_icon" src={changeIcon} alt="icon" />
										<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => handellChangeImage(e)}></input>
									</div>
								</>
							)}
						</div>
						<div className="form__field flex flex-col mb-2">
							<label className={`input__label`} htmlFor="name">
								{t('field_label', { field: 'User Name' })}
							</label>
							<Controller
								control={control}
								name="name"
								render={({ field, fieldState }) => (
									<InputText
										{...register('name')}
										type="text"
										id="name"
										placeholder={`${t('new_field_placeholder', { field: 'New User Name' })}`}
										className={`input__field ${errors[`name`] ? 'p-invalid' : ''}`}
									/>
								)}
							/>
							{getFormErrorMessage('name')}
						</div>
					</div>

					<div className="form__field flex flex-col w-full">
						<label className={`input__label`} htmlFor="about">
							{t('field_label', { field: 'About User' })}
						</label>
						<Controller
							control={control}
							name="about"
							render={({ field, fieldState }) => (
								<InputTextarea
									{...register('about')}
									rows={3}
									id="about"
									placeholder={`${t('new_field_placeholder', { field: 'About' })}`}
									className={`input__field ${errors[`about`] ? 'p-invalid' : ''}`}
									style={{ maxHeight: 'none' }}
								/>
							)}
						/>
						{getFormErrorMessage('about')}
					</div>

					<div className="flex gap-2 ">
						{/* Email Address */}
						<div className="form__field flex flex-col w-[50%]">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Email Address' })}
							</label>
							<Controller
								control={control}
								name="email"
								render={({ field }) => (
									<InputText
										{...register('email')}
										{...field}
										type="text"
										id="email"
										disabled={action === 'edit'}
										placeholder={`${t('new_field_placeholder', { field: 'Email' })}`}
										className={`input__field ${errors[`email`] ? 'p-invalid' : ''}`}
									/>
								)}
							/>
							{getFormErrorMessage('email')}
						</div>

						{/* dateOfBirth */}
						<div className="form__field flex flex-col w-[50%]">
							<label className={`input__label`} htmlFor="dateOfBirth">
								{t('field_label', { field: 'Date Of Birth' })}
							</label>
							<Controller
								control={control}
								name="dateOfBirth"
								render={({ field }) => (
									<Calendar
										{...register('dateOfBirth')}
										{...field}
										id="dateOfBirth"
										dateFormat="yy/mm/dd"
										showIcon
										maxDate={new Date()}
										icon={() => <img className=" hover:bg-none " src={calenderIcon} alt="" />}
										placeholder="YYYY/MM/DD"
										readOnlyInput={true}
										className={`input__field userPopup__date_picker ${errors[`dateOfBirth`] ? 'p-invalid' : ''}`}
									/>
								)}
							/>

							{getFormErrorMessage('dateOfBirth')}
						</div>
					</div>
					{action === 'create' && (
						<div className="flex gap-2 ">
							{/* Password */}
							<div className="form__field flex flex-col w-[50%]">
								<label className={`input__label`} htmlFor="password">
									{t('field_label', { field: 'Password' })}
								</label>
								<Controller
									control={control}
									name="password"
									render={({ field }) => (
										<InputText
											{...register('password')}
											{...field}
											autoComplete="new-password"
											type="password"
											id="password"
											placeholder={`${t('Default Password')}`}
											className={`input__field ${errors[`password`] ? 'p-invalid' : ''}`}
										/>
									)}
								/>

								{getFormErrorMessage('password')}
							</div>

							<div className="form__field flex flex-col w-[50%]">
								<label className={`input__label`} htmlFor="password_confirmation">
									{t('field_label', { field: 'Confirm Password' })}
								</label>
								<Controller
									control={control}
									name="password_confirmation"
									render={({ field }) => (
										<InputText
											{...register('password_confirmation')}
											{...field}
											autoComplete="new-password_confirmation"
											type="password"
											id="password_confirmation"
											placeholder={`${t('Confirm Password')}`}
											className={`input__field ${errors[`password_confirmation`] ? 'p-invalid' : ''}`}
										/>
									)}
								/>
								{getFormErrorMessage('password_confirmation')}
							</div>
						</div>
					)}

					<div className="flex gap-2 ">
						{/* Gender */}
						<div className="form__field flex flex-col w-[32%]">
							<label className={`input__label`} htmlFor="gender">
								{t('field_label', { field: 'Gender' })}
							</label>
							<Controller
								control={control}
								name="gender"
								render={({ field }) => (
									<Dropdown
										{...register('gender')}
										{...field}
										dropdownIcon={<DropDown />}
										id="gender"
										placeholder={`${t('gender')}`}
										options={genderOptions}
										className={`input__field userPopup__drop_down ${errors[`gender`] ? 'p-invalid' : ''}`}
									/>
								)}
							/>

							{getFormErrorMessage('gender')}
						</div>

						{/* Country */}
						<div className="form__field flex flex-col w-[32%]">
							<label className={`input__label`} htmlFor="country">
								{t('field_label', { field: 'Country' })}
							</label>
							<Controller
								control={control}
								name="country"
								render={({ field }) => (
									<Dropdown
										{...register('country')}
										{...field}
										id="country"
										dropdownIcon={<DropDown />}
										options={countries}
										placeholder={`${t('country')}`}
										onChange={(e) => {
											field.onChange(e);
											setPersonalInfo((prev) => ({ ...prev, country: e.target.value, city: '' }));
											setCities([]);
										}}
										className={`input__field userPopup__drop_down ${errors[`country`] ? 'p-invalid' : ''}`}
									/>
								)}
							/>
							{getFormErrorMessage('country')}
						</div>

						{/* City */}
						<div className="form__field flex flex-col w-[32%]">
							<label className={`input__label`} htmlFor="city">
								{t('field_label', { field: 'City' })}
							</label>
							<Controller
								control={control}
								name="city"
								render={({ field }) => (
									<Dropdown
										{...register('city')}
										{...field}
										id="city"
										options={cities}
										dropdownIcon={<DropDown />}
										placeholder={`${t('city')}`}
										onChange={(e) => {
											field.onChange(e);
											setPersonalInfo((prev) => ({ ...prev, city: e.target.value }));
										}}
										className={`input__field userPopup__drop_down ${errors[`city`] ? 'p-invalid' : ''}`}
									/>
								)}
							/>

							{getFormErrorMessage('city')}
						</div>
					</div>
				</div>
				<Button
					type="submit"
					label={loading ? 'Loading...' : `${t('Save Change')}`}
					className="form__submit__btn bg-[#01ABC1] text-white text-white "
					disabled={false}
					// disabled={(action === 'edit' && (countries.length <= 0 || cities.length <= 0)) || Object.keys(errors).length !== 0 || loading}
				></Button>
			</form>
		</PopUpContainer>
	);
};

export default UserPopUp;
