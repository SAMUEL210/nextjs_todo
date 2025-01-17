"use client"

import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { type TodoSchema } from "@/lib/zod";

import { useState } from "react";

import { mutate } from "swr";

import TodoForm from "./todo-form";

import { PencilIcon } from "lucide-react";

import { Todo } from "@prisma/client";

export default function UpdateTodo({ todo }: { todo: Todo }) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);

    const onSubmit = async (data: TodoSchema) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/todos", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, id: todo.id })
            });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData || "Impossible de modifier la tâche"
                );
            }

            setErrorMessage("");
            setDialogOpen(false);
            mutate("/api/todos");

        } catch (error) {
            console.error("Erreur lors de la modification de la tâche", error);

            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Une erreur inattendu s'est produite"

            setErrorMessage(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="mr-1 text-blue-500 bg-blue-100 hover:text-700 hover:bg-blue-200"
                >
                    <PencilIcon className=" h-4 w-4" />

                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Modifier la tache</DialogTitle>
                </DialogHeader>
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">
                        {errorMessage}
                    </div>
                )}
                <TodoForm
                    defaultValues={{
                        title: todo.title,
                        description: todo.description,
                        isCompleted: todo.isCompleted,
                    }}
                    onSubmit={onSubmit}
                    submitButtonText="Modifier"
                    isSubmitting={isSubmitting} />
            </DialogContent>

        </Dialog>
    )

}
