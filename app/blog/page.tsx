import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowLeft, Calendar} from 'lucide-react';
import {getBlogPosts, BlogPostData} from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Archive | Emran Hossain Sagor',
  description: 'A comprehensive collection of tutorials, thoughts, and stories about Software Development, Next.js, React, and more by Emran Hossain Sagor.',
  openGraph: {
    title: 'Blog Archive | Emran Hossain Sagor',
    description: 'A comprehensive collection of tutorials, thoughts, and stories about Software Development, Next.js, React, and more by Emran Hossain Sagor.',
    url: 'https://s4gor.exeebit.com/blog',
    siteName: 'Emran Hossain Sagor',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://s4gor.exeebit.com/blog',
  }
};

// Reusing same BlogCard design from homepage
function BlogCard({ post }: { post: BlogPostData }) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:border-neutral-300 hover:-translate-y-1"
    >
      {post.featuredImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <Calendar className="size-4" />
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        
        <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-neutral-600 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default async function BlogArchivePage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl py-12 container">
        <div className="mb-12">
          <Link 
            href="/#blog" 
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl mb-4">
            Blog Archive
          </h1>
          <p className="text-lg text-neutral-500">
            A comprehensive list of all {posts.length} published articles and tutorials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post: BlogPostData) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
