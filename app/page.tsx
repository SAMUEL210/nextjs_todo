import CreateTodo from '@/components/create-todo';
import TodoList from '@/components/todo-list';

export default function Home() {
  return (
    <div className="max-w-7x1 flex-col gap-10 mx-auto p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4x1 font-bold">TÂCHES</h1>
        <CreateTodo />
      </div>
      <TodoList />
    </div>
  );
}
