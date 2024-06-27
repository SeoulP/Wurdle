import {TileStatus} from "./Row.tsx";

export function Tile({char, status}) {
    
     const tileTheme = () => {
            switch(status) {
                case TileStatus.NONE: return 'bg-slate-500';
                case TileStatus.PARTIAL: return 'bg-amber-500';
                case TileStatus.MATCH: return 'bg-green-500';
                default: return 'bg-slate-500';
            }
        }
    
    return (
    <div className={"flex pb-1 justify-center items-end drop-shadow-md shadow-amber-700 w-16 h-16 text-slate-50 text-6xl rounded-md border-amber-500 my-3 mx-1 hover:bg-amber-200 " + tileTheme()}>
        {char}
    </div>
    )
}