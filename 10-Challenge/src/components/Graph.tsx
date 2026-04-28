
import { useState, useMemo } from 'react'
import { Graph as D3Graph } from 'react-d3-graph'
import { Graph } from '../classes/Graph'
import { Node } from '../classes/Node'
import { NewObjectModal } from './NewObjectModal'

type GraphData = {
  nodes: Array<{
    id: string
    label: string
    color: string
    symbolType: string
  }>
  links: Array<{
    source: string
    target: string
  }>
}

const graphConfig: any = {
  directed: true,
  height: 620,
  width: 860,
  nodeHighlightBehavior: true,
  automaticRearrangeAfterDropNode: false,
  node: {
    color: '#0f766e',
    size: 380,
    highlightStrokeColor: '#facc15',
  },
  link: {
    color: 'rgba(255,255,255,0.35)',
    highlightColor: '#facc15',
  },
}

const graphToD3Data = (graph: Graph): GraphData => {
  const nodes = graph.nodes.map((node) => ({
    id: node.id,
    label:
      node.tipo === 'person' && node.edad !== null
        ? `${node.nombre} · ${node.edad}`
        : node.nombre,
    color: node.tipo === 'city' ? '#7c3aed' : '#0f766e',
    symbolType: node.tipo === 'city' ? 'circle' : 'square',
  }))

  const links = Object.entries(graph.adjlist).flatMap(([cityId, people]) =>
    people.map((person) => ({ source: cityId, target: person.id })),
  )

  return { nodes, links }
}

function GraphDash() {
  const [graph, setGraph] = useState<Graph>(() => {
    const g = new Graph({ nodes: [], adjlist: {} })

    // Lista mock de ciudades
    const cities = [
      new Node({ tipo: 'city', id: 'city-paris', nombre: 'Paris' }),
      new Node({ tipo: 'city', id: 'city-venecia', nombre: 'Venecia' }),
      new Node({ tipo: 'city', id: 'city-beijing', nombre: 'Beijing' }),
    ]

    // Lista mock de personas
    const people = [
      new Node({
        tipo: 'person',
        id: 'person-marypiedad',
        nombre: 'Mary Piedad',
        edad: 24,
        ciudadId: 'city-venecia',
      }),
      new Node({
        tipo: 'person',
        id: 'person-nicolas',
        nombre: 'Nicolas',
        edad: 31,
        ciudadId: 'city-beijing',
      }),
      new Node({
        tipo: 'person',
        id: 'person-isabella',
        nombre: 'Isabella',
        edad: 27,
        ciudadId: 'city-paris',
      }),
      new Node({
        tipo: 'person',
        id: 'person-juandavid',
        nombre: 'Juan David',
        edad: 35,
        ciudadId: 'city-paris',
      }),
    ]

    cities.forEach((city) => g.addNode(city))
    people.forEach((person) => g.addNode(person))

    return g
  })

  const [selectedCityId, setSelectedCityId] = useState('city-madrid')

  const d3Data = useMemo(() => graphToD3Data(graph), [graph])

  const selectedCity = graph.getNodeById(selectedCityId)
  const peopleInSelectedCity = selectedCity
    ? graph.getPeopleByCityId(selectedCity.id)
    : []

  const handleAddCity = (cityName: string) => {
    const cityId = `city-${cityName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    const newCity = new Node({
      tipo: 'city',
      id: cityId,
      nombre: cityName,
    })

    setGraph((currentGraph) => {
      const nextGraph = new Graph({
        nodes: [...currentGraph.nodes],
        adjlist: Object.fromEntries(
          Object.entries(currentGraph.adjlist).map(([id, people]) => [id, [...people]]),
        ),
      })
      nextGraph.addNode(newCity)
      return nextGraph
    })
  }

  const handleAddPerson = (personName: string, personAge: number, cityId: string) => {
    if (!graph.getNodeById(cityId)) {
      throw new Error('Invalid city')
    }

    const personId = `person-${personName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    const newPerson = new Node({
      tipo: 'person',
      id: personId,
      nombre: personName,
      edad: personAge,
      ciudadId: cityId,
    })

    setGraph((currentGraph) => {
      const nextGraph = new Graph({
        nodes: [...currentGraph.nodes],
        adjlist: Object.fromEntries(
          Object.entries(currentGraph.adjlist).map(([id, people]) => [id, [...people]]),
        ),
      })
      nextGraph.addNode(newPerson)
      return nextGraph
    })
  }

  const handleNodeClick = (nodeId: string) => {
    const node = graph.getNodeById(nodeId)
    if (node?.tipo === 'city') {
      setSelectedCityId(nodeId)
    }
  }

  const cities = graph.getCities()

  return (
    <main className="app-shell">
      <section className="content-grid">
        <aside className="sidebar">
          <NewObjectModal
            cities={cities}
            selectedCityId={selectedCityId}
            peopleInSelectedCity={peopleInSelectedCity}
            selectedCity={selectedCity}
            onAddCity={handleAddCity}
            onAddPerson={handleAddPerson}
            onSelectCity={setSelectedCityId}
          />
        </aside>

        <section className="graph-panel panel">
          <div className="graph-frame">
            <D3Graph
              id="friends-cities-graph"
              data={d3Data}
              config={graphConfig}
              onClickNode={handleNodeClick}
            />
          </div>
        </section>
      </section>
    </main>
  )
}

export default GraphDash;