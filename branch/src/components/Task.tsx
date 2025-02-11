import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";

interface TaskProps {
  id: string;
  text: string;
  x: number;
  y: number;
  isNew: boolean;
  onRename: (id: string, newText: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}

const Task: React.FC<TaskProps> = ({ id, text, x, y, isNew, onRename, onMove }) => {
  const [editing, setEditing] = useState(isNew);
  const [newText, setNewText] = useState(isNew ? "" : text);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id, x, y },
    end: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        onMove(item.id, offset.x, offset.y);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isNew) {
      setEditing(true);
    }
  }, [isNew]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  const saveName = () => {
    const trimmedText = newText.trim();
    const finalText = trimmedText.length > 0 ? trimmedText : "Ny opgave";

    setNewText(finalText); // Opdater state
    setEditing(false);
    onRename(id, finalText); // Opdater global state
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveName();
    }
  };

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: x,
        top: y,
        padding: "8px",
        background: "#1E3A8A",
        color: "white",
        borderRadius: "4px",
        cursor: "grab",
        userSelect: "none",
        minWidth: "100px",
        opacity: isDragging ? 0.5 : 1,
      }}
      onDoubleClick={handleDoubleClick} // Dobbeltklik for at redigere navnet
    >
      {editing ? (
        <input
          type="text"
          value={newText}
          onChange={handleChange}
          onBlur={saveName}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            width: "100%",
            color: "white",
          }}
        />
      ) : (
        <div>{newText}</div>
      )}
    </div>
  );
};

export default Task;
