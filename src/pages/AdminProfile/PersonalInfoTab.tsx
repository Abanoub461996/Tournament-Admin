import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../core/hooks/hooks';
import { regex } from '../../core/utils/Regex';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';
import { changeAdminData, getCitiesbyId, getCountries } from '../../core/api/axiosCalls';

import { ChangeAdminInfoTab } from './AdminProfile.style';

import successIcon from '../../assets/icons/Group 171119.png';
import { ReactComponent as DropDown } from '../../assets/icons/general/dropDown.svg';
import calenderIcon from '../../assets/icons/calendar(2).png';
import { toastifyError } from '../../core/toaster/toastify';

const genderOptions = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
];

export type mainObjType = {
	about: string;
	name: string;
	email: string;
	gender: string;
	dateOfBirth: any;
	city: string;
	country: string;
};

const PersonalInfoTab = ({ userData, getUserData }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const schema = yup.object({
		about: yup.string().max(1000, `${t('max_input', { key: 1000, field: 'About' })}`),
		name: yup
			.string()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Name' })}`)
			.max(40, `${t('max_input', { key: 40, field: 'Name' })}`),
		email: yup
			.string()
			.required(`${t('required_field')}`)
			.max(120, `${t('max_input', { key: 120, field: 'Password' })}`)
			.matches(regex.emailRegex, `${t('wrong_format', { key: 'Email' })}`),
		gender: yup.string().required(`${t('required_field')}`),
		dateOfBirth: yup.date().required(`${t('required_field')}`),
		city: yup.string().required(`${t('required_field')}`),
		country: yup.string().required(`${t('required_field')}`),
	});

	const [personalInfo, setPersonalInfo] = useState<mainObjType>({
		name: '',
		email: '',
		about: '',
		gender: '',
		country: '',
		city: '',
		dateOfBirth: '',
	});

	useEffect(() => {
		if (userData) {
			setPersonalInfo({
				name: userData.name,
				email: userData.email,
				about: userData?.about?.trim(),
				gender: userData.gender,
				country: userData.country?.id,
				city: userData.city?.id,
				dateOfBirth: new Date(moment(userData?.date_of_birth, 'YYYY-MM-DD').format('YYYY/MM/DD')),
			});
		}
	}, [userData]);

	const [countries, setCountries] = useState<[]>([]);
	const [cities, setCities] = useState<[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		values: personalInfo,
		resolver: yupResolver(schema),
		mode: 'all',
	});

	// ============================= Countries & Cities ========================= //

	useEffect(() => {
		if (personalInfo.country !== '') {
			getCitiesbyId(Number(personalInfo.country)).then((res) => {
				const resData = res.records.map((i: any) => ({
					value: i.id,
					label: i.name,
				}));
				setCities(resData);
			});
		}
	}, [personalInfo.country]);

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

	// ============================= Submit ========================= //

	const onSubmit = async (data) => {
		setLoading(true);

		try {
			const { name, about, gender, country, city, dateOfBirth, email } = data;
			const body: {
				about: string;
				name: string;
				gender: string;
				email: string;
				date_of_birth: string;
				city_id?: number | null;
				country_id?: number | null;
			} = {
				name,
				about,
				gender,
				email,
				date_of_birth: moment(dateOfBirth, 'YYYY-MM-DD').format('YYYY-MM-DD'),
				country_id: Number(country) || null,
				city_id: Number(city) || null,
			};
			const res = await changeAdminData(body);
			getUserData();
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('ChangeUserDataTitle')}`,
					text: res.message,
				}),
			);
			setTimeout(() => dispatch(resetDialogue()), 2500);
		} catch (error) {}
		setLoading(false);
	};

	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};

	return (
		<ChangeAdminInfoTab onSubmit={handleSubmit(onSubmit)}>
			<div className="user__form__input about_me flex flex-col w-full">
				<label className={`input__label`} htmlFor="about">
					{t('field_label', { field: 'About me' })}
				</label>
				<Controller
					control={control}
					name="about"
					render={({ field, fieldState }) => (
						<InputTextarea
							{...register('about')}
							rows={4}
							id="about"
							className={`input__field  min-h-[6em] ${errors[`about`] ? 'p-invalid' : ''}`}
							placeholder={`${t('field_placeholder', { field: 'About me' })}`}
						/>
					)}
				/>
				{getFormErrorMessage('about')}
			</div>
			<div className="flex gap-3">
				<div className="user__form__input flex flex-col w-[50%] ">
					<label className={`input__label`} htmlFor="name">
						{t('field_label', { field: 'Your Name' })}
					</label>
					<Controller
						{...register('name')}
						control={control}
						name="name"
						render={({ field, fieldState }) => (
							<InputText {...register('name')} type="text" id="name" className={`input__field ${errors[`name`] ? 'p-invalid' : ''}`} />
						)}
					/>
					{getFormErrorMessage('name')}
				</div>
				<div className="user__form__input flex flex-col w-[50%]">
					<label className={`input__label`} htmlFor="email">
						{t('field_label', { field: 'Email Address' })}
					</label>
					<Controller
						{...register('email')}
						control={control}
						name="email"
						render={({ field }) => (
							<InputText {...register('email')} {...field} type="text" id="email" className={`input__field ${errors[`email`] ? 'p-invalid' : ''}`} />
						)}
					/>

					{getFormErrorMessage('email')}
				</div>
			</div>
			<div className="flex gap-3">
				<div className="user__form__input flex flex-col w-[25%]">
					<label className={`input__label`} htmlFor="gender">
						{t('field_label', { field: 'Gender' })}
					</label>
					<Controller
						{...register('gender')}
						control={control}
						name="gender"
						render={({ field }) => (
							<Dropdown
								dropdownIcon={<DropDown />}
								{...register('gender')}
								{...field}
								id="gender"
								options={genderOptions}
								className={`input__field drop__down_admin ${errors[`gender`] ? 'p-invalid' : ''}`}
							/>
						)}
					/>

					{getFormErrorMessage('gender')}
				</div>

				<div className="user__form__input flex flex-col w-[25%]">
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
								placeholder="YYYY/MM/DD"
								showIcon={true}
								icon={() => <img className=" hover:bg-none " src={calenderIcon} alt="" />}
								readOnlyInput={true}
								className={`input__field date_picker_admin rounded-lg  ${errors[`dateOfBirth`] ? 'p-invalid' : ''}`}
							/>
						)}
					/>

					{getFormErrorMessage('dateOfBirth')}
				</div>

				<div className="user__form__input flex flex-col w-[25%]">
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
								value={personalInfo.country}
								onChange={(e) => {
									field.onChange(e);
									setPersonalInfo((prev) => ({ ...prev, country: e.target.value, city: '' }));
									setCities([]);
								}}
								className={`input__field drop__down_admin ${errors[`country`] ? 'p-invalid' : ''}`}
							/>
						)}
					/>
					{getFormErrorMessage('country')}
				</div>

				<div className="user__form__input flex flex-col w-[25%]">
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
								onChange={(e) => {
									field.onChange(e);
									setPersonalInfo((prev) => ({ ...prev, city: e.target.value }));
								}}
								className={`input__field drop__down_admin ${errors[`city`] ? 'p-invalid' : ''}`}
							/>
						)}
					/>

					{getFormErrorMessage('city')}
				</div>
			</div>

			<Button
				type="submit"
				label={loading ? 'Loading...' : `${t('Save Change')}`}
				className="form__submit__btn bg-[#01ABC1] text-white text-white "
				disabled={loading || countries.length <= 0 || cities.length <= 0}
			></Button>
		</ChangeAdminInfoTab>
	);
};

export default PersonalInfoTab;
