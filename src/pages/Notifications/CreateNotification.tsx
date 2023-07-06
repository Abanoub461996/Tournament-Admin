import React , {useEffect, useState} from "react";
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { useForm } from 'react-hook-form';
import BreadcrumbsComp from '../../components/BreadCrumb/BreadCrumb';
import { useTranslation } from 'react-i18next';
import { MainLayout, InnerContainer, MainLayoutHeader, PaginationContainer } from '../../layouts/MainLayout.style';
import CreateBtn from '../../components/CreateBtn/CreateBtn';
import styles from './createNotifications.module.css';
import { useNavigate } from 'react-router';
import { useQuery } from "react-query";
import axiosInstance from "../../core/api/axiosInstance";
import { assignTeamMembers , getSystemUsers } from "../../core/api/axiosCalls";
import { AddMemberWrapper } from '../Teams/TeamProfile/AddMember/AddMember.style';
import { ListBox } from "primereact/listbox";
import Table from '../../components/Table/Table';
import * as yup from 'yup';
import { resetDialogue ,setDialogue } from '../../core/store/slices/dialogueSlice';
import Button from "../../components/Button/Button";
import { ReactComponent as Removeuser } from '../../assets/icons/teams/remove-circle.svg';
import { yupResolver } from "@hookform/resolvers/yup";
import successIcon from '../../assets/icons/Group 171119.png';

