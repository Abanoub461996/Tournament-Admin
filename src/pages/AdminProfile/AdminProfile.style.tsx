import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const ProfileContainer = styled.div`
	font-size: 16px;
	font-family: 'Manrope', sans-serif !important;

	.profileAvatar {
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		/* outline: 2px solid #ffffff; */
		overflow: hidden;
		/* box-shadow: 0 0 0 1px #fbfbfb; */
		border: 0px solid #fff0;
		width: 8.5em;
		height: 8.5em;
		margin-bottom: 0;
		position: relative;
		@media ${device.screen1440} {
			width: 8em;
			height: 8em;
		}
		@media ${device.screen1280} {
			width: 7.5em;
			height: 7.5em;
		}
		@media ${device.screen1050} {
			width: 7em;
			height: 7em;
		}
		> div {
			bottom: 0%;
			z-index: 99;
			left: 8.5em;
			@media ${device.screen1440} {
				left: 8em;
			}
			@media ${device.screen1280} {
				left: 7.5em;
			}
			@media ${device.screen1050} {
				left: 7em;
			}
		}
	}
	.userInfo {
		width: 60% !important;
		.name {
			font-size: 1.375em;
			font-family: Manrope !important;
			font-weight: 700;
			text-align: left;
			@media (max-width: 1450px) {
				font-size: 1.25em;
			}
		}
		.email {
			font-size: 1em;
			text-align: left;
			font-weight: 400;
		}
	}
	.headerImg {
		height: 11em;
	}
	.profileContainer {
		display: flex;
		gap: 2em;
		.leftSec {
			width: 35%;
			position: relative;
			top: -5.5em;
			@media (max-width: 1280px) {
				width: 40%;
			}
			.my-data {
				font-size: 1em;
				color: #1e1e1e;
				font-weight: 700;
				margin-top: 3em;
				margin-bottom: 0.4em;

				@media ${device.screen1440} {
					/* margin-top: 1.5em; */
				}
				@media ${device.screen1366} {
					/* margin-top: 1.5em; */
				}

				@media ${device.screen1280} {
					/* margin-top: 1.5em; */
				}
				@media ${device.screen1050} {
					/* margin-top: 1.5em; */
				}
			}
			.userDataContainer {
				border: 1px solid #0000001a;
				border-radius: 12px;
				padding: 1.25em;
				background-color: #ffffff;
				.infoContainer {
					margin-bottom: 0.8em;
					.title {
						color: #afafaf;
						font-size: 1em;
						margin-bottom: 5px;
						font-weight: 600;
					}
					.content {
						color: #404040;
						font-size: 0.875em;
						font-weight: 700;
						max-width: 100%;
						display: inline-block;
						overflow: hidden;
						overflow-wrap: break-word;
					}
				}
				.tablet__view {
					display: flex;
					flex-direction: row;
					gap: 3em;
					.infoContainer {
						min-width: 30%;
					}
					/* .birthday__tablet {
						margin-left: 6em;
					} */
				}
				/* @media ${device.screen1280} {
				
				} */
			}
		}
		.rightSec {
			width: 63%;

			@media (max-width: 1250px) {
				width: 55%;
			}
			.p-tabview {
				font-size: 1em;
				.p-tabview-panels {
					background: #f9f9f9;
					font-size: 1em;
					margin-top: 2.2em;
					@media (max-width: 1300px) {
						margin-top: 3.7em;
					}
					@media (max-width: 1050px) {
						margin-top: 5.2em;
					}
				}
			}

			.p-tabview .p-tabview-nav {
				background: #f9f9f9 !important ;
			}

			.p-tabview .p-tabview-panels {
				padding: 0px !important ;
			}
			.p-tabview .p-tabview-nav li .p-tabview-nav-link {
				background: #f9f9f9 !important ;
				color: #afafaf;
				font-size: 1.125em;
				font-weight: 700;
				border: none;
				font-family: 'Manrope', sans-serif !important ;
				box-shadow: none !important ;
				margin: 0.4em;
				padding: 1em 0em;
				font-size: 1rem;
				@media ${device.screen1440} {
					font-size: 0.9em;
				}
				@media ${device.screen1280} {
					font-size: 0.8em;
				}
			}
			.p-tabview .p-tabview-nav {
				border: none;
				color: #1e1e1e;
				gap: 1em;
			}
			.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
				border-color: var(--main-color);
				border-bottom: 2px solid var(--main-color);
				color: var(--main-color);
				outline: none !important;
				box-shadow: none !important ;
				margin: 0.4em;
				padding: 1em 0em;
			}
			.tabParentContainer {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				gap: 1.5rem;
				@media (max-width: 1680px) {
				}
			}
		}
	}
	@media ${device.screen1280} {
		font-size: 12.8px;

		height: calc(100vh - 80px);
		/* overflow-y: hidden; */
	}
	@media ${device.screen1050} {
		font-size: 10.672px;
	}
`;

export const InputCont: any = styled.div`
	grid-area: ${(props: any) => `${props.name}`};
	width: 100%;
`;

