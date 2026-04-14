export const Signatures = () => {
    const signatures = [
        { nombre: "Matemáticas fundamentales", creditos: "4", semestre: "1" },
        { nombre: "Introducción a la ingeniería", creditos: "3", semestre: "1" },
        { nombre: "Desarrollo personal", creditos: "2", semestre: "1" },
    ];
    
    return (
        <div className="page">
            <div className="page-header">
                <h1>Estas son las asignaturas que has matriculado este semestre</h1>
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