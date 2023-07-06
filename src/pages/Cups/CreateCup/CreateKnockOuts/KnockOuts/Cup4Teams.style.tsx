import styled, { keyframes } from 'styled-components';
import device from '../../../../../core/GlobalDigitalStyle/BreakPoint.style';
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
			background: #e1e1e1;
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
		.cup__team {
			position: relative;
		}
		.cup__team__card {
			background: #f9f9f9;
			padding: 1em 1.5em;
			border-radius: 10px;
			font-size: 1rem;
			min-width: 50%;
			position: relative;
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
			background: #f9f9f9;
			padding: 1em 1.5em;
			font-size: 0.8rem;
			min-width: 50%;
			border-radius: 1em;
			cursor: pointer;
			min-height: 3em;
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
		}
		.add__overlay__parent {
			position: absolute;
			left: 105%;
			bottom: -200%;
			z-index: 5;
			background-color: white;
			width: 100%;
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
			}

			.datalist__parent {
				position: relative;
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
	}
	.round__game.right {
		.cup__team {
			.add__overlay__parent {
				left: -105% !important;
			}
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
