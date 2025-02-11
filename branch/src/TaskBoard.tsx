import { useState } from "react";
import { useDrop } from "react-dnd";
import Task from "./components/Task"; // Korrekt sti til Task.tsx

interface TaskType {
  id: string;
  text: string;
  x: number;
  y: number;
  isNew: boolean;
}

const TaskBoard = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useDrop(() => ({
    accept: "TASK",
  }));

  const addTask = (e: React.MouseEvent) => {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      text: "Ny opgave",
      x: e.clientX,
      y: e.clientY,
      isNew: true, // Start i redigeringstilstand
    };
    setTasks([...tasks, newTask]);
  };

  const renameTask = (id: string, newText: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText, isNew: false } : task
      )
    );
  };

  const moveTask = (id: string, x: number, y: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, x, y } : task))
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "#f0f0f0",
      }}
      onClick={addTask} // Klik et sted på boardet opretter en opgave
    >
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onRename={renameTask}
          onMove={moveTask}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
