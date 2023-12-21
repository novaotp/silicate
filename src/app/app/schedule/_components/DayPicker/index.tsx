"use client";

// React + Next
import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Internal
import styles from "./index.module.scss";
import { poppins } from "@/fonts";
import { weekDays } from "../../config";
import { useCustomSearchParams } from "@/libs/hooks/useCustomSearchParams";

export const DayPicker = () => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { set, remove } = useCustomSearchParams();
    const weekDay = useSearchParams()?.get("weekday") ?? "Lundi";

    const handleSelectChange = () => {
        const selectedWeekDay = selectRef.current!.value;

        if (selectedWeekDay === weekDays.at(0)) {
            router.push(`${pathname}?${remove("weekday")}`);
        } else {
            router.push(`${pathname}?${set("weekday", selectedWeekDay)}`);
        }
    };

    return (
        <div className={styles.dayPicker}>
            <p>Jour</p>
            <select
                ref={selectRef}
                defaultValue={weekDay}
                onChange={handleSelectChange}
                className={`${styles.dropdown} ${poppins.className}`}
            >
                {weekDays.map((day: string, index: number) => (
                    <option key={index} value={day}>
                        {day}
                    </option>
                ))}
            </select>
        </div>
    );
};
