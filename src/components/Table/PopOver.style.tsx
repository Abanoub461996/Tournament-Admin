import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const PopoverInnerWrapper = styled.div`
	> div {
		padding: 0.5em 1em 1em 1em;
		color: #1e1e1e;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5em;
		width: 100%;
		font-size: 1em;
		@media ${device.screen1440} {
			font-size: 0.8em;
		}
		&.edit__btn {
			padding: 1em 1em 0.5em 1em;
		}
		img {
			width: 1em;
			height: 1em;
		}
	}
`;

export const ActionsButtonWarper = styled.div`
	.menu_icon__btn {
		cursor: pointer;
		position: relative;

		@media ${device.screen1440} {
			width: 0.4em;
		}

	}
`;
