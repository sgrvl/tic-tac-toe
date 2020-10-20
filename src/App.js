import React, { useState, useReducer, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import Board from "./Board";
import Square from "./Square";

const GlobalStyle = createGlobalStyle`
  body {
    text-align: center;
  }
`;

export const Context = React.createContext();

export const ACTIONS = {
	X: "X",
	O: "O",
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.X:
			return {
				player: "O",
				squares: state.squares,
			};
		case ACTIONS.O:
			return {
				player: "X",
				squares: state.squares,
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
	const [isOver, setIsOver] = useState(false);
	const [winner, setWinner] = useState("It's a tie!");
	const [state, dispatch] = useReducer(reducer, {
		player: "X",
		squares: ["", "", "", "", "", "", "", "", ""],
	});

	useEffect(() => {
		const space = state.squares.filter((s) => s === "");
		if (space.length === 0) {
			setIsOver(true);
		}
		const test_X = WINNING_CONDITIONS.some((combo) =>
			combo.every((index) => state.squares[index] === "X")
		);
		const test_O = WINNING_CONDITIONS.some((combo) =>
			combo.every((index) => state.squares[index] === "O")
		);
		if (test_X) {
			setWinner("Winner is X!");
			setIsOver(true);
		}
		if (test_O) {
			setWinner("Winner is O!");
			setIsOver(true);
		}
	}, [state]);

	return (
		<Context.Provider value={{ state, dispatch }}>
			<h1>Tic Tac Toe</h1>
			{isOver ? <p>{winner}</p> : <p>Player: {state.player}</p>}
			<Board>
				{state.squares.map((value, index) => (
					<Square
						value={value}
						index={index}
						key={`Square: ${index}`}
						isOver={isOver}
					/>
				))}
			</Board>
			<GlobalStyle />
		</Context.Provider>
	);
}

export default App;
