import {useState} from "react";
import {GameState} from "./GameManager.tsx";

type Props = {
    sendDataToParent: (guess: string) => void;
    gameState: GameState;
}

export function Guess({sendDataToParent, gameState}: Props) {
    const [pendingGuess, setPendingGuess] = useState<string>('');
    
    if (gameState === GameState.PLAYING)
    return (
        <div className={"flex flex-row gap-4"}>
                <input type="text" maxLength={5} value={pendingGuess.toUpperCase()} onKeyDown={
                    (e) => {
                        if(e.key === 'Enter') {
                            sendDataToParent(pendingGuess);
                            setPendingGuess('');
                        }
                    }
                } onChange={e => setPendingGuess(e.target.value)}
                       className={"bg-white max-w-[14.5rem] p-2 text-2xl mt-4 rounded-md shadow-md "}></input>
            
                <button onClick={() => 
                    { if (pendingGuess.length == 5) sendDataToParent(pendingGuess);
                        setPendingGuess('');
                    }} 
                    className={"bg-green-500 rounded-md shadow-md mt-4 text-white cursor-pointer p-3 hover:bg-green-300"}>
                    Guess!
                </button>
        </div>
    )
}