
// MUI Icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';

// Internal
import { Item } from './Item';
import { More } from './More';

/** Renders the navbar when the user is logged in. */
export const InsiderNav = () => {
  return (
    <nav className="relative w-full h-[70px] flex justify-evenly items-center bg-purple-600">
      <Item href='/app' icon={<HomeRoundedIcon />} />
      <Item href='/app/chat' icon={<ChatBubbleRoundedIcon />} />
      <More icon={<MoreVertRoundedIcon />} />
      <Item href='/app/calendar' icon={<EventRoundedIcon />} />
      <Item href='/app/settings' icon={<SettingsRoundedIcon />} />
    </nav>
  )
}
