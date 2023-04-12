import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import styles from "./Form.module.css";
import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./Task";
import { Empty } from "./Empty";


export interface TaskType {
  id: string;
  isDone: boolean;
  title: string;
  
}

export function Form() {
  const taskDefault: TaskType = { id: uuidv4(), isDone: false, title: "" };
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskText, setTaskText] = useState('');

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    setTasks([...tasks, {id: uuidv4(), isDone: false, title: taskText}]);
    setTaskText('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteTask(taskToDelete: string) {
    const taskWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskToDelete;
    });
    setTasks(taskWithoutDeletedOne);
  }

  function doneTask (taskToDelete: string) {    
    const taskToDone = tasks.find(task => task.id === taskToDelete)
    if(taskToDone){
      const tasksWithoutChangedOne = tasks.filter((task) => {
        return task.id !== taskToDelete;      
      })
      tasksWithoutChangedOne.push({id: taskToDone.id, title: taskToDone.title, isDone: !taskToDone.isDone})
      setTasks(tasksWithoutChangedOne)
      setIsSelected(taskToDone.isDone)
    }
  }

  const isNewTaskEmpty = taskText.length === 0;

  const [isSelected, setIsSelected] = useState(false)

  return (
    <>
      <form onSubmit={handleCreateTask} className={styles.wrapper}>
        <input
          required
          onChange={handleNewTaskChange}
          type="text"
          name="task"
          id="task"
          className={styles.input}
          placeholder="Adicione uma nova tarefa"
          value={taskText}
          onInvalid={handleNewTaskInvalid}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={isNewTaskEmpty}
        >
          Criar <PlusCircle size={16} />
        </button>
      </form>

      <div className={styles.wrapperList}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.blueText}>Tarefas criadas</h3>
          <span>{tasks.length}</span>
        </div>
        <div>
          <h3 className={styles.purpleText}>Concluídas</h3>
          <span>{tasks.filter(task => task.isDone === true).length} de {tasks.length}</span>
        </div>
      </header>      
    </div>

      <div className={styles.taskList}>
        {tasks.length === 0 ? <Empty/> :
        tasks.map((task) => {     
          console.log(task.isDone)
          return (
            <Task       
              id={task.id}       
              key={task.id}
              isDone={task.isDone}
              onDeleteTask={deleteTask}
              onDoneTask={doneTask}
              title={task.title}
              className={!!task.isDone ? styles.isSelected : "" }
            />
          );
        })}
      </div>

      
    </>
  );
}
