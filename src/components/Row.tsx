import {Tile} from "./Tile.tsx";
import {useEffect, useState} from "react";
import {GameState} from "./GameManager.tsx";

type Props = {
    gameState: GameState;
    word: string;
    guess: string;
}

export function Row({gameState, word, guess}: Props) {
    const [tileStatuses, setTileStatuses] 
        = useState<{char: string, status: TileStatus}[]>(Array(5).fill({char: '', status: TileStatus}));

    useEffect(() => {
        checkLetters();
    }, [guess]);

    useEffect(() => {
        if (gameState === GameState.PLAYING)
        {
            setTileStatuses(Array(5).fill({char: '', status: TileStatus}));
        }
    }, [gameState]);
    const checkLetters = () => {
        if (!guess) return;

        // Create a frequency map of the letters in the word
        const letterCount = word.split('').reduce((acc: Record<string, number>, letter: string) => {
            acc[letter] = (acc[letter] || 0) + 1;
            return acc;
        }, {});

        // This needs to run through completely to check for any matches _before_ checking for any partials,
        // otherwise a partial can match when there's already a full match.
        const pendingTileStatuses = guess.split('').map((guessLetter, index) => {
            if (word[index] === guessLetter) {
                letterCount[guessLetter]--;
                return { char: guessLetter, status: TileStatus.MATCH };
            }
            return {char: guessLetter, status: TileStatus.NONE};
        });
        
         pendingTileStatuses.forEach((tile) => {
            if (letterCount[tile.char] > 0 && tile.status !== TileStatus.MATCH) {
                letterCount[tile.char]--;
                tile.status = TileStatus.PARTIAL;
            }
        });
         
        setTileStatuses(pendingTileStatuses);
    };
    
    return (
        <div className="flex flex-row">
            {tileStatuses.map((tile, index) => (
                <Tile key={index} gameState={gameState} char={tile.char} charPosition={index} status={tile.status} />
            ))}
        </div>
    )}

export enum TileStatus {
    NONE = "None",
    PARTIAL = "Partial",
    MATCH = "MATCH",
}
