import { Outlet, createBrowserRouter, useLocation } from 'react-router-dom';
import {  authRoutes, userRoutes } from './userRoute';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
	...authRoutes,

	// Authenticated User Routes
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Outlet />
			</ProtectedRoute>
		),
		children: [...userRoutes],
	},
]);


export default router;
