import React, { useReducer, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import Board from "./Board";
import Square from "./Square";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    text-align: center;
  }
`;

export const Context = React.createContext();

export const ACTIONS = {
	X: "X",
	O: "O",
	RESET: "RESET",
	OVER: "OVER",
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.X:
			return {
				player: "O",
				squares: state.squares,
				isOver: false,
				winner: `Player: O`,
			};
		case ACTIONS.O:
			return {
				player: "X",
				squares: state.squares,
				isOver: false,
				winner: `Player: X`,
			};
		case ACTIONS.RESET:
			return {
				player: "X",
				squares: ["", "", "", "", "", "", "", "", ""],
				isOver: false,
				winner: `Player: X`,
			};
		case ACTIONS.OVER:
			return {
				player: state.player,
				squares: state.squares,
				isOver: true,
				winner: action.payload,
			};

		default:
			console.log("error");
	}
}

const WINNING_CONDITIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function App() {
	const [state, dispatch] = useReducer(reducer, {
		player: "X",
		squares: ["", "", "", "", "", "", "", "", ""],
		isOver: false,
		winner: `Player: X`,
	});

	useEffect(() => {
		const test_X = WINNING_CONDITIONS.some((combo) =>
			combo.every((index) => state.squares[index] === "X")
		);
		const test_O = WINNING_CONDITIONS.some((combo) =>
			combo.every((index) => state.squares[index] === "O")
		);
		if (!state.isOver) {
			if (!state.squares.includes(""))
				dispatch({ type: ACTIONS.OVER, payload: "It's a tie!" });
			if (test_X) dispatch({ type: ACTIONS.OVER, payload: "X wins!" });
			if (test_O) dispatch({ type: ACTIONS.OVER, payload: "O wins!" });
		}
	}, [state]);

	return (
		<Context.Provider value={{ state, dispatch }}>
			<h1>Tic Tac Toe</h1>
			<p>{state.winner}</p>
			<Board>
				{state.squares.map((value, index) => (
					<Square value={value} index={index} key={`Square: ${index}`} />
				))}
			</Board>
			<Reset onClick={() => dispatch({ type: ACTIONS.RESET })}>Reset</Reset>
			<GlobalStyle />
		</Context.Provider>
	);
}

export default App;

const Reset = styled.button`
	margin: 2rem;
`;
