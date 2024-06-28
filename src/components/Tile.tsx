import {TileStatus} from "./Row.tsx";
import {GameState} from "./GameManager.tsx";

type Props = {
    gameState: GameState;
    char: string;
    charPosition: number;
    status: TileStatus;
}
export function Tile({gameState, char, charPosition, status}: Props) {
    
     const tileTheme = () => {
            switch(status) {
                case TileStatus.NONE: 
                    if (gameState == GameState.LOSE) return 'bg-slate-600';
                    return 'bg-slate-500'
                case TileStatus.PARTIAL:
                    if (gameState == GameState.LOSE) return 'bg-amber-700';
                    return 'bg-amber-500'
                case TileStatus.MATCH:
                    if (gameState == GameState.LOSE) return 'bg-green-700';
                    return 'bg-green-500'
                default: return 'bg-slate-500';
            }
        }
    
        switch (gameState)
        {
            case GameState.PLAYING:
                return (
                    <div className={"flex pb-1 justify-center items-end drop-shadow-md shadow-amber-700 w-12 h-12 text-slate-50 text-4xl rounded-md border-amber-500 my-2 mx-1 hover:bg-amber-200 " + tileTheme()}>
                        {char}
                    </div>
                )
            case GameState.WIN:
            return (
                <div className={"flex pb-1 justify-center items-end drop-shadow-md shadow-amber-700 w-12 h-12 text-slate-50 text-4xl rounded-md border-amber-500 my-2 mx-1 animate-bounce-custom hover:bg-amber-200 " + tileTheme()}
                     style={{ animationDelay: (charPosition * .5) + "s" }}>
                    {char}
                </div>
            )
            case GameState.LOSE:
                return (
                    <div className={"flex pb-1 justify-center items-end drop-shadow-md shadow-amber-700 w-14 h-14 text-slate-50 text-5xl rounded-md border-amber-500 my-2 mx-1 animate-pulse hover:bg-amber-200 " + tileTheme()}
                         style={{ animationDelay: (Math.random() * .75) + "s" }}>
                        {char}
                    </div>
                )

        }
}