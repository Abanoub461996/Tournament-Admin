import React, { useEffect } from 'react';
import { toastifyWarn } from '../../core/toaster/toastify';
import Button from '../../components/Button/Button';
import { useAppDispatch } from '../../core/hooks/hooks';
import { setDialogue } from '../../core/store/slices/dialogueSlice';
import successIcon from '../../assets/icons/Group 171119.png';

const Home = () => {
	const dispatch = useAppDispatch();

	const test = () => {
		dispatch(
			setDialogue({
				show: true,
				type: 'Confirmation',
				acceptColor: '#65A743',
				textColor: '#65A743',
				image: successIcon,
				hasAction: false,
				title: 'User Created Successfully',
				text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
			}),
		);
	};

	const handleProblem = () => {};

	return (
		<>
			<div>hello</div>
			<button className="border" onClick={() => toastifyWarn('You Need To Change Your Password')}>
				toast
			</button>
			<button className="border" onClick={test}>
				dialouge
			</button>
			<button className="border" onClick={handleProblem}>
				problem
			</button>
		</>
	);
};

export default Home;
