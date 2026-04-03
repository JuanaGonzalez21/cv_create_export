import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Editor from './pages/Editor'
import Preview from './pages/Preview'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing — selección de región y modo */}
        <Route path="/" element={<Landing />} />

        {/* Editor con parámetros de región y modo */}
        {/* region: latam | usa | europe            */}
        {/* mode:   free  | guided                  */}
        <Route path="/editor/:region/:mode" element={<Editor />} />

        {/* Preview final antes de exportar */}
        <Route path="/preview" element={<Preview />} />

        {/* Cualquier ruta inválida → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App