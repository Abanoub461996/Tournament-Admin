import React, { Dispatch, SetStateAction, useState } from 'react';
import { startCupRound } from '../../core/api/axiosCalls';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import moment from 'moment';

// COMPONENTS
import { Calendar } from 'primereact/calendar';
import Spinner from '../Spinner/Spinner';
import { Button } from 'primereact/button';
import { toastifySuccess } from '../../core/toaster/toastify';

// ASSETS
import { DatePickerWrapper } from './DateTimePicker.style';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import calenderIcon from '../../assets/icons/calendar(2).png';

interface DateTimePickerProps {
	setShowPicker: Dispatch<SetStateAction<boolean>>;
	cupSlug: string;
}
const DateTimePicker = ({ setShowPicker, cupSlug }: DateTimePickerProps) => {
	const { t } = useTranslation();
	const [datetime24h, setDateTime24h] = useState<any>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const startChampionRound = async (e) => {
		e.preventDefault();
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		try {
			await startCupRound(cupSlug, { end_date: moment.utc(datetime24h).format('YYYY-MM-DD HH:mm:ss') });
			toastifySuccess(t('round__started'));
		} catch (error) {}
		setShowPicker(false);
		dispatch(closeLoader());
		navigate(-1);
	};
	const dateTemplate = (date) => {
		if (validateDate(date)) {
			return date.day;
		} else {
			return (
				<div className="pointer-events-none disabled" style={{ textDecoration: 'line-through' }}>
					{date.day}
				</div>
			);
		}
	};

	const validateDate = (date) => {
		if (date.year > new Date().getFullYear()) {
			return true;
		} else if (date.year === new Date().getFullYear() && date.month > new Date().getMonth()) {
			return true;
		} else if (date.year === new Date().getFullYear() && date.month === new Date().getMonth() && date.day > new Date().getDate()) {
			return true;
		} else {
			return false;
		}
	};
	const [validDate, setValidDate] = useState<boolean>(true);
	return (
		<DatePickerWrapper className="flex-auto" borderColor={datetime24h ? `${validDate ? 'var(--main-color)' : '#f44336'}` : '#ced4da'}>
			<div className="flex-auto picker__field__container mb-4">
				<label htmlFor="calendar-24h" className="font-bold block mb-2">
					Confirm Round End Date and Time
				</label>
				<Calendar
					id="calendar-24h"
					className={`picker__input`}
					value={datetime24h}
					dateTemplate={dateTemplate}
					onChange={(e) => {
						setDateTime24h(e.value);
						e.value && setValidDate(new Date(e.value + '').getTime() > new Date().getTime());
					}}
					showTime
					showIcon
					icon={() => <img className=" hover:bg-none " src={calenderIcon} alt="" />}
					placeholder="YYYY-MM-DD hh-mm-ss"
					minDate={new Date()}
					hourFormat="24"
				/>
			</div>
			<Button
				type="submit"
				label={`${t('start_round', { key: 'Cup' })}`}
				className="form__submit__btn bg-[#01ABC1] text-white"
				onClick={startChampionRound}
				disabled={!datetime24h || !validDate}
			></Button>
		</DatePickerWrapper>
	);
};

export default DateTimePicker;
