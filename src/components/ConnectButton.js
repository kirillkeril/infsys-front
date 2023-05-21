import {useWs} from "../use/useWs";

export const ConnectButton = () => {
    const [ws, isWs] = useWs();

    return (
        <button disabled={isWs} onClick={() => ws?.connect()}>Присоединиться к игре</button>
    )
}