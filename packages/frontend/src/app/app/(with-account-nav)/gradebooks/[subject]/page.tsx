
// Next
import { Metadata } from 'next';
import { headers } from "next/headers";

// Internal
import { Subjects } from '@components/gradebook';
import { SubjectProps } from '@shared/interfaces';

function getTitle(): string {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const title = decodeURIComponent(pathname.split("/").at(-1)!);

  return title;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = getTitle();

  return {
    title: `Book <${title}> - Silicate`
  }
}

/** The subjects page. */
const Page = (): JSX.Element => {
  const subjects: SubjectProps[] = [
      { name: "Maths" },
      { name: "Allemand" },
      { name: "Français" },
      { name: "Économie" },
      { name: "Histoire" }
  ]; // TODO: await getSubjects(bookTitle);

  return (
    <Subjects subjects={subjects} />
  )
}

export default Page;
