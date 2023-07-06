import styled from 'styled-components';
import device from '../../../../core/GlobalDigitalStyle/BreakPoint.style';

export const AddMemberWrapper = styled.div`
	font-size: 1rem;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	z-index: 998;

	.modal__container {
		overflow: hidden;
		border-radius: 1.5em;
		width: 32vw;
		font-size: 1rem;
		max-height: 75vh;
		@media ${device.screen1440} {
			width: 37vw;
		}
		@media ${device.screen1050} {
			width: 40vw;
		}
		@media ${device.screen1280} {
			border-radius: 1em;
			overflow: hidden;
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
		.modal__body {
			padding-bottom: 0.2em;
			border-bottom: 1px solid #0000001a;
			margin-bottom: 1em;
		}
		.modal__team__add_members {
			margin: 1em 0;
			.datalist__parent {
				position: relative;
				.datalist_close_btn {
					position: absolute;
					right: 0.5em;
					z-index: 1;
					background-color: #fff;
					cursor: pointer;
					top: 50%;
					transform: translate(0, -50%);
					width: 1.2em;
				}
				.datalist__container {
					border: none;
				}
				.p-listbox .p-listbox-header {
					padding: 0;
					color: #495057;
					background: #f8f9fa;
					.p-listbox-filter {
						padding: 10px 8px 10px 20px;
						font-size: 15px;
						border-radius: 0.5rem;
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
						&:enabled:hover {
							border-color: var(--main-color) !important;
						}
					}
					.p-listbox-filter-icon{
						width: 1em;
						height: 1em;
						@media ${device.screen1280}{
							width: 14px;
							height: 14px;
						}
					}
				}
				.p-listbox-list-wrapper {
					position: absolute;
					width: 100%;
					background: white;
					z-index: 99;
					border: 1px solid var(--pale-grey);
					border-bottom-left-radius: 0.5em;
					border-bottom-right-radius: 0.5em;
					margin-bottom: 3em;
					.p-listbox-item {
						display: flex;
						gap: 1em;
						align-items: center;
						.member__name {
							font-size: 14px;
							font-weight: 700;
							@media ${device.screen1440} {
								font-size: 0.9em;
							}
							@media ${device.screen1050} {
								/* font-size: 0.8em; */
							}
						}
						.member__email {
							font-weight: 400;
							font-size: 0.8rem;
							@media ${device.screen1440} {
								font-size: 0.7em;
							}
							@media ${device.screen1050} {
								font-size: 0.6em;
							}
						}
					}
				}
				.datalist__container.hide .p-listbox-list-wrapper {
					display: none;
				}
				.p-listbox .p-listbox-list .p-listbox-empty-message {
					font-size: 1rem;
					font-weight: 700;
					@media ${device.screen1440} {
						font-size: 0.9em;
					}
					@media ${device.screen1440} {
						font-size: 0.8em;
					}
				}
			}
		}
		.form__field {
			width: -webkit-fill-available;
			div {
				div {
					.p-datatable-wrapper {
						.p-datatable-table {
							.p-datatable-thead {
								display: none;
							}
						}
					}
				}
			}
			.input__field {
				font-size: 1em;
				font-weight: 600;
				border-radius: 0.5rem;
				padding: 10px 8px 10px 20px;
				&:hover:not(.p-invalid) {
					border-color: var(--main-color);
				}
				&:focus:not(.p-invalid) {
					border-color: var(--main-color);
				}
				input {
					width: 100%;
					padding-right: 3em;
				}
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
			.input__label {
				font-family: Manrope;
				font-size: 1em;
				color: rgb(30, 30, 30);
				margin-bottom: 0.1em;
				margin-bottom: 0.5em;
				line-height: normal;
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
		}
		.modal__footer {
			.form__submit__btn {
				border-radius: 0.8em;
				font-size: 1rem;
				font-weight: 600;
				padding: 0.8rem 1.5rem;
				min-height: auto;
				border: none;

				@media ${device.screen1680} {
					font-size: 12px;
				}
				@media ${device.screen1280} {
					font-size: 11px;
				}
				@media ${device.screen1050} {
					font-size: 10px;
				}
				&:hover {
					background-color: var(--btn-hover)!important;
					border: none;
				}
			}
		}
	}
`;
