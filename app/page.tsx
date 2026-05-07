import Avatar from "@/components/avatar";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import {
  SiGithub, SiLinkedin, SiX, SiStackoverflow,
  SiCplusplus, SiJavascript, SiRust, SiPython, SiPhp, SiGo, SiC,
  SiReact, SiNextdotjs, SiVuedotjs, SiRemix,
  SiNodedotjs, SiDeno, SiDjango, SiLaravel, SiFastapi, SiNestjs,
  SiShopify, SiWordpress, SiNeovim, SiDocker, SiGit, SiPostgresql, SiLinux, SiApple,
  SiNpm, SiGooglechrome
} from "react-icons/si";
import { FiArrowUpRight } from "react-icons/fi";
import Typewriter from "@/components/typewriter";
import PinnedRepo from "@/components/pinned-repo";
import GitHubActivity from "@/components/github-activity";


import { getBlogPosts, BlogPostData } from "@/lib/blog";

async function getRepoStats(owner: string, repo: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) return { stargazers_count: 0, forks_count: 0 };
    return await res.json();
  } catch {
    return { stargazers_count: 0, forks_count: 0 };
  }
}

export default async function Home() {
  const relyStats = await getRepoStats('exeebit', 'rely');
  const pyDataCloakStats = await getRepoStats('s4gor', 'py-data-cloak');
  const allPosts = getBlogPosts();
  const posts = allPosts.slice(0, 3); // Get latest 3 posts

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emran Hossain Sagor',
    url: 'https://s4gor.exeebit.com',
    sameAs: [
      'https://github.com/s4gor',
      'https://www.linkedin.com/in/emr4ns4gor/',
      'https://twitter.com/emr4ns4gor/',
      'https://stackoverflow.com/users/13526420/emran-hossain-sagor/'
    ],
    jobTitle: 'Software Developer'
  }

  return (
    <main className="flex flex-col scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section id="home" className="flex flex-col gap-6 scroll-mt-24 pt-8 lg:pt-12">
        <div className="flex items-center gap-4">
          <Avatar />
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl min-h-[48px]">
              <Typewriter text={['Emran Sagor', 's4gor']} />
            </h1>
            <p className="text-neutral-500 font-medium lg:mt-2">Software Developer</p>
          </div>
        </div>

        <div className="prose prose-neutral max-w-none">
          <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
            Hello! 👋 I&apos;m a passionate developer building software.
            Currently, I&apos;m working as a freelance developer, building independent projects, and{' '}
            <span className='font-medium text-neutral-900'>exploring new opportunities</span>.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <SocialLink href="https://github.com/s4gor" icon={<SiGithub className="text-neutral-900" />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/emr4ns4gor/" icon={<SiLinkedin className="text-[#0a66c2]" />} label="LinkedIn" />
          <SocialLink href="https://twitter.com/emr4ns4gor/" icon={<SiX className="text-black" />} label="X (Twitter)" />
          <SocialLink href="https://stackoverflow.com/users/13526420/emran-hossain-sagor/" icon={<SiStackoverflow className="text-[#ef8236]" />} label="StackOverflow" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:mt-6 mt-3">
          <PinnedRepo
            name="rely"
            description="A lightweight, durable execution engine for Go that allows workflows to survive crashes."
            language="Go"
            languageColor="#00ADD8"
            stars={relyStats.stargazers_count}
            forks={relyStats.forks_count}
            href="https://github.com/exeebit/rely"
          />
          <PinnedRepo
            name="py-data-cloak"
            description="A robust data anonymization and sanitization tool for CLI and Django applications."
            language="Python"
            languageColor="#3572A5"
            stars={pyDataCloakStats.stargazers_count}
            forks={pyDataCloakStats.forks_count}
            href="https://github.com/exeebit/py-data-cloak"
          />
        </div>

        <div className="flex flex-col gap-4 lg:mt-6 mt-3">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Contribution Timeline</h2>
          <GitHubActivity />
        </div>
      </section>

      {/* OSS Section */}
      <section id="oss" className="flex flex-col gap-12 scroll-mt-24 pt-14">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Open Source Software
          </h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl">
              I believe in the power of open source. Here are some of the tools and libraries I&apos;ve contributed to the community, used by thousands of developers worldwide.
            </p>
          </div>
        </div>



        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <OssCard
            href="https://wordpress.org/plugins/phpinfo-wp/"
            icon={<SiWordpress className="text-[#21759B]" />}
            title="phpinfo WP"
            type="WordPress Plugin"
            stats="3,000+ active installations"
            desc="A simple WordPress plugin to look up information about server and PHP configuration, and manage server settings easily."
          />
          <OssCard
            href="https://pkg.go.dev/github.com/exeebit/rely"
            icon={<SiGo className="text-[#00ADD8]" />}
            title="rely"
            type="Go Package"
            desc="A lightweight, durable execution engine for Go that allows workflows to survive crashes and restarts by replaying history."
          />
          <OssCard
            href="https://crates.io/crates/schema-sync"
            icon={<SiRust className="text-[#000000]" />}
            title="schema-sync"
            type="Rust Package"
            desc="Production-grade schema synchronization for multi-tenant databases in Rust."
          />
          <OssCard
            href="https://chromewebstore.google.com/detail/history-data-manager/ojfodlmekhaaekmgondhfaonpigdfjik"
            icon={<SiGooglechrome className="text-[#4285F4]" />}
            title="History & Data Manager"
            type="Chrome Extension"
            desc="Manage your browsing history and data in bulk - delete by website, specific URL patterns, or custom time ranges."
          />
          <OssCard
            href="https://pypi.org/project/py-data-cloak/"
            icon={<SiPython className="text-[#3776AB]" />}
            title="py-data-cloak"
            type="Python Package"
            desc="A robust data anonymization and sanitization tool for CLI and Django applications to secure sensitive information."
          />
          <OssCard
            href="https://www.npmjs.com/package/saas-prorate"
            icon={<SiNpm className="text-[#CB3837]" />}
            title="saas-prorate"
            type="NPM Package"
            desc="A utility library for calculating prorated SaaS subscription charges with precision and ease."
          />
          <OssCard
            href="https://pypi.org/project/birth-teller/"
            icon={<SiPython className="text-[#3776AB]" />}
            title="birth-teller"
            type="Python Package"
            desc="A lightweight Python library and CLI tool that calculates your age, birthday details, and the day of the week you were born."
          />
          <OssCard
            href="https://wordpress.org/plugins/disable-auto-updates/"
            icon={<SiWordpress className="text-[#21759B]" />}
            title="Disable Auto Updates"
            type="WordPress Plugin"
            desc="A simple utility plugin that allows you to easily disable all kinds of WordPress automatic updates with a single click."
          />
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="projects" className="flex flex-col gap-10 scroll-mt-24 pt-14">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Featured Work
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl">
            SaaS products I&apos;ve architected and shipped end-to-end — from concept to production.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {/* Mimonous */}
          <div className="group relative rounded-3xl overflow-hidden border border-neutral-200 bg-gradient-to-br from-violet-50/60 via-white to-sky-50/40 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-0">
              {/* Browser Mockup + metrics below */}
              <div className="relative p-4 md:p-6 flex flex-col gap-3">
                <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-neutral-800 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="bg-neutral-700 rounded-md px-3 py-1 text-xs text-neutral-400 font-mono">mimonous.com</div>
                    </div>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <Image src="/mimonous.png" alt="Mimonous — Invoicing SaaS" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>

                {/* Stats mini-grid */}
                <div className="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-white/80 border border-neutral-100">
                  {[
                    { value: "15+", label: "Active Users" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "3 Apps", label: "Platforms" },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <div className="text-sm font-bold text-neutral-900">{s.value}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Platform chips */}
                <div className="flex m-auto items-center gap-4 px-1">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500"><SiApple className="size-3.5" /><span>iOS</span></div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500"><span>🤖</span><span>Android</span></div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500"><span>🌐</span><span>Web</span></div>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between p-8 lg:p-10">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">Sole Developer</span>
                    <span className="text-xs text-neutral-400 font-medium">SaaS · Commercial</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">Mimonous</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      An invoicing and business management SaaS for small teams and freelancers. Built the full platform — multi-currency invoicing, client portal, and payment tracking — from scratch to production.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Laravel", "React Native", "Laravel Reverb", "PostgreSQL", "Redis", "DigitalOcean"].map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/80 border border-neutral-200 text-neutral-600">{tag}</span>
                    ))}
                  </div>
                </div>
                <Link href="https://mimonous.com" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-sky-600 transition-colors">
                  Visit Mimonous <FiArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Zeitproof */}
          <div className="group relative rounded-3xl overflow-hidden border border-neutral-200 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/40 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="grid md:grid-cols-[1fr_1.1fr] gap-0">
              {/* Info */}
              <div className="flex flex-col justify-between p-8 lg:p-10">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />In Development
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">Sole Developer</span>
                    <span className="text-xs text-neutral-400 font-medium">SaaS · German Market</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">Zeitproof</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      A compliance SaaS protecting German workers in labour disputes. Generates tamper-proof, court-admissible digital work records — so when clients deny hours worked, employees have ironclad legal proof under ArbZG.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Django", "PDF Generation", "Digital Signatures", "ArbZG"].map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/80 border border-neutral-200 text-neutral-600">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 cursor-default select-none">Not publicly available</span>
              </div>

              {/* Browser Mockup + metrics below */}
              <div className="relative p-4 md:p-6 flex flex-col gap-3">
                <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-[#1a1b23] border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="bg-[#2d2e3b] rounded-md px-3 py-1 text-xs text-neutral-500 font-mono">app.zeitproof.com</div>
                    </div>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0d1117]">
                    <Image src="/zeitproof.png" alt="Zeitproof — Work verification system" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>

                {/* Stats mini-grid */}
                <div className="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-white/80 border border-neutral-100">
                  {[
                    { value: "ArbZG", label: "Compliant" },
                    { value: "< 2s", label: "PDF Export" },
                    { value: "0%", label: "Dispute Rate" },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <div className="text-sm font-bold text-neutral-900">{s.value}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Platform chips */}
                <div className="flex m-auto items-center gap-4 px-1">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500"><SiApple className="size-3.5" /><span>iOS</span></div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500"><span>🤖</span><span>Android</span></div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500"><span>🌐</span><span>Web</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Other Projects Section */}
      <section className="flex flex-col gap-8 pt-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Other Projects
          </h2>
          <p className="text-lg text-neutral-500">
            Here are some of the projects I&apos;ve worked on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            href="https://space-registry.org/"
            src="/images/isr.png"
            alt="Universe Star Finder 3D"
            title="Universe Star Finder 3D"
            meta={[
              { label: "Platform", value: "Android & iOS" },
              { label: "Framework", value: "Qt" },
              { label: "Languages", value: "C++, C, Java, Objective-C" }
            ]}
          />
          <ProjectCard
            href="https://rclawncare.net/"
            src="/images/rclawncare.png"
            alt="RC Lawn Care & Landscaping, LLC"
            title="RC Lawn Care & Landscaping"
            meta={[
              { label: "Stack", value: "PHP · WordPress (Custom Build)" },
              { label: "Integration", value: "Customized Authorize.net Integration, Career Portal" }
            ]}
          />
          <ProjectCard
            href="https://partygear.org/"
            src="/images/pg.png"
            alt="Party Gear"
            title="Party Gear"
            meta={[
              { label: "Stack", value: "PHP · WordPress (Custom Build)" },
              { label: "Key Features", value: "Booking & Invoicing Software (Laravel), PayPal Integration" }
            ]}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className='flex flex-col gap-16 scroll-mt-24 pt-14'>
        <div className='flex flex-col gap-8'>
          <h2 className='text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl'>
            About Me
          </h2>

          <div className="flex flex-col gap-0 border-l border-neutral-200 ml-3">
            <ExperienceItem
              href="https://youvendo.de/"
              role="Software Developer"
              company="Youvendo GmbH"
              period="May, 2025 — March, 2026"
            />
            <ExperienceItem
              href="https://exeebit.com/"
              role="Founder"
              company="Exeebit LLC"
              period="2022 — Present"
            />
            <ExperienceItem
              href="https://paridhancouture.com/"
              role="Chief Technology Officer"
              company="Mars Production LLC"
              period="2021 — June, 2025"
            />
            <ExperienceItem
              href="https://idesignwork.nl/"
              role="Web Developer"
              company="iDesignWork"
              period="2019 — May, 2025"
            />
            <ExperienceItem
              href="https://buckyy.com/"
              role="Software Developer"
              company="Buckyy"
              period="2022 — 2023"
            />
          </div>
        </div>

        <div className='flex flex-col gap-8'>
          <h2 className='text-3xl font-semibold tracking-tight text-neutral-900'>Tech Stack</h2>

          <div className='grid gap-8'>
            <TechCategory title="Languages">
              <TechItem href="https://en.wikipedia.org/wiki/C_(programming_language)" icon={<SiC className="text-[#A8B9CC]" />} name="C" desc="System programming" />
              <TechItem href="https://cplusplus.com/" icon={<SiCplusplus className="text-[#00599C]" />} name="C++" desc="High-performance programming" />
              <TechItem href="https://go.dev/" icon={<SiGo className="text-[#00ADD8]" />} name="Go" desc="Scalable systems" />
              <TechItem href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" icon={<SiJavascript className="text-[#F7DF1E]" />} name="JavaScript" desc="The language of the web" />
              <TechItem href="https://www.rust-lang.org/" icon={<SiRust className="text-[#000000]" />} name="Rust" desc="Reliable and efficient" />
              <TechItem href="https://www.python.org/" icon={<SiPython className="text-[#3776AB]" />} name="Python" desc="Versatile and readable" />
              <TechItem href="https://www.php.net/" icon={<SiPhp className="text-[#777BB4]" />} name="PHP" desc="Web-focused scripting" />
            </TechCategory>

            <TechCategory title="Frontend">
              <TechItem href="https://react.dev/" icon={<SiReact className="text-[#61DAFB]" />} name="React" desc="UI Library" />
              <TechItem href="https://nextjs.org/" icon={<SiNextdotjs className="text-[#000000]" />} name="Next.js" desc="React Framework" />
              <TechItem href="https://vuejs.org/" icon={<SiVuedotjs className="text-[#4FC08D]" />} name="Vue.js" desc="Progressive Framework" />
              <TechItem href="https://remix.run/" icon={<SiRemix className="text-[#000000]" />} name="Remix" desc="Full stack web framework" />
            </TechCategory>

            <TechCategory title="Backend">
              <TechItem href="https://nodejs.org/" icon={<SiNodedotjs className="text-[#339933]" />} name="NodeJS" desc="JS runtime" />
              <TechItem href="https://deno.com/" icon={<SiDeno className="text-[#000000]" />} name="Deno" desc="Secure runtime" />
              <TechItem href="https://nestjs.com/" icon={<SiNestjs className="text-[#E0234E]" />} name="NestJS" desc="Node.js framework" />
              <TechItem href="https://www.djangoproject.com/" icon={<SiDjango className="text-[#092E20]" />} name="Django" desc="Python framework" />
              <TechItem href="https://laravel.com/" icon={<SiLaravel className="text-[#FF2D20]" />} name="Laravel" desc="PHP framework" />
              <TechItem href="https://fastapi.tiangolo.com/" icon={<SiFastapi className="text-[#009688]" />} name="FastAPI" desc="High performance Python" />
            </TechCategory>

            <TechCategory title="Tools & Infrastructure">
              <TechItem href="https://shopify.com/" icon={<SiShopify className="text-[#96BF48]" />} name="Shopify" desc="E-commerce platform" />
              <TechItem href="https://wordpress.org/" icon={<SiWordpress className="text-[#21759B]" />} name="WordPress" desc="Content management" />
              <TechItem href="https://www.docker.com/" icon={<SiDocker className="text-[#2496ED]" />} name="Docker" desc="Containerization" />
              <TechItem href="https://git-scm.com/" icon={<SiGit className="text-[#F05032]" />} name="Git" desc="Version control" />
              <TechItem href="https://www.postgresql.org/" icon={<SiPostgresql className="text-[#4169E1]" />} name="PostgreSQL" desc="Relational database" />
              <TechItem href="https://www.apple.com/macos/" icon={<SiApple className="text-[#000000]" />} name="macOS" desc="Operating System" />
              <TechItem href="https://www.linux.org/" icon={<SiLinux className="text-[#FCC624]" />} name="Linux" desc="Operating System" />
              <TechItem href="https://neovim.io/" icon={<SiNeovim className="text-[#57A143]" />} name="Neovim" desc="Terminal editor" />
            </TechCategory>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="flex flex-col gap-8 scroll-mt-24 pt-14">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Latest Articles
          </h2>
          <p className="text-lg text-neutral-500">
            Thoughts, tutorials, and stories from my blog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post: BlogPostData) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-6 mb-6 flex justify-center">
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full bg-white/50 hover:bg-white border border-neutral-200 shadow-sm hover:shadow-md text-neutral-600 hover:text-neutral-900"
          >
            <span>View all articles</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <footer className="pt-8 border-t border-neutral-100 text-sm text-neutral-500 text-center mt-12">
        <p>
          Designed and Built by <Link href='https://github.com/s4gor' className='font-medium text-neutral-900 hover:text-sky-600 transition-colors'>s4gor</Link> with <span className="text-red-500">&#10084;</span>
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> • </span>
          Built with <Link href='https://nextjs.org/' className='font-medium text-neutral-800 hover:text-sky-600'>Next.js</Link>.
        </p>
      </footer>
    </main>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer"
      className="group flex items-center gap-2 px-4 py-2 bg-neutral-50 hover:bg-white border border-neutral-100 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:border-neutral-200">
      <span className="text-lg transition-colors">
        {icon}
      </span>
      <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900">{label}</span>
    </Link>
  )
}

