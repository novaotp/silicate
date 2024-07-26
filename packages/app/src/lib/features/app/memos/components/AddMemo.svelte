<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { getPreference } from '$utils/capacitor-preferences';
	import { changeSearchParams } from '$utils/change-search-params';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import { Button } from '$ui/forms';
	import { createMemo, fetchMemos } from '../requests';
	import { addToast } from '$stores/toast';
	import type { Writable } from 'svelte/store';
	import type { Memo } from '$common/models/memo';
	import type { ApiResponseWithData } from '$common/types/api-response';
	import { cn } from '$utils/cn';

	const memos = getContext<Writable<Memo[]>>('memos');

	$: search = $page.url.searchParams.get('search') ?? '';
	$: category = $page.url.searchParams.get('category') ?? '';

	const onCreate = async () => {
		const token = await getPreference<{ jwt: string; expires: string }>('token');

		let response: ApiResponseWithData<number>;
		try {
			response = await createMemo(token.jwt);
		} catch (error) {
			console.error(error);
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		if (!response.success) {
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		let memosResponse: ApiResponseWithData<Memo[]>;
		try {
			memosResponse = await fetchMemos(token.jwt, search, category);
		} catch (error) {
			console.error(error);
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		if (!memosResponse.success) {
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		$memos = memosResponse.data;
		addToast({ type: 'success', message: 'Mémo ajouté avec succès.' });
		return changeSearchParams('id', response.data);
	};
</script>

<Button.Normal
    on:click={onCreate}
    class={cn("relative w-full h-full flex justify-center items-center gap-5", $$restProps['class'] || "")}
>
    <IconPlus class="min-w-6 min-h-6" />
    <span class="hidden md:block whitespace-nowrap">Ajouter un mémo</span>
</Button.Normal>
