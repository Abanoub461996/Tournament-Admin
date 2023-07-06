import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 1rem;
	.page-title {
		font-size: 1.2em !important;
		margin-bottom: 0em;
		font-weight: 700;
		@media (max-width: 1450px) {
			font-size: 1em !important;
		}
	}

	.faq-container {
		display: flex;
		justify-content: space-between;
	}
	@media (max-width: 1024px) {
		flex-wrap: nowrap;
	}
	.quItem {
		@media ${device.screen1050} {
			width: 100%;
		}
		/* flex-grow: ${(props: any) => `${props.width}`}; */
		/* flex-shrink: ${(props: any) => `${props.width / 4}`}; */
		/* &:nth-child(even){
      float:right;
    } */
	}

	.faqs-header {
		display: flex;
		width: 100%;
		align-items: flex-end;
		justify-content: space-between;

		h3 {
			font-size: 1.4rem !important;
			margin: 0.5em 0 0;
			font-family: 'Manrope-Bold';
			@media (max-width: 1450px) {
				font-size: 1rem !important;
			}
		}
	}
	.queContainer {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: calc(50% - 1rem);
		@media (max-width: 1024px) {
			max-height: none;
		}
	}
	.panel-icon {
		cursor: pointer;
	}
	.quItem {
		border-radius: 12px;
		overflow: hidden;
		width: 100%;
		@media (max-width: 1024px) {
		}
	}
	.p-panel .p-panel-content {
		border: none;
		border-radius: 0px;
		color: #808080;
		background-color: #01abc11a;
		padding: 0 1.5rem 1rem;
		@media (max-width: 1450px) {
			font-size: 0.8rem;
		}
	}
	.p-panel .p-panel-header {
		border: none;
		font-weight: 600;
		border-radius: 0px;
		transition: all 0.6s cubic-bezier(0.65, 0.05, 0.36, 1);
		@media (max-width: 1450px) {
			font-size: 0.9em;
		}
		.p-panel-header-icon {
			width: 20px;
			height: 20px;
			box-shadow: none;
			outline: none;
		}
	}

	.pi {
		color: var(--main-color);
	}
	.pi-plus {
		color: #58595b;
	}
`;

export const PopUpContainer = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1em;
	.form__input {
		.input__field {
			font-size: 1em;
			font-weight: 600;
			border-radius: 0.5rem;
			height: 4em;
			/* min-width:100%; */
			border: 1px solid #00000033;
			&:hover:not(.p-invalid) {
				border-color: #01ABC1;
			}
			&:focus:not(.p-invalid) {
				border-color: #01ABC1;
			}
			input {
				width: 100%;
				padding-right: 3em;
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
			font-size: 1.125em;
			color: #1e1e1e;
			margin-bottom: 0px;
			margin-bottom: 0.7em;
			line-height: normal;
			font-weight: 700;
		}
	}
	.form__submit__btn {
		border-radius: 0.5rem;
		width: 12.5em;
		min-height: 3.3em;
		border: none;
		font-size: 1.1em;
		font-weight: 600 !important;
		margin-left: auto;
		grid-column: 4;
		color: white;
		border: none;
		font-family: 'Manrope', sans-serif !important ;

		@media ${device.screen1440} {
			min-height: 3.5em;
		}
		@media ${device.screen1280} {
			min-height: 3em;
		}
		&:active {
			background-color: var(--main-color);
			border: none;
		}
		&:hover {
			background-color: var(--main-color);
		}
		&:focus {
			box-shadow: none;
		}
	}
`;
