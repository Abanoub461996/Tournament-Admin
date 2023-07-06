import styled from 'styled-components';
import device from '../../../core/GlobalDigitalStyle/BreakPoint.style';

export const ActivityDetailsConatiner = styled.div`
	font-family: 'Manrope', sans-serif !important ;
	display: flex;
	flex-direction: column;
	gap: 2em;
	font-size: 16px;
	border-radius: 16px;
	overflow: hidden;
	border: 1px solid #0000001a;
	padding: 2.5em;
	background-color: #fff;
	/* min-height: 40vh;; */
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
			font-size: 15px;
			color: #1e1e1e;
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
	.sliderContainer {
		display: flex;
		gap: 1em;
		width: 95%;
		overflow: hidden;
		scroll-behavior: smooth;
		.fileContainer {
			width: 24%;
			overflow: hidden;
			border-radius: 0.5rem;
			height: 10em;
			/* border: 1px solid var(--main-color); */
			/* padding:10px; */
			@media ${device.screen1680} {
				height: 8em;
			}
			@media ${device.screen1280} {
				height: 7em;
			}
			@media ${device.screen1050} {
				height: 5em;
			}

			.audioContainer {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 0.5em;
				min-width: 100%;
				height: 100%;
				text-decoration: none;
				border: 1px solid #65a743;
				border-radius: 0.5rem;

				.audioIcon {
					width: 2.5em;
					height: 2.5em;
				}
				.name {
					font-size: 15px;
					color: #1e1e1e;
					font-weight: 600;
					@media ${device.screen1680} {
						font-size: 14px;
					}
				}
			}
			.file {
				border: 1px solid #01abc1;
			}
			.icon {
				width: 2.5rem;
				height: 2.5rem;
			}

			.videoContainer {
				position: relative;
				max-width: 234px;
				.videoIcon {
					visibility: hidden;
					opacity: 0;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 40px;
					height: 40px;
					transition: visibility 0s, opacity 0.5s linear;
				}
				.full {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					background-color: #000000cc;
					opacity: 0;
					transition: opacity 0.5s linear;
				}
				&:hover {
					.full {
						opacity: 0.8;
					}
					.videoIcon {
						visibility: visible;
						opacity: 1;
					}
				}
			}
			.helperimg {
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				display: block;
				overflow: hidden !important ;
				overflow: hidden;
			}
		}
		.audio {
			background-color: #65a7431a;
			border: 1px solid #65a7431a;
		}

		.application {
			background-color: #01abc11a;
		}
	}
	.scoring__container {
		.score__text {
			font-size: 15px;
			font-weight: 700;
			font-family: Manrope, sans-serif !important;
			@media ${device.screen1680} {
				font-size: 14px;
			}
			@media ${device.screen1280} {
				font-size: 13px;
			}
			@media ${device.screen1050} {
				font-size: 12px;
			}
		}
		.score__input__parent {
			.score__input {
				border-radius: 0.8em;
				input {
					color: var(--main-color);
					font-size: 15px;
					font-weight: 700;
					font-family: Manrope, sans-serif !important;
					padding: 0.8rem;
					display: block;
					width: 5em;
					border-radius: 0.8em;
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
		}
		.submit__score {
			.submit__score_btn {
				border-radius: 0.8em;
				font-size: 15px;
				font-weight: 700;
				padding: 0.8rem 1.5rem;
				border: none;
				font-family: Manrope, sans-serif !important;
				background-color: var(--main-color) !important;
				@media ${device.screen1680} {
					font-size: 14px;
				}
				@media ${device.screen1280} {
					font-size: 12.8px;
				}
				@media ${device.screen1050} {
					font-size: 11px;
				}
				&:hover:not(.disabled:grayscale) {
					border-color: var(--main-color);
					background-color: var(--btn-hover) !important;
				}
			}
		}
	}
`;

export const UploadLinkContainer: any = styled.div`
	display: flex;
	flex-direction: column;
	.input__label {
		font-family: 'Manrope', sans-serif !important ;
		color: #1e1e1e;
		font-weight: 600;
		line-height: initial;
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

	.UrlInputContainer {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		margin-bottom: 1em;

		.url {
			position: relative;
			.text-danger {
				position: relative;
				margin-bottom: 0;
			}
		}
		.input {
			padding: 0px 7em !important ;
			display: flex;
			align-items: center;
		}

		.icon {
			position: absolute;
			width: 3em;
			height: 3em;
			padding: 0;
			cursor: pointer;
			border: 0;
			background-color: #0000;
			top: 50%;
			left: 2%;
			transform: translate(0, -50%);
		}

		.p-inputtext {
			padding: 2.5em 6em !important;
			font-family: 'Manrope';
			font-weight: 600;
			border-radius: 0.5rem;
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
`;
