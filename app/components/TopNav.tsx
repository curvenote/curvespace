import { Link, NavLink } from 'remix';
import { ThemeButton } from './ThemeButton';
import { getFolder } from '~/utils';
import classNames from 'classnames';
import { useConfig } from './ConfigProvider';
import { Fragment, useContext } from 'react';
import { UiContext } from './UiStateProvider';
import { Menu, Transition } from '@headlessui/react';

export function TopNav() {
  const config = useConfig();
  const [state, setState] = useContext(UiContext);
  const { logo, logoText, sections, actions, name } = config?.site ?? {};
  console.log('actions', actions);
  return (
    <div className="bg-stone-700 p-3 px-8 fixed w-screen top-0 z-30">
      <nav className="flex items-center justify-between flex-wrap max-w-[1440px] mx-auto">
        <div className="flex flex-row xl:min-w-[19.5rem] mr-7 justify-start items-center">
          <div className="block xl:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-stone-200 border-stone-400 hover:text-white hover:border-white"
              onClick={() => {
                setState({ isNavOpen: !state.isNavOpen });
              }}
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <Link
            className="flex items-center text-white w-fit ml-7"
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
              <span className="text-xl tracking-tight mr-5">{logoText}</span>
            )}
          </Link>
        </div>
        <div className="block xl:hidden">
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="bg-transparent flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <div className="flex items-center px-3 py-2 text-stone-200 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
        </div>

        <div className="hidden flex-grow xl:flex items-center w-auto">
          <div className="text-md flex-grow">
            {sections?.map((sec) => {
              const folder = getFolder(config, sec.folder);
              if (!folder)
                return <div key={sec.folder}>Didn't find folder: {sec.folder}</div>;
              return (
                <NavLink
                  key={sec.folder}
                  prefetch="intent"
                  to={`/${sec.folder}`}
                  className={({ isActive }) =>
                    classNames(
                      'inline-block mt-0 text-stone-200 hover:text-white mr-4 py-1',
                      {
                        'border-b border-stone-200': isActive,
                      },
                    )
                  }
                >
                  {sec.title}
                </NavLink>
              );
            })}
          </div>
          <ThemeButton />
          <div>
            {actions?.map((action, index) => (
              <a
                key={action.url || index}
                className="inline-block text-md px-4 py-2 mx-1 leading-none border rounded text-white border-white hover:border-transparent hover:text-stone-500 hover:bg-white mt-0"
                href={action.url}
                target={action.url?.startsWith('http') ? '_blank' : undefined}
              >
                {action.title}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
