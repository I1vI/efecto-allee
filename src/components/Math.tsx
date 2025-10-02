import katex from 'katex';
import 'katex/dist/katex.min.css';

type MathProps = { math: string };

export const InlineMath = ({ math }: MathProps) => {
  const html = katex.renderToString(math, { throwOnError: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export const BlockMath = ({ math }: MathProps) => {
  const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
  return <div className="my-2" dangerouslySetInnerHTML={{ __html: html }} />;
};
