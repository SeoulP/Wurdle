import {Tile} from "./Tile.tsx";
import {useEffect, useState} from "react";

export function Row({word, guess}) {
    const [tileStatus, setTileStatus] 
        = useState<{char: string, status: TileStatus}[]>(Array(5).fill({char: '', status: TileStatus}));

    useEffect(() => {
        checkLetters();
    }, [guess]);
    const checkLetters = () => {
        if (!guess) return;

        // Create a frequency map of the letters in the word
        const letterCount = word.split('').reduce((acc, letter) => {
            acc[letter] = (acc[letter] || 0) + 1;
            return acc;
        }, {});

        const newTileStatus = guess.split('').map((guessLetter, index) => {
            if (word[index] === guessLetter) {
                letterCount[guessLetter]--;
                return { char: guessLetter, status: TileStatus.MATCH };
            }
            return { char: guessLetter, status: null }; // Placeholder
        });

        newTileStatus.forEach((tile, index) => {
            if (!tile.status) {
                if (letterCount[tile.char] > 0) {
                    letterCount[tile.char]--;
                    tile.status = TileStatus.PARTIAL;
                } else {
                    tile.status = TileStatus.NONE;
                }
            }
        });

        setTileStatus(newTileStatus);
    };
    
    return (
        <div className="flex flex-row">
            {tileStatus.map((tile, index) => (
                <Tile key={index} char={tile.char} status={tile.status} />
            ))}
        </div>
    )}

export enum TileStatus {
    NONE = "None",
    PARTIAL = "Partial",
    MATCH = "MATCH",
}
