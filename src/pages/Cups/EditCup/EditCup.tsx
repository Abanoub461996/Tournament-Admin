import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../core/store/slices/loaderSlice';
import { useMount } from 'react-use';
// Components
import Button from '../../../components/Button/Button';
import { InputText } from 'primereact/inputtext';
import { toastifyWarn } from '../../../core/toaster/toastify';
import QueryDropdown from '../../../components/QueryDropdown/QueryDropdown';
import Spinner from '../../../components/Spinner/Spinner';

// ASSETS
import closemodal from './../../../assets/icons/teams/close-modal.png';
import changeIcon from '../../../assets/icons/gallery-edit.svg';
import { updateCup } from '../../../core/api/axiosCalls';
import { resetDialogue, setDialogue } from '../../../core/store/slices/dialogueSlice';
import { ModalWrapper } from './EditCup.style';
import successIcon from '../../../assets/icons/Group 171119.png';

interface CupProps {
	hideEdit: () => void;
	slug: string;
	cup: any;
    callRefetch:()=>void
}

const EditCup = ({ hideEdit, slug, cup,callRefetch }: CupProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const schema = yup.object({
		cupName: yup
			.string()
			.trim()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Cup Name' })}`)
			.max(40, `${t('max_input', { key: 40, field: 'Cup Name' })}`),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'all',
	});
	useMount(() => {
		setPhoto(`${import.meta.env.VITE_THUMBNAILS}${cup.photo}`);
		setValue('cupName', cup.name);
	});
	const [options] = useState<Array<Record<string, any>>>([{ name: cup.type.charAt(0).toUpperCase() + cup.type.slice(1), value: cup.type }]);
	const [teamsNoOptions] = useState<Array<Record<string, any>>>([{ name: cup.teams_count, value: cup.teams_count }]);
	const [newImage, setNewImage] = useState<any>();
	const formData = new FormData();
	const onSubmit = async (data: any) => {
		if (!data.cupName) {
			toastifyWarn(t('complete_form'));
		} else {
			newImage && formData.append(`photo`, newImage);
			formData.append(`name`, data.cupName);
			formData.append(`_method`, 'PUT');
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			try {
				const res = await updateCup(slug, formData);
				dispatch(
					setDialogue({
						show: true,
						type: 'Confirmation',
						acceptColor: '#65A743',
						textColor: '#65A743',
						image: successIcon,
						hasAction: false,
						title: t('cup_edit'),
						text: res.message,
					}),
				);
				setTimeout(() => dispatch(resetDialogue()), 2500);
				hideEdit();
				callRefetch()
			} catch (error) {}
			dispatch(closeLoader());
		}
	};
	const getFormErrorMessage = (name: string) => {
		return (
			errors[`${name}`] && <p className="mt-2 p-error font-semibold text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>
		);
	};

	// Photo input
	const [photo, setPhoto] = useState<any>();
	const [validImg, setValidImg] = useState<boolean>(true);

	const changeImage = (e) => {
		setNewImage((prev) => e.target.files[0]);
		setPhoto(URL.createObjectURL(e.target.files[0]));
		setValidImg(true);
	};

	return (
		<ModalWrapper className="top-0 absolute left flex items-center justify-center h-full z-[calc(998)]">
			<form className="modal__container bg-white relative p-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="modal__header flex w-full justify-between items-center">
					<div className="modal__title font-extrabold">{t('create_new', { key: 'Champions Cup' })}</div>
					<div
						className="modal__close_btn"
						onClick={() => {
							hideEdit();
						}}
					>
						<img src={closemodal} alt="close_modal" />
					</div>
				</div>
				<div className="modal__body">
					<div className="modal__cup__id flex justify-between items-center">
						<div className="header_inputs flex flex-row justify-between items-center">
							<div className="cup__photo">
								<>
									<img className="selected_image" src={photo} alt="icon" />
									<div className="change_photo">
										<img className="change_image_icon" src={changeIcon} alt="icon" />
										<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => changeImage(e)}></input>
									</div>
								</>
							</div>
							<div className="form__field flex flex-col mb-2 me-2">
								<label className={`input__label`} htmlFor="cupName">
									{t('field_label', { field: 'Cup Name' })}
								</label>
								<InputText
									{...register('cupName')}
									type="cupName"
									id="cupName"
									placeholder={`${t('field_placeholder', { field: 'Cup Name' })}`}
									className={`input__field ${errors[`cupName`] ? 'p-invalid' : ''}`}
								/>
								{getFormErrorMessage('cupName')}
							</div>
						</div>
					</div>

					<div className="modal__cup__add_teams flex justify-between items-center">
						<div className="form__field me-2 flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Type' })}
							</label>
							<QueryDropdown
								sorting={false}
								disabled={true}
								classNames={'standingDropdown'}
								options={options}
								searchQueries={(inputValue: Record<string, any>) => {}}
							/>
						</div>
						<div className="modal__dropdown flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'No. of Teams' })}
							</label>
							<QueryDropdown
								sorting={false}
								disabled={true}
								classNames={'standingDropdown'}
								options={teamsNoOptions}
								searchQueries={(inputValue: Record<string, any>) => {}}
							/>
						</div>
					</div>
				</div>
				<div className="modal__footer w-full">
					<Button type="submit" label={t('save_changes')} className="form__submit__btn ms-auto bg-primary text-white"></Button>
				</div>
			</form>
		</ModalWrapper>
	);
};

export default EditCup;
