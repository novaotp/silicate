<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { createMemo, fetchMemos } from '../requests';
	import { changeSearchParams } from '$utils/change-search-params';
	import { Button } from '$ui/forms';
	import { addToast } from '$stores/toast';
	import { getJWTFromCookies } from '$utils/jwt';
	import type { Writable } from 'svelte/store';
	import type { Memo } from '$common/models/memo';
	import type { ApiResponseWithData } from '$common/types/api-response';

	const memos = getContext<Writable<Memo[]>>('memos');

	$: search = $page.url.searchParams.get('search') ?? '';
	$: category = $page.url.searchParams.get('category') ?? '';

	const onCreate = async () => {
		const token = getJWTFromCookies();

		let response: ApiResponseWithData<Memo>;
		try {
			response = await createMemo(token!);
		} catch (error) {
			console.error(error);
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		if (!response.success) {
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		let memosResponse: ApiResponseWithData<Memo[]>;
		try {
			memosResponse = await fetchMemos(token!, search, category);
		} catch (error) {
			console.error(error);
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		if (!memosResponse.success) {
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		$memos = memosResponse.data;
		addToast({ type: 'success', message: 'Mémo ajouté avec succès.' });
		return changeSearchParams('id', response.data.id);
	};
</script>

<div
    class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col min-[900px]:flex-row-reverse
            justify-center items-start sm:items-center gap-5"
>
	<img
		src="/illustrations/no-memos.png"
		alt="Illustration : Ajouter un mémo"
		class="w-3/5 xsm:w-1/2 sm:2/5 self-center"
	/>
	<div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
		<h2 class="text-2xl dark:text-neutral-50">Créer un mémo</h2>
		<p class="text-neutral-500 dark:text-neutral-400 max-w-[350px] xsm:text-center">
			Rédige tes pensées dans un mémo pour ne rien oublier et rester organisé.
		</p>
        <Button.Normal on:click={onCreate}>
            Créer un mémo
        </Button.Normal>
	</div>
</div>
