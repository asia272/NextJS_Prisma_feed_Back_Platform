import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { syncCurrentUser } from "@/lib/sync-user";

export async function POST(req: NextRequest) {

    try {

        const dbUser = await syncCurrentUser();
        if (!dbUser) {
            return NextResponse.json({ error: "Unautherized" }, { status: 401 })
        }

        const body = await req.json();
        const { postId } = body;

        if (!postId) {
            return NextResponse.json(
                { error: "Post Id is required" },
                { status: 400 })
        }

        // Check if vote already exsit
        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_postId: {
                    userId: dbUser.id,
                    postId
                }
            }
        })
        //if exist then remove
        if (existingVote) {
            //Remove vote(toggling)
            await prisma.vote.delete({ where: { id: existingVote.id } })
            return NextResponse.json({ voted: false })
        } else {
            const vote = await prisma.vote.create({
                data: {
                    userId: dbUser.id,
                    postId
                }
            })
            console.log(vote)
            return NextResponse.json({ voted: true })
        }


    } catch (error) {
        console.error("Error toggling vote:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 })
    }

}