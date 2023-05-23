import {ConnectButton} from "./ConnectButton";
import {CloseButton} from "./CloseButton";

export const Header = () => {
    return (
        <header>
            <div className={'buttons-container'}>
                <ConnectButton/>
                <CloseButton/>
            </div>
        </header>
    );
}