"use client"
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MessagesSquare, ThumbsUp, User } from "lucide-react";
import { STATUS_GROUPS } from "@/app/data/status-data";
import { Badge } from "./ui/badge";
import { getCategoryDesign } from "@/app/data/category-data";
import { Button } from "./ui/button";
import { toast } from "sonner";



const FeedbackList = ({ initialPosts, userId }:
    { initialPosts: any[]; userId: string | null }) => {

    const [posts, setPosts] = useState(initialPosts);

    async function handleVote(postId: any) {
        if (!userId) {
            toast.error("Please sign in to vote on feedack")
            return;
        }

        const loadingToast = toast.loading("Submitting vote...");
        try {
            const response = await fetch("/api/votes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId }),
            });

            if (!response.ok) {
                throw new Error("Failed to create post");
            }
            const data = await response.json();
            //Dismis loading toast and show success
            toast.dismiss(loadingToast);
            toast.success(data.voted ? "Vote added" : "Vote removed");

            //Update local state
            setPosts(posts.map((post) => {
                if (post.id === postId) {
                    const voteCount = post.votes.lenght;
                    return {
                        ...post,
                        votes: data.voted
                            ? [...post.vote, { userId }]
                            : post.vote.filter((v: any) => v.userId !== userId),
                        _count: {
                            votes: data.voted ? voteCount + 1 : voteCount - 1,
                        }
                    }
                }
                return post;
            }))
        } catch (error) {
            console.error(error);
            toast.dismiss(loadingToast);
            toast.error("Failed to submit vote. Please try again");

        }
    }


    return (
        <div className="space-y-4">

            {posts.map((post) => (
                <Card className="hover:shadow-md transition-shadow border">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg">{post.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1.5  mt-1">
                                    <User className="h-3 w-3" />
                                    {post.author.name}
                                    <span>|</span>
                                    <span className="whitespace-nowrap">
                                        {formatDistanceToNow(new Date(post.createdAt), {
                                            addSuffix: true,
                                        })}
                                    </span>
                                </CardDescription>
                            </div>
                            <div className="flex gap-1.5">
                                {/* Status Badge */}
                                {(() => {
                                    const statusGroup = STATUS_GROUPS[post.status as keyof typeof STATUS_GROUPS];
                                    if (!statusGroup) return null;
                                    const StatusIcon = statusGroup.icon;
                                    return (
                                        <Badge className={`${statusGroup.countColor} border ${statusGroup} flex items-center gap-1`}>
                                            <StatusIcon className="h-3 w-3" />
                                            {statusGroup.title}
                                        </Badge>
                                    )
                                })()}
                                {/* Category */}
                                {(() => {
                                    const design = getCategoryDesign(post.category);
                                    const Icon = design.icon;

                                    return (

                                        <Badge className={`${design.light} ${design.text}  border flex items-center gap-1`}>
                                            <Icon className="h-3 w-3" />
                                            {post.category}
                                        </Badge>

                                    );
                                })()}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-3">
                            {post.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <Button variant="outline" size="sm" onClick={() => handleVote(post.id)}>
                                <ThumbsUp className={`h-4 w-4 ${post.votes.some((v: any) => v.userId === userId)
                                    ? "fill-current"
                                    : ""
                                    }`} />
                                <span>{post.votes.length} Vote</span>
                            </Button>
                            <div className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <MessagesSquare className="h-4 w-4" />
                                comment
                            </div>
                        </div>
                    </CardContent>
                </Card>

            ))}

        </div>
    )
}

export default FeedbackList
