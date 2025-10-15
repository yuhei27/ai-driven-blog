import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function main(){
    try{
        await prisma.$connect();
    }catch(error){
        throw new Error("DB接続に失敗しました");
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try{
        await main();
        const posts = await prisma.post.findMany({orderBy: {date: "desc"}});
        return NextResponse.json({message: "Success", posts}, {status: 200, headers});
    }catch(err){
        console.error("GET Error:", err);
        return NextResponse.json(
            {message: "Error", error: err instanceof Error ? err.message : "記事の取得に失敗しました"}, 
            {status: 500, headers}
        );
    }finally{
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request, res: NextResponse) => {
    console.log("POST request received");

    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try{
        const body = await req.json();
        console.log("Request body:", { title: body.title, descriptionLength: body.description?.length });
        
        const {title, description} = body;
        
        // バリデーション
        if (!title || !description) {
            console.log("Validation failed:", { title: !!title, description: !!description });
            return NextResponse.json(
                {message: "Error", error: "タイトルと本文は必須です"}, 
                {status: 400}
            );
        }
        
        console.log("Connecting to database...");
        await main();
        console.log("Database connected, creating post...");
        
        const post = await prisma.post.create({data: {title, description}});
        console.log("Post created successfully:", { id: post.id, title: post.title });
        
        return NextResponse.json({message: "Success", post}, {status: 201, headers});
    }catch(err){
        console.error("POST Error:", err);
        console.error("Error stack:", err instanceof Error ? err.stack : 'No stack trace');
        return NextResponse.json(
            {message: "Error", error: err instanceof Error ? err.message : "投稿に失敗しました"}, 
            {status: 500, headers}
        );
    }finally{
        await prisma.$disconnect();
    }
}

export const OPTIONS = async (req: Request) => {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}