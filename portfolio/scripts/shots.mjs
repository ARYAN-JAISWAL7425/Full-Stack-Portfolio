/**
 * Capture a screenshot of every project's live site into public/shots/.
 *
 *   npm run shots            # all projects
 *   npm run shots fitstake   # just one
 *
 * Re-run after you redeploy a project. Each shot is a 1440x900 viewport
 * capture, so cards and case-study heroes stay consistent.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "shots");

// Read the live URLs straight out of the content file so this never drifts.
const content = await import(path.join(root, "lib", "content.ts")).catch(() => null);

/** Fallback list, used when the TS import isn't available to plain node. */
const FALLBACK = [
  { slug: "fitstake", live: "https://fit-stake-nu.vercel.app/" },
  { slug: "voyago", live: "https://voyago-zeta-coral.vercel.app/" },
  { slug: "forever", live: "https://ecommerce-frontend-omega-red-83.vercel.app/" },
  { slug: "chatapp", live: "https://chatapps-chi.vercel.app/login" },
];

/**
 * Per-project viewport overrides. FitStake is a mobile-first app — at desktop
 * width it renders a phone frame marooned in grey, so it gets a phone viewport.
 */
const VIEWPORTS = {
  fitstake: { width: 430, height: 932 },
};
const DESKTOP = { width: 1440, height: 900 };

const targets = (content?.projects ?? FALLBACK)
  .filter((p) => p.live)
  .filter((p) => process.argv[2] == null || p.slug === process.argv[2]);

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const project of targets) {
  const file = path.join(outDir, `${project.slug}.png`);
  const viewport = VIEWPORTS[project.slug] ?? DESKTOP;
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  process.stdout.write(`→ ${project.slug} (${viewport.width}x${viewport.height}) … `);
  try {
    await page.goto(project.live, { waitUntil: "networkidle", timeout: 60_000 });
    // Let entrance animations and lazy images settle before capturing.
    await page.waitForTimeout(3500);
    await page.screenshot({ path: file });
    console.log("ok");
  } catch (err) {
    console.log(`failed — ${err.message.split("\n")[0]}`);
  }
  await page.close();
}

await browser.close();
console.log(`\nSaved to ${path.relative(root, outDir)}`);
