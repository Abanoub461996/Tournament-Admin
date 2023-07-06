import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';
export const QueryInputContainer = styled.div`
	width: 100%;
	font-size: 16px;
	span {
		width: 100%;
		i {
			margin-left: 10px;
			font-size: 18px;
			margin-top: 0;
			transform: translate(0, -50%);
			cursor: pointer;
			@media ${device.screen1280} {
				font-size: 12px;
			}
			@media ${device.screen1050} {
				margin-left: 5px;
				font-size: 12px;
				margin-top: 0;
				transform: translate(0, -50%);
			}
		}
		.query-search {
			background-color: white;
			width: 100%;
			border-radius: 0.5em;
			padding: 12px 16px 12px 44px !important;
			font-weight: 600;
			font-size: 14px;
			@media ${device.screen1280} {
				font-size: 12px;
			}
			@media ${device.screen1050} {
				padding: 0.7em 0.5em 0.7em 2.5em !important;
				font-size: 12px;
			}
			&::placeholder {
				font-weight: 600;
				font-size: 14px;
				@media ${device.screen1440} {
					/* font-size: 14px; */
				}
				@media ${device.screen1280} {
					font-size: 12px;
				}
			}
		}
	}
`;
