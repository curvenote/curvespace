import classNames from 'classnames';
import { useRef, useState } from 'react';
import ChevronDoubleDown from '~/components/Icons/ChevronDoubleDown';
import ChevronDoubleUp from '~/components/Icons/ChevronDoubleUp';
import { useHeightObserver } from './hooks';

type Props = {
  children?: React.ReactNode;
  allSafe?: boolean;
  hasError?: boolean;
  className?: string;
};

const HEIGHT_LIMIT = 400;

export function OutputBlock({ children, allSafe, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const height = useHeightObserver(ref);
  const [clamped, setClamped] = useState<boolean>();

  const canClamp = clamped || height > HEIGHT_LIMIT;
  const maxHeight = clamped ? 'max-h-[300px]' : '';

  return (
    <div className="relative group">
      <div
        title={`click to ${clamped ? 'expand' : 'collapse'}`}
        className={classNames(
          'absolute z-10 w-[28px] t-0 -left-[28px] h-full cursor-pointer',
          'border border-transparent transition-colors duration-500',
          'group-hover:bg-stone-50 group-hover:border-stone-100',
          'flex flex-col justify-center',
          { hidden: !canClamp },
        )}
        onClick={() => setClamped(!clamped)}
      >
        <span className="opacity-20 group-hover:opacity-50 transition-opacity duration-500">
          {clamped ? <ChevronDoubleDown /> : <ChevronDoubleUp />}
        </span>
      </div>
      <div
        suppressHydrationWarning={!allSafe}
        className={classNames(
          'relative group not-prose overflow-auto mb-4 pl-0.5',
          'transition-colors duration-500 z-10',
          className,
          maxHeight,
        )}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
