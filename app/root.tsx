import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { LoaderFunction } from '@remix-run/node';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react';

import React from 'react';
import { Theme, ThemeProvider } from '~/components';
import { Navigation } from './components/Navigation';
import { getThemeSession } from '~/utils/theme.server';
import tailwind from './styles/app.css';
import { getMetaTagsForSite, getConfig, SiteManifest } from './utils';
import { ConfigProvider } from './components/ConfigProvider';
import { UiStateProvider } from './components/UiStateProvider';
import { Analytics } from './components/analytics';
import { ErrorSiteExpired } from './components/ErrorSiteExpired';
import { ErrorSiteNotFound } from './components/ErrorSiteNotFound';
import { responseNoSite } from './utils/response.server';

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
  if (!config) throw responseNoSite(request.url);
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
        <main className="error-content">
          {isLaunchpad && <ErrorSiteExpired />}
          {!isLaunchpad && <ErrorSiteNotFound url={url?.toString() ?? ''} />}
        </main>
      </article>
    </Document>
  );
}

export function ErrorBoundary({
  error,
}: {
  error: { message: string; stack: string };
}) {
  return (
    <Document theme={Theme.light} title="Error">
      <div className="mt-16">
        <main className="error-content">
          <h1>An Error Occurred</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </main>
      </div>
    </Document>
  );
}
