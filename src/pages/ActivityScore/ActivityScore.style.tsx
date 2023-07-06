import styled from 'styled-components';
import device from '../../core/GlobalDigitalStyle/BreakPoint.style';

export const TeamHeader = styled.div`
	width: 100%;
	/* height: 11em; */
	.cov-img-safari {
		outline: none;
	}
`;
export const MyActivityContainer = styled.div`
	/* min-height: calc(100vh - 80px); */
	font-size: 16px;
	.activityRole {
		text-align: center;
		color: #2f4c1e;
		background: #2f4c1e1a;
		width: fit-content;
		padding: 0.5em 1.5em;
		margin: auto 0;
		border-radius: 1.8em;
		font-weight: 700;
		font-size: 0.9375em;
	}
	.team-name {
		text-transform: capitalize;
	}

	.pageContent {
		display: flex;
		gap: 2em;
		padding: 1em 5%;
		margin: auto;
		.rightSec {
			width: 30%;
		}
		.leftSec {
			width: 70%;
			height: fit-content;
			margin-bottom: 5em;
		}
		.sec__header{
			color:#1E1E1E;
			font-weight: 700;
			margin-bottom:1em;
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
	.team-identity {
		height: 158px;

		.team-avatar {
			transform: translate(-1px, -25%);
			img {
				background-color: #fff;
			}
		}
		@media ${device.screen1280} {
			height: 7.875em;
		}
	}
	@media ${device.screen1280} {
		font-size: 12.9px;
	}
	@media ${device.screen1050} {
		font-size: 10.672px;
	}
`;
export const PageContainer = styled.div`
	width: 90%;
	margin: 0 auto;
	position: relative;
	min-height: 7em;
`;
export const ActivityProfile = styled.div`
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