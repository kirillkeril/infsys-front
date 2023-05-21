import {useWs} from "../use/useWs";

export const CloseButton = () => {
    const [ws, isWs] = useWs();

    return (
        <button disabled={!isWs} onClick={() => ws?.close()}>Отключиться от игры</button>
    )
}