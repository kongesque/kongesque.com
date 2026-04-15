#!/bin/bash

# Logo Generation Script
# Converts echo-2.svg into all required favicon, OG images, and React component
# Prerequisites: librsvg (rsvg-convert), imagemagick (magick), and optipng
# Install with: brew install librsvg imagemagick optipng

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SVG_SOURCE="public/echo-3.svg"
OUTPUT_DIR="src/app"
COMPONENT_DIR="src/components"
TMP_DIR="/tmp"

# Site branding
SITE_NAME="kongesque"
SITE_DESC="Building things with code and curiosity."
BG_COLOR="#151716"
TITLE_COLOR="#E6E4DF"
DESC_COLOR="#8A8E8C"

echo -e "${BLUE}🎨 Generating all logo assets from ${SVG_SOURCE}...${NC}\n"

# Check if source SVG exists
if [ ! -f "$SVG_SOURCE" ]; then
    echo "❌ Error: $SVG_SOURCE not found!"
    exit 1
fi

# 1. Generate React component with currentColor
echo -e "${GREEN}⚛️  Generating echo-logo.tsx component...${NC}"

# Read SVG and extract the content between <svg> tags
SVG_CONTENT=$(sed -n '/<svg/,/<\/svg>/p' "$SVG_SOURCE" | \
    sed '1d;$d' | \
    sed 's/style="fill:white;"/fill="currentColor"/g' | \
    sed 's/fill="white"/fill="currentColor"/g')

# Create the React component
cat > "$COMPONENT_DIR/echo-logo.tsx" << 'EOF'
export function EchoLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }}
    >
EOF

echo "$SVG_CONTENT" >> "$COMPONENT_DIR/echo-logo.tsx"

cat >> "$COMPONENT_DIR/echo-logo.tsx" << 'EOF'
    </svg>
  )
}
EOF

echo -e "${YELLOW}   ✓ Created $COMPONENT_DIR/echo-logo.tsx with currentColor support${NC}"

# 2. Generate favicon.ico (multi-resolution: 16x16, 32x32, 48x48) with rounded corners
echo -e "${GREEN}📌 Generating favicon.ico (multi-resolution)...${NC}"
# Generate 16x16
rsvg-convert -w 16 -h 16 "$SVG_SOURCE" > "$TMP_DIR/favicon-16-logo.png"
magick -size 16x16 "xc:${BG_COLOR}" \
    \( "$TMP_DIR/favicon-16-logo.png" -resize 14x14 \) \
    -gravity center -compose over -composite \
    \( +clone -alpha extract \
    -draw 'fill black polygon 0,0 0,2 2,0 fill white circle 2,2 2,0' \
    \( +clone -flip \) -compose Multiply -composite \
    \( +clone -flop \) -compose Multiply -composite \
    \) -alpha off -compose CopyOpacity -composite "$TMP_DIR/favicon-16.png"

# Generate 32x32
rsvg-convert -w 32 -h 32 "$SVG_SOURCE" > "$TMP_DIR/favicon-32-logo.png"
magick -size 32x32 "xc:${BG_COLOR}" \
    \( "$TMP_DIR/favicon-32-logo.png" -resize 28x28 \) \
    -gravity center -compose over -composite \
    \( +clone -alpha extract \
    -draw 'fill black polygon 0,0 0,4 4,0 fill white circle 4,4 4,0' \
    \( +clone -flip \) -compose Multiply -composite \
    \( +clone -flop \) -compose Multiply -composite \
    \) -alpha off -compose CopyOpacity -composite "$TMP_DIR/favicon-32.png"

# Generate 48x48
rsvg-convert -w 48 -h 48 "$SVG_SOURCE" > "$TMP_DIR/favicon-48-logo.png"
magick -size 48x48 "xc:${BG_COLOR}" \
    \( "$TMP_DIR/favicon-48-logo.png" -resize 42x42 \) \
    -gravity center -compose over -composite \
    \( +clone -alpha extract \
    -draw 'fill black polygon 0,0 0,6 6,0 fill white circle 6,6 6,0' \
    \( +clone -flip \) -compose Multiply -composite \
    \( +clone -flop \) -compose Multiply -composite \
    \) -alpha off -compose CopyOpacity -composite "$TMP_DIR/favicon-48.png"

# Combine into multi-resolution .ico
magick "$TMP_DIR/favicon-16.png" "$TMP_DIR/favicon-32.png" "$TMP_DIR/favicon-48.png" "$OUTPUT_DIR/favicon.ico"

