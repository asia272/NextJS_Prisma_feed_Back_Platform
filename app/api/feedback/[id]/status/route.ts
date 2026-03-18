import { STATUS_ORDER } from "@/app/data/status-data";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { stat } from "fs";
import { STATIC_STATUS_PAGES } from "next/dist/shared/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
    try {
        // 1 check if user exist
        const dbUser = await currentUser();
        if (!dbUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        //2 check is this user is admin
        const user = await prisma.user.findUnique({
            where: { clerkUserId: dbUser.id }
        })
        if (!user || user.role !== "admin") {
            return NextResponse.json(
                {
                    error: "Admin access required"
                }, {
                status: 403
            }
            )
        }

        const { status } = await req.json();
        const { id: postId } = await params;

        //3 Check Valitdate status
        if (!STATUS_ORDER.includes(status)) {
            return NextResponse.json({ error: "Invalid Status" }, { status: 400 })
        }

        //4 If every thing is ok then update
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                status
            },
            include: {
                author: true,
                votes: true
            }
        })
        return NextResponse.json(updatedPost)
    } catch (error) {
        console.error("Error updating post status:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 })
    }
}