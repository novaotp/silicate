import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";
import type { Step, Task } from "$libs/models/Task";
import type { StepWithId } from "$lib/components/tasks/utils";
import { StepWithId } from '../components/tasks/utils';

export class TaskRequests {
    private jwt: string;

    /**
     * A class that provides functions to request data related to tasks.
     * @param jwt The jwt token for authentication.
     */
    constructor(jwt: string) {
        this.jwt = jwt;
    }

    /**
 * Adds a new task in the database and returns the id.
 * @returns On success, returns the data, otherwise, returns a message error.
 */
    public async createTask(): Promise<ApiResponseWithData<number>> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks`, {
            method: 'POST',
            body: JSON.stringify({
                title: 'Ma nouvelle tâche',
                description: null,
                category: null,
                due: new Date(),
                steps: null,
                attachments: null,
                archived: false
            }),
            headers: {
                accept: 'application/json',
                authorization: this.jwt,
                'content-type': 'application/json'
            }
        });

        return await response.json();
    };

    /**
     * Fetches a task with the given id.
     * @param id The id of the task
     * @returns The data if it succeeded, `undefined` otherwise.
     */
    public async getTask(id: number): Promise<ApiResponseWithData<Task>> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: this.jwt
            }
        });

        return await response.json();
    };

    private async _updateTask(id: number, data: UpdateTaskData): Promise<ApiResponse> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                accept: 'application/json',
                authorization: this.jwt,
                'content-type': 'application/json'
            }
        });

        return await response.json();
    }

    public async updateTask(id: number, data: UpdateTaskData): Promise<ApiResponse> {
        return await this._updateTask(id, data);
    }

    public async deleteTask(id: number): Promise<ApiResponse> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.jwt
            }
        });

        return await response.json();
    }

    public async archiveTask(id: number, archived: boolean): Promise<ApiResponse> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                archived: archived
            }),
            headers: {
                accept: 'application/json',
                authorization: this.jwt,
                'content-type': 'application/json'
            }
        });
        return await response.json();
    }

    public async updateSteps(steps: Step[] | StepWithId[] | null)  {
        if (Array.isArray(steps)) {
            const firstStep = steps[0];

            if (firstStep && (firstStep instanceof StepWithId))
        }

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                steps: steps.length > 0 ? steps.map(s => toStep(s)) : null
            }),
            headers: {
                accept: 'application/json',
                authorization: jwt,
                'content-type': 'application/json'
            }
        });
        return await response.json();2
    }


    public async tasks(category: string, search: string, archived: boolean): Promise<ApiResponseWithData<Task[]>> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks?category=${category}&search=${search}&archived=${archived}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": this.jwt
            }
        });

        return await response.json();
    }

    public async categories(archived: boolean = false): Promise<ApiResponseWithData<string[]>> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/categories?archived=${archived}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": this.jwt
            }
        });

        return await response.json();
    }
}

interface UpdateTaskData {
    category: string | null,
    title?: string,
    description: string | null,
    due?: string | Date,
    steps: string | null,
    archived?: boolean
}
