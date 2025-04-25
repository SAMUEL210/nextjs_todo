'use client'

import CreateTodo from '@/components/create-todo';
import TodoList from '@/components/todo-list';
import { authClient } from "@/lib/auth-client" // import the auth client
import { redirect } from 'next/navigation';

const states = [
  {
    state: "undone",
    title: "TACHES"
  },
  {
    state: "done",
    title: "TACHES FAITES"
  }
];

export default function Home() {
  const { data: session, isPending } = authClient.useSession()
  if (isPending == false && session == null) {
    redirect('/login')
  }

  return (
    <div className="max-w-7x1 flex-col gap-10 mx-auto p-10">
      <div className="flex justify-between items-center">
        <CreateTodo />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>{
        (states) &&
        states.map((state) => (
          <div key={state.state}>
            <h1 className="text-4x1 font-bold pb-5">{state.title}</h1>
            <div className='p-5 border border-1 border-black rounded-lg'>
              <TodoList todoState={state.state} />
            </div>
          </div>
        ))
      }
      </div>
    </div>
  );
}
