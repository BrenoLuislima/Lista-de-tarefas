import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");

    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });
  const [texto, setTexto] = useState("");
  const [excluindo, setExcluindo] = useState(null);
  function excluirTarefa(id) {
    setExcluindo(id);

    setTimeout(() => {
      setTarefas(
        tarefas.filter((tarefa) => tarefa.id !== id)
      );
      setExcluindo(null);
    }, 400);
  }

  function adicionarTarefa() {
    console.log("Texto digitado:", texto);
    if (texto.trim() !== "") {
      console.log("Lista antes de adicionar:", tarefas);
      setTarefas([...tarefas, {

        id: Date.now(),
        texto: texto,
        concluida: false
      }]);
      console.log("Lista antes de adicionar:", tarefas);
      setTexto("");
    }
  }

  function concluirTarefa(id) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;
  console.log("Renderização — total:", tarefas.length);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  return (
    <div className="menu">
      <h1>Minhas tarefas <span>{concluidas}/{tarefas.length} Progresso</span> </h1>
      <div className="entrada-tarefa">
        <input type="text" placeholder="Digite uma tarefa" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
      <ul className="lista-tarefas">

        {tarefas.map((tarefa) => (
          <li className={`tarefa ${tarefa.id === excluindo ? "saindo" : ""}`}
            key={tarefa.id}>
            <button className="concluir" onClick={() => concluirTarefa(tarefa.id)}>✓</button>

            <span className={tarefa.concluida ? "concluida" : ""}>{tarefa.texto}</span>

            <button className="excluir" onClick={() => excluirTarefa(tarefa.id)}>🗑️</button>
          </li>
        ))}

      </ul>
    </div>
  );
}
export default App;