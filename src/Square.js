import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context, ACTIONS } from "./App";

const StyledSquare = styled.button`
	font-size: 5rem;
`;

const Square = ({ value, index, isOver }) => {
	const [isClicked, setIsClicked] = useState(false);
	const { state, dispatch } = useContext(Context);

	function handleClick() {
		if (!isOver && !isClicked) {
			state.squares[index] = state.player;
			if (state.player === "X") {
				dispatch({ type: ACTIONS.X });
			} else {
				dispatch({ type: ACTIONS.O });
			}
		}
		setIsClicked(true);
	}

	return <StyledSquare onClick={handleClick}>{value}</StyledSquare>;
};

export default Square;
