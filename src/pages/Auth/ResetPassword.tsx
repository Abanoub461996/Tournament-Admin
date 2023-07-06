// Modularity
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useInterval, useMount } from 'react-use';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

// Components
import { resetPassword, userForgotPassword } from '../../core/api/axiosCalls';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { LoginConatiner } from './Auth.style';
import { toastifyWarn } from '../../core/toaster/toastify';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';

// Assets
import eyeImg from '../../assets/icons/eye.svg';
import successIcon from '../../assets/icons/Group 171119.png';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import Spinner from '../../components/Spinner/Spinner';

const ResetPassword = () => {
	const deadline: any = moment().add(2, 'minutes').toDate();
	const { state } = useLocation();
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [stopped, setStopped] = useState(false);
	const dispatch = useDispatch();
	const [leftTime, setLeftTime] = useState(119999);
	const getTime = () => {
		if (leftTime >= 0) {
			setMinutes(Math.floor((leftTime / 1000 / 60) % 60));
			setSeconds(Math.floor((leftTime / 1000) % 60));
		} else {
			setStopped(true);
		}
	};

	const navigate = useNavigate();
	const { t } = useTranslation();
	//_________________STARTING THE TIMER ____________//
	useMount(() => {
		if (!state.email || !state.to) {
			toastifyWarn('Enter Your Email First');
			navigate('/forgot-password');
		} else {
			getTime();
		}
	});
	//_______________________THE TIMER COUNT DOWN ____________//

	useInterval(() => {
		setLeftTime(prev=>prev-1000)
		getTime();
	}, 1000);

	const handleTimer = async () => {
		try {
			const res = await userForgotPassword({ email: state.email });
			setTimeout(() => dispatch(resetDialogue()), 2500);
			setTimeout(() => setStopped(false), 1500);
			setLeftTime(119999)
			getTime();
		} catch (error) {
		}
	};

	// __________________________________THE FORM _______________________//
	const schema = yup.object({
		key: yup
			.string()
			.required(`${t('required_field')}`)
			.min(3, `${t('min_input', { key: 3, field: 'Key' })}`)
			.max(15, `${t('max_input', { key: 15, field: 'Reset Key' })}`),
		password: yup
			.string()
			.required(`${t('required_field')}`)
			.min(8, `${t('min_input', { key: 8, field: 'Password' })}`)
			.max(20, `${t('max_input', { key: 20, field: 'Password' })}`),
		password_confirmation: yup
			.string()
			.required(`${t('required_field')}`)
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
		const reqBody = { ...data, email: state.email };
		try {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			const res = await resetPassword(reqBody);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('password_changed')}`,
					text: res.message,
				}),
			);
			setTimeout(() => dispatch(resetDialogue()), 2500);
			navigate('/login');
			dispatch(closeLoader());
		} catch (error) {
			dispatch(closeLoader());
		}
	};
	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error font-semibold">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	return (
		<LoginConatiner onSubmit={handleSubmit(onSubmit)}>
			<div className="form__header">
				<p className="form__title font-libreBaskerville">{`${t('set_new_pass')}`}</p>
				<p className="header">{`${t('SetPassForm')}`}</p>
			</div>
			<div className="form__inputs__container flex flex-col gap-3">
				<div className="form__input flex flex-col ">
					<label className={`input__label`} htmlFor="email">
						{t('field_label', { field: 'Reset Key' })}
					</label>
					<InputText
						{...register('key')}
						type="text"
						style={{ color: '#616161', opacity: '0.71' }}
						id="key"
						placeholder={`${t('field_placeholder', { field: 'Key' })}`}
						className={`input__field ${errors[`key`] ? 'p-invalid' : ''}`}
					/>
					{getFormErrorMessage('key')}
				</div>
				<div className="form__input flex flex-col ">
					<label className={`input__label`} htmlFor="password">
						{t('field_label', { field: 'New Password' })}
					</label>
					<div className="relative">
						<InputText
							type={showPassword ? 'text' : 'password'}
							{...register('password')}
							style={{ color: '#616161', opacity: '0.71' }}
							id="password"
							className={`input__field w-full ${errors['password'] ? 'p-invalid' : ''}`}
							placeholder={`${t('field_placeholder', { field: 'Password' })}`}
						/>
						<button
							type="button"
							tabIndex={-1}
							onClick={() => setShowPassword(!showPassword)}
							className="eye_btn absolute right-5 h-[100%]"
						>
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
							type={showConfirm ? 'text' : 'password'}
							{...register('password_confirmation')}
							style={{ color: '#616161', opacity: '0.71' }}
							id="password_confirmation"
							className={`input__field w-full ${errors['password_confirmation'] ? 'p-invalid' : ''}`}
							placeholder={`${t('field_placeholder', { field: 'Password' })}`}
						/>
						<button
							type="button"
							tabIndex={-1}
							onClick={() => setShowConfirm(!showConfirm)}
							className="eye_btn absolute right-5 h-[100%]"
						>
							<img src={eyeImg} alt="eye" />
						</button>
					</div>
					{getFormErrorMessage('password_confirmation')}
				</div>
				<button type='button' onClick={handleTimer} className={`timer ${stopped && 'finished'}  `}>{`${minutes}:${seconds} Resend Key`}</button>
			</div>

			<Button type="submit" label={`${t('save_changes')}`} className="form__submit__btn p-mt-2 submit-btn bg-primary text-white w-full"></Button>
			<p className="footer">{t('© 2023 all rights reserved')} </p>
		</LoginConatiner>
	);
};

export default ResetPassword;
