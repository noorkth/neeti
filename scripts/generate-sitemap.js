#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Generates public/sitemap.xml before the Vite build.
 * Run via: node scripts/generate-sitemap.js
 * Hooked into package.json build script automatically.
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const BASE_URL = 'https://neetikayastha.com.np'
const TODAY    = new Date().toISOString().split('T')[0]  // YYYY-MM-DD

// ── URL definitions ───────────────────────────────────────────────────────────
// This is a single-page site — all content lives on /.
// Section anchors are included as separate <url> entries so crawlers understand
// the content structure and deep-link directly to sections.
const urls = [
  {
    loc:        `${BASE_URL}/`,
    lastmod:    TODAY,
    changefreq: 'monthly',
    priority:   '1.0',
  },
  {
    loc:        `${BASE_URL}/#about`,
    lastmod:    TODAY,
    changefreq: 'yearly',
    priority:   '0.8',
  },
  {
    loc:        `${BASE_URL}/#services`,
    lastmod:    TODAY,
    changefreq: 'monthly',
    priority:   '0.9',
  },
  {
    loc:        `${BASE_URL}/#credentials`,
    lastmod:    TODAY,
    changefreq: 'yearly',
    priority:   '0.7',
  },
  {
    loc:        `${BASE_URL}/#contact`,
    lastmod:    TODAY,
    changefreq: 'yearly',
    priority:   '0.8',
  },
]

// ── XML generation ────────────────────────────────────────────────────────────
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.map(({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`

const outPath = resolve(__dirname, '../public/sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`✅  sitemap.xml written → ${outPath}`)
console.log(`    ${urls.length} URLs | base: ${BASE_URL}`)
