import styled from 'styled-components';
import device from '../../../core/GlobalDigitalStyle/BreakPoint.style';

export const ActivityDetailsConatiner = styled.div`
	font-family: 'Manrope', sans-serif !important ;
	display: flex;
	flex-direction: column;
	gap: 2em;
	font-size: 16px;
	background-color: #fff;
	border-radius: 16px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 2.5em;
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
		.url_input{
			padding: 3.25em 7em;

		}
		.input__label {
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
`;

export const MyActivityContainer = styled.div`
	/* min-height: calc(100vh - 80px); */
	font-size: 16px;
	.activityRole {
		text-align: center;
		color: #2f4c1e;
		background: #2f4c1e1a;
		width: fit-content;
		padding: 0.5em 1.5em;
		margin: auto 0;
		border-radius: 1.8em;
		font-weight: 700;
		font-size: 0.9375em;
	}
	.team-name {
		text-transform: capitalize;
	}

	.pageContent {
		display: flex;
		gap: 2em;
		padding: 1em 5%;
		margin: auto;
		.rightSec {
			width: 30%;
		}
		.leftSec {
			width: 70%;
			height: fit-content;
			margin-bottom: 5em;
		}
		.sec__header{
			color:#1E1E1E;
			font-weight: 700;
			margin-bottom:1em;
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
	.team-identity {
		height: 158px;

		.team-avatar {
			transform: translate(-1px, -25%);
			img {
				background-color: #fff;
			}
		}
		@media ${device.screen1280} {
			height: 7.875em;
		}
	}
	@media ${device.screen1280} {
		font-size: 12.9px;
	}
	@media ${device.screen1050} {
		font-size: 10.672px;
	}
`;

export const FrameContainer = styled.div`
	border-radius: 24px;
`;

export const PageContainer = styled.div`
	width: 90%;
	margin: 0 auto;
	position: relative;
	min-height: 7em;
`;

export const ActivityDataContainer = styled.div`
	background-color: #ffffff;
	border: 1px solid #0000001a;
	border-radius: 2em;
	padding: 2em;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1em;
	.full {
		width: 100%;
	}
	.half {
		width: 45%;
	}
	.head {
		color: #afafaf;
		font-size: 1.125em;
		margin-bottom: 5px;
		font-weight: 600;
	}
	.des {
		color: #404040;
		font-size: 1em;
		font-weight: 600;
		max-width: 100%;
		display: inline-block;
		overflow: hidden;
		overflow-wrap: break-word;
	}
	.imgsContainer {
		width: 100%;
	}
`;

export const UploadLinkContainer: any = styled.div`
	display: flex;
	flex-direction: column;
	.input__label {
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
	.addAnotherCont {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: fit-content;
		font-size: 16px;
		cursor: pointer;
		.addIcon {
			width: 1.5em;
			height: 1.5em;
		}
		.addText {
			margin: 0px !important;
			color: #afafaf;
			font-size: 1em;
			font-weight: 600;
		}
	}
	.UrlInputContainer {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		margin-bottom: 1em;
		.remove {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			color: #ff4a4a;
			margin: 0;
			cursor: pointer;
			position: absolute;
			right: 1rem;
			height: 3.5rem;
			img {
				width: 2.5em;
				height: 2.5em;
			}
		}
		.url {
			position: relative;
			width: 100%;

			.text-danger {
				position: relative;
				margin-bottom: 0;
			}
			.input__field {
				font-family: 'Manrope', sans-serif !important;
				font-size: 1em;
				font-weight: 600;
				border-radius: 0.5rem;
				width: 100%;
				padding-left: 6em;
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

		.icon {
			position: absolute;

			width: 3.5em;
			height: 3.5em;
			padding: 0;
			cursor: pointer;
			border: 0;
			background-color: #0000;
			margin: 1.5em;
		}

		.p-inputtext {
			padding: 2em 3em;
			font-family: 'Manrope';
			font-weight: 600;
			height: 6em;
			font-size: 1em !important;
			border-radius: 0.5rem;
		}
	}
`;

export const UploadFileContainer: any = styled.div`
	label {
		width: 100% !important;
		&:focus-within {
			outline: none;
		}
		> input {
			width: inherit;
		}
	}
	.lable {
		font-family: 'Manrope', sans-serif !important ;
		font-size: 1.1em;
		color: #1e1e1e;
		font-weight: 700;
	}
	.uploadIcon {
		width: 3.5rem;
		height: 3.5rem;
	}
	.uploadText {
		font-size: 1em;
		font-weight: 600;
		color: #1e1e1e;
		.browse {
			color: #01abc1;
			text-decoration: underline;
			position: relative;
			cursor: pointer;
			.fileInput {
				width: 100%;
				height: 30px;
				position: absolute;
				opacity: -0.1;
				left: 0;
				top: 0;
				z-index: 1111111111;
				cursor: pointer;
			}
		}
	}
	.maxtext {
		font-size: 1em;
		color: #808080;
	}

	.container {
		border: 1px dashed #afafaf;
		border-radius: 1em;
		padding: 3rem;
		outline: none;
		display: flex;
		gap: 0.5em;
		justify-content: center;
		min-width: 100% !important ;
		&:focus {
			outline: none;
		}
		&:focus-within {
			outline: none;
		}
	}
	.previewContainer {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-height: 33rem;
		@media only screen and (max-width: 1024px) {
			max-height: 27rem;
		}
		overflow-y: auto;
		width: calc(100% + 1em + 4px);
		img {
			width: 2.5em;
			height: 2.5em;
		}
		.fileContainer {
			padding: 1rem;
			border: 1px solid #0000001a;
			border-radius: 12px;
			margin-right: 1em;
			.img {
				width: 3.5em;
				height: 3.5em;
				border-radius: 50%;
				border: 2px solid #01abc1;
			}
		}
	}
	.addAnotherCont {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;

		.addIcon {
			width: 1.5em;
			height: 1.5em;
		}
		.addText {
			margin: 0px !important;
			color: #afafaf;
			font-size: 1em;
			font-weight: 600;
		}
	}
`;
export const ImgEdit = styled.div``;

export const AnswerPermissionContainer = styled.div`
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
	.switch {
		.p-inputswitch-slider {
			width: 36px;
			height: 24px;
			background: #afafaf;
		}
		.p-inputswitch-slider:before {
			background: #ffffff;
			width: 1rem;
			height: 1rem;
			top: 60%;
		}
	}
	.switch.p-inputswitch-checked .p-inputswitch-slider {
		background: #01abc1 !important ;
	}
	.switch.p-inputswitch-checked .p-inputswitch-slider:before {
		background: #ffffff;
		left: -7px !important ;
	}
`;
