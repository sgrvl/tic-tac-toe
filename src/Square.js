import React, { useContext } from "react";
import styled from "styled-components";
import { Context, ACTIONS } from "./App";

const StyledSquare = styled.button`
	font-size: 5rem;
	background: inherit;
	border: 1px solid black;
	border-radius: 0;
	cursor: pointer;
	outline: none;

	&:hover {
		background: inherit;
	}

	&:hover:after {
		${({ player, index }) => handleHover(player, index)};
		color: rgba(0, 0, 0, 0.5);
	}
`;

const handleHover = (state, index) => {
	if (state.squares[index] === "") {
		if (state.player === "X") {
			return `content: "X"`;
		} else {
			return `content: "O"`;
		}
	}
};

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

	return (
		<StyledSquare onClick={handleClick} player={state} index={index}>
			{value}
		</StyledSquare>
	);
};

export default Square;
