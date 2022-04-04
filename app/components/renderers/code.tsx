import type { Code } from 'myst-spec';
import { NodeRenderer } from 'myst-util-to-react';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import light from 'react-syntax-highlighter/dist/cjs/styles/hljs/xcode';
import dark from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015';
import { useTheme } from '../theme';
import { useEffect, useRef, useState } from 'react';
import { copyTextToClipboard } from '~/utils';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/outline';
import { DuplicateIcon } from '@heroicons/react/solid';

type Props = {
  children: string;
  lang?: string;
  showLineNumbers?: boolean;
  emphasizeLines?: number[];
};

export function CodeBlock(props: Props) {
  const { isLight } = useTheme();
  const { children, lang, emphasizeLines, showLineNumbers } = props;
  const highlightLines = new Set(emphasizeLines);
  return (
    <SyntaxHighlighter
      language={lang}
      showLineNumbers={showLineNumbers}
      style={isLight ? light : dark}
      wrapLines
      lineNumberContainerStyle={{
        // This stops page content shifts
        display: 'inline-block',
        float: 'left',
        minWidth: '1.25em',
        paddingRight: '1em',
        textAlign: 'right',
        userSelect: 'none',
        borderLeft: '4px solid transparent',
      }}
      lineProps={(line) => {
        if (typeof line === 'boolean') return {};
        return highlightLines.has(line)
          ? ({
              'data-line-number': `${line}`,
              'data-highlight': 'true',
            } as any)
          : ({ 'data-line-number': `${line}` } as any);
      }}
      customStyle={{ padding: '0.8rem' }}
    >
      {children}
    </SyntaxHighlighter>
  );
}

const code: NodeRenderer<Code> = (node: any) => {
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!showCopied) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowCopied(false), 1500);
  }, [showCopied]);

  return (
    <div
      key={node.key}
      className="relative group not-prose rounded shadow-md dark:shadow-2xl dark:shadow-neutral-900 my-8 text-sm border border-l-4 border-l-blue-400 border-gray-200 dark:border-l-blue-400 dark:border-gray-800 overflow-scroll"
    >
      <div className="absolute hidden top-1 right-1 group-hover:block z-10">
        <button
          className={classNames(
            'p-1 cursor-pointer transition-color duration-200 ease-in-out',
            {
              'text-primary-500 border-primary-500': !showCopied,
              'text-success border-success ': showCopied,
            },
          )}
          title={showCopied ? 'Copied' : 'Copy to clipboard'}
          onClick={() => {
            copyTextToClipboard(node.value)
              .then(() => setShowCopied(true))
              .catch(() => {
                console.log('Failed to copy');
              });
          }}
        >
          {showCopied ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <DuplicateIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <CodeBlock
        lang={node.lang}
        emphasizeLines={node.emphasizeLines}
        showLineNumbers={node.showLineNumbers}
      >
        {node.value || ''}
      </CodeBlock>
    </div>
  );
};

export const codeRenderers = {
  code,
};
