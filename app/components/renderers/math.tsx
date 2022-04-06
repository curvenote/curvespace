import { NodeRenderer } from 'myst-util-to-react';
import classNames from 'classnames';

// function Math({ value, html }: { value: string; html: string }) {
//   const [loaded, setLoaded] = useState(false);
//   const ref = useRef<HTMLDivElement | null>(null);
//   useEffect(() => {
//     import('katex').then(() => {
//       setLoaded(true);
//     });
//   }, []);
//   useEffect(() => {
//     if (!loaded) return;
//     import('katex').then(({ default: katex }) => {
//       if (!ref.current) return;
//       katex.render(value, ref.current, { displayMode: true });
//     });
//   }, [loaded, ref]);
//   return (
//     <>
//       {(typeof document === 'undefined' || !loaded) && (
//         <div dangerouslySetInnerHTML={{ __html: html }} />
//       )}
//       {loaded && <div ref={ref} />}
//     </>
//   );
// }

const mathBlock =
  (displayMode: boolean): NodeRenderer =>
  (node) => {
    if (displayMode) {
      return (
        <div
          className={classNames('relative', { 'mr-[25px]': node.numbered })}
          key={node.key}
        >
          <div
            dangerouslySetInnerHTML={{ __html: node.html }}
            className="overflow-x-auto"
          />
          {node.numbered && (
            <div className="absolute right-[-25px] m-0 top-[50%] translate-y-[-50%]">
              ({node.number})
            </div>
          )}
        </div>
      );
    }
    return <span key={node.key} dangerouslySetInnerHTML={{ __html: node.html }} />;
    // return <Math key={node.key} html={node.html} value={node.value as string} />;
  };

export const mathRenderers = {
  math: mathBlock(true),
  inlineMath: mathBlock(false),
};
