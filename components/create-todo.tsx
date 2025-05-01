"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { todoSchema, type TodoSchema } from "@/lib/zod";
import { useState } from "react";
import { mutate } from "swr";
import TodoForm from "./todo-form";
import { Plus } from "lucide-react"

export default function CreateTodo({ userId }: { userId: string }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);

    const form = useForm<TodoSchema>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: "",
            isCompleted: false,
            userId: userId
        }
    })

    const onSubmit = async (data: TodoSchema) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData || "Impossible de créer la tâche"
                );
            }

            form.reset();
            setDialogOpen(false);
            mutate("/api/todos");
            setErrorMessage("");

        } catch (error) {
            console.error("Erreur lors de la création de la tâche", error);

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
                <Button className="bg-green-800 hover:bg-green-700"><Plus />Nouvelle Tâche</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Créer une nouvelle tâche</DialogTitle>
                    <DialogDescription>
                        Veuillez remplir les champs pour ajouter une taches
                    </DialogDescription>
                </DialogHeader>
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">
                        {errorMessage}
                    </div>
                )}
                <TodoForm
                    defaultValues={{
                        title: "",
                        description: "",
                        isCompleted: false,
                        userId: userId
                    }}
                    onSubmit={onSubmit}
                    submitButtonText="Créer"
                    isSubmitting={isSubmitting} />
            </DialogContent>

        </Dialog>
    )
}