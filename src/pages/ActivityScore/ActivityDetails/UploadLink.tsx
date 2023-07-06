// import { UploadLinkContainer } from '../MyActivity.style';
import { t } from 'i18next';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import ulrIcon from '../../../assets/icons/Group170351.png';
import addIcon from '../../../assets/icons/add-circle.svg';
import removeIcon from '../../../assets/icons/Group 170350.svg';
import { UploadLinkContainer } from './ActivityDetails.style';

type UploadLinkType = {
	name: string;
	value: string[];
};

const UploadLink = ({ name, value }: UploadLinkType) => {
	return (
		<UploadLinkContainer>
			<div className="mb-3 flex w-full items-end justify-between lg:mb-3 xl:mb-4">
				<label className={`input__label`} htmlFor="answer">
					{t('field_label', { field: name })}
				</label>
			</div>
			{value.map((item, index) => (
				<div className="UrlInputContainer" key={index}>
					<div className="w-100 url">
						<img className="icon" src={ulrIcon} alt="eye" />
						<InputText
							id={name}
							type="text"
							name={name}
							value={item}
							className={`form-control form-control-lg input`}
							readOnly
						></InputText>
					</div>
				</div>
			))}
		</UploadLinkContainer>
	);
};

export default UploadLink;
