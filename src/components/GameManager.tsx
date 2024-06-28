import {Row} from "./Row.tsx";
import {Guess} from "./Guess.tsx";
import {useEffect, useRef, useState} from "react";
import raw from '../assets/WordsList.txt';
import {LetterPanel} from "./LetterPanel.tsx";


export function GameManager() {
    const [word, setWord] = useState("");
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(''));
    const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);
    const gamePlayButtonRef = useRef<HTMLButtonElement>(null);

    const [guessCount, setGuessCount] = useState(0);

    useEffect(() => {
        if (gameState != GameState.PLAYING) return;
        const fetchWord = async () => {
            const response = await fetch(raw);
            const text = await response.text();
            const words: string[] = text.split("\n");
            const selectedWord = words[Math.floor(Math.random() * words.length)];
            setWord(selectedWord.toUpperCase());
        };
        fetchWord();
    }, [gameState]);

    useEffect(() => {
        if (currentGuess.toLowerCase() == word.toLowerCase() && guessCount > 0) {
            setGameState(GameState.WIN);
        } else if (guessCount >= 6) {
            setGameState(GameState.LOSE);
        }
    }, [guessCount]);

    useEffect(() => {
        if (gameState !== GameState.PLAYING) {
            gamePlayButtonRef.current?.focus();
        }
    }, [gameState]);
    
    const handleGuess = (newGuess: string) => {
        setCurrentGuess(newGuess);
        setGuessCount(prevCount => {
            const newCount = prevCount + 1;
            const newRows = [...guesses];
            newRows[newCount - 1] = newGuess;
            setGuesses(newRows);
            return newCount;
        });
    };

    function renderBottom() {
        if (gameState === GameState.PLAYING) {
            return (
                <>
                    <Guess gameState={gameState} sendDataToParent={handleGuess}/>
                    <LetterPanel currentGuess={currentGuess.toUpperCase()} word={word.toUpperCase()}/>
                </>
        );
        }
        return (
            <>
                <div className={"text-3xl text-slate-50"}>{word}</div>
                <button ref={gamePlayButtonRef} onClick={() => {
                setGuessCount(0);
                setCurrentGuess('');
                setGameState(GameState.PLAYING);
                setGuesses(Array(6).fill(''));
                }} 
                        className={"bg-green-500 rounded-md shadow-md mt-4 text-white cursor-pointer p-3 hover:bg-green-300"}>
                Play Again!
            </button>
            </>)


    }

    return (
        <div className="flex items-center justify-center">
            <div className={"h-full flex rounded-lg items-center p-4 flex-col bg-slate-700 w-[30rem]"}>
                <div className={"text-6xl text-slate-50 mt-[-1rem] "}>WURDLE</div>
                <div className={"items-center flex flex-col"}>
                    {guesses.map((row, index) => (
                        <Row key={index} gameState={gameState} word={word.toUpperCase()} guess={row.toUpperCase()}/>
                    ))}

                </div>
                {renderBottom()}
            </div>
        </div>
    )
}

export enum GameState {
    PLAYING = "PLAYING",
    WIN = "WIN",
    LOSE = "LOSE"    
}