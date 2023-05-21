import {useEffect, useState} from "react";
import {useInterval} from "./useInterval";
import WebSocketConnection from "../api/ws";

export const useWs = () => {
    const [ws, setWs] = useState(null);
    const [isWs, setIsWs] = useState(null);

    useEffect(() => {
        if (ws) {
            return;
        }
        setWs(WebSocketConnection.getInstance());
    }, []);

    useInterval(() => {
        if (ws && isWs !== ws.isWsReady) {
            setIsWs(ws.isWsReady);
        }
    }, 0);

    return [ws, isWs];
}