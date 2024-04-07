// sum.test.js
import type { Step } from '$libs/models/Task';
import { expect, it } from 'vitest'
import { calculateCompletion, toStepWithId, type StepWithId } from './utils';

const steps: Step[] = [
    {
        label: "Step 1",
        completed: false,
        subSteps: [
            {
                label: "Sub Step 1.1",
                completed: false
            }
        ]
    },
    {
        label: "Step 2",
        completed: false,
        subSteps: [
            {
                label: "Sub Step 2.1",
                completed: false
            },
            {
                label: "Sub Step 2.2",
                completed: true
            }
        ]
    },
    {
        label: "Step 3",
        completed: true
    }
];

it('calculates the progression correctly based on an array of steps', () => {
    const progression = (calculateCompletion(steps) * 100).toFixed(0);

    expect(progression).toEqual("50");
});

it('transforms an array of steps to an array of steps with unique ids', () => {
    const stepsWithId: StepWithId[] = steps.map(step => toStepWithId(step));

    const uniqueIds: string[] = [];
    let success: boolean = true;

    stepsWithId.forEach(stepWithId => {
        if (uniqueIds.includes(stepWithId.id)) {
            success = false;
        }

        if (stepWithId.subSteps) {
            stepWithId.subSteps.forEach(subStepWithId => {
                if (uniqueIds.includes(subStepWithId.id)) {
                    success = false;
                }
            })
        }
    });

    expect(success).toBeTruthy();
});
