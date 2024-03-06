{#if loaded}
<img {src} style="height: 30px; width: auto;" alt="PageLogo"/>
{:else if failed}
	<p>Logo 404</p>
{:else if loading}
	<img src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif" class="loadingGif" alt="Loading..." />
{/if}

<script>
	import { onMount } from 'svelte'
	export let src;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
			const img = new Image();
			img.src = src;
			loading = true;

			img.onload = () => {
					loading = false;
					loaded = true;
			};
			img.onerror = () => {
					loading = false;
					failed = true;
			};
	})
</script>

