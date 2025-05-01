"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Todo } from "@prisma/client";
import useSWR from 'swr';
import DeleteTodo from "./delete-todo";
import UpdateTodo from "./update-todo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";



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
                    {(todoState == "undone" ? (
                        <CardContent className="text-center px-10">
                            <p className="text-muted-foreground">
                                Aunce tâche n&apos;a été ajoutée !
                            </p>
                        </CardContent>) :
                        <CardContent className="text-center px-10">
                            <p className="text-muted-foreground">
                                Aucune tâche n&apos;a été accomplie !
                            </p>
                        </CardContent>)
                    }
                </Card>
            ) : (
                <Accordion type="single" collapsible className="w-full">
                    {
                        todosList.map((todo) => (
                            <div key={todo.id} className="max-w-full flex flex-row gap-2 items-center justify-center">
                                <div>
                                    <UpdateTodo todo={todo} />
                                    {(todo.isCompleted != true) &&
                                        <DeleteTodo id={todo.id} />
                                    }
                                </div>
                                <AccordionItem value={todo.id} className="w-4/5 shadow-lg px-2 rounded-sm">
                                    <AccordionTrigger className={todo.isCompleted ? " font-bold  text-lg line-through hover:line-through" : "font-bold text-lg"}>{todo.title}</AccordionTrigger>
                                    <AccordionContent className="italic">
                                        {todo.description}
                                    </AccordionContent>
                                </AccordionItem>
                            </div>

                        ))
                    }
                </Accordion>
            )}
        </div>
    )
}