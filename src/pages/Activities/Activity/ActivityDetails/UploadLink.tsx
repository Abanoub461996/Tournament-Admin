import { t } from 'i18next';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import ulrIcon from '../../../../assets/icons/Group170351.png';
import addIcon from '../../../../assets/icons/add-circle.svg';
import removeIcon from '../../../../assets/icons/Group 170350.svg';
import { UploadLinkContainer } from '../MainActivity.style';
import { Controller } from 'react-hook-form';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { FormValues } from './ActivityDetails';

type UploadLinkType = {
	name: string;
	placeholder: string;
	value: any;
	err: string[];
	handelAddAnother: () => void;
	removeOneUrl: (index) => void;
	onChange: (e, index) => void;
	control: Control<FormValues>;
	register: any;
	errors: any;
	getFormArrayErrorMessage: any;
	fields: any;
};

const UploadLink = ({
	fields,
	name,
	placeholder,
	value,
	err,
	handelAddAnother,
	removeOneUrl,
	onChange,
	control,
	register,
	errors,
	getFormArrayErrorMessage,
}: UploadLinkType) => {
	return (
		<UploadLinkContainer>
			<div className="flex w-full items-center justify-between leading-normal lg:mb-3 xl:mb-4">
				<label className={`input__label`} htmlFor="name">
					{t('field_label', { field: 'Activity Name' })}
				</label>
				<div className="addAnotherCont  " onClick={handelAddAnother}>
					<img className="addIcon" src={addIcon} alt="add" />
					<span className="addText">{t('Add another link')} </span>
				</div>
			</div>

			{fields.map((field, index) => {
				return (
					<div className="UrlInputContainer" key={field.id}>
						<div className="form__field flex flex-col w-full">
							<div className="w-full url">
								<img className="icon" src={ulrIcon} alt="eye" />
								<Controller
									control={control}
									name={`links.${index}.url`}
									render={({ field, fieldState }) => (
										<>
											<InputText
												{...field}
												type="text"
												
												placeholder={`${t('new_field_placeholder', { field: 'Activity Name' })}`}
												className={`input__field ${errors?.[`index`] ? 'p-invalid' : ''}`}
											/>
										</>
									)}
								/>
							</div>
							{getFormArrayErrorMessage('links', index)}
						</div>
						{index !== 0 && (
							<p className="remove" onClick={() => removeOneUrl(index)}>
								<img className="p-button-outlined p-button-rounded pointer ml-auto" alt="remove" src={removeIcon} />
							</p>
						)}
					</div>
				);
			})}
			{/* {value.map((item, index) => (
							<div className="UrlInputContainer" key={index}>
								<div className="form__field flex flex-col w-full">
									<div className="w-full url">
										<img className="icon" src={ulrIcon} alt="eye" />
										<Controller
											control={control}
											name="links"
											render={({ field, fieldState }) => (
												<InputText
													{...register('link')[index]}
													type="text"
													id="links"
													onChange={(e) => {
														field.onChange(e, index);
														onChange(e, index);
													}}
													placeholder={`${t('new_field_placeholder', { field: 'Activity Name' })}`}
													className={`input__field ${errors[`links`] && errors[`links`][index] ? 'p-invalid' : ''}`}
												/>
											)}
										/>
									</div>
									{getFormArrayErrorMessage('links', index)}
								</div>
								{index !== 0 && (
									<p className="remove" onClick={() => removeOneUrl(index)}>
										<img className="p-button-outlined p-button-rounded pointer ml-auto" alt="remove" src={removeIcon} />
									</p>
								)}
							</div>
						))} */}
		</UploadLinkContainer>
	);
};

export default UploadLink;
