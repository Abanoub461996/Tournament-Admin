import styled from 'styled-components';
import device from '../../../core/GlobalDigitalStyle/BreakPoint.style';

export const PopUpContainer: any = styled.div`
	font-size: 16px;
	font-family: 'Manrope', sans-serif !important;
	.profileAvatar {
		width: 7.5em !important ;
		height: 7.5em !important ;
	}
	.add__photo {
		border-radius: 50%;
		border: 1px solid ${(props) => props.outlineColor};
	}
	.p-button-icon-only {
		&:hover {
			background: none;
		}
	}
	.p-inputtext {
		border: none;
	}

	.input__label {
		font-size: 0.75em;
		color: #afafaf;
		margin-bottom: 0px;
		margin-bottom: 0.7em;
		line-height: normal;
		font-weight: 700;
	}
	.form__submit__btn {
		width: fit-content;
		margin-left: auto;
		margin-top: 1em;
		border-radius: 0.8em;
		font-size: 1rem;
		font-weight: 600;
		padding: 0.8rem 1.5rem;
		border: none;
		box-shadow: none;
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
			box-shadow: none;
		}
	}
	@media ${device.screen1280} {
		font-size: 12.8px;
	}
	@media ${device.screen1050} {
		font-size: 10.672px;
	}

	.p-dropdown .p-dropdown-label.p-placeholder {
		color: #afafaf !important;
	}

	textarea::placeholder,
	select::placeholder,
	input::placeholder {
		font-size: 15px !important;
		@media ${device.screen1680} {
			font-size: 14px !important;
		}
		@media ${device.screen1280} {
			font-size: 12.8px !important;
		}
		@media ${device.screen1050} {
			font-size: 11px !important;
		}
	}

	/* UPDates */

	.modal__body {
		.form__inner__container {
			display: flex;
			flex-direction: column;
			gap: 0.5em;
			padding-bottom: 1em;
			border-bottom: 1px solid #0000001a;
		}
		.modal__team__id {
			margin-top: 1em;
			align-items: flex-start;
			@media ${device.screen1440} {
				margin: 0.5em 0;
			}
			.team__photo {
				position: relative;
				cursor: pointer;
				height: 5rem;
				width: 5rem;
				display: flex;
				border: 1px solid rgba(30, 30, 30, 0.1);
				border-radius: 50%;
				align-items: center;
				justify-content: center;
				@media ${device.screen1440} {
					height: 4.5rem;
					width: 4.5rem;
				}
				@media ${device.screen1280} {
					height: 4rem;
					width: 4rem;
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
	}
	.input__field {
		font-size: 15px;
		font-weight: 600;
		border-radius: 0.5rem;
		padding: 10px 8px 10px 20px;
		border-radius: 0.5rem;
		border: 1px solid #0000001a;
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
		font-size: 1em;
		color: #000;
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
	.userPopup__drop_down {
		font-size: 15px !important;
		font-weight: 600;
		border-radius: 0.5rem;
		padding: 0px;
		@media ${device.screen1680} {
			font-size: 14px !important;
		}
		@media ${device.screen1280} {
			font-size: 12.8px !important;
		}
		@media ${device.screen1050} {
			font-size: 11px !important;
		}
		box-shadow: none !important;
		&:hover {
			border-color: var(--main-color);
			box-shadow: none;
		}
		&:focus {
			border-color: var(--main-color);
			box-shadow: none;
		}
		&:focus-visible {
			border-color: var(--main-color);
			box-shadow: none;
		}
		input {
			font-size: inherit;
			font-weight: inherit;
		}
		.p-dropdown-label {
			font-size: 15px;
			@media ${device.screen1680} {
				font-size: 14px;
			}
			@media ${device.screen1280} {
				font-size: 13px;
			}
			@media ${device.screen1050} {
				font-size: 11px;
			}
		}
	}
	.userPopup__date_picker {
		padding: 0;
		input {
			padding: 10px 8px 10px 20px;
			font-weight: 600;
			font-size: 15px;
			@media ${device.screen1680} {
				font-size: 14px;
			}
			@media ${device.screen1280} {
				font-size: 12.8px;
			}
			@media ${device.screen1050} {
				font-size: 11px;
				padding: 10px 27px 10px 8px;
			}
		}
		button {
			position: absolute;
			right: 1%;
			top: 50%;
			transform: translate(0, -50%);
			color: black;
			box-shadow: 0!important;
			border: 0!important;
			&:hover:not(.p-invalid) {
				border-color: var(--main-color);
				background-color: white !important;
			}
			&:focus:not(.p-invalid) {
				background-color: white !important;
				border-color: var(--main-color);
			}
		}
	}
`;
