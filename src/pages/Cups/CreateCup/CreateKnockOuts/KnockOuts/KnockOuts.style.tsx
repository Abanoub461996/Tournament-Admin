import styled, { keyframes } from 'styled-components';
import device from '../../../../../core/GlobalDigitalStyle/BreakPoint.style';

export const PageContainer = styled.div`
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
			height: 140%;
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

		.round-game .game-pointer:not(.pending) {
			width: ${(props) => (props.totalRounds - 3 ? '10px' : '0')};
			@media ${device.screen1680} {
				width: ${(props) => (props.totalRounds - 3 ? '8px' : '0')};
			}
		}
		&:nth-child(${(props) => props.totalRounds - 2}) .round-game .game-pointer:not(.pending) {
			/* background: #87b825; */
			width: ${(props) => (props.totalRounds - 2 ? '10px' : '0')};
			@media ${device.screen1680} {
				width: ${(props) => (props.totalRounds - 2 ? '8px' : '0')};
			}
		}
		&:nth-child(${(props) => props.totalRounds - 1}) .round-game .game-pointer:not(.pending) {
			/* background: #65a743; */
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
			display: flex;
			flex-direction: column;
			gap: 4px;
			min-height: 8em;
			@media ${device.screen1440} {
				min-height: 6em;
			}
			@media ${device.screen1050} {
				min-height: 5em;
			}
			.cup__team {
				position: relative;
			}
			.cup__team__card {
				background: #f9f9f9;
				padding: 15px;
				border-radius: 10px;
				font-size: 1rem;
				padding: 1em 1.5em;
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
					border: 1px solid var(--main-color);
				overflow: hidden;
					border-radius: 8px;
					margin: 0;
					border: 1px solid var(--main-color);
					@media ${device.screen1680} {
						width: 2.5em;
						height: 2.5em;
					}
				}
			}
			.cup__addteam__card {
				cursor: pointer;
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
				figure {
					width: 1.5em;
				}
				.cup__addteam {
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

			.add__overlay__parent {
				position: absolute;
				left: 105%;
				z-index: 999;
				background-color: white;
				/* width: 100%; */
				width: ${(props) => (props.totalRounds - 3 ? '100%' : '70%')};

				font-size: 15px;
				border-radius: 0.5rem;
				font-weight: 600;
				padding: 5%;
				border: 1px solid #0000001a;
				@media ${device.screen1680} {
					font-size: 14px;
				}
				@media ${device.screen1280} {
					font-size: 12.8px;
				}
				@media ${device.screen1050} {
					font-size: 11px;
					width: ${(props) => (props.totalRounds - 3 ? '120%' : '100%')};
				}

				.datalist__parent {
					position: relative;
					.datalist_close_btn {
						position: absolute;
						right: 0.5em;
						z-index: 1;
						background-color: #fff;
						cursor: pointer;
						top: 50%;
						transform: translate(0, -50%);
						width: 1.2em;
					}
					.datalist__container {
						border: none;
					}
					.p-listbox .p-listbox-header {
						padding: 0;
						color: #495057;
						background: #f8f9fa;
						.p-listbox-filter {
							padding: 10px 8px 10px 20px;
							font-size: 15px;
							border-radius: 0.5rem;
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
							&:enabled:hover {
								border-color: var(--main-color) !important;
							}
						}
						.p-listbox-filter-icon {
							width: 1em;
							height: 1em;
							@media ${device.screen1280} {
								width: 14px;
								height: 14px;
							}
						}
					}
					.p-listbox-list-wrapper {
						position: relative;
						width: 100%;
						background: white;
						z-index: 99;
						/* border: 1px solid var(--pale-grey); */
						margin-top: 0.5em;
						border-bottom-left-radius: 0.5em;
						border-bottom-right-radius: 0.5em;
						.p-listbox-list {
							padding: 0;
						}
						.p-listbox-item {
							display: flex;
							gap: 1em;
							align-items: center;
							.member__name {
								font-size: 14px;
								font-weight: 700;
								@media ${device.screen1440} {
									font-size: 0.9em;
								}
								@media ${device.screen1050} {
									/* font-size: 0.8em; */
								}
							}
							.member__email {
								font-weight: 400;
								font-size: 0.8rem;
								@media ${device.screen1440} {
									font-size: 0.7em;
								}
								@media ${device.screen1050} {
									font-size: 0.6em;
								}
							}
						}
					}
					.datalist__container.hide .p-listbox-list-wrapper {
						display: none;
					}
					.p-listbox .p-listbox-list .p-listbox-empty-message {
						font-size: 1rem;
						font-weight: 700;
						@media ${device.screen1440} {
							font-size: 0.9em;
						}
						@media ${device.screen1440} {
							font-size: 0.8em;
						}
					}
				}
			}
			&:nth-last-child(-n + 2) .add__overlay__parent {
				top: -320%;
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
