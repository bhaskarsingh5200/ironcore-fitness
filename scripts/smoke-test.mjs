/* Smoke test — runs against the built app via vite preview.
 * Usage: node scripts/smoke-test.mjs [baseUrl]
 * Verifies routes render their key content without console/page errors.
 */
import { chromium } from 'playwright-core'
import fs from 'node:fs'

const BASE = process.argv[2] || 'http://localhost:4173'

const CHROME = [
  `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env['PROGRAMFILES(X86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
].find((p) => p && fs.existsSync(p))

if (!CHROME) {
  console.error('Chrome/Edge not found.')
  process.exit(1)
}

const routes = [
  { path: '/', check: 'BUILD YOUR STRONGEST SELF.' },
  { path: '/about', check: 'MORE THAN A GYM.' },
  { path: '/programs', check: 'TRAIN WITH PURPOSE.' },
  { path: '/programs/strength-training', check: 'OVERVIEW' },
  { path: '/programs/personal-training', check: 'OVERVIEW' },
  { path: '/trainers', check: 'MEET YOUR COACHES.' },
  { path: '/trainers/alex-morgan', check: 'HEAD STRENGTH COACH' },
  { path: '/membership', check: 'CHOOSE YOUR MEMBERSHIP.' },
  { path: '/contact', check: 'READY TO GET STRONGER?' },
  { path: '/schedule', check: 'TRAIN ON YOUR TIME.' },
  { path: '/classes', check: 'TRAIN ON YOUR TIME.' },
  { path: '/faq', check: 'QUESTIONS? ANSWERED.' },
  { path: '/gallery', check: 'A LOOK INSIDE.' },
  { path: '/admin/login', check: 'Admin Login' },
  { path: '/admin', check: 'Admin Login' },
]

let browser
try {
  browser = await chromium.launch({ executablePath: CHROME, headless: true })
} catch (e) {
  console.error('Could not launch Chrome:', e.message)
  process.exit(1)
}

let failed = 0

for (const route of routes) {
  const page = await browser.newPage()
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(`PAGEERROR: ${err.message}`))

  // Block Google Fonts for hermetic tests (abort logs a benign resource error).
  await page.route('**fonts.googleapis.com/**', (r) => r.abort())
  await page.route('**fonts.gstatic.com/**', (r) => r.abort())

  try {
    await page.goto(`${BASE}${route.path}`, { waitUntil: 'commit', timeout: 20000 })
    await page.waitForSelector('body', { timeout: 10000 })
    // Wait for async content to settle.
    await page.waitForTimeout(3000)
    const bodyText = (await page.locator('body').innerText()).replace(/\s+/g, ' ')
    const ok = bodyText.includes(route.check)
    const realErrors = errors.filter((e) => !e.includes('Failed to load resource: net::ERR_FAILED'))
    const status = ok && realErrors.length === 0 ? 'PASS' : 'FAIL'
    if (status === 'FAIL') failed++
    console.log(`${status}  ${route.path}${ok ? '' : '  [missing text: ' + route.check + ']'}`)
    for (const e of realErrors) console.log(`      console: ${e.slice(0, 220)}`)
  } catch (e) {
    failed++
    console.log(`ERROR  ${route.path}: ${e.message}`)
  }
  await page.close()
}

await browser.close()
console.log(failed === 0 ? '\nAll checks passed.' : `\n${failed} route(s) failed.`)
process.exit(failed === 0 ? 0 : 1)
