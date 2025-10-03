#!/bin/bash

# 📊 Generar Todos los Diagramas de Arquitectura en Español
# Este script genera versiones PNG, SVG y PDF de todos los diagramas .dot en español

set -e  # Salir en cualquier error

echo "🚀 Generando Diagramas de Arquitectura Limpia en Español..."
echo "============================================================"

# Verificar si Graphviz está instalado
if ! command -v dot &> /dev/null; then
    echo "❌ Error: ¡Graphviz no está instalado!"
    echo "Por favor instálalo primero:"
    echo "  Ubuntu/Debian: sudo apt-get install graphviz"
    echo "  macOS: brew install graphviz"
    exit 1
fi

# Crear directorio de salida si no existe
mkdir -p salida

# Función para generar diagramas en múltiples formatos
generar_diagrama() {
    local archivo_dot=$1
    local nombre_base=$(basename "$archivo_dot" .dot)
    
    echo "🔄 Procesando: $archivo_dot"
    
    # Formato PNG (para documentación, presentaciones)
    echo "  → Generando PNG..."
    dot -Tpng "$archivo_dot" -o "salida/${nombre_base}.png"
    
    # Formato SVG (para web, escalable)
    echo "  → Generando SVG..."
    dot -Tsvg "$archivo_dot" -o "salida/${nombre_base}.svg"
    
    # Formato PDF (para documentos profesionales)
    echo "  → Generando PDF..."
    dot -Tpdf "$archivo_dot" -o "salida/${nombre_base}.pdf"
    
    echo "  ✅ Generado: salida/${nombre_base}.{png,svg,pdf}"
    echo ""
}

# Generar todos los diagramas
echo "📋 Archivos .dot encontrados:"
ls -la *.dot 2>/dev/null || true
echo ""

# Procesar cada archivo .dot
for archivo_dot in *.dot; do
    if [[ -f "$archivo_dot" ]]; then
        generar_diagrama "$archivo_dot"
    fi
done

# Generar resumen
echo "📊 RESUMEN DE GENERACIÓN"
echo "======================="
echo "Archivos generados:"
ls -la salida/ 2>/dev/null || echo "No se generaron archivos de salida"

echo ""
echo "🎉 ¡Todos los diagramas en español generados exitosamente!"
echo ""
echo "📁 Ubicación de salida: $(pwd)/salida/"
echo ""
echo "🔗 Ahora puedes usar estos diagramas en:"
echo "   • Documentación (PNG/PDF)"
echo "   • Páginas web (SVG)" 
echo "   • Presentaciones (PNG)"
echo "   • Documentos profesionales (PDF)"
echo ""
echo "💡 Consejo: Abre archivos SVG en un navegador para visualización interactiva"
