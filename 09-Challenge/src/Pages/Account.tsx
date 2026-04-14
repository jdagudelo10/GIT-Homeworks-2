export const Account = () => {
    const info = [
        { nombre: "Juan Andrés Solís", programa: "Ingeniería Informática", semestre: "1" },];
    
    return (
        <div className="page">
            <div className="page-header">
                <h1>Hola, Juan Andrés</h1>
            </div>
            
            <div className="content-grid">
                {info.map((informacion, index) => (
                    <div key={index} className="card">
                        <h3>{informacion.nombre}</h3>
                        <p><strong>Créditos:</strong> <span className="highlight">{informacion.programa}</span></p>
                        <p>{informacion.semestre}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}