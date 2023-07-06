import React from 'react';
import { useTranslation } from 'react-i18next';
import { AnswerPermissionContainer } from '../MainActivity.style';
import { InputSwitch } from 'primereact/inputswitch';

const UrlHead = {
	url: 'Allow Players to URLs',
	files: 'Allow Players to URLs',
	text: 'Allow Players to Add Text',
};

const AnswerPermission = ({ add_url, upload_file, type_text, handleChecked }) => {
	const { t } = useTranslation();

	return (
		<AnswerPermissionContainer>
			<div className="form__field flex flex-col mb-2 ">
				<label className={`input__label`} htmlFor="name">
					{t('field_label', { field: 'Activity Answering' })}
				</label>
				<p className="text-[#AFAFAF] font-[1em] font-[500] mb-3">{t('answerText')}</p>
				<div className="flex flex-col gap-[1.5em] border border-[#0000001A] p-[2em] rounded-2xl">
					{/* {options.map((option, index) => (
						<div className="flex justify-between items-center">
							<p className='font-[1em] text-[#1E1E1E] font-[700] ' >{UrlHead[option.name]}</p>
							<InputSwitch className='switch' color='#01ABC1' checked={option.checked} onChange={(e) => handleChecked(index, e.value)} />
						</div>
					))} */}
					<div className="flex justify-between items-center">
						<p className="font-[1em] text-[#1E1E1E] font-[700] ">Allow Players to URLs</p>
						<InputSwitch className="switch" color="#01ABC1" checked={add_url} onChange={(e) => handleChecked('add_url', e.value)} />
					</div>
					<div className="flex justify-between items-center">
						<p className="font-[1em] text-[#1E1E1E] font-[700] ">Allow Players to Add Files or Media (Images, Videos and Sounds)</p>
						<InputSwitch className="switch" color="#01ABC1" checked={upload_file} onChange={(e) => handleChecked('upload_file', e.value)} />
					</div>
					<div className="flex justify-between items-center">
						<p className="font-[1em] text-[#1E1E1E] font-[700] ">Allow Players to Add Text</p>
						<InputSwitch className="switch" color="#01ABC1" checked={type_text} onChange={(e) => handleChecked('type_text', e.value)} />
					</div>
				</div>
			</div>
		</AnswerPermissionContainer>
	);
};

export default AnswerPermission;
