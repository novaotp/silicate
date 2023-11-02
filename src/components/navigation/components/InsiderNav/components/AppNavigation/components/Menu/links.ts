
import { clientRoute } from "@shared/utils/routes";

interface AppNavMenuLinks {
  href: string;
  label: string;
}

/** Returns an array of links to be rendered in the app navigation menu. */
const links = (): AppNavMenuLinks[] => {
  return [
    {
      href: clientRoute.app.dashboard.use(),
      label: 'Dashboard',
    },
    {
      href: clientRoute.app.gradebooks.use(),
      label: 'Carnets de notes',
    },
    {
      href: clientRoute.app.notes.use(),
      label: 'Mémos',
    },
    {
      href: clientRoute.app.chat.use(),
      label: 'Chat',
    },
  ] as AppNavMenuLinks[];
}

export default links;
