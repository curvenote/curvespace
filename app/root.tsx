import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix';
import type { MetaFunction, LinksFunction } from 'remix';
import React from 'react';
import { Theme, ThemeProvider } from '~/components';
import { Navigation } from './components/Navigation';
import { getThemeSession } from '~/utils/theme.server';
import tailwind from './styles/app.css';
import { getMetaTagsForSite, getConfig, SiteManifest } from './utils';
import { ConfigProvider } from './components/ConfigProvider';
import { UiStateProvider } from './components/UiStateProvider';
import { Analytics } from './components/analytics';

export const meta: MetaFunction = ({ data }) => {
  return getMetaTagsForSite({
    title: data?.config?.title,
    twitter: data?.config?.twitter,
  });
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwind }];
};

type DocumentData = {
  theme: Theme;
  config?: SiteManifest;
};

export const loader: LoaderFunction = async ({ request }): Promise<DocumentData> => {
  console.log('root loader');
  const [config, themeSession] = await Promise.all([
    getConfig(request),
    getThemeSession(request),
  ]);
  // if (!config) throw responseNoSite(request.url);
  const data = { theme: themeSession.getTheme(), config };
  return data;
};

function Document({
  children,
  theme,
  config,
  title,
}: {
  children: React.ReactNode;
  theme: Theme;
  config?: SiteManifest;
  title?: string;
}) {
  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title && <title>{title}</title>}
        <Meta />
        <Links />
        <Analytics analytics={config?.analytics} />
      </head>
      <body className="m-0 transition-colors duration-500 bg-white dark:bg-stone-900">
        <UiStateProvider>
          <ThemeProvider theme={theme}>
            <ConfigProvider config={config}>
              <Navigation />
              {children}
            </ConfigProvider>
          </ThemeProvider>
        </UiStateProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const { theme, config } = useLoaderData<DocumentData>();
  return (
    <Document theme={theme} config={config}>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught);
  let isLaunchpad = false;
  let url;
  try {
    url = new URL(caught.data);
    isLaunchpad = url.hostname.startsWith('launchpad-');
    // eslint-disable-next-line no-empty
  } catch (err: any) {}

  return (
    <Document theme={Theme.light} title={caught.statusText}>
      <article>
        <main className="article-content">
          {isLaunchpad && (
            <>
              <h1>This website has expired</h1>
              <p>This website was created more than 5 days ago and has now expired.</p>
              <h3>What's next?</h3>
              <p>
                Create a new temporary website from Markdown and Jupyter Notebooks using{' '}
                <a href="https://try.curvenote.com">try.curvenote.com</a>.
              </p>
              <p>
                Publish a new website with no expiry using Curvenote's open source
                publishing tools -{' '}
                <a href="https://docs.curvenote.com/web">learn how to get started</a>.
              </p>
              <p>
                Find out more about Curvenote&apos;s scientific writing, collaboration
                and publishing tools - visit{' '}
                <a href="https://curvenote.com">curvenote.com</a>.
              </p>
            </>
          )}
          {!isLaunchpad && (
            <>
              <h1>No site at this url</h1>
              <p>No website is available at this url, please double check the url.</p>
              <pre>{url?.toString()}</pre>
              <h3>What's next?</h3>
              <p>
                If you are expecting to see{' '}
                <span className="font-semibold">your website</span> here and you think
                that something has gone wrong, please send an email to{' '}
                <a
                  href={`mailto:support@curvenote.com?subject=Website%20Unavailable&body=${encodeURIComponent(
                    `My website is deployed a ${url?.toString()}, but is not available. 😥`,
                  )}`}
                >
                  support@curvenote.com
                </a>
                , or{' '}
                <a href="https://slack.curvenote.dev">
                  let us know on our community slack
                </a>
                , and we'll help out.
              </p>
              <p>
                Or create a new temporary website from Markdown and Jupyter Notebooks
                using <a href="https://try.curvenote.com">try.curvenote.com</a>.
              </p>
              <p>
                Or find out more about Curvenote&apos;s scientific writing,
                collaboration and publishing tools at{' '}
                <a href="https://curvenote.com">curvenote.com</a>.
              </p>
            </>
          )}
        </main>
      </article>
    </Document>
  );
}

export function ErrorBoundary() {
  return (
    <Document theme={Theme.light} title="Page Not Found">
      <div className="mt-16">
        <main className="article-content">
          <h1>Error Boundary</h1>
        </main>
      </div>
    </Document>
  );
}
