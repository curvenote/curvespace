import classNames from 'classnames';
import React, { useContext } from 'react';
import { NavLink, useParams, useLocation } from 'remix';
import { getFolderPages, Heading } from '~/utils';
import { useConfig } from './ConfigProvider';
import { CreatedInCurvenote } from './curvenote';
import { UiContext } from './UiStateProvider';

type Props = {
  headings: Heading[];
};

const HeadingLink = ({
  slug,
  isIndex,
  children,
}: {
  slug: string;
  isIndex?: boolean;
  children: React.ReactNode;
}) => {
  const { pathname } = useLocation();
  const exact = pathname === slug;
  return (
    <NavLink
      prefetch="intent"
      className={({ isActive }) =>
        classNames('block', {
          'text-blue-500': !isIndex && isActive,
          'font-semibold': isActive,
          'hover:text-slate-800 dark:hover:text-slate-100': !isActive,
          'border-b pb-1': isIndex,
          'border-stone-200 dark:border-stone-700': isIndex && !exact,
          'border-blue-500': isIndex && exact,
        })
      }
      to={slug}
      suppressHydrationWarning
    >
      {children}
    </NavLink>
  );
};

const Headings = ({ headings }: Props) => (
  <ul className="text-slate-500 dark:text-slate-300 leading-6">
    {headings.map((heading, index) => (
      <li
        key={heading.slug || index}
        className={classNames('p-1', {
          'text-slate-900 font-semibold mb-4 text-lg leading-6 dark:text-slate-100':
            heading.level === 'index',
          'pl-4': heading.level === 2,
          'pl-6': heading.level === 3,
          'pl-8': heading.level === 4,
          'pl-10': heading.level === 5,
          'pl-12': heading.level === 6,
        })}
      >
        {heading.slug ? (
          <HeadingLink slug={heading.slug} isIndex={heading.level === 'index'}>
            {heading.title}
          </HeadingLink>
        ) : (
          <h5 className="text-slate-900 font-semibold my-2 text-md leading-6 dark:text-slate-100">
            {heading.title}
          </h5>
        )}
      </li>
    ))}
  </ul>
);

export const Navigation = () => {
  const config = useConfig();
  const { folder: folderName } = useParams();
  const headings = getFolderPages(config, folderName);
  const [{ isNavOpen }] = useContext(UiContext);
  if (!headings) return null;
  return (
    <div
      className={classNames(
        'fixed bg-white z-20 top-[60px] bottom-0 left-[max(0px,calc(50%-45rem))] w-[19.5rem] border-r border-stone-200 dark:border-stone-700',
        {
          ['flex flex-col']: isNavOpen,
          ['hidden xl:flex']: !isNavOpen,
        },
      )}
    >
      <nav
        aria-label="Navigation"
        className="flex-grow pt-10 pb-3 px-8 overflow-y-auto"
      >
        <Headings headings={headings} />
      </nav>
      <div className="flex-none py-4">
        <CreatedInCurvenote />
      </div>
    </div>
  );
};
