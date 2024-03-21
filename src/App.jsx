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
  const [testCompeto, setTestCompeto] = useState(false);

  const resp = respuestas.find(respuesta => respuesta.idAnswers === count);
  let diagnisco = '';
  const resultado = indiceAcumulado;

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
        <h2>Su diagnostico es: {diagnisco}</h2>
      </>)
  } else {

    const { answersTxt } = resp; // Extraemos el array de answersTxt del objeto encontrado

    const handleClick = (index) => {
      console.log(`Valor acumulado del índice: ${indiceAcumulado + index}`);
      setIndiceAcumulado(indiceAcumulado + index); // Actualizar el estado con el valor acumulado 
      // resultado = indiceAcumulado + index;

    }
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
                      handleClick(index);
                      setCount((count) => count + 1);
                    } else {
                      setTestCompeto(true);
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
        <h1>Test Completado</h1>
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
