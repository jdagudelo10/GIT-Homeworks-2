export const NewSignatures = () => {
    const signatures = [
        { nombre: "Física 3", creditos: "4", semestre: "8" },
        { nombre: "Informática forense", creditos: "3", semestre: "9" },
        { nombre: "Ambiente y desarrollo sostenible", creditos: "2", semestre: "7" },
    ];
    
    return (
        <div className="page">
            <div className="page-header">
                <h1>Asignaturas que verás en próximos semestres</h1>
            </div>
            
            <div className="content-grid">
                {signatures.map((materia, index) => (
                    <div key={index} className="card">
                        <h3>{materia.nombre}</h3>
                        <p><strong>Créditos:</strong> <span className="highlight">{materia.semestre}</span></p>
                        <p>{materia.creditos}</p>
                        <button className="btn btn-primary">Ver horarios</button>
                    </div>
                ))}
            </div>
        </div>
    );
}