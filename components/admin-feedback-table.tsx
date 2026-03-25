"use client";
import { useState } from "react"

export default function AdminFeedbackTable({ posts }: { posts: any[] }) {
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    return <>Admin feedback table</>
}
