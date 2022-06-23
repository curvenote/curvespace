import { DocumentOutline } from '~/components';
import { LinksFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { ErrorProjectNotFound } from '~/components/ErrorProjectNotFound';
import extraStyles from '~/styles/content.css';
import LaunchpadMessage from '~/components/LaunchpadMessage';

export function loader({ request }: { request: { url: string } }) {
  const url = new URL(request.url);
  return { hostname: url.hostname };
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: extraStyles }];
};

export default function Folder() {
  const { hostname } = useLoaderData();
  return (
    <article>
      <main className="article-content">
        <Outlet />
      </main>
      <DocumentOutline />
      <LaunchpadMessage hostname={hostname} />
    </article>
  );
}

export function CatchBoundary() {
  return (
    <div className="mt-16">
      <main className="error-content">
        <ErrorProjectNotFound />
      </main>
    </div>
  );
}