export const ChangeAdminInfoTab: any = styled.form`
	font-size: 16px;
	width: 100%;

	display: flex;
	flex-direction: column;
	gap: 2em;

	@media (max-width: 1336px) {
		gap: 0.75rem;
	}

	.p-inputtext,
	.p-dropdown {
		border-radius: 0.5em !important ;
	}
	.user__form__input {
		min-height: 3em;
		.input__field:not(.p-dropdown, #dateOfBirth) {
			/* height: 3em; */
			font-size: 14px;
			font-weight: 600;
			border-radius: 0.5rem;
			padding: 10px 8px 10px 20px;
			&:hover:not(.p-invalid) {
				border-color: var(--main-color);
			}
			&:focus:not(.p-invalid) {
				border-color: var(--main-color);
			}
			&::placeholder {
				padding: 10px 8px 10px 20px;
				font-size: 14px;
				@media ${device.screen1280} {
					font-size: 12.8px;
				}
				@media ${device.screen1050} {
					font-size: 11px;
				}
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
			i {
				top: calc(50% - 4px);
				right: 1em;
				cursor: pointer;
				svg {
					width: 1.3em;
					height: 1.3em;
				}
			}
		}
		.drop__down_admin {
			> span {
				padding: 0 !important;
			}
			font-size: 1em;
			font-weight: 600;
			border-radius: 0.5rem;
			padding: 10px 8px 10px 20px;
			@media ${device.screen1680} {
				font-size: 14px;
			}
			@media ${device.screen1280} {
				font-size: 12.8px;
			}
			@media ${device.screen1050} {
				font-size: 11px;
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
			.p-dropdown-label {
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
		.date_picker_admin {
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
	}
	.input__label {
		font-size: 1em;
		color: #1e1e1e;
		margin-bottom: 0px;
		margin-bottom: 0.4em;
		line-height: normal;
		font-weight: 700;
	}

	.form__submit__btn {
		margin-top: 0.5em;
		border-radius: 0.5em;
		font-size: 1rem;
		font-weight: 600;
		padding: 0.8rem 1.5rem;
		background-color: var(--main-color);
		box-shadow: none;
		width: fit-content;
		margin-left: auto;
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
		&:active {
			background-color: var(--main-color);
			border: none;
		}
		&:hover {
			background-color: var(--btn-hover);
			border: none;
		}
		&:focus {
			box-shadow: none;
			border: none;
		}
	}
	.p-dropdown-label {
		/* font-size: 0.875em !important ; */
	}

	textarea::placeholder {
		padding: 0em !important;
	}

	.p-dropdown .p-dropdown-label.p-placeholder,
	textarea::placeholder,
	select::placeholder,
	input::placeholder {
		font-family: 'Manrope', sans-serif !important;
		/* font-size: 0.875em !important ; */
		color: #afafaf !important;
		font-weight: 600 !important;
		@media ${device.screen1680} {
			padding: 1em 0.5em !important ;
			font-size: 10.5px !important;
		}
		@media ${device.screen1280} {
			font-size: 11.5px !important;
		}
		@media ${device.screen1050} {
			font-size: 10.672px !important;
		}
	}
	@media ${device.screen1280} {
		font-size: 12.8px;
	}
	@media ${device.screen1050} {
		font-size: 10.672px;
	}
`;

export const ChangePassTabContent: any = styled.form`
	font-family: 'Manrope', sans-serif !important;
	width: 100%;
	display: grid;
	grid-gap: 2em;
	margin-top: 7px;
	grid-template-columns: 1fr 1fr 1fr;
	.form__input {
		.input__field {
			height: 3em;
			border: 1px solid #00000033;
			font-size: 14px;
			font-weight: 600;
			border-radius: 0.5rem;
			padding: 10px 8px 10px 20px;
			width: 100%;
			&:hover:not(.p-invalid) {
				border-color: var(--main-color);
			}
			&:focus:not(.p-invalid) {
				border-color: var(--main-color);
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
			&#old_password {
				@media ${device.screen1280} {
					padding: 10px 4px 10px 10px !important;
				}
			}
			i {
				top: calc(50% - 4px);
				right: 1em;
				cursor: pointer;
				svg {
					width: 1.3em;
					height: 1.3em;
				}
			}
		}
		.input__label {
			font-size: 1em;
			color: #1e1e1e;
			margin-bottom: 0px;
			margin-bottom: 0.7em;
			line-height: normal;
			font-weight: 700;
		}
	}

	.form__submit__btn {
		grid-column: 3;
		border-radius: 0.5em;
		font-size: 1rem;
		font-weight: 600;
		padding: 0.8rem 1.5rem;
		background-color: var(--main-color);
		box-shadow: none;
		width: fit-content;
		margin-left: auto;
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
		&:active {
			background-color: var(--main-color);
			border: none;
		}
		&:hover {
			background-color: var(--btn-hover);
			border: none;
		}
		&:focus {
			box-shadow: none;
			border: none;
		}
	}
	img {
		width: 1.5em;
	}
	@media (min-width: 1281px) {
		button.eye {
			top: 3.025em;
		}
		/* grid-template-rows: 1fr 1fr 1fr; */
	}
	@media (max-width: 1024px) {
		/* grid-template-rows: 1fr 1fr 1fr; */
	}

	.textarea,
	.p-dropdown .p-dropdown-label.p-placeholder,
	textarea::placeholder,
	select::placeholder,
	input::placeholder {
		font-family: 'Manrope', sans-serif !important;
		/* font-size: 0.875em !important ; */
		color: #afafaf !important;
		font-weight: 600 !important;
		@media ${device.screen1680} {
			/* padding: 1em 0.5em !important ; */
			font-size: 10.5px !important;
		}
		@media ${device.screen1280} {
			font-size: 11.5px !important;
		}
		@media ${device.screen1050} {
			font-size: 10.672px !important;
		}
	}
`;
