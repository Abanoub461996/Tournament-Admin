import styled from 'styled-components';

export const SpinnerWarper = styled.div`
	width: 100%;
	position: absolute;
	height: 100%;
	min-height: calc(100vh - 80px);
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 999;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const SpinnerContent = styled.div``;
