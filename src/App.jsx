import { useState } from 'react'
import './App.css'
import { respuestas } from './data';

const App = () => {


  return (
    <>
      <Test/>
    </>
  )
}

//Test a realizar
const Test = () => {

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
      <h1>Inventario de Depresión de Beck</h1>
      <h3>Por favor Seleccione una opción</h3>
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


export default App
