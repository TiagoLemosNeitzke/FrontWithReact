import style from './Button.module.css'

interface IButton {
    label: string;
}

export const Button = ({label}: IButton) => {
    return (
        <button className={style.button}>
            <span>{label}</span>
        </button>
    )
}
