
"use client";

// React + Next
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Internal
import styles from './page.module.scss';
import { weekDays } from './config';
import { DayPicker } from './_components/DayPicker';

const getCurrentWeekDay = (): string => {
  const today = new Date();
  const currentDayIndex = today.getDate() < 5 ? today.getDate() : 0;

  return weekDays.at(currentDayIndex)!;
}

export const Schedule = (): JSX.Element => {
  return (
    <>
      <DayPicker />
      <p>hello my lil' schedule</p>
    </>
  )
}
