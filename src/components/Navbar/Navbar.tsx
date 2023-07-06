import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Spinner from '../Spinner/Spinner';
import { MenuItem } from 'primereact/menuitem';
import { TieredMenu } from 'primereact/tieredmenu';

import { getAdminData, logout } from '../../core/api/axiosCalls';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { signOut } from '../../core/store/slices/authSlice';
import { resetUser, setUser } from '../../core/store/slices/userSlice';
import MiniProfile from '../ReusableComponent/MiniProfile/MiniProfile';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';

import './Nabar.css';
import { Header, NavbarContainer, UserPanel } from './Nabar.style';

import logoImg from '../../assets/images/trnmnt.svg';
import crownIcon from '../../assets/icons/crown.svg';
import logoutImg from '../../assets/icons/Group170344.png';
import usersIcon from '../../assets/icons/profile-2user.svg';
import notification from './../../assets/icons/general/notification-bing.svg';
import homeIcon from '../../assets/icons/vuesax-linear-home-2.svg';
import teamsIcon from '../../assets/icons/vuesax-linear-people.png';
import championIcon from '../../assets/icons/vuesax-linear-cup.png';
import calenderIcon from '../../assets/icons/vuesax-linear-calendar.png';
import { ReactComponent as ProfileIcon } from '../../assets/icons/MenuIcons/vuesax-linear-profile.svg';
import { ReactComponent as HelpIcon } from '../../assets/icons/MenuIcons/vuesax-linear-message-question.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/MenuIcons/vuesax-linear-logout.svg';
import { routeModel } from '../../core/enum/routeModels';
import { useQuery } from 'react-query';
import moment from 'moment';

const Navbar = () => {
	const { pathname } = useLocation();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const userMenu: any = useRef(null);
	const userToken: string | null = localStorage.getItem('token');
	const userState = useAppSelector((state) => state.user.data);
	useQuery({
		queryKey: [`admin_data`],
		queryFn: () => {
			if (userState.photo) {
				return;
			} else if (userToken && !userState.photo) {
				return getAdminData();
			} else {
				navigate('/login');
			}
		},
		onSuccess: (data: any) => {
			if (userToken && !userState.photo) {
				const user = {
					loggedIn: true,
					dateOfBirth: new Date(moment(data.record.date_of_birth, 'YYYY-MM-DD').format('YYYY/MM/DD')),
					...data.record,
				};
				dispatch(setUser(user));
			}
		},
		onSettled: () => {},
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [notifications, setNotifications] = useState<[string]>();
	const NotificationsData = notifications || [];

	const HandellLogout = async () => {
		dispatch(resetDialogue());
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		try {
			const res = await logout();
			dispatch(signOut());
			dispatch(resetUser());
			navigate('/login');
		} catch (error) {}
		dispatch(closeLoader());
	};
	//------------------------------------------------------------------------------------

	const navBarRoutes = [
		{ lable: `${t('Home')}`, img: homeIcon, link: '', disabled: true },

		{
			lable: `${t('Tournaments')}`,
			img: crownIcon,
			link: routeModel.tournament,
		},
		{
			lable: `${t('Champion Cup')}`,
			img: championIcon,
			link: routeModel.championsCup,
			disabled: true,
		},
		{
			lable: `${t('Users')}`,
			img: usersIcon,
			link: routeModel.users,
		},
		{
			lable: `${t('Calender')}`,
			img: calenderIcon,
			link: routeModel.calender,
			disabled: true,
		},
		{
			lable: `${t('Teams')}`,
			img: teamsIcon,
			link: routeModel.teams,
		},
	];
	const userItems: MenuItem[] = [
		{
			template: () => (
				<MiniProfile
					outlineColor="#01ABC1"
					offset={2}
					nameSize={18}
					emailSize={15}
					name={userState.name?.split(' ').slice(0, 2).join(' ')}
					email={userState.email && userState.email.length > 14 && userState.email.slice(0, 15) + '...'}
					img={`${import.meta.env.VITE_THUMBNAILS}${userState?.photo}`}
					preview={true}
					longEmail={userState.email}
				/>
			),
		},
		{
			separator: true,
		},
		{
			label: `${t('My Profile')}`,
			icon: <ProfileIcon className="dropdown-icons" />,
			command: (e) => {
				navigate('/my-profile');
			},
		},
		{
			label: `${t('Help Center')}`,
			icon: <HelpIcon className="dropdown-icons" />,
			command: (e) => {
				navigate('/help-center');
			},
		},

		{
			label: `${t('Sign Out')}`,
			icon: <LogoutIcon className="dropdown-icons" />,
			command: () => {
				dispatch(
					setDialogue({
						show: true,
						type: 'Confirmation',
						acceptLabel: `${t('Logout')}`,
						acceptColor: '#FF4A4A',
						textColor: '#FF4A4A',
						image: logoutImg,
						hasAction: true,
						onAccept: HandellLogout,
						onReject: () => dispatch(resetDialogue()),
						rejectLabel: `${t('Cancel')}`,
						title: `${t('LogoutTitle')}`,
						text: `${t('LogoutText')}`,
					}),
				);
			},
		},
	];

	return (
		<Header>
			<NavbarContainer>
				<div className="linksContainer">
					<figure className="logoImg">
						<img src={logoImg} alt="Logo" />
					</figure>
					{navBarRoutes.map((item, index) => (
						<NavLink
							key={index}
							className={`navLink ${pathname?.startsWith(item.link) && item.lable !== 'Home' ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
							to={item.link}
						>
							<img src={item.img} alt="nav" />
							<p className="m-0 whitespace-nowrap">{item.lable}</p>
						</NavLink>
					))}
				</div>
				<UserPanel>
					<img
						onClick={(e) => {
							navigate('/notifications');
						}}
						src={notification}
						alt=""
						className="notification"
					/>
					<figure onClick={(e) => userMenu.current.toggle(e)} className="user-avatar  avatar-border">
						{!userState.photo ? (
							<div className="rounded-lg bg-gray-200 dark:bg-gray-700 xl:w-60 border-0"></div>
						) : (
							<img className="w-full h-full" src={`${import.meta.env.VITE_THUMBNAILS}${userState.photo}`} alt="" />
						)}
					</figure>
					<TieredMenu className="dropdown-user-menu" style={{ width: '15.5rem' }} model={userItems} popup ref={userMenu} />
				</UserPanel>
			</NavbarContainer>
		</Header>
	);
};

export default Navbar;
