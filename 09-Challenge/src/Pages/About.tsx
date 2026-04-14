export const About = () => {
    const people = [
        { nombre: "Juan David Agudelo", cargo: "Secretario academico"},
        { nombre: "Mary Piedad Diago", cargo: "Jefe de kardex financiero"},
        { nombre: "José Agudelo", cargo: "Asesor universitario"},
    ];
    
    return (
        <div className="page">
            <div className="page-header">
                <h1>Asignaturas que verás en próximos semestres</h1>
            </div>
            
            <div className="content-grid">
                {people.map((persona, index) => (
                    <div key={index} className="card">
                        <h3>{persona.nombre}</h3>
                        <p><strong>Cargo:</strong> <span className="highlight">{persona.cargo
                        }</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
}