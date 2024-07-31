<script lang="ts">
    import '../app.css';
	import { ToastContainer } from '$features/toast-notifications';
	import { initTheme } from '$stores/theme';

    initTheme();
</script>

<ToastContainer />
<slot />
