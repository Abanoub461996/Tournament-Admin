import styled from 'styled-components';
import device from '../../../core/GlobalDigitalStyle/BreakPoint.style';

export const TeamHeader = styled.div`
	width: 100%;
	/* height: 11em; */
	.cov-img-safari {
		outline: none;
	}
`;
export const PageContainer = styled.div`
	width: 90%;
	margin: 0 auto;
	position: relative;
	min-height: 7em;
	font-family: 'Manrope';
	.p-tabview {
		font-size: 1em;
		.p-tabview-panels {
			background: #f9f9f9;
			font-size: 1em;
			padding: 0;
			margin: 2em 0;
			padding-bottom: 2em;
		}
	}

	.p-tabview .p-tabview-nav {
		background: #f9f9f9 !important ;
	}

	.p-tabview .p-tabview-nav li .p-tabview-nav-link {
		background: #f9f9f9 !important ;
		color: #afafaf;
		font-size: 1.125em;
		font-weight: 700;
		border: none;
		font-family: 'Manrope', sans-serif !important ;
		box-shadow: none !important ;
		margin: 0.4em;
		padding: 1em 0em;
		font-size: 1rem;
		@media ${device.screen1440} {
			font-size: 0.9em;
		}
		@media ${device.screen1280} {
			font-size: 0.8em;
		}
	}
	.p-tabview .p-tabview-nav {
		border: none;
		color: #1e1e1e;
		gap: 1em;
	}
	.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
		border-color: var(--main-color);
		border-bottom: 2px solid var(--main-color);
		color: var(--main-color);
		outline: none !important;
		box-shadow: none !important ;
		margin: 0.4em;
		padding: 1em 0em;
	}
`;
export const TeamProfiler = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;
	position: absolute;
	top: -1em;
	.team-identity {
		align-items: center;
		display: flex;
		justify-content: flex-start;
		gap: 1em;
		font-family: Manrope-Bold;
		.team-avatar {
			border-radius: 50%;
			-webkit-border-radius: 50%;
			-khtml-border-radius: 50%;
			-moz-border-radius: 50%;
			border-radius: 50%;
			overflow: hidden;
			border: 1px solid white;
			outline-offset: -5px;
			margin: 0 0 0.5em 0;
			width: 8.5em;
			height: 8.5em;
			outline: solid #fff0;
			background-color: white;
			img {
				background-color: #fff;
				width: inherit;
				height: inherit;
				object-fit: cover;
			}
			transform: translate(-1px, -28%);
			@media ${device.screen1440} {
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
		}
		.team-avatar-safari {
			outline: none;
		}
		.team-content {
			margin-bottom: 0.6em;
		}
		.team-name {
			font-size: 1.375em;
			font-family: Manrope !important;
			font-weight: 700;

			text-align: left;
			@media (max-width: 1450px) {
				font-size: 1.25em;
			}
		}
		.team-slogan {
			font-size: 1em;
			text-align: left;
			font-family: Manrope !important;
			font-weight: 400;

			color: #808080;
			h5 {
				font-size: 1em;
			}
			@media (max-width: 1450px) {
				font-size: 0.8125em;
			}
			@media ${device.screen1280} {
				font-size: 1em;
			}
		}
	}
	.activity__max_score {
		.score__text {
			font-size: 15px;
			font-weight: 700;
			font-family: Manrope, sans-serif !important;
			@media ${device.screen1680} {
				font-size: 14px;
			}
			@media ${device.screen1280} {
				font-size: 13px;
			}
			@media ${device.screen1050} {
				font-size: 12px;
			}
		}
		.score__input__parent {
			.score__input {
				border-radius: 0.8em;
				input {
					color: var(--main-color);
					font-size: 15px;
					font-weight: 700;
					font-family: Manrope, sans-serif !important;
					padding: 0.8rem;
					display: block;
					width: 5em;
					border-radius: 0.8em;
					text-align: center;
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
		}
	}
`;
export const TeamMembers = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: stretch;
	margin: 1em 0;
	margin-top: -2em;
	gap: 1%;
	@media (max-width: 1450px) {
		/* gap: 1em; */
	}
`;

export const TeamMember = styled.div`
	border: 1px solid #0000001a;
	border-radius: 24px;
	background-color: white;
	width: 19%;
	margin-top: 1em;
	padding: 2em;
	position: relative;
	.options_container {
		position: absolute;
		right: 2em;
		padding: 0 5px;
	}
	@media ${device.screen1050} {
		padding: 1em 1em;
		.options_container {
			right: 1em;
		}
	}
	.menu_icon__btn {
		width: 0.4em;
		img {
			width: 100%;
		}
		@media ${device.screen1440} {
			width: 0.35em;
		}
		@media ${device.screen1050} {
			width: 0.25em;
		}
	}
	.add_member_container {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: column;
		.member-add {
			cursor: pointer;
			background-color: #cceef3;
			border-radius: 50%;
			border: 1em solid #e5f6f9;
			padding: 1em;
			@media ${device.screen1280} {
				padding: 0.5em;
			}
		}
	}
	overflow: hidden;
	font-family: Manrope !important;
	.member-avatar {
		width: 5em;
		height: 5em;
		overflow: hidden;
		border: 1px solid white;
		outline-offset: -5px;
		margin: 0 auto 1em;
		border-radius: 50%;
		outline: rgb(1, 171, 193) solid 2px;
		outline-offset: 2px;
		@media ${device.screen1680} {
			width: 4em;
			height: 4em;
			margin: 0 auto 0.5em;
		}
		@media ${device.screen1280} {
			width: 3em;
			height: 3em;
			margin: 0 auto 0.5em;
		}
		img {
			height: inherit;
			width: inherit;
		}
	}
	.member-avatar-safari {
		outline: none;
	}
	.member-name {
		font-size: 18px;
		font-family: Manrope !important;
		font-weight: 600;
		text-align: center;
		cursor: default;
		@media (max-width: 1680px) {
			font-size: 0.9em;
			margin-bottom: 0.2em;
		}
		@media ${device.screen1050} {
			font-size: 0.8em;
		}
	}
	.member-email {
		text-align: center;
		font-family: Manrope !important;
		font-weight: 400;
		color: #808080;
		margin-bottom: 1em;
		cursor: default;
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
	.member-role {
		text-align: center;
		margin-bottom: 0;
		font-size: 0.9em;
		color: #01abc1;
		background: #01abc11a;
		width: fit-content;
		padding: 0.5em 3em;
		margin: 0 auto;
		border-radius: 16px;
		font-family: Manrope !important;
		font-weight: 600;
		@media (max-width: 1450px) {
			font-size: 0.7em;
		}
	}
	.member-role.lead {
		color: #65a743;
		background: #65a7431a;
	}
`;
