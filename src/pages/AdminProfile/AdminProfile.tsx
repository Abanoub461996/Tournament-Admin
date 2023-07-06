import React, { useEffect, useState, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { TabPanel, TabView } from 'primereact/tabview';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import Spinner from '../../components/Spinner/Spinner';

import ChangePassTab from './ChangePassTab';
import PersonalInfoTab from './PersonalInfoTab';
import { changeAdminPhoto, getAdminData } from '../../core/api/axiosCalls';
import MiniProfile from '../../components/ReusableComponent/MiniProfile/MiniProfile';

import headerImg from '../../assets/images/user_cover.png';
import { ProfileContainer } from './AdminProfile.style';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminData from './AdminData';
import { getUser, setUser } from '../../core/store/slices/userSlice';

const AdminProfile = () => {
	const user: any = useAppSelector(getUser);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { state } = useLocation();
	const [viewedSection, setViewedSection] = useState<number>(() => (state ? state : 0));
	const dispatch = useAppDispatch();
	const [userData, setUserData] = useState<any>();
	const [loadingImg, setLoadingImg] = useState<boolean>(!!user.photo);
	const [photo, setPhoto] = useState<any>();
	const data: any = userData || {};
	const aRef: any = useRef(null);

	let formData = new FormData();

	const getData = async () => {
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		try {
			const res = await getAdminData();
			setUserData(res.record);
			setPhoto(`${import.meta.env.VITE_THUMBNAILS}${res.record.photo}`);
		} catch (error) {}

		dispatch(closeLoader());
	};

	useEffect(() => {
		getData();
	}, []);

	const handellChangeImage = async (e: any) => {
		setLoadingImg(true);
		try {
			formData.append(`photo`, e.target.files[0]);
			const res = await changeAdminPhoto(formData);
			setPhoto(`${import.meta.env.VITE_THUMBNAILS}${res.photo}`);
			dispatch(setUser({ ...user, photo: res.photo }));
			// const userData: any | null = localStorage.getItem('user');
			// localStorage.setItem('user', JSON.stringify({ ...JSON.parse(userData), photo: res.photo }));

			navigate('/my-profile');
		} catch (error) {
			//  setPhoto(null)
		}
		resetInput();
		setLoadingImg(false);
	};

	const resetInput = () => {
		aRef.current.value = null;
	};

	return (
		<ProfileContainer>
			<img className="headerImg" src={headerImg} alt="headerImg" />
			<div className="gapedContainer profileContainer">
				<div className="leftSec">
					<MiniProfile
						width={160}
						outlineColor="#FFFFFF"
						offset={-5}
						nameSize={24}
						emailSize={18}
						margin="6"
						name={userData?.name}
						email={userData?.email}
						img={photo}
						changeimge={handellChangeImage}
						aRef={aRef}
						loading={loadingImg}
					/>
					{/* 
					{userData ? (
						
					) : (
						<ProgressSpinner />
					)} */}
					<>
						<p className="my-data ">My Information</p>
						<AdminData adminData={userData} />
					</>
				</div>
				<div className="rightSec">
					<TabView activeIndex={viewedSection} className=" ">
						<TabPanel className="tabParentContainer" header={`${t('Personal Information')}`}>
							{/* {userData ? <PersonalInfoTab getUserData={getData} userData={data} /> : <ProgressSpinner />} */}
							<PersonalInfoTab getUserData={getData} userData={userData} />
						</TabPanel>
						<TabPanel className="tabParentContainer" header={`${t('Change Password')}`}>
							<ChangePassTab />
						</TabPanel>
					</TabView>
				</div>
			</div>
		</ProfileContainer>
	);
};

export default AdminProfile;
