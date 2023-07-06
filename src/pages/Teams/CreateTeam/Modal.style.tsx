import styled from 'styled-components';
import device from '../../../core/GlobalDigitalStyle/BreakPoint.style';

export const ModalWrapper = styled.div`
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
		max-height: 80vh;

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
		.modal__team__slogan {
			margin-bottom: 1em;
		}
		.modal__team__id {
			margin: 1em 0;
			align-items: flex-start;
			@media ${device.screen1440} {
				margin: 0.5em 0;
			}
			.team__photo {
				position: relative;
				cursor: pointer;
				height: 5em;
				width: 5em;
				display: flex;
				border: 1px solid rgba(30, 30, 30, 0.1);
				border-radius: 50%;
				align-items: center;
				justify-content: center;
				@media ${device.screen1440} {
					height: 4.5em;
					width: 4.5em;
				}
				@media ${device.screen1280} {
					height: 4em;
					width: 4em;
				}
				.upload_image {
					position: relative;
					width: 2em;
					height: 2em;
					cursor: pointer;
					background-color: white;
					overflow: hidden;
					@media ${device.screen1280} {
						height: 1.5em;
						width: 1.5em;
					}
				}
				.fileInput {
					position: absolute;
					top: 0px;
					height: -webkit-fill-available;
					cursor: pointer;
					max-width: 100%;
					filter: opacity(0);
					padding: 1em;
				}
				.selected_image {
					background-color: white;
					width: 100%;
					height: 100%;
					border: 2px solid var(--main-color);
					overflow: hidden;
					border-radius: 50%;
					cursor: default;
					outline-offset: 2px;
					overflow: hidden;
					border: 0px solid rgb(255, 255, 255);
					box-shadow: rgb(251, 251, 251) 0px 0px 0px 1px;
					outline: rgb(1, 171, 193) solid 2px !important;
				}
				.change_photo {
					position: absolute;
					bottom: -5%;
					background: transparent;
					right: -10%;
					.change_image_icon {
						border-radius: 8px;
						background-color: white;
						cursor: pointer;
						padding: 3px;
						width: 1.5em;
					}
					.fileInput {
					}
				}
			}
			.form__field {
				width: 79%;
				@media ${device.screen1440} {
					width: 80%;
				}
			}
		}
		.modal__team__add_members {
			margin-bottom: 1em;
			.datalist__parent {
				position: relative;
				.datalist_close_btn {
					position: absolute;
					right: 0.5em;
					z-index: 1;
					background-color: rgb(255, 255, 255);
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
						&:hover:enabled {
							border-color: var(--main-color);
						}
						&::placeholder {
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
					}
					.p-listbox-filter-icon {
						width: 1em;
						height: 1em;
						@media ${device.screen1280} {
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
							font-weight: 600;
							@media ${device.screen1440} {
								font-size: 0.8em;
							}
						}
						.member__email {
							font-weight: 400;
							font-size: 0.8rem;
							color: #afafaf;

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
					font-weight: 600;
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
			.input__field {
				font-size: 15px;
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
				&::placeholder {
					font-size: 15px;
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
			.input__label {
				font-family: Manrope;

				font-size: 15px;
				/* color: #afafaf; */
				margin-bottom: 0.1em;
				margin-bottom: 0.5em;
				line-height: normal;
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
		}
		.modal__footer {
			.form__submit__btn {
				margin-top: 0.5em;
				border-radius: 0.8em;
				font-size: 1rem;
				font-weight: 600;
				padding: 0.8rem 1.5rem;
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
				&:hover:not(.p-invalid) {
					border-color: var(--main-color);
					background-color: var(--btn-hover) !important;
				}
			}
		}
	}
`;
