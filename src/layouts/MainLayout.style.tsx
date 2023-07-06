import styled from 'styled-components';
import device from '../core/GlobalDigitalStyle/BreakPoint.style';

interface popUpProps {
	open: boolean;
}

export const MainLayout = styled.div<popUpProps>`
	font-family: 'Manrope', sans-serif !important;
	width: ${(props) => `${props.width ? props.width : '90'}%`};
	margin: 0 auto;
	font-size: 1em;
	max-height: ${(props) => `${props.open ? '100vh' : ''}!important`};
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
`;
export const MainLayoutHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 1.5em auto;
	@media ${device.screen1050} {
		margin: 1em auto;
	}
	.page__title {
		font-size: 1.2em !important;
		margin-bottom: 0em;
		font-weight: 700;
		@media ${device.screen1366} {
			font-size: 16px !important;
		}
	}
`;
export const PaginationContainer = styled.div`
	bottom: 0;
	width: -webkit-fill-available;
	/* margin-top: 1em; */
	.card {
		background-color: #f9f9f9;
		margin-left: auto;
		padding: 0;
		border: none;
		align-items: flex-end;
		display: flex;
		justify-content: flex-end;
		margin: 0 auto;
		.p-paginator {
			padding-right: 0;
			background-color: #f9f9f9;
		}
	}
`;
export const InnerContainer = styled.div`
	border: 1px solid var(--pale-grey);
	border-radius: 1em;
	padding: 2.2em;
	cursor: default;
	overflow: hidden;
	@media ${device.screen1050} {
		padding: 1.5em;
	}
	.inner__controls {
		.inner__search {
			width: 25%;
		}
	}
	background-color: #fff;
	.inner__page__content {
		margin-top: 1em;
	}
	&.standing {
		padding: 0px;
		overflow: hidden;
		.inner__page__content {
			margin-top: 0;
		}
		.p-datatable-tbody tr td {
			padding: 12px 2em !important ;
		}

		.p-datatable-thead {
			border-bottom: 1px solid #0000001a;
		}
		.p-datatable-thead th {
			padding: 2em !important ;
			border-bottom: 1px solid #0000001a;
		}
	}
`;
