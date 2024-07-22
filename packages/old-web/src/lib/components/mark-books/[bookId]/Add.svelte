<script lang="ts">
    import { Button, FullScreen } from "$lib/ui";
    import IconPlus from '@tabler/icons-svelte/icons/plus';
    import IconGradienter from '@tabler/icons-svelte/icons/gradienter';
    import IconBrandCampaignmonitor from '@tabler/icons-svelte/icons/brand-campaignmonitor';

    export let showGroupCreationModal: boolean;
    export let showSubjectCreationModal: boolean;

    let showOverlay: boolean = false;
</script>

<!--
@component
Displays buttons to add a group or a subject.
-->

{#if !showOverlay}
    <Button.Normal
        on:click={() => (showOverlay = true)}
        class="fixed bottom-5 right-5 w-[60px] aspect-square flex-center gap-5"
    >
        <IconPlus class="min-w-5 min-h-5" />
        <span class="hidden md:block whitespace-nowrap">Ajouter un groupe</span>
    </Button.Normal>
{/if}

{#if showOverlay}
    <FullScreen.Backdrop
        on:click={() => (showOverlay = false)}
        class="bg-[rgba(255,255,255,0.9)] flex flex-col gap-5 justify-end items-end p-5"
    >
        <div class="flex justify-end items-center gap-5">
            <span class="text-sm">Branche</span>
            <div class="w-[60px] h-10 flex justify-center items-end">
                <Button.Normal
                    on:click={() => { showOverlay = false; showSubjectCreationModal = true; }}
                    class="w-10 aspect-square flex-center gap-5"
                >
                    <IconGradienter class="min-w-5 min-h-5" />
                    <span class="hidden md:block whitespace-nowrap">Ajouter un groupe</span>
                </Button.Normal>
            </div>
        </div>
        <div class="flex justify-end items-center gap-5">
            <span class="text-sm">Groupe</span>
            <Button.Normal
                on:click={() => { showOverlay = false; showGroupCreationModal = true; }}
                class="w-[60px] aspect-square flex-center gap-5"
            >
                <IconBrandCampaignmonitor class="min-w-5 min-h-5" />
                <span class="hidden md:block whitespace-nowrap">Ajouter un groupe</span>
            </Button.Normal>
        </div>
    </FullScreen.Backdrop>
{/if}