function ExperienceItem({ href, role, company, period }: { href: string, role: string, company: string, period: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer"
      className="group relative flex flex-col pl-8 py-4 hover:bg-neutral-50/50 transition-colors rounded-r-xl">
      {/* Timeline Dot */}
      <div className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full border border-neutral-300 bg-white group-hover:border-neutral-900 group-hover:bg-neutral-900 transition-colors" />

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <span className="font-semibold text-neutral-900 group-hover:text-sky-600 transition-colors">{role}</span>
        <span className="text-sm font-medium text-neutral-500 tabular-nums">{period}</span>
      </div>
      <span className="text-neutral-600 font-medium">{company}</span>
    </Link>
  )
}

function TechCategory({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-3'>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">{title}</h3>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
        {children}
      </div>
    </div>
  )
}

function TechItem({ href, icon, name, desc }: { href: string, icon: React.ReactNode, name: string, desc: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer"
      className='group flex items-center gap-3 p-2 sm:p-3 rounded-xl border border-neutral-100 bg-white shadow-sm hover:border-neutral-200 hover:shadow-md transition-all'>
      <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 overflow-hidden rounded-lg bg-neutral-50 border border-neutral-100 text-lg sm:text-xl">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-neutral-900 group-hover:text-sky-600 transition-colors truncate">{name}</span>
        <span className="text-[10px] sm:text-xs text-neutral-500 truncate">{desc}</span>
      </div>
    </Link>
  )
}

