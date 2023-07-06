import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../core/store/slices/loaderSlice';
import { useQuery } from 'react-query';
import { routeModel } from '../../../core/enum/routeModels';
import { checkTeamsDups, getSystemTeams } from '../../../core/api/axiosCalls';
import { resetDialogue, setDialogue } from '../../../core/store/slices/dialogueSlice';

// Components
import Button from '../../../components/Button/Button';
import Table from '../../../components/Table/Table';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { toastifyWarn } from '../../../core/toaster/toastify';
import QueryDropdown from '../../../components/QueryDropdown/QueryDropdown';
import Spinner from '../../../components/Spinner/Spinner';

// ASSETS
import closemodal from './../../../assets/icons/teams/close-modal.png';
import changeIcon from '../../../assets/icons/gallery-edit.svg';
import { ReactComponent as Removeuser } from './../../../assets/icons/teams/remove-circle.svg';
import { ModalWrapper } from './CreateCup.style';
import deleteUserIcon from '../../../assets/icons/Group172565.png';
import editInput from '../../../assets/icons/cup/edit_input.png';

interface CupProps {
	hideCreate: () => void;
}

const CreateCup = ({ hideCreate }: CupProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [systemTeams, setSystemTeams] = useState([]);
	const [loading, setLoading] = useState<boolean>(false)

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
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'all',
	});
	const [filter, setFilter] = useState<any>({ name: 'Teams', value: 'teams' });
	const [options] = useState<Array<Record<string, any>>>([
		{ name: 'Teams', value: 'teams' },
		{ name: 'Individuals', value: 'individual' },
	]);

	const [teamsNoOptions] = useState<Array<Record<string, any>>>([
		{ name: '4', value: '4' },
		{ name: '8', value: '8' },
		{ name: '16', value: '16' },
	]);
	const [teamsNo, setTeamsNo] = useState<any>(teamsNoOptions[0].value);
	const [newImage, setNewImage] = useState<any>();
	const onSubmit = async (data: any) => {
		if (!filter || !photo || !newImage || !data.cupName) {
			toastifyWarn(t('complete_form'));
		} else {
			if (teams.length === Number(teamsNo)) {
				const cupData = {
					name: data.cupName,
					type: filter.value.charAt(0).toLowerCase() + filter.value.slice(1),
					teamsNo: Number(teamsNo),
				};
				if (cupData.type === 'teams') {
					const teamsIds: number[] = teams.map((el) => el.id);

					setLoading(true)

					try {
						const res = await checkTeamsDups({ teams: teamsIds });
						const teamA = teams.filter(el=>teamsIds[0] ==el.id)[0]
						const teamB = teams.filter(el=>teamsIds[1] ==el.id)[0]
						dispatch(
							setDialogue({
								show: true,
								type: 'Success',
								acceptColor: '#d5940f',
								textColor: '#d5940f',
								image: editInput,
								hasAction: false,
								acceptLabel: <div>{t('Continue')}</div>,
								onAccept: () => {
									dispatch(resetDialogue());
								},
								rejectLabel: `${t('Cancel')}`,
								title: `${t('Member Duplicated')}`,
								text: `${t(`A Member is Duplicated in Team "${teamA.name}" and Team "${teamB.name}", You need to remove that member from one of them!`)}`,
							}),
						);
					} catch (error) {}
					setLoading(false)

				} else {
					teams.map((el, i) => {
						el.numberOfMembers = '';
						el.remove = '';
						el.details = '';
					});
					setLoading(false)
					navigate(routeModel.cupDetails, { state: { data: cupData, teams, newImage } });
				}
			} else {
				toastifyWarn(t('not_enough_teams', { teamsNo: teamsNo, selected: teams.length }));
			}
		}
	};
	const getFormErrorMessage = (name: string) => {
		return (
			errors[`${name}`] && <p className="mt-2 p-error font-semibold text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message).slice(1, -1)}</p>
		);
	};

	const [teams, setTeams] = useState<Array<Record<string, any>>>([]);
	const teamsPage = useQuery({
		queryKey: [`system-teams-${filter.value}`, filter.value],
		queryFn: async () => {
			return await getSystemTeams(filter.value);
		},
		onSuccess: (data: any) => {
			setSystemTeams(data);
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});

	const cols = [
		{ field: 'details', width: '50%', fontSize: '1.125em' },
		{ field: 'numberOfMembers', width: '25%', fontSize: '1.125em' },
		{ field: 'remove', width: '10%', fontSize: '1.125em' },
	];
	const tableRow = (data) => {
		const editedData = data.map((record: Record<string, any>) => {
			record.details = '';
			record.numberOfMembers = '';
			record.remove = '';
			record.details = (
				<div className="member__container flex gap-2 text-xs items-center">
					<img
						className="w-[2.5em] h-[2.5em] rounded-[50%]  border-[1px] border-[#0000001A]"
						src={import.meta.env.VITE_THUMBNAILS + record.photo}
						alt="leaderIcon"
					/>
					{record.email ? (
						<div className="flex flex-col">
							<span className="member__name">{record.name}</span>
							<span className="leader__email ">{record.email}</span>
						</div>
					) : (
						<span className="member__name">{record.name}</span>
					)}
				</div>
			);
			record.numberOfMembers = record.members_count && (
				<span className="cup__teams_count table_def__text table_def__text">{t('members_count', { key: record.members_count })}</span>
			);

			record.remove = (
				<div className="remove__member flex text-xs gap-1 items-center cursor-pointer" onClick={() => removeTeam(record.id)}>
					<Removeuser className={`xl:w-[15px] w-[20px] h-[20px] xl:h-[15px] m-0 stroke-[0.5px]`} />
					<div className="font-semibold">{t('remove')}</div>
				</div>
			);
			return record;
		});
		return editedData;
	};
	tableRow(systemTeams);

	// Photo input
	const [photo, setPhoto] = useState<any>();
	const [validImg, setValidImg] = useState<boolean>(true);

	const changeImage = (e) => {
		setNewImage((prev) => e.target.files[0]);
		setPhoto(URL.createObjectURL(e.target.files[0]));
		setValidImg(true);
	};

	// DATA LIST

	const [focused, setFocused] = useState<any>(false);

	const teamSelected = (e) => {
		setFocused(false);
		if (teams.length + 1 > Number(teamsNo)) {
			toastifyWarn(t('total_teams_exceeded', { key: teamsNo }));
		} else {
			setTeams((prev) => {
				return [...prev, e];
			});
			setSystemTeams((prev) => {
				return prev.filter((el: any) => el?.id !== e.id);
			});
		}
	};
	const removeTeam = (id) => {
		let deletedTeam = {};
		setTeams((prev) => {
			deletedTeam = prev.filter((el) => el.id === id)[0];
			return prev.filter((el) => el.id !== id);
		});
		setSystemTeams((prev): any => {
			return [deletedTeam, ...prev];
		});
	};
	const teamTemplate = (option: any) => {
		return (
			<>
				<div className="member__container flex gap-2 items-center">
					<img className="w-[2em] h-[2em] rounded-[50%]" src={import.meta.env.VITE_THUMBNAILS + option.photo} alt="leaderIcon" />
					<div className="flex flex-col">
						<span className="member__name">{option.name}</span>
						<span className="member__email font-light text-[#AFAFAF]">{option.email}</span>
					</div>
				</div>
			</>
		);
	};
	return (
		<ModalWrapper className="top-0 absolute left flex items-center justify-center h-full z-[calc(998)]">
			<form className="modal__container bg-white relative p-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="modal__header flex w-full justify-between items-center">
					<div className="modal__title font-extrabold">{t('create_new', { key: 'Champions Cup' })}</div>
					<div
						className="modal__close_btn"
						onClick={() => {
							hideCreate();
						}}
					>
						<img src={closemodal} alt="close_modal" />
					</div>
				</div>
				<div className="modal__body">
					<div className="modal__cup__id flex justify-between items-center">
						<div className="header_inputs flex flex-row justify-between items-center">
							<div className="cup__photo">
								{!photo ? (
									<>
										<img className="upload_image" src={changeIcon} alt="icon" />
										<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => changeImage(e)}></input>
									</>
								) : (
									<>
										<img className="selected_image" src={photo} alt="icon" />
										<div className="change_photo">
											<img className="change_image_icon" src={changeIcon} alt="icon" />
											<input className="fileInput" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => changeImage(e)}></input>
										</div>
									</>
								)}
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
						<div className="modal__dropdown flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Type' })}
							</label>
							<QueryDropdown
								sorting={false}
								classNames={'standingDropdown'}
								options={options}
								searchQueries={(inputValue: Record<string, any>) => {
									if (teams.length) {
										dispatch(
											setDialogue({
												show: true,
												type: 'Confirmation',
												acceptLabel: `${t('Remove')}`,
												acceptColor: '#FF4A4A',
												textColor: '#FF4A4A',
												image: deleteUserIcon,
												hasAction: true,
												onAccept: () => {
													setTeams([]);
													setSystemTeams([]);
													setFilter(() => options.filter((el) => el.value === inputValue)[0]);
													dispatch(resetDialogue());
												},
												onReject: () => dispatch(resetDialogue()),
												rejectLabel: `${t('Cancel')}`,
												title: `${t('sure_title')}`,
												text: `${t('change_cup_type')}`,
											}),
										);
									} else {
										setTeams([]);
										setSystemTeams([]);
										setFilter(() => options.filter((el) => el.value === inputValue)[0]);
									}
								}}
							/>
						</div>
					</div>

					<div className="modal__cup__add_teams flex justify-between items-center">
						<div className="form__field me-2 flex flex-col mb-2">
							<label className={`input__label text-[#000]`} htmlFor="email">
								{t('field_label', { field: 'Add Teams' })}
								<span className="text-[#65A743] "> ({teams.length} added)</span>
							</label>
							<div className="datalist__parent">
								<img
									onClick={() => {
										setFocused(false);
									}}
									className="datalist_close_btn"
									src={closemodal}
									alt="closePopup"
								/>
								<ListBox
									filter
									value={systemTeams}
									onChange={(e) => teamSelected(e.value)}
									options={systemTeams}
									optionLabel="model"
									itemTemplate={teamTemplate}
									filterPlaceholder={`${t('team_search')}`}
									onFocus={(e) => {
										setFocused(true);
									}}
									filterBy="name,email"
									className={`w-full md:w-14rem datalist__container ${focused ? '' : 'hide'}`}
									listStyle={{ maxHeight: '160px' }}
								/>
							</div>
						</div>
						<div className="modal__dropdown flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'No. of Teams' })}
							</label>
							<QueryDropdown
								sorting={false}
								classNames={'standingDropdown'}
								options={teamsNoOptions}
								searchQueries={(inputValue: Record<string, any>) => {
									if (teams.length >= Number(inputValue)) {
										setTeams([]);
										setTeamsNo(inputValue);
									} else {
										setTeamsNo(inputValue);
									}
								}}
							/>
						</div>
					</div>
					<div className="modal__cup__teams">
						<div className="form__field flex flex-col mb-2">
							<label className={`input__label`} htmlFor="email">
								{t('field_label', { field: 'Teams' })}
							</label>
							<Table
								cols={cols}
								data={teams}
								heightControl={20}
								actions={{
									hasActions: false,
									hasEdit: false,
									hasDelete: false,
								}}
								hasPaginator={false}
							/>
						</div>
					</div>
				</div>
				<div className="modal__footer w-full">
					<Button type="submit"
					label={loading ? 'Loading...' : `${t(`Save Changes`)}`}
					disabled={loading ? true : false}
					className="form__submit__btn ms-auto bg-primary text-white"></Button>
				</div>
			</form>
		</ModalWrapper>
	);
};

export default CreateCup;
