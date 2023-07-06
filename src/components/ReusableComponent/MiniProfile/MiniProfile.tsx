import React, { useRef, ChangeEvent } from 'react';
import { UploadImgContainer, UserImg } from './MiniProfile.style';
import changeIcon from '../../../assets/icons/gallery-edit.svg';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tooltip } from 'primereact/tooltip';

interface MiniProfileType {
	width?: number;
	outlineColor?: string;
	offset?: number;
	nameSize?: number;
	emailSize?: number;
	margin?: string;
	name?: string;
	email?: string|false;
	img?: any;
	changeimge?: (e: ChangeEvent<HTMLInputElement>) => void;
	loading?: boolean;
	leftPadding?: boolean;
	reset?: any;
	aRef?: any;
	preview?: boolean;
	longEmail?: string;
}

const MiniProfile = ({
	width = 48,
	outlineColor = '#01ABC1',
	leftPadding = false,
	offset = 2,
	nameSize = 16,
	emailSize = 16,
	margin = '6.5',
	name,
	email,
	img,
	changeimge,
	loading = false,
	reset,
	aRef,
	preview,
	longEmail,
}: MiniProfileType) => {
	
	return (
		<UserImg width={width} outlineColor={outlineColor} offset={offset} nameSize={nameSize} emailSize={emailSize} margin={margin}>
			<figure className="profileAvatar">
				{loading ? (
					<div className="mt-3 flex items-center justify-center">
						<ProgressSpinner />
					</div>
				) : (
					<img className="w-full h-full " src={img} alt="" />
				)}
			</figure>
			{changeimge && (
				<>
					<UploadImgContainer left={margin} outlineColor={outlineColor}>
						<img className="changeIcon" src={changeIcon} alt="icon" />
						<input accept=".png, .jpg, .jpeg, .svg" className="fileInput" type="file" ref={aRef} onChange={(e) => changeimge(e)} />
					</UploadImgContainer>
				</>
			)}

			{(name || email) && (
				<div className="userInfo">
					<p className="name">{name}</p>
					{preview && <Tooltip target=".email" showDelay={500} />}

					<p data-pr-tooltip={longEmail} data-pr-position="top" className="email">
						{email}
					</p>
				</div>
			)}
		</UserImg>
	);
};

export default MiniProfile;
