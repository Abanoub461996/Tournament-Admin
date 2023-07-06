import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../core/hooks/hooks';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PopUpContainer } from './FAQ.style';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';
import successIcon from '../../assets/icons/Group 171119.png';
import { createFaq, updateFaq, updateFaqParams } from '../../core/api/axiosCalls';

export type FAQPopUpProps = {
	action: string;
	data?: any;
	show?: boolean;
	setShow?: any;
	getData?: any;
	slug?: string | undefined;
};

export type mainObjType = {
	question: string;
	answer: string;
};

const FAQPopUp = ({ action, data, show, setShow, getData, slug }: FAQPopUpProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(false);

	const schema = yup.object({
		question: yup
			.string()
			.required(`${t('required_field')}`)
			.min(3, `${t('min_input', { key: 3, field: 'Question' })}`)
			.max(120, `${t('max_input', { key: 120, field: 'Question' })}`),
		answer: yup
			.string()
			.required(`${t('required_field')}`)
			.min(3, `${t('min_input', { key: 3, field: 'Answer' })}`)
			.max(120, `${t('max_input', { key: 120, field: 'Answer' })}`),
	});

	const [Faq, setFaq] = useState<mainObjType>({
		question: data?.question,
		answer: data?.answer,
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: Faq,
		resolver: yupResolver(schema),
		mode: 'all',
	});

	// ============================= Submit ========================= //

	const onSubmit = async (data) => {
		setLoading(true);
		const updateFaqBody: updateFaqParams = { data, slug };

		try {
			const res = action === 'create' ? await createFaq(data) : await updateFaq(updateFaqBody);
			getData();
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title:action==='create'? `${t('createFaq')}` :`${t('editFaq')}`,
					text: res.message,
				}),
			);
			setShow(!show);
			getData();
			setTimeout(() => dispatch(resetDialogue()), 2500);
		} catch (error) {}
		setLoading(false);
	};

	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};

	return (
		<PopUpContainer onSubmit={handleSubmit(onSubmit)}>
			<div className="form__input flex flex-col w-[100%] ">
				<label className={`input__label`} htmlFor="question">
					{t('field_label', { field: 'Question' })}
				</label>
				<Controller
					control={control}
					name="question"
					render={({ field, fieldState }) => (
						<InputText
							{...register('question')}
							type="text"
							id="question"
							placeholder={`${t('field_placeholder', { field: 'question' })}`}
							className={`input__field ${errors[`question`] ? 'p-invalid' : ''}`}
						/>
					)}
				/>
				{getFormErrorMessage('question')}
			</div>
			<div className="form__input flex flex-col w-full">
				<label className={`input__label`} htmlFor="answer">
					{t('field_label', { field: 'Answer' })}
				</label>
				<Controller
					control={control}
					name="answer"
					render={({ field, fieldState }) => (
						<InputTextarea
							{...register('answer')}
							rows={7}
							id="about"
							placeholder={`${t('field_placeholder', { field: 'Answer' })}`}
							className={`input__field ${errors[`answer`] ? 'p-invalid' : ''}`}
						/>
					)}
				/>
				{getFormErrorMessage('answer')}
			</div>
			<Button
				type="submit"
				label={loading ? 'Loading...' : `${t('Save Change')}`}
				className="form__submit__btn bg-[#01ABC1] text-white text-white "
				disabled={loading}
			></Button>
		</PopUpContainer>
	);
};

export default FAQPopUp;
