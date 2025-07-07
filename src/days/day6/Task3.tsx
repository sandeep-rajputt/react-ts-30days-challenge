import SimpleButton from "@src/components/SimpleButton";
import { useState, useRef, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
}

const STORAGE_KEY = "kanban_tasks";

function Task3() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const draggedIndex = useRef<number | null>(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "");
    if (storedData) {
      setTasks(() => [...storedData]);
    }
    console.log(storedData);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAdd = () => {
    if (!title.trim() || !description.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks([...updatedTasks]);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    draggedIndex.current = index;
  };

  const handleDrop = (index: number) => {
    if (
      draggedIndex.current === null ||
      draggedIndex.current === index ||
      draggedIndex.current < 0 ||
      draggedIndex.current >= tasks.length
    )
      return;

    const updated = [...tasks];
    const [moved] = updated.splice(draggedIndex.current, 1);
    updated.splice(index, 0, moved);
    setTasks(updated);
    draggedIndex.current = null;
  };

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Kanban Column</h1>
          <p className="opacity-70 mt-3">Drag and drop to reorder tasks</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="w-full flex flex-col gap-3 rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10"
        >
          <h2 className="text-2xl font-semibold">Add New Task</h2>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full focus:outline-none border mt-3 border-white/30 rounded-md px-2 py-1"
            required
          />
          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full focus:outline-none border mt-3 border-white/30 rounded-md px-2 py-1"
            required
          />
          <SimpleButton className="w-fit px-10">Add</SimpleButton>
        </form>

        <div className="w-full flex flex-col gap-3 rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <h2 className="text-2xl font-semibold">To Do</h2>
          {tasks.length === 0 ? (
            <p className="text-sm opacity-60">No tasks added yet.</p>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(index);
                }}
                className="border-2 group relative p-5 rounded-md border-white/30 cursor-grab bg-[#495057] hover:bg-[#6c757d] transition"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                  <p className="text-sm">{task.description}</p>
                  <SimpleButton
                    handleClick={() => handleDelete(index)}
                    className="absolute top-1 right-1 group-hover:opacity-100 opacity-0 transition-opacity"
                  >
                    Delete
                  </SimpleButton>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Task3;
