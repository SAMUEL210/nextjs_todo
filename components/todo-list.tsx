"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Todo } from "@prisma/client";

import useSWR from 'swr';

import DeleteTodo from "./delete-todo";
import UpdateTodo from "./update-todo";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface TodoListProps {
    todoState: string
}

export default function TodoList({ todoState }: TodoListProps) {
    const { data: todos, error, isLoading } = useSWR<Todo[]>("/api/todos", fetcher);

    if (isLoading) return (
        <div className="flex justify-center items-center h-40 bg-white">
            <div className="relative w-12 h-12">
                <div className="absolute w-12 h-12 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute w-12 h-12 border-4 border-primary rounded-full animate-ping opacity-25"></div>
            </div>
        </div>
    );

    if (error) return <div>Echec lors du chargement des tâches</div>

    let todosList = todos || [];
    if (todoState == "undone") {
        todosList = todosList.filter((todo) => todo.isCompleted == false);
    }
    if (todoState == "done") {
        todosList = todosList.filter((todo) => todo.isCompleted == true)
    }
    return (
        <div className="space-y-4">
            {todosList.length === 0 ? (
                <Card>
                    <CardContent className="text-center px-10">
                        <p className="text-muted-foreground">
                            Toutes les taches ont été faites!
                        </p>
                    </CardContent>
                </Card>
            ) : (
                todosList.map((todo) => (
                    <Card className="group relative" key={todo.id}>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <UpdateTodo todo={todo} />
                            <DeleteTodo id={todo.id} />
                        </div>
                        <CardHeader>
                            <CardTitle>
                                <span className={todo.isCompleted ? "line-through" : ""}>
                                    {todo.title}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        {todo.description && (
                            <CardContent>
                                <p>{todo.description}</p>
                            </CardContent>
                        )}
                    </Card>
                ))
            )}
        </div>
    )
}