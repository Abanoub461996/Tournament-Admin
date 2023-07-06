import styled from 'styled-components';
import device from '../../../core/GlobalDigitalStyle/BreakPoint.style';

interface UserImgStyleProps {
	width: number;
	outlineColor?: string;
	offset?: number;
	nameSize?: number;
	emailSize?: number;
	margin?: string;
}

export const UserImg = styled.div<UserImgStyleProps>`
	font-family: 'Manrope', sans-serif;
	display: flex;
	gap: 1em;
	align-items: flex-end;
	/* margin-top: -1em; */
	font-size: 16px;
	position: relative;

	.profileAvatar {
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;

		/* outline: 2px solid ${(props) => `${props.outlineColor}!important`}; */

		outline-offset: 2px;
		overflow: hidden;
		border: 0px solid rgb(255, 255, 255);
		box-shadow: 0 0 0 1px #fbfbfb;
	}

	.user-content {
		transform: translate(0px, 6px);
	}
	.user-name {
		font-size: 1.5px;
		font-family: 700;
		text-align: left;
		@media (max-width: 1450px) {
			font-size: 1.25em;
		}
	}
	.user-slogan {
		font-size: 1.125em;
		text-align: left;
		font-family: 500;
		color: #808080;
		@media (max-width: 1450px) {
			font-size: 0.8125em;
		}
	}
	.dropdownAvatar {
		width: ${(props) => `${props.width * 0.06}em!important`};
		height: ${(props) => `${props.width * 0.06}em!important`};
		/* @media (max-width: 1450px) {
			width: ${(props) => 0.8 * props.width + 'px !important'};
			height: ${(props) => 0.8 * props.width + 'px !important'};
		} */
		margin: 0;
		border-radius: 50%;
		outline: solid #fff0;

		/* outline: 1px solid ${(props) => props.outlineColor}; */
		outline-offset: ${(props) => `${props.offset}px`};
		box-shadow: 0 0 0 3px ${(props) => props.outlineColor};
		overflow: hidden;
		position: relative;
	}
	.changeIcon {
		cursor: pointer !important ;
		/* @media (max-width: 1366px) {
			top: 90px;
			left: 90px;
		} */
	}
	.fileInput {
		opacity: 0;
		position: absolute;
		width: 1.8em;
		top: 0;
		z-index: 2;
		cursor: pointer;
	}
	.userInfo {
		width: 70%;
		font-size: 16px;

		.name {
			line-height: 1.04;
			font-size: ${(props) => `${props.nameSize && props.nameSize * 0.0625}em`};
			font-weight: 700;
			color: #1e1e1e;
		}
		.email {
			font-size: ${(props) => `${props.emailSize && props.emailSize * 0.0625}em`};
			font-weight: 500;
			color: #afafaf;
			line-height: unset;
		}
		@media screen and (max-width: 1450px) {
			font-size: 0.9em;
		}
	}
	@media screen and (max-width: 1450px) {
		font-size: 0.9em;
	}
`;
export const UploadImgContainer: any = styled.div`
	position: absolute;
	left: ${(props) => `${props.left}em !important`};
	bottom: 0%;
	z-index: 99;
	/* left: 6.5em; */
	@media ${device.screen1440} {
		left: 6em;
	}
	@media ${device.screen1280} {
		left: 5.5em;
	}
	@media ${device.screen1050} {
		left: 5em;
	}
	input,
	img {
		position: absolute;
	}
	img {
		position: relative;
		cursor: pointer;
		z-index: 1;
		width: 1.8em;
		height: auto;
		padding: 5px;
		border-radius: 50%;
		background-color: white;
		/* box-shadow: 2px 2px 2px 2px #1e1e1e1a; */
		border: 1px solid #1e1e1e1a;
	}
`;
