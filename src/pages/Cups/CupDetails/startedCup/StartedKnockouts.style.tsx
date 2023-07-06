import styled, { keyframes } from 'styled-components';
import device from '../../../../core/GlobalDigitalStyle/BreakPoint.style';

export const PageContainer = styled.div`
	font-size: 16px;
	.teamIocn {
		width: 3.125em;
		height: auto;
	}
	.teamName {
		min-width: 50%;
	}
	.arow {
		transform: matrix(0, -1, 1, 0, 0, 0);
	}
	background-color: #f9f9f9;
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
`;

interface KnockOutsProps {
	totalRounds: number;
}
export const KnockOuts = styled.div<KnockOutsProps>`
	display: flex;
	width: 100%;
	font-size: 1.1rem;
	font-weight: 600;
	padding-bottom: 3em;
	.grid-round {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-around;
		position: relative;
		min-width: ${(props) => (props.totalRounds ? 100 / props.totalRounds + '%' : '10%')};
		padding: 0 0.5em 0 0.5em;
		&:last-child {
			padding: 0 0 0 1em;
		}
		&:first-child {
			padding: 0 1em 0 0;
		}
		&:first-child .round-game:nth-child(odd):after {
			content: ' ';
			width: 6px;
			height: 60%;
			position: absolute;
			border-right: 3px solid #e5e5e5;
			border-top: 3px solid #e5e5e5;
			right: -13px;
			top: 49%;
		}
		&:first-child .round-game:nth-child(even):after {
			content: ' ';
			width: 6px;
			height: 80%;
			position: absolute;
			border-right: 3px solid #e5e5e5;
			border-bottom: 3px solid #e5e5e5;
			right: -13px;
			top: -29%;
		}
		&:nth-child(2) .round-game:nth-child(odd):after {
			content: ' ';
			width: 6px;
			height: 150%;
			position: absolute;
			border-right: 3px solid #e5e5e5;
			border-top: 3px solid #e5e5e5;
			right: -13px;
			top: 49%;
		}
		&:nth-child(2) .round-game:nth-child(even):after {
			content: ' ';
			width: 6px;
			height: 150%;
			position: absolute;
			border-right: 3px solid #e5e5e5;
			border-bottom: 3px solid #e5e5e5;
			right: -13px;
			top: -99%;
		}
		&:nth-child(3) .round-game:nth-child(odd):after {
			content: ' ';
			display: ${(props) => (props.totalRounds === 4 ? 'block' : 'none')};
			width: 6px;
			height: 280%;
			position: absolute;
			border-right: 3px solid #e5e5e5;
			border-top: 3px solid #e5e5e5;
			right: -13px;
			top: 49%;
		}
		&:nth-child(3) .round-game:nth-child(even):after {
			content: ' ';
			display: ${(props) => (props.totalRounds === 4 ? 'block' : 'none')};

			width: 6px;
			height: 255%;
			position: absolute;
			border-right: 3px solid #e5e5e5;
			border-bottom: 3px solid #e5e5e5;
			right: -13px;
			top: -204%;
		}
		.round-game:before {
			content: ' ';
			height: 3px;
			background: #e5e5e5;
			position: absolute;
			top: 50%;
			z-index: 99;
		}
		&:nth-child(2) .round-game:before {
			width: 1em;
			left: -1em;
		}
		&:nth-child(3) .round-game:before {
			width: 0.5em;
			left: -0.5em;
		}
		&:last-child .round-game:before {
			width: 1em;
			left: -1em;
		}

		/* !round circle for each game*/
		.game-pointer {
			width: 10px;
			height: 10px;
			position: absolute;
			background: #e5e5e5;
			border-radius: 50%;
			top: calc(50% - 5px);
			right: -7px;
			@media ${device.screen1680} {
				width: 8px;
				height: 8px;
				top: calc(50% - 4px);
			}
			&:last-child .round-game .game-pointer {
				display: none;
			}
		}

		&:nth-child(${(props) => props.totalRounds - 3}) .round-game .game-pointer:not(.pending) {
			background: #01abc1;
			width: ${(props) => (props.totalRounds - 3 ? '10px' : '0')};
			@media ${device.screen1680} {
				width: ${(props) => (props.totalRounds - 3 ? '8px' : '0')};
			}
		}
		&:nth-child(${(props) => props.totalRounds - 2}) .round-game .game-pointer:not(.pending) {
			background: #87b825;
			width: ${(props) => (props.totalRounds - 2 ? '10px' : '0')};
			@media ${device.screen1680} {
				width: ${(props) => (props.totalRounds - 2 ? '8px' : '0')};
			}
		}
		&:nth-child(${(props) => props.totalRounds - 1}) .round-game .game-pointer:not(.pending) {
			background: #65a743;
			width: ${(props) => (props.totalRounds - 1 ? '10px' : '0')};
			@media ${device.screen1680} {
				width: ${(props) => (props.totalRounds - 1 ? '8px' : '0')};
			}
		}
		&:last-child .round-game .game-pointer {
			display: none;
		}
		.round-game {
			padding: 4px;
			border: 1px solid #e5e5e5;
			border-radius: 10px;
			background: #fff;
			position: relative;
			min-height: 8em;
			display: flex;
			flex-direction: column;
			gap: 4px;
			.cup__team {
				position: relative;
			}
			@media ${device.screen1440} {
				min-height: 6em;
			}
			@media ${device.screen1050} {
				min-height: 5em;
			}

			.cup__team__card {
				background: #f9f9f9;
				padding: 15px;
				border-radius: 10px;
				font-size: 1rem;
				padding: 1em 1.5em;
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
					border: 1px solid var(--main-color);
					overflow: hidden;
					border-radius: 8px;
					background: #fff;
					margin: 0;
					border: 1px solid var(--main-color);
					@media ${device.screen1680} {
						width: 2.5em;
						height: 2.5em;
					}
				}
				&.winner {
					background: #01abc11a;
					color: var(--main-color);
				}
			}
			.cup__teamempty__card {
				background: #f9f9f9;
				padding: 1em 1.5em;
				font-size: 0.8rem;
				min-width: 50%;
				border-radius: 1em;
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
				cursor: default;
			}
		}
		.round-game:nth-child(even):not(:last-child) {
			margin-bottom: 2em;
		}
		.round-game:nth-child(odd) {
			margin-bottom: 0.5em;
		}
	}
`;

interface RoundsHeaderProps {
	totalRounds: number;
}
export const RoundsHeader = styled.div<RoundsHeaderProps>`
	display: flex;
	width: 100%;
	font-size: 1.1rem;
	@media ${device.screen1680} {
		font-size: 1rem;
	}
	@media ${device.screen1440} {
		font-size: 0.9rem;
	}
	@media ${device.screen1050} {
		font-size: 0.7rem;
	}
	font-weight: 600;
	margin: 1em auto;
	.round__header {
		min-width: ${(props) => (props.totalRounds ? 100 / props.totalRounds + '%' : '10%')};
		text-align: center;
		padding: 0 0.5em 0 0.5em;
		&:last-child {
			padding: 0 0 0 1em;
		}
		&:first-child {
			padding: 0 1em 0 0;
		}
		div {
			border-radius: 0.6em;
			background-color: var(--main-color);
			color: #ffffff;
		}

		&.quarter__final div {
			background-color: #65a743;
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
export const KnouckOutsGame = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
`;
