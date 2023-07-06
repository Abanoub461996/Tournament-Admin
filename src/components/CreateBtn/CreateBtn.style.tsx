import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const CreateBtnContainer = styled.div`
	font-size: 15px;
	.create__btn {
		border:none!important;
		border-radius: 0.5em;
		font-size: 1rem;
		font-weight: 600;
		box-shadow: none;
		padding: 1em 2em;
		@media ${device.screen1680} {
			font-size: 13px;
		}
		@media ${device.screen1280} {
			font-size: 12px;
		}
		&:hover {
			background-color: #01abc1 !important;
		}
		&:active {
			outline: none !important ;
			border: none !important;
			box-shadow: none !important;
		}
		
	}
`;
