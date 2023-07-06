// Modularity
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserCredentials } from '../../core/interfaces/userInterface';
import { useAppDispatch } from '../../core/hooks/hooks';
import { signIn } from '../../core/store/slices/authSlice';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import { useTranslation } from 'react-i18next';
import { setUser } from '../../core/store/slices/userSlice';
import moment from 'moment';

// Components
import { userLogin } from '../../core/api/axiosCalls';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Spinner from '../../components/Spinner/Spinner';
import eyeImg from '../../assets/icons/eye.svg';

// Styles
import { LoginConatiner } from './Auth.style';
import { toastifyWarn } from '../../core/toaster/toastify';


const Login = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const schema = yup.object({
		email: yup
			.string()
			.trim()
			.required(`${t('required_field')}`)
			.min(8, `${t('min_input', { key: 5, field: 'Email' })}`)
			.max(120, `${t('max_input', { key: 120, field: 'Email' })}`)
			.email(`${t('wrong_format', { field: 'Email' })}`)
			.matches(
				// eslint-disable-next-line no-control-regex, no-useless-escape
				/^((([a-z]|\d|[!#\$%&'\*\+\-/=\?\^_`{\|}~]|[ ])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{|}~]|[ ])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[ ])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[ ]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[ ])|(([a-z]|\d|[ ])([a-z]|\d|-|\.|_|~|[ ])*([a-z]|\d|[ ])))\.)+(([a-z]|[ ])|(([a-z]|[ ])([a-z]|\d|-|\.|_|~|[ ])*([a-z]|[ ])))$/i,
				`${t('wrong_format', { field: 'Email' })}`,
			),
		password: yup
			.string()
			.required(`${t('required_field')}`)
			.min(8, `${t('min_input', { key: 8, field: 'Password' })}`)
			.max(30, `${t('max_input', { key: 20, field: 'Password' })}`),
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
		const credentials: UserCredentials = {
			...data,
			role: 'admin',
		};
		try {
			dispatch(dispatch(showLoader({ show: true, animation: <Spinner /> })));
			const userData = await userLogin(credentials);
			dispatch(signIn(userData));
			dispatch(closeLoader());
			localStorage.setItem('token', userData.access_token);
			if (userData?.user?.first_time == 1) {
				toastifyWarn('You Need To Change Your Password');
				navigate('/my-profile', { state: 1 });
			} else {
				navigate('/users');
			}
			const user = {
				loggedIn: true,
				dateOfBirth: new Date(moment(userData.user.date_of_birth, 'YYYY-MM-DD').format('YYYY/MM/DD')),
				...userData.user
			};
			dispatch(setUser(user));
		} catch {
			dispatch(closeLoader());
		}
	};
	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error font-semibold">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};
	const [showPassword, setShowPassword] = useState(false);

	return (
		<LoginConatiner onSubmit={handleSubmit(onSubmit)}>
			<div className="form__header">
				<p className="form__title font-libreBaskerville">{`${t('Login')}`}</p>
				<p className="header">{`${t('LoginMsg')}`}</p>
			</div>
			<div className="form__inputs__container flex flex-col gap-4">
				<div className="form__input flex flex-col ">
					<label className={`input__label`} htmlFor="email">
						{t('field_label', { field: 'Email' })}
					</label>
					<InputText
						{...register('email')}
						type="email"
						style={{ color: '#616161', opacity: '0.71' }}
						id="email"
						placeholder={`${t('field_placeholder', { field: 'Email' })}`}
						className={`input__field ${errors[`email`] ? 'p-invalid' : ''}`}
					/>
					{getFormErrorMessage('email')}
				</div>
				<div className="form__input flex flex-col ">
					<label className={`input__label`} htmlFor="password">
						{t('field_label', { field: 'Password' })}
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
				<Link to="/forgot-password" className="forgetPass">
					{`${t('Forgot Password')}`}
				</Link>
			</div>

			<Button type="submit" label={`${t('LoginBtn')}`} className="form__submit__btn p-mt-2 submit-btn bg-primary text-white w-full"></Button>
			<p className="footer">{t('© 2023 all rights reserved')} </p>
		</LoginConatiner>
	);
};

export default Login;
