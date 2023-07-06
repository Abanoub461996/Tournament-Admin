import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { activityDataType } from '../../ActivityPopUp';
import { InputTextarea } from 'primereact/inputtextarea';

import { ActivityDetailsConatiner } from '../MainActivity.style';
import { InputText } from 'primereact/inputtext';
import ulrIcon from '../../../../assets/icons/Group170351.png';
import UplaodFile from './UplaodFile';
import { toastifyWarn } from '../../../../core/toaster/toastify';
import AnswerPermission from './AnswerPermission';
import { Button } from 'primereact/button';
import { useAppDispatch } from '../../../../core/hooks/hooks';
import { resetDialogue, setDialogue } from '../../../../core/store/slices/dialogueSlice';
import successIcon from '../../../../assets/icons/Group 171119.png';
import { createActivity, getActivityData, handelAddReqFile, handelRemoveReqFile, updateActivity } from '../../../../core/api/axiosCalls';
import { useNavigate } from 'react-router-dom';
import { closeLoader, showLoader } from '../../../../core/store/slices/loaderSlice';
import Spinner from '../../../../components/Spinner/Spinner';

export type FormValues = {
	name: string;
	image: string;
	description: string;
	short_description: string;
	type: string;
	files: any;
	played_by: string;
	model_type: string;
	round_id: string;
	links: { url: string }[];
	url: string;
	total_score: string;
	duration: string;
	add_url: boolean;
	upload_file: boolean;
	type_text: boolean;
};
const ActivityDetails = (activityData) => {
	const navigate = useNavigate();
	let formData = new FormData();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const [totalSize, setTotalSize] = useState(0);
	const [loading, setLoading] = useState<boolean>(false);
	const maxSize = import.meta.env.VITE_MAX_ONE_FILE_SIZE;

	const [activityDetails, setActivityDetails] = useState<FormValues>({
		name: activityData.activity.name,
		image: activityData.activity.photo,
		short_description: activityData.activity.description,
		description: '',
		type: activityData.activity.activityType,
		played_by: activityData.activity.played_by,
		model_type: activityData.activity.type,
		round_id: activityData.activity.roundId,
		total_score: '',
		duration: activityData.activity.duration,
		files: [],
		links: [{ url: '' }],
		url: '',
		add_url: false,
		upload_file: false,
		type_text: false,
	});

	const [answerOptions, setAnswerOptions] = useState<{ name: string; checked: boolean }[]>([
		{ name: 'url', checked: false },
		{ name: 'files', checked: false },
		{ name: 'text', checked: false },
	]);
	const [activityIfo, setActivityData] = useState<activityDataType>({
		photo: activityData?.photo ? `${import.meta.env.VITE_THUMBNAILS}${activityData?.photo}` : '',
		name: activityData?.name || '',
		type: activityData?.type || 'standard',
		assignees: activityData?.assignees || '',
		duration: activityData?.duration || '',
		description: activityData?.description || '',
	});

	const handleGetActivityData = async () => {
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		const res: any = await getActivityData(activityData.activity.activitySlug);
		setActivityDetails((prev) => ({
			...prev,
			description: res.record.description,
			url: res.record.url,
			add_url: res.record.add_url === 1 ? true : false,
			upload_file: res.record.upload_file === 1 ? true : false,
			type_text: res.record.type_text === 1 ? true : false,
			files: res.record.files,
			total_score: res.record.total_score,
		}));
		// setAnswerOptions()
		dispatch(closeLoader());
	};

	useEffect(() => {
		if (activityData.activity.activitySlug) {
			handleGetActivityData();
		}
	}, [activityData.activity.activitySlug]);

	const Schema = yup.object({
		description: yup
			.string()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Description' })}`)
			.max(40, `${t('max_input', { key: 40, field: 'Description' })}`),
		total_score: yup.string().required(' '),
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FormValues>({
		values: activityDetails,
		resolver: yupResolver(Schema),
		mode: 'all',
	});

	// =========================== Handel Uplaod File ==========================================//
	// ==== Select File
	const onSelectFiles = (files) => {
		let _totalSize = totalSize;
		let filesArr: any = [];

		Object.keys(files).forEach(async (key) => {
			_totalSize += files[key].size || 0;
			if (Number(files[key].size / 1048576) > Number(maxSize)) {
				toastifyWarn(`${t('largeFileSize')}`);
				return;
			} else {
				filesArr.push(files[key]);
				if (activityData.activity.action === 'edit') {
					formData.append(`activity_files[]`, files[key]);
					const res = await handelAddReqFile(activityData.activity.activitySlug, formData);
					dispatch(
						setDialogue({
							show: true,
							type: 'Confirmation',
							acceptColor: '#65A743',
							textColor: '#65A743',
							image: successIcon,
							hasAction: false,
							title: `${t('AddFileMsg')}`,
							text: res.message,
						}),
					);
					setTimeout(() => dispatch(resetDialogue()), 2500);
				}
			}
		});
		setTotalSize(_totalSize);
		setActivityDetails((prev: any) => {
			const arr = { ...prev };
			let files = [...arr.files, ...filesArr];
			if (files.length > 10) {
				toastifyWarn(`${t('maxFilesNum')}`);
			} else {
				arr.files = files;
			}
			return arr;
		});

		// aRef.current.value = null;
	};

	// ==== Remove from Files
	const handelRemoveFile = (i) => {
		const res = activityDetails.files.filter((item, index) => index !== i);

		setActivityDetails((prev: any) => {
			const arr = { ...prev };
			arr.files = res;
			return arr;
		});
	};
	const removeReqFile = async (id) => {
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		const res = await handelRemoveReqFile(id);
		dispatch(
			setDialogue({
				show: true,
				type: 'Confirmation',
				acceptColor: '#65A743',
				textColor: '#65A743',
				image: successIcon,
				hasAction: false,
				title: `${t('removeFileMsg')}`,
				text: res.message,
			}),
		);
		setTimeout(() => dispatch(resetDialogue()), 2500);
		handleGetActivityData();
		dispatch(closeLoader());
	};
	// =========================== Handel Checked ==========================================//

	const handleChecked = (i, e) => {
		// setAnswerOptions((prev: any) => {
		// 	const arr = [...prev];
		// 	arr[i].checked = e;
		// 	return arr;
		// });
		setActivityDetails((prev) => ({ ...prev, [i]: e }));
	};

	//===============================================================================//

	const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message)?.slice(1, -1)}</p>;
	};
	const getFormArrayErrorMessage = (name: string, index: number) => {
		return (
			errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`][index]?.url?.message)?.slice(1, -1)}</p>
		);
	};
	const onSubmit = async (data) => {
		const { name, image, short_description, description, type, played_by, model_type, round_id, total_score, duration, files, links, url } =
			activityDetails;

		for (let index = 0; index < files.length; index++) {
			formData.append(`activity_files[${index}]`, files[index]);
		}

		const durationRes = duration.split(':');
		let totalTime;
		const hr = Number(durationRes[0]) * 60;
		const min = Number(durationRes[1]);
		const sec = Math.floor(Number(durationRes[2]) % 60);

		totalTime = hr + min + sec;

		const add_url = answerOptions[0].checked ? '1' : '0';
		const upload_file = answerOptions[1].checked ? '1 ' : ' 0';
		const type_text = answerOptions[2].checked ? '1' : '0';
		if (activityData.activity.action === 'create') {
			formData.append(`image`, activityData.activity.imageFile);
			formData.append(`name`, name);
			formData.append(`short_description`, short_description);
			formData.append(`description`, data.description);
			formData.append(`type`, type);
			formData.append(`played_by`, activityData.played_by);
			formData.append(`model_type`, model_type);
			formData.append(`round_id`, round_id);
			formData.append(`total_score`, data.total_score);
			formData.append(`duration`, totalTime);
			formData.append(`url`, data.url);
			formData.append(`add_url`, add_url);
			formData.append(`upload_file`, upload_file);
			formData.append(`type_text`, type_text);
		} else {
			formData.append(`_method`, 'put');
			formData.append(`name`, name);
			formData.append(`short_description`, short_description);
			formData.append(`description`, data.description);
			formData.append(`type`, type);
			formData.append(`played_by`, activityData.played_by);
			formData.append(`model_type`, model_type);
			formData.append(`round_id`, round_id);
			formData.append(`total_score`, data.total_score);
			formData.append(`duration`, totalTime);
			formData.append(`url`, data.url);
			formData.append(`add_url`, add_url);
			formData.append(`upload_file`, upload_file);
			formData.append(`type_text`, type_text);
			// formData.append(`image`, null);

			if (activityData.activity.imageFile) {
				formData.append(`image`, activityData.activity.imageFile);
			}
		}

		const res =
			activityData.activity.action === 'create' ? await createActivity(formData) : await updateActivity(formData, activityData.activity.activitySlug);
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
				title: `${activityData.activity.action === 'create' ? t('createActivityTitle') : t('editActivityTitle')}`,
				text: res.message,
			}),
		);
		setTimeout(() => dispatch(resetDialogue()), 2500);
		// navigate(`/${routeModel.tournament}/${res.record.slug}`);
	};
	return (
		<ActivityDetailsConatiner>
			<form className="modal__body flex flex-col gap-[1em]" onSubmit={handleSubmit(onSubmit)}>
				{activityData.activity.activityType === 'standard' && (
					<div className="form__field w-12 items-center gap-2 flex absolute -top-[5em] right-0" style={{ width: 'fit-content' }}>
						<label className={`input__label m-0`} htmlFor="total_score">
							{t('field_label', { field: 'Activity Score' })}
						</label>

						<Controller
							control={control}
							name="total_score"
							render={({ field, fieldState }) => (
								<InputText
									{...register('total_score')}
									type="text"
									id="total_score"
									className={`input__field w-[3em] h-[3em] p-2 ${errors[`total_score`] ? 'p-invalid' : ''}`}
								/>
							)}
						/>
						{getFormErrorMessage('total_score')}
					</div>
				)}
				<div className="form__field flex flex-col w-[10%]">
					<label className={`input__label`} htmlFor="description">
						{t('field_label', { field: 'Activity Details' })}
					</label>
					<Controller
						control={control}
						name="description"
						render={({ field, fieldState }) => (
							<InputTextarea
								{...register('description')}
								rows={3}
								id="description"
								placeholder={`${t('new_field_placeholder', { field: 'About' })}`}
								className={`input__field ${errors[`description`] ? 'p-invalid' : ''}`}
								style={{ maxHeight: 'none' }}
							/>
						)}
					/>
					{getFormErrorMessage('description')}
				</div>
				<div className="form__field flex flex-col w-[10%]">
					<label className={`input__label`} htmlFor="url">
						{t('field_label', { field: 'Activity URL Link' })}
					</label>
					<div className="w-full relative">
						<img className="absolute w-[3.5em] h-[3.5] cursor-pointer m-[1.5em]  " src={ulrIcon} alt="eye" />
						<Controller
							control={control}
							name="url"
							render={({ field, fieldState }) => (
								<InputText
									{...register('url')}
									id="url"
									placeholder={`${t('new_field_placeholder', { field: 'About' })}`}
									className={`input__field url_input w-full py-[2em] px-[3em] h-[6em] ${errors[`url`] ? 'p-invalid' : ''}`}
									style={{ maxHeight: 'none' }}
								/>
							)}
						/>
					</div>

					{getFormErrorMessage('url')}
				</div>

				<UplaodFile
					handelRemoveFile={handelRemoveFile}
					action={activityData.activity.action}
					onSelectFiles={onSelectFiles}
					selectedFiles={activityDetails.files}
					RemoveReqFile={removeReqFile}
				/>
				<AnswerPermission
					add_url={activityDetails.add_url}
					upload_file={activityDetails.upload_file}
					type_text={activityDetails.type_text}
					handleChecked={handleChecked}
				/>
				<Button
					type="submit"
					label={loading ? 'Loading...' : activityData.activity.action === 'create' ? `${t('Publish Activity')}` : `${t('Edit Activity')}`}
					className="form__submit__btn bg-[#01ABC1] text-white text-white "
					disabled={false}
				></Button>
			</form>
		</ActivityDetailsConatiner>
	);
};

export default ActivityDetails;
