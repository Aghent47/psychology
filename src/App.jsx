import { useState } from 'react'
import './App.css'
import { respuestas } from './data';
import PropTypes from 'prop-types';

const App = () => {
  return (
    <Test />
  )
}

//Test a realizar
const Test = ({ title, subtitle }) => {
  const [count, setCount] = useState(1);
  const [indiceAcumulado, setIndiceAcumulado] = useState(0);
  const [testCompeto, setTestCompleto] = useState(false);
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [showResponses, setShowResponses] = useState(false);

  const resp = respuestas.find(respuesta => respuesta.idAnswers === count);
  let diagnisco = '';
  const resultado = indiceAcumulado;

  const handleClick = (index, texto) => {
    console.log(`Valor acumulado del índice: ${indiceAcumulado + index}`);
    setIndiceAcumulado(indiceAcumulado + index); // Actualizar el estado con el valor acumulado 
    setSelectedTexts(prevSelectedTexts => [...prevSelectedTexts, texto]);
  }

  const handleVerRespuestas = () => {
    setShowResponses(!showResponses);
  };

  if (!resp) {
    if (resultado <= 10) {
      diagnisco = 'Estos altibajos son normales';
    } else if (resultado <= 16) {
      diagnisco = 'Leve Perturbacion del estado de animo';
    } else if (resultado <= 20) {
      diagnisco = 'Estado de depresión intermitentes';
    } else if (resultado <= 30) {
      diagnisco = 'Depresión Moderada';
    } else if (resultado <= 40) {
      diagnisco = 'Depresión Grave';
    } else if (resultado <= 64) {
      diagnisco = 'Depresión Extrema';
    }

    return (
      <>
        {<TestCompletado />}

        <h3>
          NOTA: Una puntuación persistente de 17 o más indica que puede necesitar ayuda profesional.
        </h3>
        <h2>Resultado: {resultado}</h2>
        <h3>Su diagnostico es: {diagnisco}</h3>
        <button
          onClick={() => {
            setCount(1);
            setIndiceAcumulado(0);
            setTestCompleto(false);
            setSelectedTexts([]);
          }}
          style={{ textAlign: 'left' }}>
          Reiniciar
        </button>
        &nbsp;  &nbsp;
        <button
          onClick={handleVerRespuestas}
          style={{ textAlign: 'left' }}
        >
          Ver Respuestas
        </button>
        {showResponses && (
          <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>Respuestas seleccionadas:</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {selectedTexts.map((texto, index) => (
                <li key={index} style={{ marginBottom: '5px', fontSize: '16px' }}>{texto}</li>
              ))}
            </ul>
          </div>
        )}

      </>)
  } else {

    const { answersTxt } = resp; // Extraemos el array de answersTxt del objeto encontrado

    return (
      <>
        {testCompeto ? <TestCompletado /> : <div>
          <h1> {title} </h1>
          <h3> {subtitle} </h3>
          <div className="card">
            {answersTxt.map((texto, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <button
                  onClick={() => {
                    if (count <= 21) {
                      handleClick(index, texto);
                      setCount((count) => count + 1);
                    }
                  }}
                  style={{ width: '100%', textAlign: 'left' }}>
                  {texto}
                </button>
              </div>
            ))}
          </div>
        </div>}
      </>
    )
  }
}

// Test Completado
const TestCompletado = () => {
  return (
    <>
      <div className="card">
        <h1>Test Completado!!</h1>
      </div>

    </>
  )
}

// Definiendo los PropTypes
Test.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

// }
Test.defaultProps = {
  title: 'Inventario de Depresión de Beck',
  subtitle: 'Por favor Seleccione una opción',
  desc: '',
}

export default App
