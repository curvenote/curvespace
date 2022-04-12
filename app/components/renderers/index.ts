import { nodes, NodeRenderer } from 'myst-util-to-react';
import { admonitionRenderers } from './admonitions';
import { citeRenderers } from './cite';
import { footnoteRenderers } from './footnotes';
import { codeRenderers } from './code';
import { mathRenderers } from './math';
import { reactiveRenderers } from './reactive';
import { iframeRenderers } from './iframe';
import { linkRenderers } from './links';
import { outputRenderers } from './output';
import HEADING_RENDERERS from './Heading';

export const defaultRenderers: Record<string, NodeRenderer> = {
  ...nodes,
  ...linkRenderers,
  ...codeRenderers,
  ...mathRenderers,
  ...citeRenderers,
  ...iframeRenderers,
  ...footnoteRenderers,
  ...admonitionRenderers,
  ...reactiveRenderers,
  ...outputRenderers,
  ...HEADING_RENDERERS,
};
