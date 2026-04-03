import { useState } from 'react'
import { Link } from 'react-router-dom'
import './EditorShell.css' 

const REGION_LABELS = {
  latam:  'Latinoamérica',
  usa:    'Estados Unidos',
  europe: 'Europa',
}

const MODE_LABELS = {
  free:   'Editor libre',
  guided: 'Con guía',
}

export default function EditorShell({
  region,
  mode,
  config,
  formContent,
  previewContent,
  onExportPDF,
  onExportDOCX,
}) {
  const [zoom, setZoom] = useState(85)

  const zoomIn  = () => setZoom(z => Math.min(z + 10, 150))
  const zoomOut = () => setZoom(z => Math.max(z - 10, 50))

  return (
    <div className="shell">

      {/* ── Top bar ── */}
      <header className="topbar">
        <div className="topbar-left">
          <Link to="/" className="topbar-brand">
            <div className="topbar-dot" />
            <span className="topbar-name">CV Builder</span>
          </Link>
          <div className="topbar-divider" />
          <span className="topbar-meta">
            {REGION_LABELS[region]} · {MODE_LABELS[mode]}
          </span>
        </div>

        <div className="topbar-right">
          <button className="btn-ghost" onClick={onExportDOCX}>
            <IconDownload /> .docx
          </button>
          <button className="btn-export" onClick={onExportPDF}>
            <IconDownload /> Exportar PDF
          </button>
        </div>
      </header>

      {/* ── Main: form + preview ── */}
      <div className="main">

        {/* Left — form */}
        <aside className="panel-form">
          <div className="panel-form-scroll">
            {config.atsWarning && (
              <div className="ats-banner">
                <span className="ats-banner-icon">⚠</span>
                <p className="ats-banner-text">
                  <strong>Modo ATS activo.</strong> Evita columnas, gráficos y
                  barras de habilidades para que tu CV pase los filtros automáticos.
                </p>
              </div>
            )}
            {formContent}
          </div>
        </aside>

        {/* Right — preview */}
        <section className="panel-preview">
          <div className="preview-toolbar">
            <span className="preview-label">Vista previa</span>
            <div className="preview-zoom">
              <button className="zoom-btn" onClick={zoomOut}>−</button>
              <span className="zoom-value">{zoom}%</span>
              <button className="zoom-btn" onClick={zoomIn}>+</button>
            </div>
          </div>

          <div className="preview-scroll">
            <div
              className="preview-page"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              {previewContent}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

function IconDownload() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M8 2v8M5 7l3 3 3-3M3 13h10"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}