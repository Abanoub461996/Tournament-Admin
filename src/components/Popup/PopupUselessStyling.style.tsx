import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';
export const PopUpParentContainer = styled.div`
	position: fixed;
	z-index: 998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #4241417f;
	.popup__body {
		background-color: white;
		width: ${(props) => `${props.width ? props.width : '32.5'}vw`};
		position: relative;
		border-radius: 1.5em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 1.5em;
		max-height: 90vh;
		overflow: auto;
		overflow: auto;
		font-size: 1rem;
		@media ${device.screen1680} {
			/* width: 37vw; */
			width: ${(props) => `${props.width ? props.width : '37'}vw`};
		}
		@media ${device.screen1280} {
			border-radius: 1em;
		}
		@media ${device.screen1280} {
			/* width: 40vw; */
			width: ${(props) => `${props.width ? 30 : '40'}vw`};
		}
		@media ${device.screen1050} {
			/* width: 45vw; */
			width: ${(props) => `${props.width ? 35 : '45'}vw`};
		}
		.modal__header {
			padding: 0 0 1em;
			@media ${device.screen1280} {
				padding: 0 0 0.6em;
			}
			border-bottom: 1px solid var(--pale-grey);
			.modal__close_btn {
				cursor: pointer;
			}
		}
	}
`;
