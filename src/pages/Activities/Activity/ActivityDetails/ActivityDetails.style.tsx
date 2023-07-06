import styled from 'styled-components';

export const ActivityDetailsContainer = styled.div``;

export const UploadLinkContainer: any = styled.div`
	display: flex;
	flex-direction: column;
	.lable {
		font-family: 'Manrope', sans-serif !important ;
		font-size: 1.125em;
		color: #1e1e1e;
		font-weight: 700;
		line-height: initial;
	}
	.addAnotherCont {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: fit-content;
		cursor: pointer;
		.addIcon {
			width: 1.5em;
			height: 1.5em;
		}
		.addText {
			margin: 0px !important;
			color: #afafaf;
			font-size: 1em;
			font-weight: 600;
		}
	}
	.UrlInputContainer {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		margin-bottom: 1em;
		.remove {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			color: #ff4a4a;
			margin: 0;
			cursor: pointer;
			position: absolute;
			right: 1rem;
			height: 3.5rem;
			img {
				width: 2.5em;
				height: 2.5em;
			}
		}
		.url {
			position: relative;
			.text-danger {
				position: relative;
				margin-bottom: 0;
			}
		}
		.input {
			padding: 0px 7em !important ;
			display: flex;
			align-items: center;
		}

		.icon {
			position: absolute;

			width: 3.5em;
			height: 3.5em;
			padding: 0;
			cursor: pointer;
			border: 0;
			background-color: #0000;
			margin: 1.5em;
		}

		.p-inputtext {
			padding: 2em 3em;
			font-family: 'Manrope';
			font-weight: 600;
			height: 6em;
			font-size: 1em !important;
			border-radius: 0.5rem;
		}
	}
`;
