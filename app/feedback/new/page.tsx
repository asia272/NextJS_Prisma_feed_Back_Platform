import { CATEGORIES_TYPES } from "@/app/data/category-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Link } from "lucide-react"



const NewFeedbackPage = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/feedback">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold"> Share your feedback</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>New Feedback</CardTitle>
                    <CardDescription>
                        Share your idea with the community. Be specific about what you'd
                        like to see.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        {/* title */}
                        <div className="space-y-2" >
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="What would you like to see ?"
                                required />
                        </div>
                        {/* catergory */}
                        <div className="space-y-2" >
                            <Label htmlFor="cateroy">Cateroy</Label>
                            <select
                                name="cateroy"
                                id="cateroy"
                                className="w-full px-3 py-2 border rounded-md bg-background"
                                defaultValue={CATEGORIES_TYPES[0]}>
                                {CATEGORIES_TYPES.map((category) => (
                                    <option key={category} value={category}>
                                        {" "}
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe your idea in detail..."
                                required
                            />
                        </div>
                        {/* Buttons */}
                        <div className="flex gap-4">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Submitting" : "Submit Feedback"}
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href="/feedback">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewFeedbackPage
