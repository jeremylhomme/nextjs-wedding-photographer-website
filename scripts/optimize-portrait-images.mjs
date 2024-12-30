import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import path from 'path';

const inputDir = './public/_portrait-to-process';
const outputDir = './public/_portrait-to-process';

async function optimizeImages() {
  try {
    const files = await readdir(inputDir);

    // Separate files by type, excluding already optimized files
    const webpFiles = files.filter(
      file => /\.webp$/i.test(file) && !file.includes('optimized')
    );
    const convertFiles = files.filter(
      file => /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('optimized')
    );

    console.log('Found WebP files to optimize:', webpFiles);
    console.log('Found images to convert and optimize:', convertFiles);

    // Process WebP files (optimization only)
    for (const file of webpFiles) {
      const inputPath = path.join(inputDir, file);
      const outputFileName = `${file.replace('.webp', '')}-optimized.webp`;
      const outputPath = path.join(outputDir, outputFileName);

      await sharp(inputPath)
        .resize({
          width: 1280,
          height: 1920,
          fit: 'cover',
          position: 'attention'
        })
        .webp({
          quality: 80,
          effort: 6
        })
        .toFile(outputPath);

      console.log(`Optimized: ${file} -> ${outputFileName}`);
    }

    // Process JPG/PNG files (convert to WebP and optimize)
    for (const file of convertFiles) {
      const inputPath = path.join(inputDir, file);
      const outputFileName = `${file.replace(/\.(jpg|jpeg|png)$/i, '')}-optimized.webp`;
      const outputPath = path.join(outputDir, outputFileName);

      await sharp(inputPath)
        .resize({
          width: 1280,
          height: 1920,
          fit: 'cover',
          position: 'attention'
        })
        .webp({
          quality: 80,
          effort: 6
        })
        .toFile(outputPath);

      console.log(`Converted and optimized: ${file} -> ${outputFileName}`);
    }

    console.log('All images have been processed!');
    console.log(
      `Total files processed: ${webpFiles.length + convertFiles.length}`
    );
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

optimizeImages();
