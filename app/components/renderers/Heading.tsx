import { NodeRenderers } from 'myst-util-to-react';
import React, { useState, createElement as e } from 'react';

const Heading: NodeRenderers['heading'] = (node, children) => {
  // TODO: this should be in css
  const { enumerator, depth, key, identifier } = node;
  const id = identifier || key;
  const [isHover, setHover] = useState(false);
  const textContent = (
    <>
      <a
        className="section-hash"
        href={`#${id}`}
        aria-label="any permalink"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'translateX(-100%)',
          fontWeight: 'normal',
          paddingRight: 4,
          visibility: isHover ? 'visible' : 'hidden',
        }}
      >
        <span>#</span>
      </a>
      {enumerator && (
        <span style={{ userSelect: 'none', marginRight: 4 }}>{enumerator}</span>
      )}
      {children}
    </>
  );
  return e(
    `h${depth}`,
    {
      key: id,
      id,
      style: { position: 'relative' },
      className: 'section-heading',
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
    },
    textContent,
  );
};

const HEADING_RENDERERS = {
  heading: Heading,
};

export default HEADING_RENDERERS;
