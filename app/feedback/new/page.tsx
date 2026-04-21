
import NewFeedbackForm from "@/components/NewFeedbackForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const NewFeedbackPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }
 

    return <NewFeedbackForm/>
}

export default NewFeedbackPage
