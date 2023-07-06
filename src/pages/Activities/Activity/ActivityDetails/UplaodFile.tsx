import React, { useRef, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { FileUploader } from 'react-drag-drop-files';

import { UploadFileContainer } from '../MainActivity.style';
import uploadIcon from '../../../../assets/icons/Group1703.png';
import removeIcon from '../../../../assets/icons/Group 170350.svg';
import videoIcon from '../../../../assets/icons/Group170348.svg';
import AudioIcon from '../../../../assets/icons/Audio.png';
import DocumentIcon from '../../../../assets/icons/Document.png';
import addIcon from '../../../../assets/icons/add-circle.svg';
import { handelRemoveReqFile } from '../../../../core/api/axiosCalls';

type UplaodFileType = {
	handelRemoveFile: (index) => void;
	onSelectFiles: (e) => void;
	selectedFiles: any;
	action: string;
	RemoveReqFile: (id) => void;
};

const fileTypes = ['JPG', 'PNG', 'SVG', 'GIF', 'PDF', 'MP4', 'MP3', 'XLS'];

const UplaodFile = ({ handelRemoveFile, onSelectFiles, selectedFiles, action, RemoveReqFile }: UplaodFileType) => {
	const { t } = useTranslation();
	const upladInput: any = useRef(null);

	const [uplaod, setUplaod] = useState(false);

	const reset = () => {
		upladInput.current.firstChild.firstChild.value = null;
	};
	const itemTemplate = (file, index) => {
		return (
			<div key={index} className="align-items-center fileContainer flex flex-wrap">
				<div className="align-items-center flex gap-3" style={{ width: '70%' }}>
					{file.type.startsWith('video') ? (
						<img className="img" alt={file.name} src={videoIcon} />
					) : file.type.startsWith('audio') ? (
						<img className="img" alt={file.name} src={AudioIcon} />
					) : file.type.startsWith('application') ? (
						<img className="img" alt={file.name} src={DocumentIcon} />
					) : (
						<>
							{action === 'create' ? (
								<div>
									<img className="img" alt={file.name} src={URL.createObjectURL(file)} />
								</div>
							) : (
								<div>
									{uplaod === true && file.name ? <img className="img" alt={file.name} src={URL.createObjectURL(file)} /> : ''}
									{file.file ? <img className="img" alt={file.name} src={`${import.meta.env.VITE_THUMBNAILS}${file.file}`} /> : ''}
								</div>
							)}
						</>
					)}

					<span className="flex-column flex text-left ">
						<p className="fw-600 text-[#1E1E1E]" style={{ fontWeight: '600' }}>
							{file && file.name}
						</p>

						<small className="text-[#808080]">{`${(file.size / 1048576).toFixed(2)}${' '} MB`}</small>
					</span>
				</div>
				<img
					className="p-button-outlined p-button-rounded pointer ml-auto "
					alt="remove"
					src={removeIcon}
					onClick={() => {
						action === 'create' ? handelRemoveFile(index) : RemoveReqFile(file.id);
					}}
				/>
			</div>
		);
	};

	return (
		<UploadFileContainer>
			<div className="form__field flex flex-col ">
				<label className={`input__label`} htmlFor="name">
					{t('field_label', { field: 'Drop your file(s)' })}
				</label>
				{selectedFiles.length > 0 && (
					<div ref={upladInput} className="addAnotherInput ml-auto ">
						<FileUploader
							children={
								<div className="addAnotherCont">
									<img className="addIcon" src={addIcon} alt="add" />
									<span className="addText">{t('Add another file')} </span>
								</div>
							}
							handleChange={(e) => {
								onSelectFiles(e);
								reset();
								setUplaod(true);
							}}
							name="file"
							types={fileTypes}
							multiple
						/>
					</div>
				)}
			</div>
			{selectedFiles.length <= 0 && (
				<FileUploader
					children={
						<div draggable className="align-items-center flex-column container flex">
							<img className="uploadIcon" src={uploadIcon} alt="add file" />
							<span className="uploadText">
								{`Drop your file(s) here or ${''}`}
								<button className="browse">{t('browse')}</button>
							</span>
							<p className="maxtext">{t('Max. file size 25MB')}</p>
						</div>
					}
					className="align-items-center flex-column no-borders container flex"
					handleChange={(e) => onSelectFiles(e)}
					name="file"
					multiple
					types={fileTypes}
					fileOrFiles={null}
				/>
			)}
			{selectedFiles.length > 0 && <div className="previewContainer">{selectedFiles.map((file, index) => itemTemplate(file, index))}</div>}
		</UploadFileContainer>
	);
};

export default UplaodFile;
