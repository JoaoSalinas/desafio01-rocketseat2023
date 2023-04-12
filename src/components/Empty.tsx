import styles from "./Empty.module.css";
import { Clipboard } from "phosphor-react";

export function Empty() {
  return (
    <div className={styles.wrapper}>
      <Clipboard size={56} />
      <div className={styles.content}>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  );
}
