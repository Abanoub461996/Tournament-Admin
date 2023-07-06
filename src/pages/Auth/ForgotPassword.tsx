// Modularity
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMount } from 'react-use';
import { useTranslation } from 'react-i18next';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';
import { useAppDispatch } from '../../core/hooks/hooks';

// Components
import { userForgotPassword, userLogin } from '../../core/api/axiosCalls';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

// Assets
import { LoginConatiner } from './Auth.style';
import successIcon from '../../assets/icons/Group 171119.png';
import { useState } from 'react';


const ForgotPassword = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
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
				`${t('wrong_format', { key: 'Email' })}`,
			), // .matches(/^[a-zA-Z\u0600-\u06FF -]*$/, t('wrong_format', { field: 'Password' })),
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
		try {
			setLoading(true)

			const res = await userForgotPassword(data);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('sent_key')}`,
					text: res.message,
				}),
			);
			setTimeout(() => dispatch(resetDialogue()), 2500);
			setLoading(false)
			navigate('/reset-password', { state: { to: res.to, email: data.email } });
		} catch (error) {
			setLoading(false)
		}
	};
	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error font-semibold">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};
	const [loading, setLoading] = useState<boolean>(false);


	return (
		<LoginConatiner onSubmit={handleSubmit(onSubmit)}>
			<div className="form__header">
				<p className="form__title font-libreBaskerville">{`${t('Reset')}`}</p>
				<p className="header">{`${t('ResetMsg')}`}</p>
			</div>
			<div className="form__inputs__container flex flex-col gap-3">
				<div className="form__input flex flex-col ">
					<label className={`input__label`} htmlFor="email">
						{t('field_label', { field: 'Email Address' })}
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
			</div>

			<Button
				type="submit"
				label={` ${loading ? 'Loading...' : `${t('SendLink')}`} `}
				className="form__submit__btn p-mt-2 submit-btn bg-primary text-white w-full"
				  disabled={loading ? true : false}
			></Button>
			<p className="footer">{t('© 2023 all rights reserved')} </p>
		</LoginConatiner>
	);
};

export default ForgotPassword;
