'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (label === 'All') {
      router.push('/')
    } else {
      router.push(`/tasks/${label}`)
    }
  }, [router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-1
        hover:-translate-y-0.5
        transition
        cursor-pointer
        w-24
        border-b-2
        my-2
        ${selected ? 'text-neutral-600' : 'text-neutral-600'}
        ${selected ? 'border-neutral-600' : 'border-none'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  );
}

export default CategoryBox;