# 3. Generate apple-icon.png (180×180) with rounded corners
echo -e "${GREEN}🍎 Generating apple-icon.png (180×180)...${NC}"
rsvg-convert -w 180 -h 180 "$SVG_SOURCE" > "$TMP_DIR/apple-icon-logo.png"
magick -size 180x180 "xc:${BG_COLOR}" \
    \( "$TMP_DIR/apple-icon-logo.png" -resize 160x160 \) \
    -gravity center -compose over -composite \
    \( +clone -alpha extract \
    -draw 'fill black polygon 0,0 0,36 36,0 fill white circle 36,36 36,0' \
    \( +clone -flip \) -compose Multiply -composite \
    \( +clone -flop \) -compose Multiply -composite \
    \) -alpha off -compose CopyOpacity -composite "$OUTPUT_DIR/apple-icon.png"

# 4. Generate icon-192.png (192×192) with rounded corners
echo -e "${GREEN}📱 Generating icon-192.png (192×192)...${NC}"
rsvg-convert -w 192 -h 192 "$SVG_SOURCE" > "$TMP_DIR/icon-192-logo.png"
magick -size 192x192 "xc:${BG_COLOR}" \
    \( "$TMP_DIR/icon-192-logo.png" -resize 170x170 \) \
    -gravity center -compose over -composite \
    \( +clone -alpha extract \
    -draw 'fill black polygon 0,0 0,38 38,0 fill white circle 38,38 38,0' \
    \( +clone -flip \) -compose Multiply -composite \
    \( +clone -flop \) -compose Multiply -composite \
    \) -alpha off -compose CopyOpacity -composite "$OUTPUT_DIR/icon-192.png"

# 5. Generate icon-512.png (512×512) with rounded corners
echo -e "${GREEN}📱 Generating icon-512.png (512×512)...${NC}"
rsvg-convert -w 512 -h 512 "$SVG_SOURCE" > "$TMP_DIR/icon-512-logo.png"
magick -size 512x512 "xc:${BG_COLOR}" \
    \( "$TMP_DIR/icon-512-logo.png" -resize 460x460 \) \
    -gravity center -compose over -composite \
    \( +clone -alpha extract \
    -draw 'fill black polygon 0,0 0,102 102,0 fill white circle 102,102 102,0' \
    \( +clone -flip \) -compose Multiply -composite \
    \( +clone -flop \) -compose Multiply -composite \
    \) -alpha off -compose CopyOpacity -composite "$OUTPUT_DIR/icon-512.png"

# 6. Generate opengraph-image.png (1200×630)
echo -e "${GREEN}🖼️  Generating opengraph-image.png (1200×900)...${NC}"
rsvg-convert -w 300 -h 300 "$SVG_SOURCE" > "$TMP_DIR/echo-white.png"
magick -size 1200x900 "xc:${BG_COLOR}" \
    "$TMP_DIR/echo-white.png" -gravity center -geometry +0-80 -composite \
    -font "$HOME/Library/Fonts/JetBrainsMonoNerdFont-Bold.ttf" -pointsize 60 -fill "${TITLE_COLOR}" -gravity center -annotate +0+150 "${SITE_NAME}" \
    -font "$HOME/Library/Fonts/JetBrainsMonoNerdFont-Regular.ttf" -pointsize 28 -fill "${DESC_COLOR}" -annotate +0+220 "${SITE_DESC}" \
    "$OUTPUT_DIR/opengraph-image.png"

# 7. Optimize all PNG files
echo -e "${GREEN}🔧 Optimizing PNG files...${NC}"
optipng -o7 -quiet "$OUTPUT_DIR"/*.png

# Clean up temp files
rm -f "$TMP_DIR/favicon-16.png" "$TMP_DIR/favicon-16-logo.png" \
      "$TMP_DIR/favicon-32.png" "$TMP_DIR/favicon-32-logo.png" \
      "$TMP_DIR/favicon-48.png" "$TMP_DIR/favicon-48-logo.png" \
      "$TMP_DIR/apple-icon-logo.png" "$TMP_DIR/icon-192-logo.png" \
      "$TMP_DIR/icon-512-logo.png" "$TMP_DIR/echo-white.png"

echo -e "\n${GREEN}✅ All logo assets generated successfully!${NC}\n"

# Show file sizes
echo "Generated files:"
ls -lh "$OUTPUT_DIR"/*.{png,ico} 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'
ls -lh "$COMPONENT_DIR/echo-logo.tsx" 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'

echo -e "\n${BLUE}💡 Summary:${NC}"
echo "  • React component with currentColor support"
echo "  • Favicon files for all platforms"
echo "  • Social media preview image"
echo "  • All PNGs optimized with optipng"
