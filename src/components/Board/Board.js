import styles from './Board.module.css';
import {useBoard} from "../../use/useBoard";

export const Board = () => {
    const {map,steps, handleClear, handleStep} = useBoard();

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button onClick={handleClear} className={styles.clear}>Очистить поле</button>
            </div>
            <div className={styles.board}>
                <ul className={styles.map}>
                    {map && map.map((field, id) =>
                        <li
                            onClick={() => handleStep(id)}
                            key={id}
                            className={styles.cell}
                        >
                            <>{field === "None" ? '' : field}</>
                        </li>
                    )}
                </ul>
            </div>
        </div>


    )
}