import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/markdown-renderer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FiArrowLeft } from "react-icons/fi";

export const generateStaticParams = async () => {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  const url = `https://s4gor.exeebit.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ['Software Development', 'Tutorial', 'React', 'Next.js', 'Web Dev', 'Tech Blog'],
    authors: [{ name: 'Emran Hossain Sagor' }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: url,
      authors: ['Emran Hossain Sagor'],
      publishedTime: new Date(post.date).toISOString(),
      ...(post.featuredImage && {
        images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(post.featuredImage && { images: [post.featuredImage] }),
    },
  };
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params correctly for Next.js 15
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto py-12 px-6 lg:px-0">
      <div className="mb-8">
        <Link
          href="/#blog"
          className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
        >
          <FiArrowLeft className="mr-2" /> Back to home
        </Link>
        <div className="text-sm font-medium text-sky-600 mb-3">{date}</div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
      </div>

      {post.featuredImage && (
        <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <MarkdownRenderer content={post.content} />
    </article>
  );
}
