import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const Header = styled.div`
	font-family: 'Manrope', sans-serif;
	border-bottom: 1px solid var(--pale-grey);
	padding: 1em 0px 0;
	position: relative;
	background-color: #ffff;
	z-index: 99;
`;

export const NavbarContainer = styled.div`
	width: 90%;
	margin: 0em auto;
	justify-content: space-between;
	display: flex;

	.linksContainer {
		align-items: center;
		display: flex;
		justify-content: flex-start;
		gap: 3em;

		@media (max-width: 1450px) {
			gap: 1.2em;
		}
		.logoImg {
			width: 15% !important;
			margin: 0 0 1rem;
			@media (max-width: 1450px) {
				margin-right: 1em;
			}
			@media ${device.screen1050} {
				width: 15% !important;
				margin-right: 0.5em;
				margin-bottom: 0.8em;
			}
		}

		.navLink {
			font-size: 1em;
			align-items: center;
			display: flex;
			gap: 8px;
			/* padding-bottom: 1em; */
			text-decoration: none;
			filter: grayscale(100%);
			font-weight: 600;
			margin-bottom: -0.2em;
			color: #989898;
			/* padding-bottom: 1em; */
			@media (max-width: 1450px) {
				font-size: 14px;
				padding-bottom: 1em;
			}
			@media ${device.screen1050} {
				font-size: 0.75em;
				gap: 4px;
			}
			&.active {
				filter: unset;
				color: var(--main-color);
			}
			img {
				width: 22px;
				@media (max-width: 1450px) {
					width: 1em;
				}
				@media ${device.screen1050} {
					width: 0.875em;
				}
			}
		}
	}
`;

export const UserPanel = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	cursor: pointer;
	width: 20%;
	justify-content: flex-end;
	gap: 50px;
	margin-right: 4px;
	@media ${device.screen1050} {
		gap: 25px;
	}
	.user-avatar {
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		outline: 2px solid #01abc1;
		outline-offset: 2px;
		overflow: hidden;
		border: 0px solid rgb(255, 255, 255);
		box-shadow: 0 0 0 1px #fbfbfb;
		width: 3em;
		height: 3em;
		margin-bottom: 0.5em;
		cursor: pointer;
		img {
			background-color: #fff;
		}
		@media (max-width: 1450px) {
			width: 2.5em;
			height: 2.5em;
		}
		@media ${device.screen1050} {
			width: 2em;
			height: 2em;
		}
	}
	.notification {
		width: 24px;
		height: auto;
		@media ${device.screen1680} {
			width: 22px;
		}
		@media ${device.screen1440} {
			width: 20px;
		}
		@media ${device.screen1050} {
			width: 18px;
		}
	}
`;

export const DropDown = styled.div`
	padding: 0.75rem;
	display: flex;
	gap: 1rem;

	.dropdownAvatar {
		border-radius: 50%;
	}
	.userInfo {
		display: flex;
		flex-direction: column;
	}
`;
