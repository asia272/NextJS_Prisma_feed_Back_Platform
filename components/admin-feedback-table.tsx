"use client";
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { getCategoryDesign } from "@/app/data/category-data";
import { Badge } from "./ui/badge";
import { ThumbsUp, User } from "lucide-react";
import { STATUS_GROUPS } from "@/app/data/status-data";

export default function AdminFeedbackTable({ posts }: { posts: any[] }) {
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [postStatus, setPostStatus] = useState<Record<string, string>>(
        Object.fromEntries(posts.map((post) => [post.id, post.status]))
    );
    const getStatusIcon = (status: string) => {
        const statusGroup = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
        if (!statusGroup) return null;
        const Icon = statusGroup.icon;
        return <Icon className="h-3 w-3 mr-1" />
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Feedback</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Votes</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => {
                            const isEditing = editingPostId === post.id;
                            const currentStatus = postStatus[post.id];
                            const categoryDesign = getCategoryDesign(post.category)
                            const CategoryIcon = categoryDesign.icon;
                            return (
                                <TableRow key={post.id} className="h-17.5">
                                    <TableCell className="font-medium max-w-xs truncate align-middle">
                                        {post.title}
                                    </TableCell>
                                    <TableCell className="align-middle">
                                        <Badge variant="outline" className={`${categoryDesign.text} ${categoryDesign.border}`}>
                                            <CategoryIcon className={`h-3 w-3 `} />
                                            {post.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="align-middle">
                                        <div className="flex items-center gap-2">
                                            <ThumbsUp className="h-3 w-3" />
                                            {post.votes.length}
                                        </div>
                                    </TableCell>
                                    <TableCell className="align-middle">
                                        <div className="flex items-center gap-2">
                                            <User className="h-3 w-3" />
                                            <span className="truncate max-w-[100px]">
                                                {post.author.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="align-middle">
                                        {isEditing ? <></> :
                                            <Badge
                                                variant="outline"
                                                className={`flex items-center gap-2 
                                                    ${STATUS_GROUPS[
                                                        currentStatus as keyof typeof STATUS_GROUPS
                                                    ]?.countColor
                                                    }`}
                                            >
                                                {getStatusIcon(currentStatus)}
                                            </Badge>
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
