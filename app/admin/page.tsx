import { GradientHeader } from '@/components/gradient-header';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';



const page = async () => {
    const { userId } = await auth();

    // check is user register
    if (!userId) {
        redirect("/sign-in")
    }
    // check is user admin
    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    })
    if (!user || user.role !== "admin") {
        redirect("/")
    }
    // all posts
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            votes: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <div className='container mx-auto'>
            <GradientHeader title='Admin Dashboard' subtitle='Manage feedbacks and update their status'>

            </GradientHeader>
        </div>
    )
}

export default page
