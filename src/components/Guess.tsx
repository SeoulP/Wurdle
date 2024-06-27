import {useState} from "react";

export function Guess({sendDataToParent}) {
    const [pendingGuess, setPendingGuess] = useState<string>('');
    
    return (
        <div className={"flex flex-row gap-4"}>
                <input type="text" maxLength={5} value={pendingGuess} onChange={e => setPendingGuess(e.target.value)}
                       className={"bg-white max-w-[16.5rem] p-2 text-2xl mt-4 rounded-md shadow-md "}></input>
            
                <button onClick={() => { if (pendingGuess.length == 5) sendDataToParent(pendingGuess)}} className={"bg-green-500 rounded-md shadow-md mt-4 text-white cursor-pointer p-3 hover:bg-green-300"}>
                    Guess!
                </button>
        </div>
    )
}