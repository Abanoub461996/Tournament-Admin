import { FC, MouseEvent } from 'react';
import { ButtonStyle } from './Button.style';
import { BorderRadiusEnum } from './enums/BorderRadiusEnum';

interface ButtonProps {
	// label: string | Element;
	label: string | any;
	disabled?: boolean;
	color?: string;
	backgroundColor?: string;
	border?: string;
	borderColor?: string;
	rounded?: boolean;
	borderRadius?: BorderRadiusEnum;
	icon?: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	width?: string;
	paddingX?: string;
	paddingY?: string;
	className?: string;
	autoFocus?: boolean;
	type?: any;
}

const Button: FC<ButtonProps> = ({
	label,
	disabled = false,
	color,
	backgroundColor,
	border,
	borderColor,
	rounded = false,
	borderRadius = BorderRadiusEnum.lg,
	icon,
	onClick,
	width = '',
	paddingX = '2em',
	paddingY = '0.5em',
	className = '',
	type,
}) => {
	return (
		<ButtonStyle
			className={`${className} flex items-center justify-center font-medium text-white transition-colors disabled:grayscale`}
			width={width}
			color={color}
			backgroundColor={backgroundColor}
			borderRadius={rounded ? `${borderRadius}rem` : '0'}
			border={border}
			borderColor={borderColor}
			onClick={onClick}
			disabled={disabled}
			paddingX={paddingX}
			paddingY={paddingY}
			type={type}
		>
			{icon && <img src={icon} alt="icon" className={label ? 'mr-1' : ''} />}
			{label}
		</ButtonStyle>
	);
};

export default Button;
