import { Outlet } from '@remix-run/react';
import { LinksFunction } from '@remix-run/react/routeModules';
import { DocumentOutline } from '~/components';
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
