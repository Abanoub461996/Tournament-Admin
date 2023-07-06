import React, { useEffect } from 'react';

import router from './core/Routes/Routes';
import { RouterProvider, useLocation } from 'react-router-dom';
import './core/localization/i18next'; //Localization instance passed

import { ToastContainer } from 'react-toastify';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import rotation from '../src/assets/images/rotation.png';

import 'react-toastify/dist/ReactToastify.css';
import DialogComponent from './components/Dialogue/Dialogue';
import { useAppDispatch, useAppSelector } from './core/hooks/hooks';
import { getDialogue } from './core/store/slices/dialogueSlice';
import { PortraitComponent } from './core/GlobalDigitalStyle/PortraitSceen.style';
import { getAdminData } from './core/api/axiosCalls';
import moment from 'moment';
import { setUser } from './core/store/slices/userSlice';
import { useQuery } from 'react-query';

function App() {
	const dialogue = useAppSelector(getDialogue);

	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer limit={3} />
			{dialogue.show && <DialogComponent />}
			<div className="landscape:hidden">
				<PortraitComponent>
					<div className="rotation text-center">
						<img src={rotation} alt="" />
						<p className="text-[1.5em]	text-zinc-100">
							This Web Application Under The Landscape Mode Will Not Be Visible. Please Change Your Mode To Can View The Web App
						</p>
					</div>
				</PortraitComponent>
			</div>
		</>
	);
}

export default App;
