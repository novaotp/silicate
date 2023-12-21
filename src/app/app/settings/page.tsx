// MUI Icons
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

// Next
import type { Metadata } from "next";

// Internal
import { Box } from "@/components/app/settings";

export const metadata: Metadata = {
    title: "Paramètres - Silicate",
};

const Page = () => {
    return (
        <div className='relative flex h-full w-full flex-col p-5'>
            <h1 className='relative mt-10 text-3xl font-bold'>Paramètres</h1>
            <Box label='Mes informations'>
                <Box.Item
                    href='/app/settings/profile'
                    icon={<PersonRoundedIcon />}
                    label='Mon compte'
                />
            </Box>
            <Box label='Aide'>
                <Box.Item
                    label='Contact / Support'
                    href='/app/settings/profile'
                    icon={<EmailRoundedIcon />}
                />
                <Box.Item
                    label='FAQ'
                    href='/app/settings/faq'
                    icon={<QuizRoundedIcon />}
                />
            </Box>
            <Box label='Autre'>
                <Box.ChangeTheme />
                <Box.Item
                    label='Déconnexion'
                    href='/auth/log-out'
                    icon={<LogoutRoundedIcon />}
                    className='border-red-500 bg-red-500 text-white'
                />
            </Box>
        </div>
    );
};

export default Page;
