import { DocumentOutline } from '~/components';
import { LinksFunction } from '@remix-run/node';
import { Outlet, useCatch } from '@remix-run/react';
import { ErrorArticleNotFound } from '~/components/ErrorArticleNotFound';
import extraStyles from '~/styles/content.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: extraStyles }];
};

export default function Folder() {
  return (
    <article>
      <main className="article-content">
        <Outlet />
      </main>
      <DocumentOutline />
    </article>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="mt-16">
      <main className="error-content">
        <ErrorArticleNotFound />
      </main>
    </div>
  );
}
