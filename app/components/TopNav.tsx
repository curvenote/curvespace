import { Link, NavLink } from 'remix';
import { ThemeButton } from './ThemeButton';
import { getFolder } from '~/utils';
import classNames from 'classnames';
import { useConfig } from './ConfigProvider';
import { useContext } from 'react';
import { UiContext } from './UiStateProvider';

export function TopNav() {
  const config = useConfig();
  const [state, setState] = useContext(UiContext);
  const { logo, logoText, sections, actions, name } = config?.site ?? {};
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
          <button className="flex items-center px-3 py-2 text-stone-200 hover:text-white">
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
          </button>
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
