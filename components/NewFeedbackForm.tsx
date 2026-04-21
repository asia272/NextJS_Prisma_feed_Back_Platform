"use client";

import { CATEGORIES_TYPES } from "@/app/data/category-data";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const NewFeedbackForm =() => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  // Server action function
  async function submitFeedback(formData: FormData) {
    setIsSubmitting(true); // start loading

    const loadingToast = toast.loading("Submitting your feedback...");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          category: formData.get("category"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      toast.dismiss(loadingToast);
      toast.success("Your feedback has been submitted successfully");
      //  Redirect to /feedback
      router.push("/feedback");
      return true;
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong.");
      return false;
    } finally {
      setIsSubmitting(false); // stop loading
    }
  }

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
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              await submitFeedback(formData).then((success: boolean) => {
                if (success) {
                  form.reset();
                }
              });
            }}
            className="space-y-6"
          >
            {/* title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="What would you like to see ?"
                required
              />
            </div>
            {/* catergory */}
            <div className="space-y-2">
              <Label htmlFor="category">Cateroy</Label>
              <select
                name="category"
                id="category"
                className="w-full px-3 py-2 border rounded-md bg-background"
                defaultValue={CATEGORIES_TYPES[0]}
              >
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
              <Button type="button" variant="outline">
                <Link href="/feedback">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewFeedbackForm;
