import {useCallback, useEffect, useState} from "react";
import {useWs} from "./useWs";

export const useBoard = () => {
    const [ws, isWs] = useWs();

    const [map, setMap] = useState(null);
    const [steps, setSteps] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        let unsub;
        
        function listenMessage(ev) {
            try {
                const parsedData = JSON.parse(ev.data);

                if (parsedData.payload?.map) {
                    setMap(() => parsedData.payload.map);
                }
                if (parsedData.payload?.steps) {
                    setSteps(() => parsedData.payload.steps);
                }
                if (parsedData.payload?.status) {
                    setStatus(() => parsedData.payload?.status)
                }
            } catch (e) {
                console.log(e)
            }
        }

        if (ws && isWs) {
            unsub = ws.subscribeMessage(listenMessage);
            ws.send(JSON.stringify({type: 'getBoardState'}))
        }


        return unsub;
    }, [ws, isWs, setMap, setSteps]);

    const handleClear = useCallback(() => {
        if (ws && isWs) {
            ws.send(JSON.stringify({type: 'clearBoard'}));
        }
    }, [ws, isWs]);

    const handleStep = useCallback((field) => {
        if (ws && isWs) {
            if (steps.length === 0) {
                ws.send(JSON.stringify({type: 'firstStep', payload: {field}}));
            } else {
                ws.send(JSON.stringify({type: 'step', payload: {field, prevStep: steps.slice(-1)[0].id }}));
            }
        }
    }, [ws, isWs, steps]);
    return {map, steps, handleClear, handleStep, status};
}