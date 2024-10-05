import prisma from '@/lib/prisma';

import { todoSchema } from '@/lib/zod';

import { NextRequest, NextResponse } from 'next/server';


export async function GET(){
    try {
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(todos);
    }catch (error){
        console.error('Erreur lors du chargement: ', error);
        return NextResponse.json({message: "Une erreur innattendu s'est produit"}, {status: 500});      
    }
}

export async function POST( request: NextRequest){
    try{
        const body = await request.json();
        const result = todoSchema.safeParse(body);
        
        if(!result.success){
            return NextResponse.json({ message:"Champs invalid", errors: result.error.errors}, {status: 400})
        }

        const todoData = result.data;
        const newTodo = await prisma.todo.create({
            data: {
                title: todoData.title,
                description: todoData.description || '',
                isCompleted: todoData.isCompleted,
            }
        });

        return NextResponse.json(newTodo, {status: 201});

    }catch(error){
        console.error('Erreur lors de la creation: ', error);
        return NextResponse.json({message: "Une erreur innattendu s'est produit"}, {status: 500});
    }
}

export async function DELETE(request: NextRequest){
    try{
        const id = request.nextUrl.searchParams.get('id');
        if(!id){
            return NextResponse.json({message: "Id de la tâche est requise!"}, {status: 400});
        }

        const deleteTodo = await prisma.todo.delete({
            where: {id},
        });

        if(!deleteTodo){
            return NextResponse.json({message: "Tâche non trouvé"}, {status: 404});
        }

        return NextResponse.json({message: "Tâche supprimé avec succès"}, {status: 200});

    }catch(error){
        console.error("Erreur lors de la suppression de la tâche : ", error);
        return NextResponse.json({message: "Une erreur inattendu s'est produite"}, {status: 500});
    }
}