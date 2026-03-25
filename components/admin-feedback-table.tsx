"use client";
import { useState } from "react"

export default function AdminFeedbackTable({ posts }: { posts: any[] }) {
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [postStatus, setPostStatus] = useState<Record<string, string>>();
    return <>Admin feedback table</>
}
