import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../core/hooks/hooks';
import { getLoader } from '../core/store/slices/loaderSlice';
import Spinner from '../components/Spinner/Spinner';
import Navbar from '../components/Navbar/Navbar';

const RootLayout = () => {
	const loader = useAppSelector(getLoader);
	const dispatch = useAppDispatch();

	return (
		<div className="w-full h-screen	flex flex-col ">
			<div className="navbar__Container">
				<Navbar />
			</div>
			<div className="relative h-[calc(100vh)]">
				<Outlet />
				{loader.show && <Spinner />}
				{/* <Spinner /> */}
			</div>
		</div>
	);
};

export default RootLayout;
