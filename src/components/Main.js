import React, { useEffect, useState } from "react";

//form
import { FaPlus, FaWindowClose } from "react-icons/fa";

//tarefas
import { FaEdit } from "react-icons/fa";

const Main = () => {

  //PEGANDO VALOR NO INPUT DIGITADO PELO USUÁRIO
  const [novaTarefa, setNovaTarefa] = useState("");

  //iniciando tarefas com localStorage
  const [tarefas, setTarefas] = useState(() => {
    const tarefasLocalStorage = JSON.parse(localStorage.getItem('ListaDeTaferas'));
    if (tarefasLocalStorage) {
      return tarefasLocalStorage
    } else {
      return [];
    }
  });

  // SABER SE ESTA EM MODO DE EDIÇÃO
  const [isEditing, setIsEditing] = useState(false);

  //INDEX DA TAREFA QUE ESTA EDITANDO
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem('ListaDeTaferas', JSON.stringify(tarefas))
  }, [tarefas]);

  function handleSubmit(event) {
    event.preventDefault(); //BLOQUEANDO EVENTO

    if (isEditing) {
      const updatedTasks = [...tarefas];
      updatedTasks[editingTaskIndex] = novaTarefa; //ATUALIZANDO DADOS
      setTarefas(updatedTasks); //ATUALIZANDO ARRAY DE NOVAS TAREFAS
      setIsEditing(false); // DESABILITANDO EDIÇÃO
      setEditingTaskIndex(-1);
    } else {

      if (tarefas.indexOf(novaTarefa) !== -1) {
        return
      }// VERIFICANDO TAREFA EXISTENTE
      setTarefas([...tarefas, novaTarefa]); // CRIANDO UMA NOVA TAREFA
    }

    setNovaTarefa("");
  }

  function handleEdit(index) {
    setIsEditing(true); // vERIFICANDO E EDIÇÃO
    setEditingTaskIndex(index); // PASSANDO INDEX
    setNovaTarefa(tarefas[editingTaskIndex]);
    // console.log(tarefas, tarefas[editingTaskIndex], editingTaskIndex);
  }

  const handleDelete = (e, index) => {
    tarefas.splice(index, 1); //DELETANDO O ARRAY DE ACORDO O INDEX
    setTarefas([...tarefas]);
  };

  return (
    <div className="main">
      <h1>Lista de tarefas </h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa([e.target.value])}
        />

        <button type="submit">{<FaPlus size={20} />}</button>
      </form>

      <ul className="tarefas">
        {tarefas.map((tarefa, index) => (
          <li key={tarefa}>
            {tarefa}
            <span>
              <FaEdit
                className="edit"
                onClick={() => {
                  handleEdit(index);
                }}
              />

              <FaWindowClose
                onClick={(e) => {
                  handleDelete(e, index);
                }}
                className="delete"
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;






// import React, { useState } from 'react';

// //form
// import { FaPlus, FaWindowClose } from 'react-icons/fa';

// //tarefas
// import { FaEdit } from 'react-icons/fa';

// const Main = () => {

//   const [novaTarefa, setNovaTarefa] = useState(''); //PEGANDO VALOR NO INPUT DIGITADO PELO USUÁRIO
//   const [tarefas, setTarefas] = useState([]); // ARMAZENAMENTO REPOSITORIOS
//   const [index, setIndex] = useState(-1); // ARMAZENAMENTO REPOSITORIOS

//   function handleSubmit(event) {
//     event.preventDefault();//BLOQUEANDO EVENTO

//     if (tarefas.indexOf(novaTarefa) !== -1) return; // Verificando tarefa existente

//     if (index === -1) {

//       setTarefas([...tarefas, novaTarefa]);// CRIANDO UMA NOVA TAREFA
//       setNovaTarefa('')

//     } else {//edita
//       setNovaTarefa([...tarefas])
//     }
//   }

//   function handleEdit(e, index) {
//     tarefas[index]
//     setNovaTarefa(tarefas);
//     setTarefas([...tarefas])

//   }

//   const handleDelete = (e, index) => {
//     tarefas.splice(index, 1);
//     setTarefas([...tarefas])
//   }

//   return (
//     <div className="main">
//       <h1>Lista de tarefas { }</h1>

//       <form onSubmit={handleSubmit} className="form">

//         <input
//           type="text"
//           value={novaTarefa}
//           onChange={(e) => setNovaTarefa([e.target.value])}
//         />

//         <button type="submit">
//           {<FaPlus size={20} />}
//         </button>
//       </form>

//       <ul className="tarefas">
//         {tarefas.map((tarefa, index) => (
//           <li
//             key={tarefa}>
//             {tarefa}
//             <span>
//               <FaEdit
//                 className="edit"
//                 onClick={(e) => { handleEdit(e, index) }}

//               />

//               <FaWindowClose
//                 onClick={(e) => { handleDelete(e, index) }}
//                 className="delete"
//               />
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )

// }

// export default Main;
