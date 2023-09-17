'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export enum StatusLevel {
  Success = 'Success',
  Error = 'Error',
  Warn = 'Varning',
}

interface Status {
  level: StatusLevel;
  message: string;
}

const statusClasses = {
  [StatusLevel.Success]:
    'bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400',
  [StatusLevel.Error]:
    'bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400',
  [StatusLevel.Warn]:
    'bg-yellow-50 text-yellow-800 dark:bg-gray-800 dark:text-yellow-300',
};

interface StatusContext {
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}

const StatusContext = createContext<StatusContext>({
  setStatus: () => {},
});

const STATUS_DURATION = 5000; // 5 seconds

export default function StatusContextProvider({
  children,
}: React.PropsWithChildren) {
  const [status, setStatus] = useState<Status>({
    message: '',
    level: StatusLevel.Success,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!status.message) {
      return;
    }
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
    }, STATUS_DURATION);
    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  function handleClose() {
    setVisible(false);
  }

  return (
    <StatusContext.Provider value={{ setStatus }}>
      {children}
      <div
        className={`fixed bottom-10 left-0 right-0 mx-auto flex w-80 items-center gap-2 rounded-lg p-4 text-sm transition-opacity duration-500 ${
          statusClasses[status?.level ?? StatusLevel.Success]
        } ${visible ? 'opacity-100' : `opacity-0`}`}
        role="alert"
      >
        <div>{status?.level}</div>
        <div className="flex-1">{status?.message}</div>
        <button onClick={handleClose}>❌</button>
      </div>
    </StatusContext.Provider>
  );
}

export function useStatus() {
  return useContext(StatusContext);
}
