import { GradientHeader } from '@/components/gradient-header'
import prisma from '@/lib/prisma'
import React from 'react'


function getStatusPercentage(posts: any, status: string) {
  const totalPosts = posts.length;
  const statusCount = posts.filter(
    (p: { status: string }) => p.status === status,
  ).length;
  console.log(
    `Total : ${totalPosts}, count: ${statusCount}, per: ${totalPosts > 0 ? Math.round((statusCount / totalPosts) * 100) : 0}`,
  );
  return totalPosts > 0 ? Math.round((statusCount / totalPosts) * 100) : 0;
}
const page = async () => {


  const posts = await prisma.post.findMany({
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      votes: {
        _count: "desc"
      }
    }
  })
  //get all posts base on status  
  const groupedPosts = {
    under_review: posts.filter((p) => p.status === "under_review"),
    planned: posts.filter((p) => p.status === "planned"),
    in_progress: posts.filter((p) => p.status === "in_progress"),
    completed: posts.filter((p) => p.status === "completed"),
  };
  //Count vote of all posts
  const totalVotes = posts.reduce((acc, post) => acc + post.votes.length, 0);
  const avergeVotes = posts.length > 0 ? Math.round(totalVotes / posts.length) : 0;

  // Calculate progress for the overall roadmap
  const completedPercentage = getStatusPercentage(posts, "completed");
  const inProgressPercentage = getStatusPercentage(posts, "in_progress");
  const plannedPercentage = getStatusPercentage(posts, "planned");
  
  return (
    <div className='space-8'>
      <GradientHeader title='Product Roadmap'
        subtitle="See what we' re working on, what's coming next, and track our
      progress"
      />
      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6'>

      </div>
      {/* Overall  Progress */}
      {/* roadmap Columns */}


    </div>
  )
}




export default page
