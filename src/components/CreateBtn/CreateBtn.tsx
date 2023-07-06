import React from 'react';
import { Button } from 'primereact/button';
import { CreateBtnContainer } from './CreateBtn.style';

interface CreateBtnProps {
	handleAction?: () => void;
	label:string
}

const CreateBtn = ({ handleAction, label }: CreateBtnProps, ) => {
	return (
		<CreateBtnContainer onClick={handleAction}>
			<Button label={label} className="font-semibold text-[#01ABC1] bg-[#01ABC11A] hover:bg-[#01ABC11A] create__btn" />
		</CreateBtnContainer>
	);
};

export default CreateBtn;
