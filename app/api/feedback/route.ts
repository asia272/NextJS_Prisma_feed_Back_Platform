import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {
        // 1 check if user exist
        const dbUser = await currentUser();
        if (!dbUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        //2 get data from body
        const body = await req.json();
        const { title, description, category } = body;

        const post = await prisma.post.create({
            data: {
                title,
                description,
                category,
                content:"",
                authorId:dbUser.id
            }
        })
        console.log("post create succfully:", post)
        return NextResponse.json(post);
    } catch (error) {
        console.error("Error creating post:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 })
    }
}

// Get
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                votes: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json(posts)
    } catch (error) {
        console.error("Error fetching posts: ", error)
        return NextResponse.json({ error: "Internal server" }, { status: 500 });
    }
}

