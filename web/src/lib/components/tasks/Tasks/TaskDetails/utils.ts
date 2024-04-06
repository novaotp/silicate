import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Step, Task } from "$libs/models/Task";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

export const calculateCompletion = (values: string | Step[]): number => {
    if (typeof values === 'string') {
        values = JSON.parse(values) as Step[];
    }

    let completedCount = 0;
    const totalCount = values.length;

    for (const value of values) {
        if (!value.completed && value.subSteps) {
            completedCount += calculateCompletion(value.subSteps);
        } else {
            completedCount += value.completed ? 1 : 0;
        }
    }

    return completedCount / totalCount;
};

export const fetchTasks = async (jwt: string, category: string, search: string, archived: boolean): Promise<Task[] | undefined> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks?category=${category}&search=${search}&archived=${archived}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Task[]> = await response.json();

    return result.success ? result.data : undefined;
}
