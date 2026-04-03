import EditorShell from './EditorShell'
import useCVStore from '../../store/cvStore'

export default function FreeEditor({ region, config }) {
  const cvData = useCVStore(s => s.cvData)

  // Placeholder hasta construir las secciones reales
  const formContent = (
    <div style={{ color: '#bbb', fontSize: 14, paddingTop: 8 }}>
      ← Secciones del formulario (próximo paso)
    </div>
  )

  const previewContent = (
    <div style={{
      padding: '48px 52px',
      minHeight: '297mm',
      fontFamily: 'Georgia, serif',
      color: '#111',
      fontSize: 13,
    }}>
      <p style={{ color: '#ccc', fontSize: 12 }}>Vista previa del CV — próximo paso</p>
    </div>
  )

  return (
    <EditorShell
      region={region}
      mode="free"
      config={config}
      formContent={formContent}
      previewContent={previewContent}
      onExportPDF={() => console.log('export PDF')}
      onExportDOCX={() => console.log('export DOCX')}
    />
  )
}