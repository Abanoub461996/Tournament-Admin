import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ChangePass } from '../../core/api/axiosCalls';

import { useAppDispatch } from '../../core/hooks/hooks';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';

import eyeImg from '../../assets/icons/eye.svg';
import successIcon from '../../assets/icons/Group 171119.png';
import { ChangePassTabContent } from './AdminProfile.style';

const ChangePassTab = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState(false);

	const schema = yup.object({
		old_password: yup
			.string()
			.required(`${t('required_field')}`)
			.min(8, `${t('min_input', { key: 8, field: 'Password' })}`)
			.max(20, `${t('max_input', { key: 20, field: 'Password' })}`),
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
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'all',
	});

	const onSubmit = async (data: any) => {
		setLoading(true);
		try {
			await ChangePass(data);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('ChangePassTitle')}`,
					text: `${t('ChangePasstext')}`,
				}),
			);
			setTimeout(() => dispatch(resetDialogue()), 2500);
			setTimeout(() => navigate('/users'), 2500);
		} catch (error) {}
		setLoading(false);
	};

	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error font-semibold text-sm">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};

	return (
		<>
			<ChangePassTabContent onSubmit={handleSubmit(onSubmit)}>
				<div className="form__input flex flex-col ">
					<label className={`input__label`} htmlFor="old_password">
						{t('field_label', { field: 'Old Password' })}
					</label>
					<div className="relative">
						<InputText
							{...register('old_password')}
							type={showPassword ? 'text' : 'password'}
							autoComplete="off"
							style={{ color: '#616161', opacity: '0.71' }}
							id="old_password"
							placeholder={`${t('field_placeholder', { field: 'Old Password' })}`}
							className={`input__field ${errors[`old_password`] ? 'p-invalid' : ''}`}
						/>
						<button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)} className="eye_btn absolute right-5 h-[100%] lg:right-2  md:right-2  sm:right-[0.25em]">
							<img src={eyeImg} alt="eye" />
						</button>
					</div>

					{getFormErrorMessage('old_password')}
				</div>
				<div className="form__input flex flex-col">
					<label className={`input__label`} htmlFor="password">
						{t('field_label', { field: 'New Password' })}
					</label>
					<div className="relative w-full">
						<InputText
							{...register('password')}
							type={showPassword ? 'text' : 'password'}
							autoComplete="off"
							style={{ color: '#616161', opacity: '0.71' }}
							id="password"
							placeholder={`${t('field_placeholder', { field: 'Password' })}`}
							className={`input__field ${errors[`password`] ? 'p-invalid' : ''}`}
						/>
						<button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)} className="eye_btn absolute right-5 h-[100%] lg:right-2  md:right-2  sm:right-[0.25em]">
							<img src={eyeImg} alt="eye" />
						</button>
					</div>

					{getFormErrorMessage('password')}
				</div>
				<div className="form__input flex flex-col ">
					<label className={`input__label`} htmlFor="password_confirmation">
						{t('field_label', { field: 'Confirm Password' })}
					</label>
					<div className="relative">
						<InputText
							{...register('password_confirmation')}
							type={showPassword ? 'text' : 'password'}
							autoComplete="off"
							style={{ color: '#616161', opacity: '0.71' }}
							id="password_confirmation"
							placeholder={`${t('confirmYourPass')}`}
							className={`input__field  ${errors[`password_confirmation`] ? 'p-invalid' : ''}`}
						/>
						<button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)} className="eye_btn absolute right-5 h-[100%] lg:right-2  md:right-2  sm:right-[0.25em]">
							<img src={eyeImg} alt="eye" />
						</button>
					</div>

					{getFormErrorMessage('password_confirmation')}
				</div>
				<Button
					type="submit"
					label={loading ? 'Loading...' : `${t('Save Change')}`}
					className="form__submit__btn bg-[#01ABC1] text-white text-white mt-4"
					disabled={loading ? true : false}
				></Button>
			</ChangePassTabContent>
		</>
	);
};

export default ChangePassTab;
