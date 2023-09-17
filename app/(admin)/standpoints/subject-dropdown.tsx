'use client';

import type { Standpoint } from '@prisma/client';
import type { SubjectWithName } from './prisma';
import { StatusLevel, useStatus } from '@app/(status)/status-context';
import updateSubject from './actions/update-subject';
import { useEffect, useState } from 'react';

interface SubjectDropdownProps {
  standpoint: Standpoint;
  subjects: SubjectWithName[];
}

export default function SubjectDropdown({
  standpoint,
  subjects,
}: SubjectDropdownProps) {
  const { setStatus } = useStatus();
  const [key, setKey] = useState(0);
  async function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSubject = event.target.value;
    const error = await updateSubject(standpoint, newSubject);
    if (error) {
      setStatus({
        message: error.message,
        level: StatusLevel.Error,
      });
    } else {
      setStatus({
        message: 'Lyckades uppatera ståndpunkt',
        level: StatusLevel.Success,
      });
    }
  }

  useEffect(() => {
    setKey((prevState) => prevState + 1);
  }, [standpoint]);

  return (
    <select
      key={key}
      onChange={onChange}
      className="w-full appearance-none rounded border text-gray-700 shadow"
      defaultValue={standpoint.subjectName ?? ''}
    >
      <option disabled value="">
        -- Välj ett sakområde --
      </option>
      {subjects.map((subject) => (
        <option key={subject.name} value={subject.name}>
          {subject.name}
        </option>
      ))}
    </select>
  );
}
