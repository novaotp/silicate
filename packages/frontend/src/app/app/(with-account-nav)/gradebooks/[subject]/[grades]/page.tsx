
// Internal
import { Metadata } from 'next';
import { headers } from "next/headers";

// Internal
import { Grades } from '@components/gradebook';
import { GradeProps } from '@shared/interfaces';

function getTitles() {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  const bookTitle = decodeURIComponent(pathname.split("/").at(-2)!);
  const subjectTitle = decodeURIComponent(pathname.split("/").at(-1)!);

  return {
    bookTitle,
    subjectTitle
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { bookTitle, subjectTitle } = getTitles();

  return {
    title: `Sujet <${subjectTitle}> - Carnet de notes <${bookTitle}> - Silicate`
  }
}

/** The grades page. */
const Page = (): JSX.Element => {
  const grades: GradeProps[] = [
    {
      title: "Examen 1",
      value: "5.5"
    },
    {
      title: "Petite feuille 1",
      value: "6"
    }
  ]; // TODO: await getGrades(subjectTitle);

  return (
    <Grades grades={grades} />
  )
}

export default Page;
