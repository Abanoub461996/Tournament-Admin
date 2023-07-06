import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

interface ButtonStyleProps {
	color?: string;
	backgroundColor?: string;
	border?: string;
	borderColor?: string;
	borderRadius?: string;
	width?: string;
	paddingX?: string;
	paddingY?: string;
}

export const ButtonStyle = styled.button<ButtonStyleProps>`
	font-family: 'Manrope', sans-serif !important ;
	color: ${(props) => props.color} !important ;
	background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : `var(--main-color)`)} !important ;
	border: 1px solid ${(props) => (props.borderColor ? props.borderColor : `var(--main-color)`)} ${(props) => props.border};
	border-radius: ${(props) => props.borderRadius};
	width: ${(props) => props.width};
	min-height: 3.3em;
	padding-block: ${(props) => props.paddingY};
	padding-inline: ${(props) => props.paddingX};
	font-size: 1.125em;
	font-weight: 600;
	&:hover {
		border: 1px solid ${(props) => (props.borderColor ? props.borderColor : `var(--main-color)`)} ${(props) => props.border};
		background-color: var(--btn-hover);
	}

	@media (max-width: 1550px) {
		min-height: 3.5em;
	}
	@media ${device.screen1280} {
		min-height: 3em;
	}
`;
