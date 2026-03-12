"use client";

import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);

// We need to require the style inline or also dynamically load it, but usually importing the style works.
// However, to be safe from CJS/ESM errors, we can use the default lighter export.
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral prose-lg md:prose-xl max-w-none prose-headings:font-semibold prose-a:text-sky-600 hover:prose-a:text-sky-700 leading-relaxed text-[15px] sm:text-base">
      <ReactMarkdown
        components={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div className="my-8 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-2xl ring-1 ring-white/10">
                <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
                  <div className="flex gap-1.5 flex-1">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 font-mono tracking-wider flex-1 text-center uppercase">
                    {match[1]}
                  </span>
                  <div className="flex-1" />
                </div>
                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: "1.25rem", background: "transparent", fontSize: "14px", lineHeight: "1.6" }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className={`${className} bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded-md text-[0.9em] font-medium before:hidden after:hidden`}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
