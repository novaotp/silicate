
import { type Metadata } from 'next';
import LandingComponent from './page.components';

export const metadata: Metadata = {
  title: 'Silicate'
}

/** The main page of the website. */
const Page = (): JSX.Element => {
  return (
    <LandingComponent />
  )
}

export default Page;