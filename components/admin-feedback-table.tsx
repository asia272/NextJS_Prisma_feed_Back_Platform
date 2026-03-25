"use client";
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { getCategoryDesign } from "@/app/data/category-data";
import { Badge } from "./ui/badge";

export default function AdminFeedbackTable({ posts }: { posts: any[] }) {
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [postStatus, setPostStatus] = useState<Record<string, string>>(
        Object.fromEntries(posts.map((post) => [post.id, post.status]))
    );
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
                            const categoryDesign = getCategoryDesign(post.category)
                            const CategoryIcon = categoryDesign.icon;
                            return (
                                <TableRow key={post.id} className="h-17.5">
                                    <TableCell className="font-medium max-w-xs truncate align-middle">
                                        {post.title}
                                    </TableCell>
                                    <TableCell className="align-middle">
                                        <Badge variant="outline" className={`${categoryDesign.text} ${categoryDesign.border}`}>
                                            {post.category}
                                        </Badge>
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
