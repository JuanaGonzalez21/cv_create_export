import { useNavigate } from 'react-router-dom'

export default function Preview() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <p style={{ color: '#bbb', fontSize: 14 }}>Vista previa — próximo paso</p>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '10px 20px',
          background: '#111',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        ← Volver al editor
      </button>
    </div>
  )
}