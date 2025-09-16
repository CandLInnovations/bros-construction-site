# Image Optimization Required

## Critical: Compress These Large Images

The following images are significantly impacting page load speed and should be compressed:

### Immediate Action Required (10MB+ files):
- `commercial-composite-shake-shingle-roof.webp` (10MB) → Target: <1MB
- `davinci-new-home-roof.webp` (9.6MB) → Target: <1MB
- `davinci-shake-roof-garage.webp` (9.0MB) → Target: <1MB
- `custom-metal-copper-chimney-cap5.webp` (6.2MB) → Target: <800KB

### Tools to Use:
1. **Online Tools:**
   - https://tinypng.com/ (supports WebP)
   - https://squoosh.app/ (Google's image optimizer)

2. **Command Line (if available):**
   ```bash
   # Install WebP tools
   brew install webp

   # Compress images
   cwebp -q 80 -m 6 input.webp -o output.webp
   ```

3. **Batch Processing:**
   ```bash
   for file in *.webp; do
     cwebp -q 75 -m 6 "$file" -o "optimized_$file"
   done
   ```

### Recommended Settings:
- Quality: 75-80 for photos
- Quality: 85-90 for images with text
- Progressive encoding: enabled
- Metadata removal: enabled

### Expected Results:
- **Before:** ~35MB total for top 4 images
- **After:** ~3-4MB total (90% reduction)
- **Performance Gain:** 3-5 second faster initial load