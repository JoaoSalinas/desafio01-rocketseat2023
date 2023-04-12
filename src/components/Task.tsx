import { Trash } from "phosphor-react";
import styles from "./Task.module.css";
import { InputHTMLAttributes } from "react";

interface TaskProps extends InputHTMLAttributes<HTMLInputElement>{
  id: string;
  title: string;
  isDone: boolean;
  onDeleteTask: (id: string) => void;
  onDoneTask: (id: string) => void;
}

export function Task({
  id,
  isDone = false,
  title,
  onDeleteTask,
  onDoneTask,
}: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleDoneTask() {
    onDoneTask(id);
  }

  return (
    <div className={styles.wrapper}>
      <input
        type="radio"
        name={title}
        id={id}
        value={id}
        checked={isDone}
        onChange={handleDoneTask}
        onClick={handleDoneTask}
      />
      <label htmlFor={id} className={isDone ? styles.checked : "" }>{title}</label>
      <Trash onClick={handleDeleteTask} />
    </div>
  );
}
