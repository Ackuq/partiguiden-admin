'use client';

import { PAGES } from '@lib/navigation';
import { useRouter, useSearchParams } from 'next/navigation';

const HIDE_CATEGORIZED_SEARCH_PARAM = 'hide-categorized';

export default function CategorizedFilterCheck() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      router.push(
        `${PAGES.standpoints.href}?${HIDE_CATEGORIZED_SEARCH_PARAM}=true`
      );
    } else {
      router.push(PAGES.standpoints.href);
    }
  }

  return (
    <div className="mb-4 ml-3 inline-flex items-center">
      <input
        id="categorized-filter"
        type="checkbox"
        className="h-4 w-4"
        defaultChecked={
          searchParams.get(HIDE_CATEGORIZED_SEARCH_PARAM) === 'true'
        }
        onChange={handleChange}
      />
      <label
        htmlFor="categorized-filter"
        className="ml-2 text-sm font-medium text-black dark:text-white"
      >
        Visa bara okategoriserade
      </label>
    </div>
  );
}
