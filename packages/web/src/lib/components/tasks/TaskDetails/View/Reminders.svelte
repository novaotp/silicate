<script lang="ts">
    import { Button, Card, FullScreen } from '$lib/ui';
    import type { Reminder } from '$libs/models/Task';
    import IconAlarm from '@tabler/icons-svelte/IconAlarm.svelte';
    import IconTrash from '@tabler/icons-svelte/IconTrash.svelte';
    import type { SubmitFunction } from '../../../../../routes/app/tasks/$types';
    import { addToast } from '$lib/stores/toast';
    import { deserialize, enhance } from '$app/forms';
    import DatePicker from '$lib/components/shared/date-picker';
    import { page } from '$app/stores';

    export let taskId: number;
    export let reminders: Reminder[];

    let selectedReminderId: number | null = null;
    $: selectedReminder = reminders.find((reminder) => reminder.id === selectedReminderId)!;

    const createReminderEnhance: SubmitFunction = ({ formData }) => {
        formData.set('taskId', taskId.toString());
        return async ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success' && 'reminder' in result.data!) {
                reminders = [...reminders, result.data.reminder];
            }
        };
    };

    // Manually calling an action because there's no form but it's still sending data.
    const editReminder = async (newTimeValue: string) => {
        if (!selectedReminderId) {
            console.warn("Cannot edit a reminder without opening it.");
            return;
        }

        const formData = new FormData();
        formData.set('taskId', taskId.toString());
        formData.set('reminderId', selectedReminderId.toString());
        formData.set('time', newTimeValue);

        const response = await fetch(`${$page.url.pathname}?/editReminder`, {
            method: 'POST',
            body: formData
        });

        const result = deserialize<{ message: string }, { message: string }>(await response.text());

        if (result.type === 'failure') {
            return addToast({ type: 'error', message: result.data!.message });
        } else if (result.type === 'success') {
            reminders = reminders.map((reminder) => (reminder.id !== selectedReminderId ? reminder : { ...reminder, time: newTimeValue }));
        }
    };

    // Wrapper because I can't pass each reminder in another way than directly in HTML.
    const destroyReminderEnhanceWrapper = (reminder: Reminder): SubmitFunction => {
        return ({ formData }) => {
            formData.set('taskId', taskId.toString());
            formData.set('reminderId', reminder.id.toString());
            return ({ result }) => {
                if (result.type === 'failure' && result.data && typeof result.data.message === 'string') {
                    return addToast({ type: 'error', message: result.data.message });
                } else if (result.type === 'success' && result.data) {
                    reminders = reminders.filter((r) => r.id !== reminder.id);
                }
            };
        };
    };

    $: reminders = reminders.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
</script>

<div class="relative w-full flex flex-col gap-3 text-neutral-500">
    <div class="relative w-full flex justify-between">
        <div class="flex gap-4">
            <IconAlarm />
            <h3>Rappels</h3>
        </div>
        <form method="POST" action="?/createReminder" use:enhance={createReminderEnhance}>
            <Button.Normal variant="primary" size="small">Ajouter</Button.Normal>
        </form>
    </div>
    <ul class="relative w-full flex flex-col gap-[10px]">
        {#each reminders as reminder}
            <li class="relative h-[50px] w-full flex gap-5">
                <button on:click={() => (selectedReminderId = reminder.id)} class="relative w-full h-full bg-neutral-100 rounded">
                    {new Date(reminder.time).toLocaleString('fr-CH')}
                </button>
                <form method="POST" action="?/destroyReminder" use:enhance={destroyReminderEnhanceWrapper(reminder)}>
                    <Button.Danger variant="primary" size="small" class="h-full">
                        <IconTrash />
                    </Button.Danger>
                </form>
            </li>
        {/each}
    </ul>
    {#if selectedReminderId}
        <FullScreen.Backdrop class="flex justify-center items-center" on:click={() => (selectedReminderId = null)}>
            <Card options={{ y: 50 }} class="bg-transparent p-0">
                <DatePicker
                    pickerOnly
                    format="dd.mm.yyyy hh:ii"
                    mode="datetime"
                    value={selectedReminder.time}
                    on:cancel={() => (selectedReminderId = null)}
                    on:dateChange={async (event) => {
                        await editReminder(event.detail.dateValue);
                        selectedReminderId = null;
                    }}
                />
            </Card>
        </FullScreen.Backdrop>
    {/if}
</div>
