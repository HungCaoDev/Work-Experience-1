
const sharp = require("sharp");
const path = require("path");

const imageDir = path.join(__dirname, "../public/images");

const images = [
  "hero-weekly-plan.jpg",
  "feature-goal-builder.jpg",
  "feature-growth-plan.jpg",
  "feature-monday-checkin.jpg",
  "playbook-reviews.jpg",
  "playbook-referrals.jpg",
  "playbook-rebooking.jpg",
  "team-workshop.jpg",
];

const widths = [480, 960, 1440];

async function optimizeImages() {
  console.log("Starting image optimization...");

  for (const image of images) {
    const input = path.join(imageDir, image);
    const name = path.parse(image).name;

    for (const width of widths) {
      const output = path.join(
        imageDir,
        `${name}-${width}.webp`
      );

      await sharp(input)
        .resize({
          width,
          withoutEnlargement: true,
        })
        .webp({ quality: 75 })
        .toFile(output);

      console.log(`Created: ${name}-${width}.webp`);
    }
  }

  console.log("Image optimization complete!");
}

optimizeImages().catch((error) => {
  console.error("Optimization failed:", error);
  process.exitCode = 1;
});
