
// Next
import { Metadata } from 'next';
import { headers } from "next/headers";

// Internal
import { Subjects } from '@components/gradebook';
import { Subject } from '@models/subject';
import { GetSubjects } from './server';

export const metadata: Metadata = {
  title: "Mon carnet de notes - Silicate"
}

/** The subjects page. */
const Page = async (): Promise<JSX.Element> => {
  const subjects: Subject[] = await GetSubjects();

  return (
    <Subjects subjects={subjects} />
  )
}

export default Page;
