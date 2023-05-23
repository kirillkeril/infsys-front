import styles from './Board.module.css';
import {useBoard} from "../../use/useBoard";

export const Board = () => {
    const {map,steps, handleClear, handleStep, status} = useBoard();

    return (
        <div className={styles.container}>
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
            <div className={styles.controls}>
                <button onClick={handleClear} className={styles.clear + ' button'}>Очистить поле</button>
                <span className={styles.span}>{status}</span>
            </div>
        </div>


    )
}