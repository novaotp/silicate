<script lang="ts">
	export let text: string;
	export let href: string;
	export let label: string;
</script>

<div class="relative flex text-xs text-gray-500">
	<p>{text}</p>
	&nbsp;
	<a class="text-purple-900 underline" {href}>
		{label}
	</a>
</div>
