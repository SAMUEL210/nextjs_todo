'use client'

import CreateTodo from '@/components/create-todo';
import TodoList from '@/components/todo-list';
import { authClient } from "@/lib/auth-client" // import the auth client
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { states } from '@/lib/data';

export default function Home() {

  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  return (
    (isPending == false && session != null) ? (
      <div className="w-10/12 flex-col gap-10 mx-auto p-10">
        <div className="flex justify-between items-center">
          {(isPending == false && session != null) &&
            <CreateTodo userId={session.user.id} />
          }
        </div>
        <Tabs defaultValue="undone" className="max-w-xxl mx-auto mt-2">
          <TabsList className="grid w-full grid-cols-2 text-white bg-green-800">
            {(states) && states.map((state) => (
              <TabsTrigger key={state.id} value={state.state}>{state.title}</TabsTrigger>
            ))
            }
          </TabsList>
          {(states) && states.map((state) => (
            <TabsContent key={state.id} value={state.state}>
              <Card>
                <CardHeader>
                  <CardTitle>{state.title}</CardTitle>
                  <CardDescription>
                    {state.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <TodoList todoState={state.state} />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    ) : router.push('/login')
  )
}
