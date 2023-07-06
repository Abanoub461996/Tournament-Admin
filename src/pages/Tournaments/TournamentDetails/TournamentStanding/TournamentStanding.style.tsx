import styled from 'styled-components';
import device from '../../../../core/GlobalDigitalStyle/BreakPoint.style';

export const PageContainer = styled.div`
	font-size: 16px;
	.page-title {
		font-size: 1.2em !important;
		margin-bottom: 0em;
		font-weight: 700;
		@media (max-width: 1450px) {
			font-size: 1em !important;
		}
	}
	.teamNameContainer {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25em;
		width: 100%;
		img{
			background-color: #fff;
		}
	}

	.page-header {
		display: flex;
		align-items: flex-end;
		width: 100%;
		justify-content: space-between;
		.queryContainer {
			width: 21.25em;
		}

		.filters {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.queryContainer {
				width: 20%;
			}
		}
	}

	.standingDropdown {
		height: 6vh;
		background-color: #f6f6f8;
		.p-inputtext {
			display: flex;
			img {
				width: 2.35em;
				height: 2.35em;
				padding: 0.1em;
				border: 1px solid #afafaf;
				border-radius: 50%;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
			}
		}
		@media ${device.screen1280} {
			height: 5.2vh;
		}
	}

	.teamIocn {
		width: 3.125em;
		height: auto;
	}
	.teamName {
		min-width: 50%;
	}
	.arow {
		transform: matrix(0, -1, 1, 0, 0, 0);
	}

	@media ${device.screen1680} {
		font-size: 14.5px;
	}
	@media ${device.screen1440} {
		font-size: 14px;
	}
	@media ${device.screen1280} {
		font-size: 12.8px;
	}
	@media ${device.screen1050} {
		font-size: 10.672px;
	}
	.p-datatable-emptymessage {
		height: auto !important;
	}
`;
