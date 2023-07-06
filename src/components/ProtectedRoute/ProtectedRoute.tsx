import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem('token');
	if (token) {
		return (
			<>
				<Suspense fallback={<Spinner />}>{children}</Suspense>
			</>
		);
	} else return <Navigate to="/login" />;
};

export default ProtectedRoute;
