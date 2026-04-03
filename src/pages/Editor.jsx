import { useParams, Navigate } from 'react-router-dom'
import { regionConfig } from '../config/regionConfig'
import FreeEditor from '../components/editor/FreeEditor'
import GuidedEditor from '../components/editor/GuidedEditor'

const VALID_REGIONS = ['latam', 'usa', 'europe']
const VALID_MODES   = ['free', 'guided']

export default function Editor() {
  const { region, mode } = useParams()

  // Redirige si los params son inválidos
  if (!VALID_REGIONS.includes(region) || !VALID_MODES.includes(mode)) {
    return <Navigate to="/" replace />
  }

  const config = regionConfig[region]

  if (mode === 'guided') {
    return <GuidedEditor region={region} config={config} />
  }

  return <FreeEditor region={region} config={config} />
}