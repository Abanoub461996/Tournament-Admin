import styled, { keyframes } from 'styled-components';
import device from '../../../../core/GlobalDigitalStyle/BreakPoint.style';

export const SmallCup = styled.div`
	height: -webkit-fill-available;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5em;
	cursor: default;
`;
export const A4TeamsCup = styled.div`
	display: flex;
	width: 100%;
	font-size: 1.1rem;
	font-weight: 600;
	align-items: center;
	.small__cup__round {
		&:first-child .round__game {
			margin-right: 1em !important;
			margin-left: 0 !important;
		}
		&:last-child .round__game {
			margin-left: 1em !important;
			margin-right: 0 !important;
		}
		.round__game .game-pointer {
			position: absolute;
			background: #65a743;
			border-radius: 50%;
			width: 10px;
			height: 10px;
			@media ${device.screen1680} {
				width: 8px;
				height: 8px;
				top: calc(50% - 4px) !important;
			}
		}
		&:first-child .round__game .game-pointer {
			top: calc(50% - 5px);
			right: -6px;
		}
		&:last-child .round__game .game-pointer {
			top: calc(50% - 5px);
			left: -6px;
		}
		&:first-child .round__game:after {
			content: ' ';
			width: 14px;
			height: 0%;
			position: absolute;
			border-top: 3px solid #0000001a;
			right: -20px;
			top: 49%;
		}
		&:last-child .round__game:after {
			content: ' ';
			width: 14px;
			height: 0%;
			position: absolute;
			border-top: 3px solid #0000001a;
			left: -20px;
			top: 49%;
		}
		&.cup__final {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1em;
			@media ${device.screen1440} {
				gap: 0.8em;
			}
			@media ${device.screen1050} {
				gap: 0.5em;
			}
		}
	}

	.round__game {
		padding: 4px;
		border: 1px solid #e5e5e5;
		border-radius: 10px;
		background: #fff;
		position: relative;
		min-height: 3.5em;
		display: flex;
		flex-direction: column;
		gap: 4px;
		@media ${device.screen1680} {
			min-height: 3.5em;
		}
		@media ${device.screen1440} {
			min-height: 3em;
		}
		@media ${device.screen1050} {
			min-height: 2.5em;
		}
		.cup__team__card {
			background: #f9f9f9;
			padding: 1em 1.5em;
			border-radius: 10px;
			font-size: 1rem;
			min-width: 50%;
			position: relative;
			cursor: default;
			@media ${device.screen1680} {
				font-size: 14.5px;
			}
			@media ${device.screen1440} {
				font-size: 14px;
			}
			@media ${device.screen1280} {
				font-size: 12.8px;
			}
			@media ${device.screen1050} {
				font-size: 10.672px;
			}
			.cup__team__img {
				margin: none;
				width: 3em;
				height: 3em;
				border: 1px solid #0000001a;
				border-radius: 8px;
				border: 1px solid var(--main-color);
				overflow: hidden;
				margin: 0;
				@media ${device.screen1680} {
					width: 2.5em;
					height: 2.5em;
				}
			}
			&.winner {
				background: #01abc11a;
				color: var(--main-color);
			}
			&.my__team {
				background: var(--main-color);
				color: #fff;
			}
		}
		.cup__teamempty__card {
			min-height: 80px;
			@media ${device.screen1680} {
				min-height: 65px;
			}
			@media ${device.screen1280} {
				min-height: 58px;
			}
			@media ${device.screen1050} {
				min-height: 48px;
			}
			background: #f9f9f9;
			padding: 1em 1.5em;
			font-size: 0.8rem;
			border-radius: 1em;
			height: 100%;
		}
	}
	.round__header {
		text-align: center;
		font-size: 1.1rem;
		margin-top: 1em;
		@media ${device.screen1680} {
			font-size: 1rem;
		}
		@media ${device.screen1440} {
			font-size: 0.9rem;
		}
		@media ${device.screen1050} {
			font-size: 0.7rem;
		}
		div {
			border-radius: 0.6em;
			background-color: var(--main-color);
			color: #ffffff;
			padding: 0.5em 0;
		}
		&:first-child {
			padding-right: 1em !important;
			padding-left: 0 !important;
		}
		&:last-child {
			padding-left: 1em !important;
			padding-right: 0 !important;
		}
		&.semi__final div {
			background-color: #65a7431a;
			color: #65a743;
		}
		&.final div {
			background-color: #e4e4ef;
			color: #afafaf;
		}
	}
`;
