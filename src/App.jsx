import { useState } from 'react'
import './App.css'
import { respuestas } from './data';
import PropTypes from 'prop-types';

const App = ({title, subtitle}) => {

  const [count, setCount] = useState(1);
  const [indiceAcumulado, setIndiceAcumulado] = useState(0);

  const resp = respuestas.find(respuesta => respuesta.idAnswers === count);
  const { answersTxt } = resp; // Extraemos el array de answersTxt del objeto encontrado

  const handleClick = (index) => {
    console.log(`Valor acumulado del índice: ${indiceAcumulado + index}`);
    setIndiceAcumulado(indiceAcumulado + index); // Actualizar el estado con el valor acumulado
  };

  return (
    <>
      <h1> {title} </h1>
      <h3> {subtitle} </h3>
      <div className="card">
        {answersTxt.map((texto, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => {
                if (count < 21) {
                  handleClick(index);
                  setCount((count) => count + 1);
                }
              }}
              style={{ width: '100%', textAlign: 'left' }}>
              {texto}
            </button>
          </div>
        ))}

      </div>
    </>
  )
}

//Test a realizar
// const Test = () => {


// Definiendo los PropTypes

App.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

// }
App.defaultProps = {
  title: 'Inventario de Depresión de Beck',
  subtitle: 'Por favor Seleccione una opción',
  desc: ''
}


export default App