function CreateNotification () {

    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');

    const [members, setMembers] = useState<Array<Record<string, any>>>([]);
    const [membersIds,setMemberIds] = useState<Array<Record<string, any>>>([]);
    const [systemMembers, setSystemMembers] = useState([]);
    const [focused, setFocused] = useState<any>(false);
    const [isChecked , setIsChecked] = useState(false);

    const Schema = yup.object({
        title: yup
			.string()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Title' })}`)
			.max(220, `${t('max_input', { key: 220, field: 'Title' })}`),
            
		description: yup
			.string()
			.required(`${t('required_field')}`)
			.min(2, `${t('min_input', { key: 2, field: 'Description' })}`)
			.max(2000, `${t('max_input', { key: 2000, field: 'Description' })}`),
	});

    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(Schema),});

    const getFormErrorMessage = (name: string) => {
		return errors[`${name}`] && <p className="mt-2 p-error text-xs p-0 m-0">{JSON.stringify(errors[`${name}`]?.message)?.slice(1, -1)}</p>;
	};

	const {data,isLoading,isFetching} = useQuery({
		queryKey: [`system-members`],
		queryFn: async () => {
			return await getSystemUsers();
		},
		onSuccess: (data: any) => {
            setSystemMembers(data);
		}
	});

    useEffect(() => {
        if(isFetching){
            dispatch(showLoader({ show: true, animation: <Spinner /> }));
        }else{
            dispatch(closeLoader());
        }            
    },[isFetching])

    const cols = [
		{ field: 'details', width: '80%', fontSize: '1.125em' },
		{ field: 'remove', width: '20%', fontSize: '1.125em' },
	];

    const memberSelected = (e) => {
		setFocused(false);
		setMembers((prev) => {
			return [...prev, e];
		});
		setSystemMembers((prev) => {
			return prev.filter((el: any) => el?.id !== e.id);
		});
        setMemberIds((prev) => {
            return [...prev,e.id];
        });
	};

	const memberTemplate = (option: any) => {
		return (
			<>
				<div className="member__container flex gap-2 text-xs items-center">
					<img className="w-[2em] h-[2em] rounded-[50%]" src={import.meta.env.VITE_THUMBNAILS + option.photo} alt="leaderIcon" />
					<div className="flex flex-col">
						<span className="member__name">{option.name}</span>
						<span className="member__email font-light text-[#AFAFAF]">{option.email}</span>
					</div>
				</div>
			</>
		);
	};

    const removeMemeber = (id) => {
		setMembers((prev) => {
			return prev.filter((el) => el.id !== id);
		});
		setSystemMembers((prev): any => {
			let thisMemeber = members.filter((el) => el.id === id);
			return [...prev, ...thisMemeber];
		});
	};

	const tableRow = (data) => {
		const editedData = data.map((record: Record<string, any>) => {
			record.details = (
				<div className="member__container flex gap-2 text-xs">
					<img
						className="w-[2.5em] h-[2.5em] rounded-[50%]  border-[1px] border-[#0000001A]"
						src={import.meta.env.VITE_THUMBNAILS + record.photo}
						alt="leaderIcon"
					/>
					<div className="flex flex-col">
						<span className="member__name">{record.name}</span>
						<span className="member__email font-light text-[#AFAFAF]">
							{(record.email && record.email.indexOf('@') > 4) ? record.email.slice(0, 5) + '...' + record.email.slice(record.email.indexOf('@')):record.email}
						</span>
					</div>
				</div>
			);
			record.remove = (
				<div className="remove__member flex text-xs gap-1 items-center cursor-pointer" onClick={() => removeMemeber(record.id)}>
					<Removeuser className={`w-[20px] h-[20px] m-0 stroke-[0.5px]`} />
					<div className="font-semibold">{t('remove')}</div>
				</div>
			);
			return record;
		});
		return editedData;
	};
	tableRow(members);

    const CheckIfAllMembersSelected = (e) => {
        if(e.target.checked == true){
            setIsChecked(true);
        }else{
            setIsChecked(false);
        }
    }

    const submitNotifications = async (data) => {
        let formData = new FormData();
        formData.append('title' , data.title);
        formData.append('description' , data.description);
        if(members.length > 0 && isChecked == false){
            for(let i = 0 ; i < members.length ; i++){
                formData.append('users[]' , members[i].id);
            }
        }
        if(isChecked == true){
            setMembers([]);
        }
        dispatch(resetDialogue());
        dispatch(showLoader({ show: true, animation: <Spinner /> }));
        try {
            const response = await axiosInstance.post('notifications', formData).then((res) => res);
            dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('Notification_Sent_Successfully')}`,
					text: response.data.message,
				}),
			);
        } catch (error) {
            console.log(error);
        }
        dispatch(closeLoader());
        setTimeout(() => {
            dispatch(resetDialogue())
        },1500);
        setTimeout(() => {
            navigate('/notifications');
        },1500);
    };

    return (
        <>
            <MainLayout>
                <MainLayoutHeader>
                    <div>
                        <BreadcrumbsComp />
                        <p className="page__title">{t('Create Notifications')}</p>
                    </div>
                </MainLayoutHeader>

                <div className="container-fluid pl-0 pr-0">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className={styles.styleCard+ ` card`}>
                                <div className={styles.styleCardBody+ ` card-body`}>
                                    <form  onSubmit={handleSubmit(submitNotifications)}>
                                        <div className="col mb-4">
                                            <label className={styles.styleLabel}>Notification Title</label>
                                            <input type="text" className={`form-control ${errors[`title`] ? 'border-danger' : ''}`} id="title" {...register("title")}/>
                                            {getFormErrorMessage('title')}
                                        </div>
                                        <div className="col mb-4">
                                            <label className={styles.styleLabel}>Notification Description</label>
                                            <textarea cols={10} rows={7} className={`form-control ${errors[`description`] ? 'border-danger' : ''}`} id="description" {...register("description")} style={{resize:'none'}}></textarea>
                                            {getFormErrorMessage('description')}
                                        </div>
                                        <div className="col mb-4">
                                            <div className="">
                                                <div className="">
                                                    <div className="form__field flex flex-col mb-2">
                                                        <div className="d-flex bd-highlight">
                                                            <div className="p-2 flex-grow-1 bd-highlight">
                                                                <label className={styles.styleLabel} htmlFor="email">
                                                                    {t('field_label', { field: 'Add Members' })}
                                                                </label>
                                                            </div>
                                                            <div className="p-2 bd-highlight">
                                                                <div className={styles.leader__check+` flex text-xs`}>
                                                                    <input
                                                                        type={'checkbox'}
                                                                        onClick={CheckIfAllMembersSelected}
                                                                        className={`me-1`}
                                                                    />
                                                                    <>{t('All Members')}</>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isChecked == true ? `d-none` : `d-block datalist__parent`}>
                                                            <ListBox
                                                                filter
                                                                value={systemMembers}
                                                                filterPlaceholder={`${t('users_search')}`}
                                                                onChange={(e) => memberSelected(e.value)}
                                                                options={systemMembers}
                                                                optionLabel="model"
                                                                itemTemplate={memberTemplate}
                                                                onFocus={(e) => {
                                                                    setFocused(true);
                                                                }}
                                                                filterBy="name,email"
                                                                className={`w-full md:w-14rem datalist__container ${focused ? '' : 'hide'}`}
                                                                listStyle={{ maxHeight: '160px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={isChecked == true ? `d-none` : `d-block modal__team__members`}>
                                                    <div className="form__field flex flex-col mb-2">
                                                        <label className={styles.styleLabel} htmlFor="email">
                                                            {t('field_label', { field: 'Members' })}
                                                        </label>
                                                        <Table
                                                            cols={cols}
                                                            data={members}
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
                                        </div>
                                        <div className="col mb-4 d-flex justify-content-end">
                                            <CreateBtn
                                                label="Push Notifications"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </MainLayout>
        </>
    );
}

export default CreateNotification;