import React, { useReducer, useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
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
				winner: "Player: O",
			};
		case ACTIONS.O:
			return {
				player: "X",
				squares: state.squares,
				isOver: false,
				winner: "Player: X",
			};
		case ACTIONS.RESET:
			return {
				player: "X",
				squares: ["", "", "", "", "", "", "", "", ""],
				isOver: false,
				winner: "Player: X",
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
	[0, 1, 2], //first horizontal
	[3, 4, 5], //second horizontal
	[6, 7, 8], //third horizontal
	[0, 3, 6], //first vertical
	[1, 4, 7], //second vertical
	[2, 5, 8], //third vertical
	[0, 4, 8], //top-left diagonal
	[2, 4, 6], //top-right diagonal
];

export default function App() {
	const [winningCombo, setWinningCombo] = useState([]);
	const [state, dispatch] = useReducer(reducer, {
		player: "X",
		squares: ["", "", "", "", "", "", "", "", ""],
		isOver: false,
		winner: `Player: X`,
		winningCombo: [],
	});

	useEffect(() => {
		const test_X = WINNING_CONDITIONS.some((combo) => {
			if (combo.every((index) => state.squares[index] === "X")) {
				setWinningCombo(combo);
				return true;
			} else {
				return false;
			}
		});
		const test_O = WINNING_CONDITIONS.some((combo) => {
			if (combo.every((index) => state.squares[index] === "O")) {
				setWinningCombo(combo);
				return true;
			} else {
				return false;
			}
		});
		if (!state.isOver) {
			if (!state.squares.includes(""))
				dispatch({ type: ACTIONS.OVER, payload: "It's a tie!" });
			if (test_X) dispatch({ type: ACTIONS.OVER, payload: "X wins!" });
			if (test_O) dispatch({ type: ACTIONS.OVER, payload: "O wins!" });
		}
	}, [state, winningCombo]);

	useEffect(() => {}, []);

	return (
		<Context.Provider value={{ state, dispatch }}>
			<h1>Tic Tac Toe</h1>
			<p>{state.winner}</p>
			<Board>
				<WinLine combo={winningCombo} />
				{state.squares.map((value, index) => (
					<Square value={value} index={index} key={`Square: ${index}`} />
				))}
			</Board>
			<Reset
				onClick={() => {
					dispatch({ type: ACTIONS.RESET });
					setWinningCombo([]);
				}}
			>
				Reset
			</Reset>
			<GlobalStyle />
		</Context.Provider>
	);
}

const Reset = styled.button`
	margin: 2rem;
`;

const animationHorz = keyframes`
	0% { width: 0%;}
	100% { width: 90%;}
`;

const animationVer = keyframes`
	0% { height: 0%;}
	100% { height: 90%;}
`;

const animationDia = keyframes`
	0% { width: 0%;}
	100% { width: 120%;}
`;

const handleWinningLine = (combo) => {
	switch (combo) {
		case WINNING_CONDITIONS[0]:
			return `top: calc(16.5% - 5px); height: 5px; width: 90%; margin-left: 5%;`;
		case WINNING_CONDITIONS[1]:
			return `top: calc(50% - 5px); height: 5px; width: 90%; margin-left: 5%;`;
		case WINNING_CONDITIONS[2]:
			return `bottom: calc(16.5% + 2px); height: 5px; width: 90%; margin-left: 5%;`;
		case WINNING_CONDITIONS[3]:
			return `left: calc(16.5% - 2px); height: 90%; width: 5px; margin-top: 5%;`;
		case WINNING_CONDITIONS[4]:
			return `left: calc(50% - 2.5px); height: 90%; width: 5px; margin-top: 5%;`;
		case WINNING_CONDITIONS[5]:
			return `right: calc(16.5% - 1.5px); height: 90%; width: 5px; margin-top: 5%;`;
		case WINNING_CONDITIONS[6]:
			return `height: 5px; width: 120%; margin: 7.5%; transform: rotate(45deg); transform-origin: 2px;`;
		case WINNING_CONDITIONS[7]:
			return `height: 5px; width: 120%; margin: 7.5%; transform: rotate(135deg); transform-origin: 2px; left: 84.5%;`;
		default:
			return "display: none";
	}
};

const WinLine = styled.div`
	box-sizing: border-box;
	position: absolute;
	background: black;
	animation: 0.7s
		${({ combo }) =>
			combo === WINNING_CONDITIONS[0] ||
			combo === WINNING_CONDITIONS[1] ||
			combo === WINNING_CONDITIONS[2]
				? animationHorz
				: combo === WINNING_CONDITIONS[3] ||
				  combo === WINNING_CONDITIONS[4] ||
				  combo === WINNING_CONDITIONS[5]
				? animationVer
				: animationDia};
	${({ combo }) => handleWinningLine(combo)}
`;

/* const WINNING_CONDITIONS = [
	[0, 1, 2], //first horizontal 0
	[3, 4, 5], //second horizontal 1
	[6, 7, 8], //third horizontal 2
	[0, 3, 6], //first vertical 3
	[1, 4, 7], //second vertical 4
	[2, 5, 8], //third vertical 5
	[0, 4, 8], //top-left diagonal 6
	[2, 4, 6], //top-right diagonal 7
]; */
