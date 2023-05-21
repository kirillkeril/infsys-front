import {useWs} from "../use/useWs";

export const PingButton = () => {
    const [ws, isWs] = useWs();

    return (
        <button disabled={!isWs} onClick={() => ws?.send(JSON.stringify({type: 'ping'}))}>Ping</button>
    )
}