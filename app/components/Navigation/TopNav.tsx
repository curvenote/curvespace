import { Link, NavLink, useTransition } from 'remix';
import { Fragment, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Menu, Transition } from '@headlessui/react';
import DotsVerticalIcon from '@heroicons/react/solid/DotsVerticalIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import { Config, getFolder } from '~/utils';
import { ThemeButton } from '../ThemeButton';
import { useConfig } from '../ConfigProvider';
import { useNavOpen } from '../UiStateProvider';
import { ChevronDownIcon } from '@heroicons/react/solid';

function ActionMenu({ actions }: { actions?: Config['site']['actions'] }) {
  if (!actions || actions.length === 0) return null;
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="bg-transparent flex text-sm rounded-full focus:outline-none">
          <span className="sr-only">Open Menu</span>
          <div className="flex items-center text-stone-200 hover:text-white">
            <DotsVerticalIcon className="h-8 w-8 p-1" />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-sm shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {actions?.map((action) => (
            <Menu.Item key={action.url}>
              {({ active }) => (
                <a
                  href={action.url}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  )}
                >
                  {action.title}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

/**
 * Show a loading progess bad if the load takes more than 150ms
 */
function useLoading() {
  const transitionState = useTransition().state;
  const ref = useMemo<{ start?: NodeJS.Timeout; finish?: NodeJS.Timeout }>(
    () => ({}),
    [],
  );
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (transitionState === 'loading') {
      ref.start = setTimeout(() => {
        setShowLoading(true);
      }, 150);
    } else {
      if (ref.start) {
        // We have stoped loading in <150ms
        clearTimeout(ref.start);
        delete ref.start;
        setShowLoading(false);
        return;
      }
      ref.finish = setTimeout(() => {
        setShowLoading(false);
      }, 150);
    }
    return () => {
      if (ref.start) {
        clearTimeout(ref.start);
        delete ref.start;
      }
      if (ref.finish) {
        clearTimeout(ref.finish);
        delete ref.finish;
      }
    };
  }, [transitionState]);

  return { showLoading, isLoading: transitionState === 'loading' };
}

interface NavItemState {
  title: string;
  folder: string;
  children?: NavItemState[];
}

function NavItem({ item }: { item: NavItemState }) {
  const isActive = false;
  if (!item.children) {
    return (
      <div className="relative grow-0 inline-block">
        <NavLink
          key={item.folder}
          prefetch="intent"
          to={`/${item.folder}`}
          className={({ isActive }) =>
            classNames(
              'inline-flex items-center justify-center w-full px-4 py-2 text-md font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
              {
                'border-b border-stone-200': isActive,
              },
            )
          }
        >
          {item.title}
        </NavLink>
      </div>
    );
  }
  return (
    <Menu as="div" className="relative grow-0 inline-block">
      <div className="inline-block">
        <Menu.Button
          className={classNames(
            'inline-flex items-center justify-center w-full px-4 py-2 text-md font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
            {
              'border-b border-stone-200': isActive,
            },
          )}
        >
          <span>{item.title}</span>
          <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-sm shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {item.children?.map((action) => (
            <Menu.Item key={action.folder}>
              {({ active }) => (
                <NavLink
                  prefetch="intent"
                  to={`/${action.folder}`}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  )}
                >
                  {action.title}
                </NavLink>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const DUMMY_NAV_ITEMS: NavItemState[] = [
  {
    title: 'First Level Nav',
    folder: 'first-level-nav',
    children: [
      {
        title: 'Nested 1st',
        folder: 'Nested-1st',
      },
      {
        title: 'Nested 2st',
        folder: 'Nested-2st',
      },
      {
        title: 'Nested 3st',
        folder: 'Nested-3st',
      },
    ],
  },
  {
    title: 'Second Item',
    folder: 'second-item',
    children: [
      {
        title: 'Nested 1st',
        folder: 'Nested-1st',
      },
      {
        title: 'Nested 2st',
        folder: 'Nested-2st',
      },
    ],
  },
  {
    title: 'Third Item',
    folder: 'third-item',
  },
];
export function TopNav() {
  const [open, setOpen] = useNavOpen();
  const config = useConfig();
  const { logo, logoText, sections, actions, name } = config?.site ?? {};
  const { isLoading, showLoading } = useLoading();
  console.log('sections', sections);

  return (
    <div className="bg-stone-700 p-3 md:px-8 fixed w-screen top-0 z-30">
      <nav className="flex items-center justify-between flex-wrap max-w-[1440px] mx-auto">
        <div className="flex flex-row xl:min-w-[19.5rem] mr-2 sm:mr-7 justify-start items-center">
          <div className="block xl:hidden">
            <button
              className="flex items-center text-stone-200 border-stone-400 hover:text-white"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <span className="sr-only">Open Menu</span>
              <MenuIcon className="fill-current h-8 w-8 p-1" />
            </button>
          </div>
          <Link
            className="flex items-center text-white w-fit ml-3 md:ml-5 xl:ml-7"
            to="/"
            prefetch="intent"
          >
            <img
              src={logo}
              className="h-9 mr-3"
              alt={logoText || name}
              height="2.25rem"
            ></img>
            {logoText && (
              <span className="text-md sm:text-xl tracking-tight sm:mr-5">
                {logoText}
              </span>
            )}
          </Link>
        </div>
        <div className="flex-grow flex items-center w-auto">
          <div className="text-md flex-grow hidden lg:block">
            {DUMMY_NAV_ITEMS?.map((sec) => {
              // const folder = getFolder(config, sec.folder);
              // if (!folder)
              //   return <div key={sec.folder}>Didn't find folder: {sec.folder}</div>;
              return (
                <NavItem item={sec} key={sec.folder} />
                // <NavLink
                //   key={sec.folder}
                //   prefetch="intent"
                //   to={`/${sec.folder}`}
                //   className={({ isActive }) =>
                //     classNames(
                //       'inline-block mt-0 text-stone-200 hover:text-white mr-4 py-1',
                //       {
                //         'border-b border-stone-200': isActive,
                //       },
                //     )
                //   }
                // >
                //   {sec.title}
                // </NavLink>
              );
            })}
          </div>
          <div className="block flex-grow"></div>
          <ThemeButton />
          <div className="block sm:hidden">
            <ActionMenu actions={actions} />
          </div>
          <div className="hidden sm:block">
            {actions?.map((action, index) => (
              <a
                key={action.url || index}
                className="inline-block text-md px-4 py-2 mx-1 leading-none border rounded text-white border-white hover:border-transparent hover:text-stone-500 hover:bg-white mt-0"
                href={action.url}
                target={
                  action.url?.startsWith('http') || action.static ? '_blank' : undefined
                }
              >
                {action.title}
              </a>
            ))}
          </div>
        </div>
      </nav>
      {showLoading && (
        <div
          className={classNames(
            'w-screen h-[2px] bg-blue-500 absolute left-0 bottom-0 transition-transform',
            {
              'animate-load scale-x-40': isLoading,
              'scale-x-100': !isLoading,
            },
          )}
        />
      )}
    </div>
  );
}
