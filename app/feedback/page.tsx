"use client"
import { GradientHeader } from '@/components/gradient-header'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { Map, PlusIcon } from 'lucide-react'
import Link from 'next/link'

const page = async () => {

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const categories = await prisma.post.groupBy({
    by: ["category"],
    _count: true,
  });


  return (

    <>
      <div className='space-6'>
        <GradientHeader
          title='Community Feedback'
          subtitle="Explore, vote, and contribute to the features that matter most. Your voice shapes our product's future."
        >

          <div className="flex gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/feedback/new">
                <PlusIcon className="ml-2 h-4 w-4" />
                New Feedback
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-100"
            >
              <Link href="/roadmap">
                <Map className="ml-2 h-4 w-4" />
                View Roadmap
              </Link>
            </Button>
          </div>
        </GradientHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* sidebar */}
          <div className="lg:col-span-1 space-y-6">

          </div>
          {/* Main Content */}
          <div className="lg:col-span-3"></div>
        </div>
      </div>

    </>
  )
}

export default page
