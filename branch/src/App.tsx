import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoard from "./taskBoard";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TaskBoard />
    </DndProvider>
  );
}

export default App;
