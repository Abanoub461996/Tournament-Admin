import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

interface ImagesCollectionProps {
	width: number;
	clearmembersCount: number;
	length: number;
}
interface MemberImgProps {
	index: number;
	width: number;
	dir: string;
	leftRatio: number;
	individual: number;
}
interface TeamMemberCountProps {
	number: number;
	length: number;
	clearmembersCount: number;
	width: number;
	dir: string;
	leftRatio: number;
}

export const ImagesCollection = styled.div<ImagesCollectionProps>`
	font-size: 16px;
	position: relative;
	min-width: ${(props) => `${props.length < props.clearmembersCount ? props.length * props.width : props.clearmembersCount * props.width}em`};

	min-height: ${(props) => `${props.width}em`};
	@media ${device.screen1440} {
		min-height: ${(props) => `${props.width * 0.9}em`};
	}
	@media ${device.screen1050} {
		min-height: ${(props) => `${props.width * 0.8}em`};
	}
`;

export const TeamMemberCount = styled.div<TeamMemberCountProps>`
	border: 1px solid #0000001a;
	direction: ltr;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	font-family: 'Manrope' !important;
	font-weight: 600;
	width: ${(props) => `${props.width}rem`};
	height: ${(props) => `${props.width}rem`};
	font-size: 16px;

	@media ${device.screen1440} {
		width: ${(props) => `${props.width * 0.9}rem`};
		height: ${(props) => `${props.width * 0.9}rem`};
		font-size: 14px;
	}
	@media ${device.screen1050} {
		width: ${(props) => `${props.width * 0.8}rem`};
		height: ${(props) => `${props.width * 0.8}rem`};
		font-size: 12px;
	}
	background: white;
	position: relative;
	z-index: 4;
	color: #01abc1;
	left: ${(props) => `${props.dir === 'ltr' && `${props.number * props.leftRatio}%`}`};
	right: ${(props) => `${props.dir === 'rtl' && `${props.number * props.leftRatio}%`}`};
	display: ${(props) => `${props.length <= props.clearmembersCount ? 'none' : 'flex'}`};
	align-items: center;
	justify-content: center;
	font-family: 'Manrope-Bold';
	.tooltipCalss {
	}
`;

export const MemberImg = styled.figure<MemberImgProps>`
	border: 1px solid #0000001a;
	border-radius: 50%;
	overflow: hidden;
	margin: 0 auto;
	position: absolute;
	width: ${(props) => `${props.width}em`};
	height: ${(props) => `${props.width}em`};
	left: ${(props) => `${props.dir === 'ltr' && `${props.index * props.leftRatio}%`}`};
	right: ${(props) => `${props.dir === 'rtl' && `${props.index * props.leftRatio}%`}`};
	@media ${device.screen1440} {
		width: ${(props) => `${props.width * 0.9}em`};
		height: ${(props) => `${props.width * 0.9}em`};
	}
	@media ${device.screen1050} {
		width: ${(props) => `${props.width * 0.8}em`};
		height: ${(props) => `${props.width * 0.8}em`};
	}
	img {
		background-color: #ffffff;
		min-width: 100%;
		min-height: 100%;
	}
`;
