import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Learner } from '@/lib/types';

async function fetchAllLearners(): Promise<Learner[]> {
  const learnerUrl = 'https://tmp-se-project.azurewebsites.net/api/learners';
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) return [];

  try {
    const res = await fetch(learnerUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch learners');
    return await res.json();
  } catch (error) {
    console.error('Error fetching learners:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseFilter = searchParams.get('course');
  const searchQuery = searchParams.get('search');

  // Fetch all learners from external API
  const allLearners = await fetchAllLearners();

  // Apply filters locally
  let filteredLearners = allLearners;

  // 1. Apply course filter
  if (courseFilter && courseFilter !== 'all') {
    filteredLearners = filteredLearners.filter(
      learner => learner.course === courseFilter
    );
  }

  // 2. Apply search filter
  if (searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    filteredLearners = filteredLearners.filter(learner =>
      learner.firstname.toLowerCase().includes(searchLower) ||
      learner.lastname.toLowerCase().includes(searchLower) ||
      learner.course.toLowerCase().includes(searchLower) ||
      learner.email.toLowerCase().includes(searchLower)
    );
  }

  // Transform image URLs
  const processedData = filteredLearners.map(learner => ({
    ...learner,
    image: learner.image?.includes("example.com") ? "/john.png" : learner.image,
  }));

  return NextResponse.json(processedData);
}