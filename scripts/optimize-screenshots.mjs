import sharp from 'sharp';
import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Keep original screenshots for editing; publish responsive, lossless WebP assets.
const names = ['learning-home', 'value-compass', 'learning-journey-dialogue', 'learning-journey-map', 'learning-journey-concepts', 'domain-records', 'domain-workspace-rc3-safe', 'domain-cognitive-map', 'learning-dialogue'];
await mkdir('public/screenshots/optimized', { recursive: true });
const manifest = {};
for (const name of names) {
  const input = await readFile(`public/screenshots/${name}.png`);
  const { width, height } = await sharp(input).metadata();
  const variants = [];
  for (const size of [...new Set([640, 1280, 1920, width].filter(w => w <= width))].sort((a, b) => a - b)) {
    const data = await sharp(input).resize({ width: size }).webp({ lossless: true, effort: 6 }).toBuffer();
    const hash = createHash('sha256').update(data).digest('hex').slice(0, 10);
    const src = `/screenshots/optimized/${name}-${size}-${hash}.webp`;
    await writeFile(`public${src}`, data);
    variants.push({ width: size, src, bytes: data.length });
  }
  // Resampling text can add more entropy than the original. Do not offer a
  // smaller rendition when a sharper, larger one costs fewer bytes.
  const efficient = variants.filter((v, i) => !variants.slice(i + 1).some(larger => larger.bytes <= v.bytes));
  for (const variant of variants.filter(v => !efficient.includes(v))) await unlink(`public${variant.src}`);
  manifest[`/screenshots/${name}.png`] = { width, height, variants: efficient };
  console.log(`${name}: ${input.length} → ${variants.at(-1).bytes} bytes (full size)`);
}
await writeFile('app/screenshots.generated.json', JSON.stringify(manifest, null, 2) + '\n');
