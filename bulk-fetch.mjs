import fs from 'fs';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

const urls = [
  'https://old.jstales.com/blog/this-is-how-my-blogging-journey-was-started',
  'https://old.jstales.com/blog/how-i-managed-to-export-products-from-a-shopify-website-to-wordpress-costing-0-buck',
  'https://old.jstales.com/blog/ruby-for-plant-layout-solution',
  'https://old.jstales.com/blog/neovim-a-keyboard-only-editor',
  'https://old.jstales.com/blog/phpinfo-wp-a-wordpress-plugin-to-look-up-php-config',
  'https://old.jstales.com/blog/vanilla-javascript-over-front-end-frameworks',
  'https://old.jstales.com/blog/telemetry-metrics-plotter-using-javascript',
  'https://old.jstales.com/blog/scrapping-products-review-from-aliexpress',
  'https://old.jstales.com/blog/bulk-discount-on-shopify-without-using-any-app',
  'https://old.jstales.com/blog/mutation-observer-in-javascript',
  'https://old.jstales.com/blog/google-play-developer-console',
  'https://old.jstales.com/blog/this-is-how-i-managed-to-use-79-shopify-theme-for-free',
  'https://old.jstales.com/blog/auto-sizes-for-lazy-loaded-images-in-wordpress-67',
  'https://old.jstales.com/blog/security-bugs-in-google-chrome-133-1330694398-for-linux',
  'https://old.jstales.com/blog/a-43000-selling-theme-has-got-a-very-simple-silly-bug',
  'https://old.jstales.com/blog/finally-i-built-my-portfolio-with-nextjs'
];

async function scrape() {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });
  turndownService.keep(['iframe']); // preserve iframes

  for (const url of urls) {
    try {
        const slug = url.split('/').pop();
        console.log(`Processing ${slug}...`);

        const txt = await fetch(url).then(r => r.text());
        const dom = new JSDOM(txt);
        const doc = dom.window.document;

        const title = doc.querySelector('meta[property="og:title"]')?.content || '';
        const excerptRaw = doc.querySelector('meta[property="og:description"]')?.content || '';
        const excerpt = excerptRaw.replace(/"/g, '\\"').substring(0, 150) + '...';
        const featuredImage = doc.querySelector('meta[property="og:image"]')?.content || '';
        
        // Date parsing: Look for '<span class="font-semibold">Posted On:</span> 03-May-2025'
        let dateStr = "2024-01-01";
        const dateMatch = txt.match(/Posted On:<\/span>\s*([\d-]+[A-Za-z]+-\d{4})/);
        if (dateMatch) {
            // e.g. "03-May-2025" -> "2025-05-03"
            const d = new Date(dateMatch[1]);
            if (!isNaN(d)) {
                 dateStr = d.toISOString().split('T')[0];
            }
        }

        const h1 = doc.querySelector('h1.font-semibold.my-5');
        if (!h1) {
            console.error('Failed to find H1 for: ' + url);
            continue;
        }

        const contentDiv = h1.nextElementSibling;
        if (!contentDiv) {
             console.error('Failed to find content for: ' + url);
             continue;
        }

        let contentHtml = contentDiv.innerHTML;
        let markdownContent = turndownService.turndown(contentHtml);

        // Fix Turndown escapes
        markdownContent = markdownContent.replace(/\\_/g, '_').replace(/\\[]/g, '[').replace(/\\]/g, ']');
        // Fix code blocks if turndown fails them
        markdownContent = markdownContent.replace(/<pre>\s*(.*?)\s*<\/pre>/gs, '```\n$1\n```');

        const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${dateStr}"
excerpt: "${excerpt}"
${featuredImage ? `featuredImage: "${featuredImage}"\n` : ''}---

${markdownContent}
`;

        const outputPath = `/Users/emran/Desktop/portfolio/content/blog/${slug}.md`;
        fs.writeFileSync(outputPath, frontmatter);
        console.log(`Wrote ${outputPath}`);
    } catch (e) {
        console.error(`Error on ${url}:`, e);
    }
  }
}

scrape().catch(console.error);
