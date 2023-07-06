import device from '../../core/GlobalDigitalStyle/BreakPoint.style';
import styled, { keyframes } from 'styled-components';
interface DatePickerProps{
    borderColor:string
}
export const DatePickerWrapper = styled.form<DatePickerProps>`
	font-size: 1rem;
	width: 100%;
	.picker__field__container {
		label {
			font-size: 15px;
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
		.picker__input {
			width: 100%;
			input {
				background-color: white;
                border-color: ${(props) => `${props.borderColor}`};
				width: 100%;
				border-radius: 0.5em;
				padding: 12px 16px !important;
				font-weight: 600;
				font-size: 14px;
				@media ${device.screen1280} {
					font-size: 12px;
				}
				@media ${device.screen1050} {
					padding: 0.7em 0.5em 0.7em 2.5em !important;
					font-size: 12px;
				}
				&::placeholder {
					font-weight: 600;
					font-size: 14px;
					@media ${device.screen1440} {
						/* font-size: 14px; */
					}
					@media ${device.screen1280} {
						font-size: 12px;
					}
				}
			}
            button{
                position: absolute;
                color:${(props) => `${props.borderColor}`};
                right: 0;
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
		width: 100%;
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
