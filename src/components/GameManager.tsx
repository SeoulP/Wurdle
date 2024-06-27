import {Win} from "./Win.tsx";
import {Lose} from "./Lose.tsx";
import {Row, TileStatus} from "./Row.tsx";
import {Guess} from "./Guess.tsx";
import {useState} from "react";
import {j} from "vite/dist/node/types.d-aGj9QkWt";



export function GameManager() {
    const [guess, setGuess] = useState("");
    const [rows, setRows] = useState<string[]>(Array(6).fill(''));

    const [guessCount, setGuessCount] = useState(0);

    const word = 'Seoul';

    const handleGuess = (newGuess) => {
        setGuess(newGuess);
        setGuessCount(prevCount => {
            const newCount = prevCount + 1;
            const newRows = [...rows];
            newRows[newCount - 1] = newGuess;
            setRows(newRows);
            return newCount;
        });    };
    
    if (guess.toLowerCase() == word.toLowerCase()) {
        return <Win/>
    } else if (guessCount >= 6) {
        return <Lose/>
    }

    return (
    <div className={"h-full flex rounded-lg items-center p-4 flex-col bg-slate-700 w-[30rem]"}>
        <div className={"text-7xl text-slate-50 mt-[-1rem] "}>WURDLE</div>
        <div className={"items-center flex flex-col"}>
            {rows.map((row, index) => (
                <Row key={index} word={word.toUpperCase()} guess={row.toUpperCase()} />
            ))}                

        </div>
        <Guess sendDataToParent={handleGuess}/>
    </div>
    )
}