"use client"

import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Textarea } from "./ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { todoSchema, type TodoSchema } from "@/lib/zod";

import { useState } from "react";

import { mutate } from "swr";

import TodoForm from "./todo-form";

export default function CreateTodo() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);

    const form = useForm<TodoSchema>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: "",
            isCompleted: false,
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
                <Button className="m-2"> Nouvelle Tâche</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Créer une nouvelle tâche</DialogTitle>
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
                    }}
                    onSubmit={onSubmit}
                    submitButtonText="Create"
                    isSubmitting={isSubmitting} />
            </DialogContent>

        </Dialog>
    )
}