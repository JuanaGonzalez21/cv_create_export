import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCVStore from '../store/cvStore'
import './Landing.css'

const careers = [
  'Programador Backend', 'Programador Frontend', 'Programador Full Stack',
  'Data Scientist', 'Diseñador UX/UI', 'Administrador Empresarial',
  'Gerente de Proyectos', 'Analista Financiero', 'Contador',
  'Recursos Humanos', 'Abogado', 'Marketing Digital',
  'Médico', 'Docente / Profesor', 'Ejecutivo de Ventas',
]

const regions = [
  'Latinoamérica',
  'Estados Unidos',
  'Europa (estándar)',
]

const formats = [
  { id: 'ats-clean',   label: 'ATS Clean',     desc: 'Optimizado para filtros automáticos' },
  { id: 'harvard',     label: 'Harvard Format', desc: 'Clásico y profesional'              },
  { id: 'hybrid',      label: 'Hybrid ATS',     desc: 'Habilidades + cronológico'          },
  { id: 'europass',    label: 'Europass',        desc: 'Estándar europeo'                  },
]

// ── Mapeos de URL ──────────────────────────────
const regionMap = {
  'Latinoamérica':     'latam',
  'Estados Unidos':    'usa',
  'Europa (estándar)': 'europe',
}

const modeMap = {
  'yes': 'guided',
  'no':  'free',
}

// ── Componente principal ───────────────────────
export default function Landing() {
  const navigate = useNavigate()
  const { setSelectedArea, setSelectedTemplate, updatePersonal } = useCVStore()

  const [step,   setStep]   = useState(0)
  const [career, setCareer] = useState('')
  const [region, setRegion] = useState('')
  const [fname,  setFname]  = useState('')
  const [lname,  setLname]  = useState('')
  const [phone,  setPhone]  = useState('')
  const [email,  setEmail]  = useState('')
  const [format, setFormat] = useState('')
  const [guide,  setGuide]  = useState(null)

  const validations = [
    career && region,
    fname && lname && phone && email && format,
    guide !== null,
    true,
  ]

  const goNext  = () => setStep(s => Math.min(s + 1, 3))
  const goBack  = () => setStep(s => Math.max(s - 1, 0))

  // ✅ goEditor DENTRO del componente — accede a region, guide y navigate
  const goEditor = () => {
    const regionParam = regionMap[region]
    const modeParam   = modeMap[guide]
    navigate(`/editor/${regionParam}/${modeParam}`)
  }

  const handleFinish = () => {
    setSelectedArea(career)
    setSelectedTemplate(format)
    updatePersonal({ name: `${fname} ${lname}`, email, phone })
    goNext()
  }

  return (
    <div className="viewport">
      <div className="track" style={{ transform: `translateY(${step * -100}vh)` }}>

        {/* ── Step 0: Enfoque ── */}
        <section className="screen">
          <div className="inner">
            <StepHint current={1} total={3} />
            <h1 className="title">Crea tu CV</h1>
            <p className="sub">Elige tu área de enfoque y el mercado al que te diriges.</p>

            <Field label="Carrera / enfoque de empleo">
              <SelectField
                value={career}
                onChange={setCareer}
                placeholder="Selecciona una opción"
                options={careers}
              />
            </Field>

            <Field label="País / región de presentación">
              <SelectField
                value={region}
                onChange={setRegion}
                placeholder="Selecciona una región"
                options={regions}
              />
            </Field>

            <NavRow onNext={goNext} canNext={!!validations[0]} />
          </div>
        </section>

        {/* ── Step 1: Datos básicos ── */}
        <section className="screen">
          <div className="inner">
            <StepHint current={2} total={3} />
            <h1 className="title">Datos básicos</h1>
            <p className="sub">La información esencial que aparecerá en tu hoja de vida.</p>

            <div className="row2">
              <Field label="Nombre(s)">
                <InputField value={fname} onChange={setFname} placeholder="Tu nombre" />
              </Field>
              <Field label="Apellidos">
                <InputField value={lname} onChange={setLname} placeholder="Tus apellidos" />
              </Field>
            </div>

            <div className="row2">
              <Field label="Teléfono">
                <InputField value={phone} onChange={setPhone} placeholder="+57 300 000 0000" type="tel" />
              </Field>
              <Field label="Correo profesional">
                <InputField value={email} onChange={setEmail} placeholder="tu@correo.com" type="email" />
              </Field>
            </div>

            <Field label="Formato de CV">
              <SelectField
                value={format}
                onChange={setFormat}
                placeholder="Selecciona un formato"
                options={formats.map(f => f.id)}
                labels={Object.fromEntries(formats.map(f => [f.id, `${f.label} — ${f.desc}`]))}
              />
            </Field>

            <NavRow onBack={goBack} onNext={goNext} canNext={!!validations[1]} />
          </div>
        </section>

        {/* ── Step 2: Modo ── */}
        <section className="screen">
          <div className="inner">
            <StepHint current={3} total={3} />
            <h1 className="title">¿Cómo quieres crear tu CV?</h1>
            <p className="sub">Elige si prefieres orientación paso a paso o ir directamente al editor.</p>

            <div className="ynGroup">
              <YNBtn
                icon="✦" label="Guíame"
                caption="Paso a paso con sugerencias"
                selected={guide === 'yes'}
                onClick={() => setGuide('yes')}
              />
              <YNBtn
                icon="◇" label="Editor libre"
                caption="Relleno directo sin guía"
                selected={guide === 'no'}
                onClick={() => setGuide('no')}
              />
            </div>

            <NavRow onBack={goBack} onNext={handleFinish} canNext={!!validations[2]} />
          </div>
        </section>

        {/* ── Step 3: Resumen ── */}
        <section className="screen">
          <div className="inner">
            <h1 className="title">Todo listo</h1>
            <p className="sub">Tu CV se generará con esta configuración.</p>

            <div className="summaryList">
              {[
                ['Nombre',  `${fname} ${lname}`],
                ['Área',    career],
                ['Región',  region],
                ['Formato', formats.find(f => f.id === format)?.label ?? format],
                ['Modo',    guide === 'yes' ? 'Con guía' : 'Editor libre'],
              ].map(([k, v]) => (
                <div key={k} className="summaryRow">
                  <span className="summaryKey">{k}</span>
                  <span className="summaryVal">{v}</span>
                </div>
              ))}
            </div>

            {/* ✅ usa goEditor, no navigate('/editor') */}
            <NavRow
              onBack={goBack}
              onNext={goEditor}
              canNext={true}
              nextLabel="Ir al editor"
            />
          </div>
        </section>

      </div>
    </div>
  )
}

