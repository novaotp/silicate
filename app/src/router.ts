import Home from './routes/Home.svelte';
import Register from './routes/Register.svelte';
import Login from './routes/Login.svelte';
import Dashboard from './routes/Dashboard.svelte';
import Settings from './routes/Settings.svelte';

export const routes = {
    '/': Home,
    '/auth/register': Register,
    '/auth/login': Login,
    '/app': Dashboard,
    '/app/settings': Settings
};
