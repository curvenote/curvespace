import classNames from 'classnames';
import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ReactReduxContextValue } from 'react-redux';
import useWindowSize, { useHeightObserver } from './hooks';

type Props = {
  children?: React.ReactNode;
  allSafe?: boolean;
  hasError?: boolean;
  className?: string;
};

const HEIGHT_LIMIT = 600;

export function OutputBlock({ children, allSafe, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const height = useHeightObserver(ref);
  const [showClamp, setShowClamp] = useState<boolean>();

  useEffect(() => {
    if (height > HEIGHT_LIMIT) setShowClamp(true);
  }, [height]);

  return (
    <div className="relative">
      height: {height}
      <div className="absolute z-10 w-[20px] h-[20px] -t-2 -left-1 bg-green-100"></div>
      <div
        suppressHydrationWarning={!allSafe}
        className={classNames(
          'relative group not-prose overflow-auto mb-4 pl-0.5',
          'border border-white transition-colors duration-500 dark:border-stone-900 hover:border-stone-500',
          className,
        )}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
