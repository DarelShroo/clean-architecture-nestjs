#!/bin/bash

# 📊 Generate All Architecture Diagrams
# This script generates PNG, SVG, and PDF versions of all .dot diagrams

set -e  # Exit on any error

echo "🚀 Generating Clean Architecture Diagrams..."
echo "================================================"

# Check if Graphviz is installed
if ! command -v dot &> /dev/null; then
    echo "❌ Error: Graphviz is not installed!"
    echo "Please install it first:"
    echo "  Ubuntu/Debian: sudo apt-get install graphviz"
    echo "  macOS: brew install graphviz"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p output

# Function to generate diagrams in multiple formats
generate_diagram() {
    local dot_file=$1
    local base_name=$(basename "$dot_file" .dot)
    
    echo "🔄 Processing: $dot_file"
    
    # PNG format (for documentation, presentations)
    echo "  → Generating PNG..."
    dot -Tpng "$dot_file" -o "output/${base_name}.png"
    
    # SVG format (for web, scalable)
    echo "  → Generating SVG..."
    dot -Tsvg "$dot_file" -o "output/${base_name}.svg"
    
    # PDF format (for professional documents)
    echo "  → Generating PDF..."
    dot -Tpdf "$dot_file" -o "output/${base_name}.pdf"
    
    echo "  ✅ Generated: output/${base_name}.{png,svg,pdf}"
    echo ""
}

# Generate all diagrams
echo "📋 Found .dot files:"
ls -la *.dot 2>/dev/null || true
echo ""

# Process each .dot file
for dot_file in *.dot; do
    if [[ -f "$dot_file" ]]; then
        generate_diagram "$dot_file"
    fi
done

# Generate summary
echo "📊 GENERATION SUMMARY"
echo "===================="
echo "Generated files:"
ls -la output/ 2>/dev/null || echo "No output files generated"

echo ""
echo "🎉 All diagrams generated successfully!"
echo ""
echo "📁 Output location: $(pwd)/output/"
echo ""
echo "🔗 You can now use these diagrams in:"
echo "   • Documentation (PNG/PDF)"
echo "   • Web pages (SVG)" 
echo "   • Presentations (PNG)"
echo "   • Professional documents (PDF)"
echo ""
echo "💡 Tip: Open SVG files in a browser for interactive viewing"
