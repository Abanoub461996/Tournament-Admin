import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';
import checked from '../../assets/icons/teams/checked.svg';
interface wrapperProps {
	heightControl: number;
}
export const Warper = styled.div<wrapperProps>`
	font-family: 'Manrope', sans-serif !important;
	max-height: ${(props) => `${props.heightControl}vh`};
	overflow-y: auto;
	@media ${device.screen1440} {
		max-height: ${(props) => `${props.heightControl}vh`};
	}
	@media ${device.screen1050} {
		font-size: 0.7em;
		max-height: ${(props) => `${props.heightControl * 0.7}vh`};
	}
	.p-datatable-thead tr th {
		font-family: 'Manrope', sans-serif !important;
		border-radius: 0;
		background-color: #fff;
		color: #afafaf !important ;
		padding: 1.25em 0;
		font-size: 16px;
		font-weight: 700;
		@media ${device.screen1680} {
			font-size: 14px;
		}
		@media ${device.screen1280} {
			font-size: 12.8px;
		}
		@media ${device.screen1050} {
			font-size: 11px;
		}
	}

	th {
		border: none !important;
	}
	&:last-child td {
		padding-bottom: 0;
	}
	.p-datatable-tbody tr td {
		&:last-child {
			width: 1%;
			img {
				margin: auto;
			}
		}
		padding: 12px 0;
		/* border: 1px solid green !important ; */
		@media ${device.screen1440} {
			padding: 10px 0;
		}
		@media ${device.screen1280} {
			padding: 8px 0;
		}
		border: none;
		.team__name__container {
			font-family: 'Manrope', sans-serif !important;
			display: flex;
			align-items: center;
			.team__name {
				font-size: 15px;
				font-weight: 600;
				@media ${device.screen1680} {
					font-size: 14px;
				}
				@media ${device.screen1280} {
					font-size: 12.8px;
				}
				@media ${device.screen1050} {
					font-size: 11px;
				}
			}
			.img {
				width: 3.5em;
				height: 3.5em;
				margin-right: 1em;
				border: 2px solid var(--main-color);
				@media ${device.screen1440} {
					width: 3em;
					height: 3em;
				}
				@media ${device.screen1280} {
					width: 2.5em;
					height: 2.5em;
				}
			}
		}
		.Tournament__container {
			font-family: 'Manrope', sans-serif !important;
			display: flex;
			align-items: center;
			.Tournament__name {
				font-size: 1em;
				font-weight: 700;
				@media ${device.screen1680} {
					font-size: 14px;
				}
				@media ${device.screen1280} {
					font-size: 12.8px;
				}
				@media ${device.screen1050} {
					font-size: 11px;
				}
				&.published {
					color: #afafaf;
				}
				&.pending {
					color: #e1851c;
				}
				&.running {
					color: #65a743;
				}
				&.under.review {
					color: #01abc1;
				}
			}
			.img {
				width: 3.5em;
				height: 3.5em;
				margin-right: 1em;
				@media ${device.screen1440} {
					width: 3em;
					height: 3em;
				}
				@media ${device.screen1280} {
					width: 2.5em;
					height: 2.5em;
				}
			}
			.cup__status {
				color: #afafaf;
			}
		}
		.team__leader__container {
			display: flex;
			align-items: center;
			img {
				border: 1px solid rgba(0, 0, 0, 0.1);
				width: 2.5em;
				height: 2.5em;
				margin-right: 0.75em;
				@media ${device.screen1440} {
					width: 2.25em;
					height: 2.25em;
				}
				@media ${device.screen1280} {
					width: 2em;
					height: 2em;
				}
			}
			.leader__name {
				font-size: 15px;
				font-weight: 600;
				@media ${device.screen1680} {
					font-size: 14px;
				}
				@media ${device.screen1280} {
					font-size: 12.8px;
				}
				@media ${device.screen1050} {
					font-size: 11px;
				}
			}
			.leader__email {
				font-weight: 400;
				font-size: 0.8rem;
				color: #afafaf;
			}
		}
		.cup__teams_count {
			font-weight: 600;
			font-size: 14px;
			color: #afafaf;
			@media ${device.screen1440} {
				font-size: 13px;
			}
			@media ${device.screen1280} {
				font-size: 12px;
			}
			@media ${device.screen1050} {
				font-size: 11px;
			}
		}
		.leader__check {
			font-weight: 600;
			font-size: 14px;
			color: #afafaf;
			align-items: center;
			gap: 4px;
			@media ${device.screen1440} {
				font-size: 13px;
			}
			@media ${device.screen1280} {
				font-size: 12px;
			}
			@media ${device.screen1050} {
				font-size: 11px;
			}
			input[type='checkbox'] {
				appearance: none;
				background-color: #1e1e1e1a;
				margin: 0;
				font: inherit;
				width: 1.5em;
				height: 1.5em;
				border: ipx solid #0000001a;
				border-radius: 0.25em;
				cursor: pointer;
				display: grid;
				place-content: center;
				overflow: hidden;
				&:before {
					content: '';
					width: 1.5em;
					height: 1.5em;
					transform: scale(0);
					transition: 120ms transform ease-in-out;
					background-image: url(${checked});
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 0.15em;
				}
			}
		}

		.leader__check.checked {
			color: var(--main-color);
			border: none;
			input[type='checkbox']:before {
				transform: scale(1);
			}
		}
		.member__container {
			.member__name {
				font-size: 15px;
				font-weight: 600;
				@media ${device.screen1680} {
					font-size: 14px;
				}
				@media ${device.screen1280} {
					font-size: 12.8px;
				}
				@media ${device.screen1050} {
					font-size: 11px;
				}
			}
			.member__email {
				font-weight: 400;
				font-size: 15px;
				@media ${device.screen1680} {
					font-size: 13px;
				}
				@media ${device.screen1280} {
					font-size: 12px;
				}
				@media ${device.screen1050} {
					font-size: 10px;
				}
			}
		}
		.remove__member {
			color: #afafaf;
			font-size: 14px;
			gap: 4px;
			@media ${device.screen1440} {
				font-size: 13px;
			}
			@media ${device.screen1280} {
				font-size: 12px;
			}
			@media ${device.screen1050} {
				font-size: 11px;
			}
			svg {
				stroke: #afafaf;
				fill: #afafaf;
				border: #afafaf;
			}
			&:hover {
				color: #c60000;
				svg {
					stroke: #c60000;
					fill: #c60000;
					border: #c60000;
				}
			}
		}
		.table_def__text {
			font-size: 15px;
			font-weight: 600;
			@media ${device.screen1680} {
				font-size: 14px;
			}
			@media ${device.screen1280} {
				font-size: 12.8px;
			}
			@media ${device.screen1050} {
				font-size: 11px;
			}
		}
		.cup__teams_count.table_def__text {
			color: var(--main-color);
			background-color: #01abc11a;
			border-radius: 1em;
			padding: 0.2em 1em;
		}
		.cup__status {
			color: #afafaf;
		}
		.cup__status.started {
			color: #65a743;
		}
		.cup__status.pending {
			color: #e1851c;
		}
	}

	.activeRow {
		background: #01abc11a !important ;
		color: #01abc1 !important;
	}
`;

export const ActionsButtonWarper = styled.div`
	display: flex;
	justify-content: flex-end;
	.menu_icon__btn {
		cursor: pointer;
		position: relative;
	}
`;

export const SearchInput = styled.div`
	width: 60%;
	margin-bottom: 1rem;
	input {
		::placeholder {
			color: #a5a5a5a5;
		}
		:hover {
			border-color: var(--hover-color);
		}
		:focus {
			box-shadow: 0 0 0 0.2rem var(--focus-ring);
			border-color: var(--hover-color);
		}
	}
`;
