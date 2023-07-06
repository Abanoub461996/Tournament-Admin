import React , {useEffect, useState} from "react";
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import BreadcrumbsComp from '../../components/BreadCrumb/BreadCrumb';
import { useTranslation } from 'react-i18next';
import { MainLayout, InnerContainer, MainLayoutHeader, PaginationContainer } from '../../layouts/MainLayout.style';
import CreateBtn from '../../components/CreateBtn/CreateBtn';
import styles from './Notifications.module.css';
import CounterNotification from '../../assets/images/counter-notification.svg';
import { useNavigate } from 'react-router';
import { getAllNotifications } from "../../core/api/axiosCalls";
import { useQuery } from "react-query";
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Popup';
import {useUpdateEffect} from 'react-use';

function Notifications () {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [notifications , setNotifications] = useState<Array<any>>([]);
    const[totalNotifictaions , setTotalNotifications] = useState(0);
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [dataComp , setDataComp] = useState<any>({});

    const [paginationHelper, setPaginationHelper] = useState({
		start: 1,
		current_page: 1,
		end: 1,
		total: 15,
		per_page: 15,
	});

	const setQueryPage = (page: number) => {
		setPaginationHelper((prev) => ({
			...prev,
			current_page: page,
		}));
	};

    const {data,isLoading, isFetching , status} = useQuery({
		queryKey: [`system-notifications`,paginationHelper.current_page],
		queryFn: async () => {
            return await getAllNotifications(paginationHelper.current_page);
		},
		onSuccess: (data: any) => {
            setNotifications(data.records.data);
            setTotalNotifications(data.records.total);
            
            setPaginationHelper((prev) => ({
				...prev,
				current_page: data.records.current_page,
				end: data.records.last_page,
				total: data.records.total,
				per_page: data.records.per_page,
			}));
		}
	});

    useEffect(() => {
        if(isFetching){
            dispatch(showLoader({ show: true, animation: <Spinner /> }));
        }else{
            dispatch(closeLoader());
        }            
    },[isFetching])

    const showDetails = (data) => {
        setShowPopUp(true);
        setDataComp(data);
    };

    const renderPopUp = () =>
		showPopUp === true && (
			<Popup
				title={
                    'Notifiction Details'
                }
				content={
					<>
                        <div className="col mb-3">
                            <label className={styles.styleTextNotifications}>Notification Title</label>
                            <input type="text" readOnly className="form-control" defaultValue={dataComp.title}/>
                        </div>
                        <div className="col mb-3">
                            <label className={styles.styleTextNotifications}>Notification Description</label>
                            <textarea cols={10} rows={7} className="form-control" defaultValue={dataComp.description} readOnly />
                        </div>
                    </>
				}
				show={showPopUp}
				setShow={setShowPopUp}
			/>
		);
        
    return (
        <>
            <MainLayout>
                <MainLayoutHeader>
                    <div>
                        <BreadcrumbsComp />
                        <p className="page__title">{t('Notifications')}</p>
                    </div>

                    <CreateBtn
                        label="Push New Notifications"
                        handleAction={async () => {
                            setLoading(true);
                            dispatch(showLoader({ show: true, animation: <Spinner /> }));
                            setTimeout(() => {
                                dispatch(closeLoader());
                                setLoading(false);
                            } , 3000);
                            navigate('create');
                        }}
                    />
                </MainLayoutHeader>
                <div className="container-fluid pl-0 pr-0">
                    <div className="row">
                        <div className="col-md-3">
                            <div className={styles.notification_count+` d-flex bd-highlight`}>
                                <div className="p-2 d-flex flex-grow-1 bd-highlight">
                                    <img className={styles.styleImage} src={CounterNotification} alt="" />
                                    &nbsp;&nbsp;
                                    <p className={styles.styleTextNotifications}>All Notifications</p>
                                </div>
                                <div className="p-2 bd-highlight">
                                    <span className={styles.styleTextNotifications}>{totalNotifictaions}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 mb-4">

                            <ul className={styles.styleUlList+ ` list-group`}>
                                {notifications.length ?
                                    notifications?.map((notification,idx) => (
                                        <li key={idx} onClick={() => showDetails(notification)} className={styles.borderStyleBottom+ ` list-group-item d-flex bd-highlight p-4`}>
                                            <div className="d-flex p-2 flex-grow-1 bd-highlight">
                                                <div className={styles.aboveDot}>
                                                    <span className={styles.dot}></span>
                                                </div>
                                                &nbsp;&nbsp;&nbsp;
                                                <div>
                                                    <h5 className={styles.styleTextNotifications}>{notification.title.length > 50 ? notification.title.substring(0, 50)+` ...` : notification.title}</h5>
                                                    <p className={styles.styleTime}>{notification.description.length > 100 ? notification.description.substring(0, 100)+` ...` : notification.description}</p>
                                                </div>
                                            </div>
                                            <div className="p-2 bd-highlight">
                                                <span className={styles.styleTime}>{notification.ago} min ago</span>
                                            </div>
                                        </li>
                                    ))
                                    :<>
                                        <li className={styles.borderStyleBottom+ ` list-group-item d-flex`}>
                                            <div className="d-flex justify-content-center">
                                                <div className="text-center">
                                                    <h3 className={styles.styleTextNotifications+` text-center`}>No Notiifctaions</h3>
                                                </div>
                                            </div>
                                        </li>
                                    </>
                                 }
                            </ul>

                            <PaginationContainer>
                                <Pagination paginator={paginationHelper} setQueryPage={(page: number) => setQueryPage(page + 1)} />
                            </PaginationContainer>
                        </div>
                    </div>
                </div>
            </MainLayout>
            {renderPopUp()}
        </>
    );
}

export default Notifications;