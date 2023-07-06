import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';

//Component
import { TournamentPopUpProps } from '../../TournamentPopUp';
import { useAppDispatch } from '../../../../core/hooks/hooks';
import { createRound, updateRound } from '../../../../core/api/axiosCalls';
import { resetDialogue, setDialogue } from '../../../../core/store/slices/dialogueSlice';

//Assets
import successIcon from '../../../../assets/icons/Group 171119.png';
import calenderIcon from '../../../../assets/icons/calendar(2).png';
import { PopUpContainer } from '../../Tournament.style';

const RoundPopUp = ({ action, data, show, setShow, getData, slug, id }: TournamentPopUpProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [roundInfo, setRoundInfo] = useState({
		name: data?.name || '',
		date: data?.end_date ? new Date(moment(data?.end_date, 'YYYY-MM-DD').format('YYYY/MM/DD')) : '',
	});

	const Schema = yup.object({
		name: yup
			.string()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Name' })}`)
			.max(40, `${t('max_input', { key: 40, field: 'Name' })}`),
		date: yup.string().required(`${t('required_field')}`),
	});
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: roundInfo || {},
		resolver: yupResolver(Schema),
		mode: 'all',
	});

	//===============================================================================//

	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};

	//================================ submit ===========================================//

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const { name, date } = data;
			const body = {
				name,
				tournament_id: id,
				end_date: moment(date).format('YYYY-MM-DD HH:mm:ss'),
			};
			const res = action === 'create' ? await createRound(body) : await updateRound(data, slug);
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
					title: `${action === 'create' ? t('createRoundTitle') : t('editRoundTitle')}`,
					text: res.message,
				}),
			);
			setTimeout(() => dispatch(resetDialogue()), 2500);
		} catch (error) {}
		setLoading(false);
	};

	return (
		<PopUpContainer>
			<form className="flex flex-col mt-[1em] gap-[1.5em] max-h-[100%] Tournament__Form" onSubmit={handleSubmit(onSubmit)}>
				<div className="form__input flex flex-col w-[100%] ">
					<label className={`input__label`} htmlFor="name">
						{t('field_label', { field: 'Round Name' })}
					</label>
					<Controller
						control={control}
						name="name"
						render={({ field, fieldState }) => (
							<InputText
								{...register('name')}
								type="text"
								id="name"
								placeholder={`${t('new_field_placeholder', { field: 'Name' })}`}
								className={`input__field  ${errors[`name`] ? 'p-invalid' : ''}`}
							/>
						)}
					/>
					{getFormErrorMessage('name')}
				</div>

				<div className="form__input flex flex-col w-[100%]">
					<label className={`input__label`} htmlFor="dateOfBirth">
						{t('field_label', { field: 'Due Date' })}
					</label>
					<Controller
						control={control}
						name="date"
						render={({ field }) => (
							<>
								{/* <Calendar
									{...register('date')}
									{...field}
									id="dateOfBirth"
									// dateFormat="yy/mm/dd"
									placeholder="YYYY-MM-DD hh-mm-ss"
									showIcon={true}
									minDate={new Date()}
									icon={() => <img className=" hover:bg-none " src={calenderIcon} alt="" />}
									readOnlyInput={true}
									className={`input__field date__picker rounded-lg  ${errors[`dateOfBirth`] ? 'p-invalid' : ''}`}
								/> */}
								<Calendar
									className={`input__field date__picker rounded-lg  ${errors[`dateOfBirth`] ? 'p-invalid' : ''}`}
									placeholder="YYYY-MM-DD hh-mm-ss"
									{...register('date')}
									{...field}
									id="dateOfBirth"
									icon={() => <img className=" hover:bg-none " src={calenderIcon} alt="" />}
									showTime
									showIcon
									minDate={new Date()}
									hourFormat="24"
								/>
							</>
						)}
					/>

					{getFormErrorMessage('dateOfBirth')}
				</div>
				<Button
					type="submit"
					label={loading ? 'Loading...' : `${t(`${action === 'create' ? 'Continue' : 'Save Changes'} `)}`}
					className="form__submit__btn w-full  bg-[#01ABC1] text-white text-white "
					disabled={loading ? true : false}
				></Button>
			</form>
		</PopUpContainer>
	);
};

export default RoundPopUp;
