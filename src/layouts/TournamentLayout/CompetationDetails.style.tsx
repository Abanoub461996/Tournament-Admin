import styled, { keyframes } from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const MainDetailsLayout = styled.div`
	font-family: 'Manrope', sans-serif !important;
	width: 100%;
	margin: 0 auto;
	font-size: 15px;
	position: relative;
	@media ${device.screen1680} {
		font-size: 14px;
	}
	@media ${device.screen1440} {
		font-size: 12.8px;
	}
	@media ${device.screen1280} {
		font-size: 11px;
	}
`;
export const InnerDetailsContainer = styled.div`
	font-family: 'Manrope', sans-serif !important;
	width: 90%;
	margin: 0 auto;
	position: relative;
	cursor: default;
	.cup__controllers {
		position: absolute;
		right: 0;
		box-shadow: none !important ;
		margin-top: 1em;
		z-index: 99;
		.cup__create,
		.cup__teams_randomize {
			border: none !important;
			font-weight: 600;
			box-shadow: none;
			padding: 0.8rem 1.5rem;
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
			&:hover {
				color: #01abc1 !important;
			}
			&:active {
				outline: none !important ;
				border: none !important;
				box-shadow: none !important;
			}
		}
		.cup__create {
			margin-top: 0.5em;
			border-radius: 0.8em;
			font-weight: 600;
			border: none;
			&:hover:not(.p-invalid) {
				color: #fff !important;
				border-color: var(--main-color);
				background-color: var(--btn-hover) !important;
			}
		}
	}

	.p-tabview .p-tabview-panels {
		padding: 0px !important ;
	}
	.p-tabview-nav {
		background: inherit;
		margin-top: 1em;
	}

	.p-tabview-nav li{
		&:hover a{
			background-color: #f9f9f9!important;
		}
	}
	.p-tabview .p-tabview-nav li .p-tabview-nav-link {
		color: #afafaf;
		font-size: 1.125em;
		font-weight: 700;
		border: none;
		font-family: 'Manrope', sans-serif !important ;
		box-shadow: none !important ;
		margin: 0.4em 0;
		padding: 1em 0em;
		font-size: 15px;
		background-color: inherit;
		@media ${device.screen1680} {
			font-size: 14px;
		}
		@media ${device.screen1280} {
			font-size: 12.8px;
		}
		@media ${device.screen1050} {
			font-size: 11px;
		}
		&:hover{
			background-color: #f9f9f9!important;
		}
		
	}
	.p-tabview .p-tabview-nav {
		border: none;
		gap: 1em;
	}
	.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
		border-color: var(--main-color);
		border-bottom: 2px solid var(--main-color);
		color: var(--main-color);
		outline: none !important;
		box-shadow: none !important ;
		padding: 1em 0em;
	}
	.p-tabview {
		.p-tabview-panels {
			font-size: 15px;
			margin-top: 1em;
		}
	}
`;

const rotateAnimation = keyframes`
 0% { transform:rotate(0) }
 25% { transform:rotate(90deg) }
 50% { transform:rotate(180deg) }
 50% { transform:rotate(270deg) }
 100% { transform:rotate(360deg) }
`;
export const CompetitionHeader = styled.div`
	width: 100%;
	height: 18vh;
	position: relative;
	background-image: url('../../src/assets/images/user_cover.png');
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	display: flex;
	.header__container {
		width: 90%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.competition__identifier {
			display: flex;
			align-items: center;
			width: 50%;
			color: white;
			gap: 2%;
			.header__image {
				border-radius: 50%;
				width: 8.5rem;
				height: 8.5rem;
				@media ${device.screen1680} {
					width: 8em;
					height: 8em;
				}
				@media ${device.screen1280} {
					width: 7.5em;
					height: 7.5em;
				}
				@media ${device.screen1050} {
					width: 7em;
					height: 7em;
				}
				border: 2px solid #fff;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.header__text {
				.tournament__name {
					font-size: 18px;
					font-weight: 700;
					margin-bottom: 0.5em;
					@media ${device.screen1680} {
						font-size: 16px;
					}
					@media ${device.screen1280} {
						font-size: 14.8px;
					}
					@media ${device.screen1050} {
						font-size: 13px;
					}
				}
				.round__number {
					font-size: 13px;
					font-weight: 400;
					background-color: #ffffff1a;
					border-radius: 8px;
					width: fit-content;
					padding: 8px 16px;
					@media ${device.screen1440} {
						font-size: 12px;
					}
					@media ${device.screen1050} {
						font-size: 11px;
					}
				}
			}
		}
		.settings__btn {
			color: var(--main-color);
			background-color: #fff;
			padding: 1em 2em;
			display: flex;
			align-items: center;
			gap: 0.5em;
			border-radius: 8px;
			font-weight: 600;
			font-size: 15px;
			cursor: pointer;
			@media ${device.screen1680} {
				font-size: 14px;
			}
			@media ${device.screen1280} {
				font-size: 12.8px;
			}
			@media ${device.screen1050} {
				font-size: 11px;
			}
			svg{
				font-size: 1.8em;
			}
			&:hover {
				img {
					transition: 2.5s;
					animation-name: ${rotateAnimation};
					animation-duration: 2s;
					animation-iteration-count: 1;
				}
			}
		}
	}
`;


