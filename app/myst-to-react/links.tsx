import { Link } from 'myst-spec';
import { NodeRenderer } from '~/myst-to-react';
import { Link as RemixLink } from 'remix';
import classNames from 'classnames';
import { ExternalLinkIcon, LinkIcon } from '@heroicons/react/outline';

type TransformedLink = Link & { internal?: boolean };

export const link: NodeRenderer<TransformedLink> = (node, children) => {
  const internal = node.internal ?? false;
  if (internal) {
    return (
      <RemixLink key={node.key} to={node.url} prefetch="intent">
        {children}
      </RemixLink>
    );
  }
  return (
    <a key={node.key} target="_blank" href={node.url}>
      {children}
    </a>
  );
};

export const linkBlock: NodeRenderer<TransformedLink> = (node, children) => {
  const iconClass = 'h-8 w-8 inline-block pl-2 mr-2 -translate-y-[1px]';
  const internal = node.internal ?? false;
  const nested = (
    <aside
      key={node.key}
      className={classNames(
        'admonition rounded-md my-4 border-l-4 shadow-md dark:shadow-2xl dark:shadow-neutral-900 overflow-hidden border-blue-500',
      )}
    >
      <div className="px-4 py-1 bg-gray-50 dark:bg-stone-800">
        {internal && <LinkIcon className={iconClass} />}
        {!internal && <ExternalLinkIcon className={iconClass} />}
        {children}
      </div>
    </aside>
  );

  if (internal) {
    return (
      <RemixLink key={node.key} to={node.url} prefetch="intent">
        {nested}
      </RemixLink>
    );
  }
  return (
    <a key={node.key} target="_blank" href={node.url}>
      {nested}
    </a>
  );
};

const LINK_RENDERERS = {
  link,
  linkBlock,
};

export default LINK_RENDERERS;
