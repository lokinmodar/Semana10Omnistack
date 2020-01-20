import React, { useState, useEffect } from 'react'; 
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

// onChange={e => setLatitude(e.target.value)}/> forma como o React armazena o valor de um INPUT dentro de um valor de um ESTADO
function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, []);
  
  async function handleAddDev(data){
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);//pelo conceito da imutabilidade, não se faz o push diretamente no array. Você cria um novo array e adiciona a informação nova nele junto com os dados anteriores.

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev.id} dev={dev} />
          ))/*percorre o array e capta os valores já 
          colocando nos lugares certos*/}

        </ul>

      </main>
    </div>
  );
}

export default App;
