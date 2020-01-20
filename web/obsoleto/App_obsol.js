import React, { useState } from 'react'; //sempre que for trabalhar com HTML dentro do JS!

// useState cria "estados" - para armazenar informação mantida e lida pelo componente

//3 conceitos principais do react:
//Componente - uma função que retorna algum conteúdo HTML/CSS/JS (em termos de interface)
  // Quando criar um componente novo?
    // - quando há repetição de um componente ou quando podemos isolar um pedaço de uma aplicação que não atinja outros componentes 
    // - sempre um componente por arquivo
//Propriedade
    // - atributos dos componentes
    // - informações que um componente pai passa para um componente filho.
    // - Sintaxe: props dentro do parêntese da função "function App(props)"
    // - Para usar: props.nome_do_atributo
    // Dentro do HTML, sempre que for usar conteúdo JS, usar dentro de {}
    // fragment: Tag sem nomenclatura <></> - usada quando precisamos de varios elementos, mas não queremos agrupar em uma DIV
//Estado
    // - Informação mantida pelo componente, podendo ser manipulada por ele (lembrar: conceito de imutabilidade)


function App() {
  const [ counter, setCounter ] = useState(0); //variáveis e constantes do componente
  function incrementCounter(){ //funções próprias de um componente são criadas dentro dele
    setCounter(counter + 1);
  }
  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Increment</button>
    </>
  );
}

export default App;
