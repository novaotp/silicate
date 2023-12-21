import { Dispatch, SetStateAction } from "react";
import { poppins } from "@/fonts";
import styles from "./index.module.scss";

interface InputFieldProps {
    type: "text" | "email" | "password" | "date" | "number";
    label: string;
    placeholder: string;
    value: any;
    setValue: Dispatch<SetStateAction<any>>;
}

/** A text input field for the gradebokk pages. */
const InputField = ({
    type,
    label,
    placeholder,
    value,
    setValue,
}: InputFieldProps) => {
    const name = label.split(" ")[0].toLowerCase();

    return (
        <div className={styles.field}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className={`${styles.input} ${poppins.className}`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                autoComplete='off'
                required={true}
                min={type === "number" ? 1 : undefined}
                max={type === "number" ? 6 : undefined}
                step={type === "number" ? 0.1 : undefined}
            />
        </div>
    );
};

export default InputField;
