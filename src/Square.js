import React, { useContext } from "react";
import styled from "styled-components";
import { Context, ACTIONS } from "./App";

const StyledSquare = styled.button`
	font-size: 5rem;
`;

const Square = ({ value, index }) => {
	const { state, dispatch } = useContext(Context);

	function handleClick() {
		if (!state.isOver && state.squares[index] === "") {
			state.squares[index] = state.player;
			if (state.player === "X") {
				dispatch({ type: ACTIONS.X });
			} else {
				dispatch({ type: ACTIONS.O });
			}
		}
	}

	return <StyledSquare onClick={handleClick}>{value}</StyledSquare>;
};

export default Square;
