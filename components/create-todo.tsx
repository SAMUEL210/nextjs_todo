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

export default function CreateTodo() {
    const form = useForm<TodoSchema>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: "",
            isCompleted: false,
        }
    })

    const onSubmit = (data: TodoSchema) => {
        console.log(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="m-2"> Nouvelle Tâche</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Créer une nouvelle tâche</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isCompleted"
                            render={({ field }) => (
                                <FormItem className="flex flex-rows items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Marquer comme fait!</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">Créer une tâches</Button>
                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )
}