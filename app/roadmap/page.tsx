import { GradientHeader } from '@/components/gradient-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import prisma from '@/lib/prisma'
import { BarChart3, Target } from 'lucide-react';
import { STATUS_GROUPS, STATUS_ORDER } from '../data/status-data';


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
  //get  posts based on status  
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
        <Card className='border-l4 border-l-blue-500'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Toatl Features</p>
                <p className='text-3xl font-bold'>{posts.length}</p>
              </div>
              <Target className='h-20 w-10 text-blue-500' />
            </div>
          </CardContent>
        </Card>
        <Card className='border-l4 border-l-purple-500'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Toatl Votes</p>
                <p className='text-3xl font-bold'>{totalVotes}</p>
              </div>
              <BarChart3 className='h-20 w-10 text-purple-500' />
            </div>
          </CardContent>
        </Card>
        <Card className='border-l4 border-l-green-500'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Completed</p>
                <p className='text-3xl font-bold'>
                  {groupedPosts.completed.length}
                </p>
              </div>
              <BarChart3 className='h-20 w-10 text-green-500' />
            </div>
          </CardContent>
        </Card>
        <Card className='border-l4 border-l-yellow-500'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Average Votes</p>
                <p className='text-3xl font-bold'>{avergeVotes}</p>
              </div>
              <BarChart3 className='h-20 w-10 ' />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Overall  Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Roadmap Progress</CardTitle>
          <CardDescription>
            Track the journey from idea to completion
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span>Overall completion</span>
              <span className='font-medium'>
                {completedPercentage}
              </span>
            </div>
            <Progress value={completedPercentage} className='h-2' />
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400'>
                {inProgressPercentage}%
              </div>
              <span className='text-sm text-muted-foreground'>Inprogress</span>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                {plannedPercentage}%
              </div>
              <span className='text-sm text-muted-foreground'>Planned</span>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600 dark:text-green-400'>{completedPercentage}%</div>
              <span className='text-sm text-muted-foreground'>Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* roadmap Columns */}
      <div className='lg:grid-cols-4 grid grid-cols-1 gap-4'>
        {STATUS_ORDER.map((status) => {
          const group = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
          const Icon = group.icon;
          const postsInGroup = groupedPosts[status as keyof typeof groupedPosts];
          return (
            <div key={status} className='space-y-4'>
              <div className={`rounded-lg p-4 ${group.bgColor} border ${group.color}`}>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <Icon className={`h-5 w-4 ${group.textColor}`} />
                    <h2 className={`${group.textColor}`}>{group.title}</h2>
                  </div>
                  <Badge variant="secondary" className={group.countColor}>
                    {postsInGroup.length}
                  </Badge>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {group.description}
                </p>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}




export default page
