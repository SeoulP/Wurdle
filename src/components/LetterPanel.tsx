import {useEffect, useState} from "react";
import {TileStatus} from "./Row.tsx";

type Props = {
    currentGuess: string;
    word: string;
}

type LetterStatus = {
    char: string;
    guessed: boolean;
    matched: TileStatus;
}
export function LetterPanel({currentGuess, word}: Props) {
    const [letterStatuses, setLetterStatuses] = useState<LetterStatus[]>(() =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char) => ({
            char,
            guessed: false,
            matched: TileStatus.NONE,
        }))
    );    

    useEffect(() => {
        const updateLetterStatuses = () => {
            const newLetterStatuses = letterStatuses.map((letterStatus) => {
                let matchedStatus = letterStatus.matched;
                let guessed = letterStatus.guessed;

                // Update letter status based on current guess
                word.split("").forEach((char, index) => {
                    if (currentGuess[index] !== letterStatus.char) return;
                    if (char === currentGuess[index]) {
                        matchedStatus = TileStatus.MATCH;
                    } else if (word.includes(currentGuess[index]) && matchedStatus != TileStatus.MATCH) {
                        matchedStatus = TileStatus.PARTIAL;
                    }
                    guessed = true;
                });

                return {
                    ...letterStatus,
                    guessed: guessed,
                    matched: matchedStatus,
                };
            });

            setLetterStatuses(newLetterStatuses);
        };

        updateLetterStatuses();
    }, [currentGuess]);
    
    function letterClass (letterStatus: LetterStatus) {
        if (!letterStatus.guessed) {
            return "text-slate-50";
        }
        
        switch(letterStatus.matched) {
            case TileStatus.MATCH:
                return "text-green-500";            
            case TileStatus.PARTIAL:
                return "text-amber-500";            
            case TileStatus.NONE:
                return "text-slate-500";
            default:
                return "text-slate-50";
        }
    }
    
    
    return (
        <div className="flex flex-row gap-1 flex-wrap w-80 items-center justify-center shadow-slate-700 shadow-[inset_0_2px_4px] px-10 py-2 mt-4 rounded-md bg-slate-600">
            {letterStatuses!.map((letterStatus, i) => (
                <div className={"text-xl " + letterClass(letterStatus)} key={i}>{letterStatus.char}</div>
            ))}
    </div>
    );
}

