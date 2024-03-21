import { useState } from 'react'
import './App.css'
import { respuestas } from './data';

const App = () => {
  const [count, setCount] = useState(1);
  const [valorRespuesta, setValorRespuesta] = useState(0);

  const respuestasId1 = respuestas.find(respuesta => respuesta.idAnswers === count);
  // Extraemos el array de answersTxt del objeto encontrado
  const { answersTxt } = respuestasId1;
  return (
    <>
      <h1>Inventario de Depresión de Beck</h1>
      <h3>Por favor Seleccione una opción</h3>
      <div className="card">
        {answersTxt.map((texto, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => {
                console.log(index);
                setCount((count) => count + 1)

                }
              }
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
