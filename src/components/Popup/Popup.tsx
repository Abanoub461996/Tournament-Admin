import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PopUpParentContainer } from './PopupUselessStyling.style';

interface PopupProps {
	title?: string;
	content?: JSX.Element;
	show?: boolean;
	setShow?: any;
	width?: string;
}

const Popup: FC<PopupProps> = ({ title, content, setShow, show, width  }) => {
	const navigate = useNavigate();

	return (
		<PopUpParentContainer width={width} className="">
			<div className="popup__body">
				<div className="modal__header flex w-full justify-between items-center">
					<p className="text-[#1E1E1E] modal__title font-extrabold capitalize">{title}</p>
					<i className="modal__close_btn pi pi-times-circle cursor-pointer text-[1.25em]" onClick={() => setShow(!show)}></i>
				</div>
				{/* <hr className="border border-[#0000001A]" /> */}
				{content}
			</div>
		</PopUpParentContainer>
	);
};

export default Popup;
