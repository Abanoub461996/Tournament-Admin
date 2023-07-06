import styled from 'styled-components';

export const PortraitComponent = styled.section`
	height: 100vh;
	height: 100vh;
	background-color: #000000cc !important;
	@media (orientation: portrait) {
		display: flex !important;
		justify-content: center;
		align-items: center;
		.rotation {
			p {
				margin: 2em 3em;
			}
			img {
				margin: 2em auto;

				width: 18em;
			}
		}
	}
`;
