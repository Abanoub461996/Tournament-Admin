import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const ModalBody = styled.div`
	font-family: 'Manrope', sans-serif !important;
	font-size: 16px;

	.row__parent {
		display: flex;
		justify-content: space-between;
		gap: 1em;

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
			border: 1px solid ${(props) => props.outlineColor};
			width: 50%;
			/* height: auto; */
			max-width: 80px;
			max-height: 80px; /* height: 100%; */
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
		.input__label {
			font-family: 'Manrope', sans-serif !important;
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
		.input__field {
			font-family: 'Manrope', sans-serif !important;
			font-size: 1em;
			font-weight: 600;
			border-radius: 0.5rem;
			&::placeholder {
				font-family: 'Manrope', sans-serif !important;
				font-size: 1em;
				font-weight: 600;
			}
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
	}
	.activity__drop__down {
		.p-inputtext {
			padding: 0.5em !important;
		}
		font-size: 16px !important;
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
		.p-placeholder {
			font-family: 'Manrope', sans-serif !important;
			font-size: 1em !important;
			font-weight: 600 !important;
			padding: 0.5em !important;
			color: #afafaf !important;
		}
		.p-dropdown-label {
			font-size: 16px;
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
	.actvity__date__picker {
		padding: 0;
		border: 1px solid #00000033;
		padding: 0.5em;
		font-family: 'Manrope', sans-serif !important;
		font-size: 1em;
		font-weight: 600;
		border-radius: 0.5rem;
		color: #01abc1 !important;
		border-color: var(--main-color) !important ;
		background: #01abc119 !important;

		&::placeholder {
			font-family: 'Manrope', sans-serif !important;
			font-size: 1em;
			font-weight: 600;
		}
		&:hover:not(.p-invalid) {
			border-color: var(--main-color);
		}
		&:focus:not(.p-invalid) {
			border-color: var(--main-color);
		}
		&:active:not(.p-invalid) {
			border-color: var(--main-color);
		}
		&:focus-visible:not(.p-invalid) {
			border-color: #01abc1 !important ;
			outline: 0 !important ;
		}
		&:placeholder-shown {
			color: #01abc1 !important;
			border-color: none !important ;
			background: none !important;
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

		button {
			position: absolute;
			right: 1%;
			top: 50%;
			transform: translate(0, -50%);
			color: black;
			box-shadow: 0 !important;
			border: 0 !important;
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
