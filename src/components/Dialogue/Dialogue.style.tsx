import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const MainPopUpContainer = styled.div`
	font-size: 16px;

	.p-dialog.p-dialog-enter-done {
		@media ${device.screen1050} {
			width: 50vw !important;
		}
	}
`;

export const ConfirmationContainer = styled.div`
	font-family: 'Manrope', sans-serif;
	display: flex;
	gap: 1.5em;
	font-size: 16px;
	/* align-items: center; */

	.dialogImg {
		width: 5em;
		height: 5em;
	}
	.leftSide {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5em;
		width: 100%;
		.dialogTitle {
			color: ${(props) => props.color};
			font-size: 1.375em;
			font-weight: 700;
			margin: 0px;
		}
		.dialogText {
			font-size: 1em;
			color: #808080;
			margin: 0px;
		}
		.dialogBtns {
			margin-top: 1em;
			display: flex;
			gap: 1em;
			justify-content: center;
		}
	}
	@media ${device.screen1680} {
		font-size: 14px;
	}
	@media ${device.screen1440} {
		font-size: 13.5px;
	}
	@media ${device.screen1366} {
		font-size: 13px;
	}

	@media ${device.screen1280} {
		font-size: 12.8px;
	}
	@media ${device.screen1050} {
		font-size: 11.8px;
	}
`;

export const SuccessContainer = styled.div`
	font-family: 'Manrope', sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
	img {
		width: 25em;
		height: auto;
		@media ${device.screen1280} {
			width: 20em;
		}
	}
	.successText {
		text-align: center;
		color: #afafaf;
		width: 90%;
	}
	.dialogText {
		font-size: 1em;
		color: #808080;
	}
	.dialogTitle {
		color: ${(props) => props.color};
		font-size: 1.375em;
		font-weight: 700;
	}
`;
