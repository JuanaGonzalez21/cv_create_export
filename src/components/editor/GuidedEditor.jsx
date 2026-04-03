import EditorShell from './EditorShell'

export default function GuidedEditor({ region, config }) {
  const formContent = (
    <div style={{ color: '#bbb', fontSize: 14, paddingTop: 8 }}>
      ← Modo guiado (próximo paso)
    </div>
  )

  const previewContent = (
    <div style={{ padding: '48px 52px', minHeight: '297mm', fontFamily: 'Georgia, serif' }}>
      <p style={{ color: '#ccc', fontSize: 12 }}>Vista previa del CV — próximo paso</p>
    </div>
  )

  return (
    <EditorShell
      region={region}
      mode="guided"
      config={config}
      formContent={formContent}
      previewContent={previewContent}
      onExportPDF={() => console.log('export PDF')}
      onExportDOCX={() => console.log('export DOCX')}
    />
  )
}