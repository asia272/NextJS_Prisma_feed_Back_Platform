import { currentUser } from '@clerk/nextjs/server'
import prisma from './prisma';

export async function syncCurrentUser() {

    try {
        const activeUser = await currentUser();

        if (!activeUser) {
            return null
        }

        const activeUserEmail = activeUser.emailAddresses?.[0]?.emailAddress;

        if (!activeUserEmail) {
            throw new Error("User email not found");
        }
        // Check if User exist is DB
        let dbUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { clerkUserId: activeUser.id },
                    { email: activeUserEmail }
                ]
            }
        })

        //if user exist then update
        if (dbUser) {
            dbUser = await prisma.user.update({
          where: { id: dbUser.id }
                data: {
                    email: activeUserEmail,
                    name: `${activeUser.firstName || ""} ${activeUser.lastName || ""}`.trim(),
                    image: activeUser.imageUrl,
                },
            })
        } else {
            //if user is not exist then create new user
            //Check if this is first user then make it admin

            const userCount = await prisma.user.count();
            const isFirstUser = userCount === 0;//get first user

            dbUser = await prisma.user.create({
                data: {
                    clerkUserId: activeUser.id,
                    email: activeUserEmail,
                    name: `${activeUser.firstName || ""} ${activeUser.lastName || ""}`.trim(),
                    image: activeUser.imageUrl,
                    role: isFirstUser ? "admin" : "user",
                }
            })
            console.log(`New user created: ${activeUserEmail} with role: ${dbUser.role}`)
        }


        return dbUser
    } catch (error) {
        console.error("error syncing user from clerk:", error)
        throw error;
    }
}