function ProjectCard({ href, src, alt, title, meta }: {
  href: string,
  src: string,
  alt: string,
  title: string,
  meta: { label: string, value: string }[]
}) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-neutral-200">
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col p-5 gap-4">
        <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-sky-600 transition-colors">
          {title}
        </h2>

        <div className="flex flex-col gap-2">
          {meta.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
              <span className="font-medium text-neutral-500">{item.label}</span>
              <span className="text-neutral-900 font-medium sm:text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}

function BlogCard({ post }: { post: BlogPostData }) {
  const date = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-neutral-200 h-full">
      {post.featuredImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="flex flex-col p-5 gap-3 grow">
        <div className="text-xs font-medium text-neutral-500">{date}</div>

        <h3
          className="text-lg font-semibold text-neutral-900 group-hover:text-sky-600 transition-colors line-clamp-2"
        >
          {post.title}
        </h3>

        <p
          className="text-sm text-neutral-600 line-clamp-3 leading-relaxed"
        >
          {post.excerpt}
        </p>

        <div className="mt-auto pt-3 flex items-center text-sm font-medium text-sky-600 group-hover:translate-x-1 transition-transform">
          Read more <FiArrowUpRight className="ml-1" />
        </div>
      </div>
    </Link>
  )
}

function OssCard({ href, icon, title, type, stats, desc }: {
  href: string,
  icon: React.ReactNode,
  title: string,
  type: string,
  stats?: string,
  desc: string
}) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer"
      className="group relative flex flex-col gap-4 sm:gap-6 p-5 sm:p-8 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-neutral-200 hover:shadow-md transition-all duration-300 h-full">

      <div className="flex items-start justify-between">
        <div className="text-3xl sm:text-4xl shrink-0 p-2.5 sm:p-3 bg-neutral-50 rounded-xl border border-neutral-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <FiArrowUpRight className="text-neutral-400 text-xl group-hover:text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>

      <div className="flex flex-col gap-2 sm:gap-3 grow">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 group-hover:text-sky-600 transition-colors">
            {title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="font-medium text-neutral-500">{type}</span>
            {stats && (
              <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ring-1 ring-emerald-100">
                {stats}
              </span>
            )}
          </div>
        </div>

        <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
          {desc}
        </p>
      </div>
    </Link>
  )
}
