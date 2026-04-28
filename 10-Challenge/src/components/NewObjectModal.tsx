import { useState } from 'react'
import { Node } from '../classes/Node'

interface NewObjectModalProps {
  cities: Node[]
  selectedCityId: string
  peopleInSelectedCity: Node[]
  selectedCity: Node | undefined
  onAddCity: (cityName: string) => void
  onAddPerson: (personName: string, personAge: number, cityId: string) => void
  onSelectCity: (cityId: string) => void
}

export function NewObjectModal({
  cities,
  selectedCityId,
  peopleInSelectedCity,
  selectedCity,
  onAddCity,
  onAddPerson,
  onSelectCity,
}: NewObjectModalProps) {
  const [cityName, setCityName] = useState('')
  const [personName, setPersonName] = useState('')
  const [personAge, setPersonAge] = useState('')
  const [personCityId, setPersonCityId] = useState(selectedCityId)
  const [feedback, setFeedback] = useState('')

  const handleAddCity = () => {
    const name = cityName.trim()

    if (!name) {
      setFeedback('Escribe un nombre para la ciudad.')
      return
    }

    try {
      onAddCity(name)
      setCityName('')
      setFeedback(`Ciudad ${name} agregada correctamente.`)
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : 'No se pudo agregar la ciudad.',
      )
    }
  }

  const handleAddPerson = () => {
    const name = personName.trim()
    const age = Number(personAge)

    if (!name) {
      setFeedback('Escribe un nombre para la persona.')
      return
    }

    if (!Number.isFinite(age) || age <= 0) {
      setFeedback('La edad debe ser un número mayor que cero.')
      return
    }

    try {
      onAddPerson(name, age, personCityId)
      setPersonName('')
      setPersonAge('')
      setFeedback(`${name} ahora vive en ${cities.find((c) => c.id === personCityId)?.nombre}.`)
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : 'No se pudo agregar la persona.',
      )
    }
  }

  const handleSelectCity = (cityId: string) => {
    onSelectCity(cityId)
    setPersonCityId(cityId)
    setFeedback(`Ciudad seleccionada: ${cities.find((c) => c.id === cityId)?.nombre}.`)
  }

  return (
    <>
      <div className="panel">
        <div className="panel-heading">
          <p className="panel-kicker">Crear ciudad</p>
          <h2>Nueva ciudad</h2>
        </div>

        <label className="field">
          <span>Nombre</span>
          <input
            value={cityName}
            onChange={(event) => setCityName(event.target.value)}
            placeholder="Ej. Valencia"
          />
        </label>

        <button type="button" className="primary-button" onClick={handleAddCity}>
          Agregar ciudad
        </button>
      </div>

      <div className="panel">
        <div className="panel-heading">
          <p className="panel-kicker">Crear persona</p>
          <h2>Nueva persona</h2>
        </div>

        <label className="field">
          <span>Nombre</span>
          <input
            value={personName}
            onChange={(event) => setPersonName(event.target.value)}
            placeholder="Ej. Andrea"
          />
        </label>

        <label className="field">
          <span>Edad</span>
          <input
            type="number"
            min="1"
            value={personAge}
            onChange={(event) => setPersonAge(event.target.value)}
            placeholder="Ej. 29"
          />
        </label>

        <label className="field">
          <span>Ciudad</span>
          <select
            value={personCityId}
            onChange={(event) => setPersonCityId(event.target.value)}
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nombre}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="primary-button" onClick={handleAddPerson}>
          Agregar persona
        </button>
      </div>

      <div className="panel info-panel">
        <div className="panel-heading">
          <p className="panel-kicker">Ciudad seleccionada</p>
          <h2>{selectedCity?.nombre ?? 'Ninguna'}</h2>
        </div>

        <p className="muted">
          {selectedCity
            ? `Hay ${peopleInSelectedCity.length} personas viviendo aquí.`
            : 'Selecciona una ciudad desde el grafo o el formulario.'}
        </p>

        <ul className="people-list">
          {peopleInSelectedCity.map((person) => (
            <li key={person.id}>
              <strong>{person.nombre}</strong>
              <span>{person.edad} años</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="feedback">{feedback}</p>
    </>
  )
}
