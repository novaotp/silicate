import { useMemo } from "react";
import styles from "./index.module.scss";
import { Grade } from "@/models/grade";

interface AverageGradeProps {
    grades: Grade[] | undefined;
}

export const AverageGrade = ({ grades }: AverageGradeProps) => {
    const score = useMemo(() => {
        if (!grades || grades.length === 0) return 0;

        let totalWeight = grades.reduce(
            (acc, grade) => acc + Number(grade.weight),
            0
        );
        let weightMultiplier = 100 / totalWeight;
        let weightedScoreSum = 0;

        grades.forEach((grade) => {
            const numericScore = parseFloat(grade.score); // Parse the score as a number
            const adjustedWeight = grade.weight * weightMultiplier; // Adjust weight proportionally
            weightedScoreSum += numericScore * (adjustedWeight / 100); // Apply adjusted weight
        });

        // Calculate the weighted average and round it to two decimal places
        return Math.round(weightedScoreSum * 100) / 100; // Correct the rounding method
    }, [grades]);

    return (
        <div className={styles.averageGrade}>
            <p className={styles.title}>Moyenne</p>
            <p className={styles.score}>
                {grades && grades.length > 0 ? score.toFixed(2) : "?"}
            </p>{" "}
            {/* Format the score to 2 decimal places */}
        </div>
    );
};
