"use client"
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { User } from "lucide-react";
import { STATUS_GROUPS } from "@/app/data/status-data";
import { Badge } from "./ui/badge";
import { getCategoryDesign } from "@/app/data/category-data";


const FeedbackList = ({ initialPosts, userId }:
    { initialPosts: any[]; userId: string | null }) => {

    const [posts, setPosts] = useState(initialPosts)

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
                </Card>

            ))}

        </div>
    )
}

export default FeedbackList
