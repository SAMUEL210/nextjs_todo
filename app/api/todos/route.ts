import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';

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