import React from "react";
import styled from "styled-components";

const StyledBoard = styled.div`
	position: relative;
	width: 600px;
	height: 600px;
	border: 1px solid black;
	margin: 0 auto;
	display: grid;
	grid-template: repeat(3, 1fr) / repeat(3, 1fr);
`;

const Board = ({ children }) => {
	return <StyledBoard>{children}</StyledBoard>;
};

export default Board;
