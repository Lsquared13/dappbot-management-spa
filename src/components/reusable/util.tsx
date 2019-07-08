import { useState } from 'react';

interface StageRoute {
    stage: string,
    goTo: (stage:string)=>void,
    back: ()=>void
}
export function useStages(stages:string[]): StageRoute {
    if (stages.length === 0){
        throw new Error("Array of stages in useFlowStages must include at least one possible stage.");
    }
    const [stageHistory, setStageHistory] = useState([stages[0]]);
    const goTo:(stage:string)=>void = (stage:string) => {
        if (stages.includes(stage)){
            let newHistory = stageHistory.slice();
            newHistory.unshift(stage);
            setStageHistory(newHistory);
        }
    }
    const back:()=>void = () => {
        let newHistory = stageHistory.slice();
        if (newHistory.length > 1){
            newHistory.shift();
        }
        setStageHistory(newHistory);
    }
    const stage = stageHistory[0];
    return {stage, goTo, back}
}