import * as React from 'react';

// eslint-disable-next-line import/named
import { Outlet, RouteObject } from 'react-router';
import { routeModel } from '../enum/routeModels';

// Instant Loaded Components
import AuthenticationRoute from '../../components/Auth/Auth';
import Home from '../../pages/Home/Home';
import Popup from '../../components/Popup/Popup';
import RootLayout from '../../layouts/RootLayout';
import MainAuthForm from '../../pages/Auth/MainAuthForm';
import AdminProfile from '../../pages/AdminProfile/AdminProfile';
import UsersMainPage from '../../pages/Users/UsersMain';
// import CreateKnockouts from '../../pages/Cups/CreateCup/CreateKnockOuts/CreateKnockOuts';
// import CupDetails from '../../pages/Cups/CupDetails/CupDetails';
import MainActivities from '../../pages/Activities/MainAcivities';
import MainActivity from '../../pages/Activities/Activity/MainActivity';
import ActivityScore from '../../pages/ActivityScore/ActivityScore';
import Notifications from '../../pages/Notifications/Notifications';
import CreateNotification from '../../pages/Notifications/CreateNotification';

// LAzy Loaded
// const Admin = React.lazy(() => import("./Admin.js"));
const TeamsMain = React.lazy(() => import('../../pages/Teams/TeamsMain'));
const TeamProfile = React.lazy(() => import('../../pages/Teams/TeamProfile/TeamProfile'));
const CupsMain = React.lazy(() => import('../../pages/Cups/CupsMain'));
const CreateKnockouts = React.lazy(() => import('../../pages/Cups/CreateCup/CreateKnockOuts/CreateKnockOuts'));
const CupDetails = React.lazy(() => import('../../pages/Cups/CupDetails/CupDetails'));

const Users = React.lazy(() => import('../../pages/Users/UsersMain'));
const FAQs = React.lazy(() => import('../../pages/FAQ/FAQ'));
const MainTournaments = React.lazy(() => import('../../pages/Tournaments/MainTournaments'));
const TournamentDetails = React.lazy(() => import('../../pages/Tournaments/TournamentDetails/TournamentDetails'));

export const userRoutes: RouteObject[] = [
	{
		path: '',
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: routeModel.tournament,
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{ index: true, element: <MainTournaments /> },
					{ path: ':slug', element: <TournamentDetails /> },
				],
			},
			{
				path: routeModel.activity,
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{ index: true, element: <MainActivity /> },
					{ path: ':slug', element: <ActivityScore /> },
				],
			},
			{
				path: routeModel.activities,
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{ index: true, path: ':slug', element: <MainActivities /> },
				],
			},
			{
				path: routeModel.championsCup,
				element: <Outlet />,
				children: [
					{ index: true, element: <CupsMain /> },
					{ path: routeModel.cupDetails, element: <CreateKnockouts /> },
					{ path: ':slug', element: <CupDetails /> },
				],
			},
			{
				path: routeModel.users,
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{ index: true, element: <Users /> },
				],
			},
			{
				path: routeModel.teams,
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{ index: true, element: <TeamsMain /> },
					{ path: `:slug`, element: <TeamProfile /> },
				],
			},
			{ path: routeModel.calender, element: <> calender</> },
			{ 
				path: routeModel.notifications,
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{ index: true, element: <Notifications /> },
					{ path: `create`, element: <CreateNotification /> },
				],
			},
			
			{
				path: routeModel.helpCenter,
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{ index: true, element: <FAQs /> },
				],
			},
			{
				path: routeModel.myProfile,
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{ index: true, element: <AdminProfile /> },
				],
			},
		],
	},
];

export const authRoutes: RouteObject[] = [
	{
		path: routeModel.login,
		element: (
			<AuthenticationRoute>
				<MainAuthForm />
			</AuthenticationRoute>
		),
	},
	{
		path: routeModel.forgotPassword,
		element: (
			<AuthenticationRoute>
				<MainAuthForm />
			</AuthenticationRoute>
		),
	},
	{
		path: routeModel.resetPassword,
		element: (
			<AuthenticationRoute>
				<MainAuthForm />
			</AuthenticationRoute>
		),
	},
];
