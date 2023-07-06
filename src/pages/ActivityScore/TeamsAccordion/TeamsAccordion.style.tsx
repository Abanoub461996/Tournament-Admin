import styled from 'styled-components';
import checked from './../../../assets/icons/activities/checked.png';
import device from '../../../core/GlobalDigitalStyle/BreakPoint.style';

export const TeamsAccordionContainer = styled.div`
	overflow: hidden;
	border-radius: 16px;
	border: 1px solid #0000001a;
	background-color: #fff;
	.card {
		max-height: 40vh;
		border: none;
		margin-right: 0px;
		overflow: hidden;
		overflow-y: auto;
		box-sizing: content-box;
		.accordion__header {
			box-shadow: none !important;
			border: none;
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
			gap: 1em;
			.accordion__header__image {
				img {
					width: 100%;
					height: 100%;
				}
				width: 3em;
				min-width: 3em;
				min-height: 3em;
				border-radius: 50%;
				overflow: hidden;
				border: 1px solid var(--main-color);
			}
		}
		.accordion__content {
			border: none;
			gap: 1em;
			font-weight: 700;
			padding: 1em 2em;
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
			&.highlighted{
				background-color: #01ABC11A;
			}
			.accordion__content__image {
				img {
					width: 100%;
					height: 100%;
				}
				border-radius: 50%;
				overflow: hidden;
				border: 1px solid var(--main-color);
				width: 2.5em;
				min-width: 2.5em;
				min-height: 2.5em;
			}
		}
		.p-accordion-tab {
			/* Active Accordion tab header */
			&.p-accordion-tab-active {
				.accordion__header {
					color: var(--main-color) !important;
				}
			}
			.p-accordion-header.p-highlight {
				background-color: #01abc11a;
				.p-accordion-header-link {
					background-color: #01ABC11A!important;
				}
			}
			/* Accordion tab header */
			&:first-child .p-accordion-header .p-accordion-header-link {
				border-top-width: 0;
			}
			&:last-child .p-accordion-header .p-accordion-header-link {
				border-bottom-width: 0;

			}
			.p-accordion-header {
				.p-accordion-header-link {
					background-color: #fff !important;
					background: #fff !important;
					box-shadow: none !important;
					border-right-width: 0px;
					border-left-width: 0px;
				}
				svg {
					display: none !important;
				}
				.p-accordion-header-text {
					width: 100%;
				}
			}
			.p-accordion-content {
				padding: 0em !important;
				border-right-width: 0px;
				border-left-width: 0px;
			}
			.scoring__check {
				.p-checkbox-box {
					border: 1px solid #0000001a;
					width: 20px;
					transition: background-color 0.2s, color 0.2s, border-color 0.2s;
					height: 20px;
					border-radius: 50%;
					&.p-highlight {
						border: none;
						box-shadow: none;
						background-position: center;
						background-repeat: no-repeat;
						background-size: cover;
						background: none;
						svg {
							display: none;
						}
						&:before {
							content: '';
							transform: scale(1);
							transition: background-image 0.2s, color 0.2s, border-color 0.2s;
							background-image: url(${checked});
							background-position: center;
							background-repeat: no-repeat;
							background-size: cover;
							width: 20px;
							height: 20px;
						}
					}
				}
			}
		}
	}
`;
