import { Metadata } from 'next';
import { headers } from "next/headers";

import { GradesComponent } from '@/services/gradebook-service';
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
    title: `Subject <${subjectTitle}> - Book <${bookTitle}> - Silicate`
  }
}

export default async function Page() {
  const { subjectTitle } = getTitles();
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
    <GradesComponent grades={grades} />
  )
}