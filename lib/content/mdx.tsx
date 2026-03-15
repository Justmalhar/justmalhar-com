import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: false,
    },
    components: {
      a: (props) => <a {...props} className="text-accent underline underline-offset-4" />,
      strong: (props) => <strong {...props} className="font-semibold text-foreground" />,
      ul: (props) => <ul {...props} className="mb-6 ml-5 list-disc space-y-2 text-muted" />,
      ol: (props) => <ol {...props} className="mb-6 ml-5 list-decimal space-y-2 text-muted" />,
      blockquote: (props) => <blockquote {...props} className="my-8 border-l-2 border-accent pl-5 text-muted italic" />,
      code: (props) => <code {...props} className="rounded bg-card px-1.5 py-0.5 text-[0.9em] text-accent" />,
      pre: (props) => <pre {...props} className="mb-6 overflow-x-auto rounded-2xl border border-border bg-card p-4 text-sm" />,
      hr: (props) => <hr {...props} className="my-10 border-border" />,
    },
  });

  return content;
}
