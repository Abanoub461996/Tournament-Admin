import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import Spinner from '../Spinner/Spinner';
import { getLoader } from '../../core/store/slices/loaderSlice';
import { useAppSelector } from '../../core/hooks/hooks';

// eslint-disable-next-line react/prop-types
const AuthenticationRoute = ({ children }) => {
	const [token] = useLocalStorage('token');
	const loader = useAppSelector(getLoader);

	if (!token) {
		return (
			<>
				<Suspense fallback={<Spinner />}>
					{children}
					{loader.show && <Spinner />}
				</Suspense>
			</>
		);
	} else return <Navigate to="/" />;
};

export default AuthenticationRoute;