/* ─── NavRow ──────────────────────────────────── */
function NavRow({ onBack, onNext, canNext, nextLabel = 'Siguiente' }) {
  return (
    <div className="navRow">
      {onBack
        ? <button className="btnBack" onClick={onBack}><IconBack /> Volver</button>
        : <div className="navSpacer" />
      }
      <button className="btnNext" onClick={onNext} disabled={!canNext}>
        {nextLabel} <IconNext />
      </button>
    </div>
  )
}

/* ─── Field ───────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div className="field">
      <label className="fieldLabel">{label}</label>
      {children}
    </div>
  )
}

/* ─── InputField ──────────────────────────────── */
function InputField({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      className="input"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
    />
  )
}

/* ─── SelectField ─────────────────────────────── */
function SelectField({ value, onChange, placeholder, options, labels = {} }) {
  return (
    <div className="selectWrap">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={value ? '' : 'empty'}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{labels[opt] ?? opt}</option>
        ))}
      </select>
      <span className="chevron">›</span>
    </div>
  )
}

/* ─── YNBtn ───────────────────────────────────── */
function YNBtn({ icon, label, caption, selected, onClick }) {
  return (
    <button
      className={`ynBtn${selected ? ' selected' : ''}`}
      onClick={onClick}
    >
      <span className="ynIcon">{icon}</span>
      <span className="ynLabel">{label}</span>
      <span className="ynCaption">{caption}</span>
    </button>
  )
}

/* ─── StepHint ────────────────────────────────── */
function StepHint({ current, total }) {
  return (
    <p className="stepHint">
      {current}<span>/</span>{total}
    </p>
  )
}

/* ─── Icons ───────────────────────────────────── */
function IconBack() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconNext() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}