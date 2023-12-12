
// Next
import { Metadata } from 'next';

// Internal
import { Subjects } from './page.components';

export const metadata: Metadata = {
  title: "Mon carnet de notes - Silicate"
}

/** The subjects page. */
const Page = (): JSX.Element => {
  return (
    <Subjects />
  )
}

export default Page;
