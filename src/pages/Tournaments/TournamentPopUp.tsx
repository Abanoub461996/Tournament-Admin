import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../core/hooks/hooks';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

// Components
import MiniProfile from '../../components/ReusableComponent/MiniProfile/MiniProfile';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';
import { createTournment, updateTournment } from '../../core/api/axiosCalls';

// ASSETS
import { PopUpContainer } from './Tournament.style';

import successIcon from '../../assets/icons/Group 171119.png';
import changeIcon from '../../assets/icons/gallery-edit.svg';
import { ReactComponent as DropDown } from '../../assets/icons/general/dropDown.svg';
import { toastifyWarn } from '../../core/toaster/toastify';
import { useNavigate } from 'react-router';
import { routeModel } from '../../core/enum/routeModels';

export type TournamentPopUpProps = {
	action: string;
	data?: any;
	show?: boolean;
	setShow?: any;
	getData?: any;
	slug?: string;
	id?: string;
};
export type mainObjType = {
	name: string;
	photo?: any;
	type: string;
	members: [];
};

export const typeOptions = [
	{ label: 'Teams', value: 'teams' },
	{ label: 'Individual', value: 'individual' },
];

const TournamentPopUp = ({ action, data, show, setShow, getData, slug }: TournamentPopUpProps) => {
	const navigate = useNavigate();
	let formData = new FormData();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const aRef: any = useRef(null);
	const [validImg, setValidImg] = useState<boolean>(true);
	const [photo, setPhoto] = useState<any>('');

	const [loading, setLoading] = useState<boolean>(false);

	const [tournamentInfo, settournamentInfo] = useState<mainObjType>({
		name: data?.name || '',
		photo: data?.photo ? `${import.meta.env.VITE_THUMBNAILS}${data?.photo}` : '',
		type: data?.type || 'teams',
		members: data?.teams || [],
	});

	const Schema = yup.object({
		name: yup
			.string()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Name' })}`)
			.max(40, `${t('max_input', { key: 40, field: 'Name' })}`),
		type: yup.string().required(`${t('required_field')}`),
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: tournamentInfo || {},
		resolver: yupResolver(Schema),
		mode: 'all',
	});

	const handellChangeImage = async (e: any) => {
		setPhoto(e.target.files[0]);
		settournamentInfo((prev) => ({ ...prev, photo: URL.createObjectURL(e.target.files[0]) }));
		setValidImg(true);
	};

	//===============================================================================//

	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>;
	};

	//================================ submit ===========================================//

	const onSubmit = async (data) => {
		if (photo === '' && action === 'create') {
			toastifyWarn(t('complete_form'));
			setValidImg(false);
			return;
		} else {
			setLoading(true);
			try {
				const { name, type } = data;
				formData.append(`name`, name);

				if (action === 'create') {
					formData.append(`type`, type);
					formData.append(`photo`, photo);
				} else if (action === 'edit') {
					formData.append(`_method`, 'put');
					if (photo) {
						formData.append(`photo`, photo);
					}
				}

				const res = action === 'create' ? await createTournment(formData) : await updateTournment(formData, slug);
				// setShow(!show);
				// getData.refetch();
				dispatch(
					setDialogue({
						show: true,
						type: 'Confirmation',
						acceptColor: '#65A743',
						textColor: '#65A743',
						image: successIcon,
						hasAction: false,
						title: `${action === 'create' ? t('createTournmentTitle') : t('editTournmentTitle')}`,
						text: res.message,
					}),
				);
				setTimeout(() => dispatch(resetDialogue()), 2500);
				navigate(`/${routeModel.tournament}/${res.record.slug}`);
			} catch (error) {}
			setLoading(false);
		}
	};

	return (
		<PopUpContainer outlineColor={validImg ? '#1E1E1E1A' : '#f44336'}>
			<form className="flex flex-col mt-[1em] gap-[1.5em] max-h-[100%] Tournament__Form" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-4 items-center justify-center">
					<div className="w-[6em] h-[6em] max-w-[8em] max-h-[8em] flex items-center justify-center  ">
						{!tournamentInfo?.photo ? (
							<div className="relative w-[100%] w-[6em] h-[6em] cursor-pointer rounded-[50%]  flex items-center justify-center add__photo ">
								<img className="absolute w-8 h-8 cursor-pointer	" src={changeIcon} alt="icon" />
								<input
									accept=".png, .jpg, .jpeg, .svg"
									className="absolute w-full min-h-full opacity-0 cursor-pointer"
									type="file"
									onChange={(e) => handellChangeImage(e)}
								></input>
							</div>
						) : (
							<MiniProfile
								width={160}
								outlineColor={validImg ? '#01abc1' : '#f44336'}
								offset={-5}
								margin="4.2"
								img={tournamentInfo?.photo}
								changeimge={handellChangeImage}
								aRef={aRef}
							/>
						)}
					</div>

					<div className="form__input flex flex-col w-[70%] ">
						<label className={`input__label`} htmlFor="type">
							{t('field_label', { field: 'Tournament Type' })}
						</label>
						<Controller
							control={control}
							name="type"
							render={({ field }) => (
								<Dropdown
									{...register('type')}
									{...field}
									id="type"
									disabled={action === 'edit'}
									dropdownIcon={<DropDown />}
									placeholder={`${t('select_placeholder', { field: 'type' })}`}
									options={typeOptions}
									className={`input__field  ${errors[`type`] ? 'p-invalid' : ''}`}
								/>
							)}
						/>

						{getFormErrorMessage('type')}
					</div>
				</div>
				<div className="form__input flex flex-col w-[100%] ">
					<label className={`input__label`} htmlFor="name">
						{t('field_label', { field: ' Tournament Name' })}
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

				<Button
					type="submit"
					label={loading ? 'Loading...' : `${t(`${action === 'create' ? 'Create tournament' : 'Save Changes'} `)}`}
					disabled={loading ? true : false}
					className="form__submit__btn w-full  bg-[#01ABC1] text-white text-white "
				></Button>
			</form>
		</PopUpContainer>
	);
};

export default TournamentPopUp;
