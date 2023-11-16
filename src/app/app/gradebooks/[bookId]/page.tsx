
// Next
import { Metadata } from 'next';
import { headers } from "next/headers";

// Internal
import { Subjects } from '@components/gradebook';
import { SubjectProps } from '@shared/interfaces';
import { GetSubjects } from './server';

function getTitle(): string {
  const headersList = headers();
  const pathname = headersList.get("referer") || "";
  const title = pathname.split("/").at(-1)!;

  console.log(pathname);

  return title;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = getTitle();

  return {
    title: `Carnet de notes <${title}> - Silicate`
  }
}

/** The subjects page. */
const Page = async (): Promise<JSX.Element> => {
  const subjects: SubjectProps[] = await GetSubjects();

  return (
    <Subjects subjects={subjects} />
  )
}

export default Page;
