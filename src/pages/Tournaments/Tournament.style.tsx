import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const PopUpContainer: any = styled.div`
	font-family: 'Manrope', sans-serif !important;
	font-size: 16px;
	max-height: 50em;

	.Tournament__Form {
		/* Tournament Photo */
		.profileAvatar {
			width: 6em !important ;
			height: 6em !important  ;
		}
		.add__photo {
			border-radius: 50%;
			border: 1px solid ${(props) => props.outlineColor};
		}

		.form__input {
			.input__label {
				font-family: Manrope;
				font-size: 1em;
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
			.input__field {
				font-size: 15px;
				font-weight: 600;
				border-radius: 0.5rem;
				padding: 0px !important ;
				padding: 10px 8px 10px 20px !important;
				border-radius: 0.5rem;
				border: 1px solid #0000001a;
				padding: 10px !important;

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
			}
		}
		.date__picker {
			padding: 0 !important;
			input {
				border: 0px !important;
				font-weight: 600;
				font-size: 15px;
				padding: 0 !important;
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
				box-shadow: 0;
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

		.form__submit__btn {
			/* width: fit-content; */
			/* margin-left: auto; */
			/* margin-top: 1em; */
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
				background-color: var(--btn-hover) !important;
				border: none;
				box-shadow: none;
			}
		}

		.modal__team__add_members {
			.datalist__parent {
				position: relative;
				width: 100%;
				&.p-invalid {
					border: 1px solid green;
				}
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
				.p-listbox .p-listbox-header .p-listbox-filter {
					border: 1px solid #ced4da !important;
					font-size: 15px !important;
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

				.datalist__container .p-listbox-header .p-listbox-filter:active,
				.datalist__container .p-listbox-header .p-listbox-filter:hover {
					border: 1px solid #ced4da !important;
					outline: none !important;
					box-shadow: none !important;
				}
				.p-listbox .p-listbox-header .p-listbox-filter-icon {
					display: none;
				}
				.datalist__container .p-listbox-list {
					/* min-height:5em; */
					max-height: 10em;
					/* height:2%; */
					overflow: scroll;
					/* position: fixed; */
					/* width: 32.2%; */

					z-index: 20000000;
					background: white;
					/* border: 1px solid #00000033 !important; */
					padding: 0px !important;
				}

				.p-listbox .p-listbox-header {
					padding: 0;
					color: #495057;
					background: #f8f9fa;
					.p-listbox-filter {
						padding: 10px 8px 10px 20px;

						font-size: 1em;
						border-radius: 0.5rem;
						/* padding-left: 3.5em !important ; */
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
				}
				.p-listbox-list-wrapper {
					position: absolute;
					width: 100%;
					background: white;
					z-index: 99;
					border: 1px solid var(--pale-grey);
					border-bottom-left-radius: 0.5em;
					border-bottom-right-radius: 0.5em;
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
								font-size: 0.9em;
							}
							@media ${device.screen1050} {
								font-size: 0.8em;
							}
						}
					}
				}
				.datalist__container.hide .p-listbox-list-wrapper {
					display: none;
				}
			}
		}
		.selected__List {
			display: flex;
			flex-direction: column;
			gap: 1em;
			border-bottom: 0.5px solid #dbd7d7;
			max-height: 15em;
			overflow: scroll;
			.team__name__container {
				font-family: 'Manrope', sans-serif !important;
				display: flex;
				align-items: center;
				.team__name {
					font-size: 0.9375em;
					font-weight: 700;
					@media ${device.screen1440} {
						font-size: 0.9em;
					}
					@media ${device.screen1280} {
						font-size: 0.8em;
					}
				}
				.img {
					width: 3.25em;
					height: 3.25em;
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
			.remove__member {
				color: #afafaf;
				svg {
					stroke: #afafaf;
					fill: #afafaf;
					border: #afafaf;
				}
				&:hover {
					color: #c70000;
					svg {
						stroke: #c70000;
						fill: #c70000;
						border: #c70000;
					}
				}
				.members__count {
					font-size: 1.2em;
					@media ${device.screen1440} {
						font-size: 1em;
					}
					@media ${device.screen1280} {
						font-size: 0.8em;
					}
				}
			}
		}
	}

	/* placeholder */
	.p-dropdown-label {
		font-size: 15px !important;
		padding: 0px !important;
		@media ${device.screen1680} {
			font-size: 14px !important ;
		}
		@media ${device.screen1280} {
			font-size: 12.8px !important;
		}
		@media ${device.screen1050} {
			font-size: 11px !important;
		}
	}
	.p-dropdown .p-inputtext {
		padding: 0px !important;
	}
	textarea::placeholder,
	select::placeholder,
	input::placeholder {
		font-size: 15px !important;

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

	@media ${device.screen1280} {
		font-size: 12.8px;
	}
	@media ${device.screen1050} {
		font-size: 10.672px;
	}
`;

export const UploadImgContainer: any = styled.div`
	position: absolute;
	/* left: ${(props) => `${props.left}em !important`}; */
	bottom: 0%;
	z-index: 99;
	left: 5em;
	@media ${device.screen1440} {
		left: 6em;
	}
	@media ${device.screen1280} {
		left: 5.5em;
	}
	@media ${device.screen1050} {
		left: 5em;
	}
	input,
	img {
		position: absolute;
	}
	img {
		position: relative;
		cursor: pointer;
		z-index: 1;
		width: 1.8em;
		height: auto;
		padding: 5px;
		border-radius: 50%;
		background-color: white;
		/* box-shadow: 2px 2px 2px 2px #1e1e1e1a; */
		border: 1px solid #1e1e1e1a;
	}
`;
