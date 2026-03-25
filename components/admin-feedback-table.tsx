"use client";
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

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
                </Table>
            </CardContent>
        </Card>
    )
}
