

// C:\Users\benbe\OneDrive\Desktop\AZUBI\TMP\g-client\src\app\api\auth\courses\route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Course } from '@/lib/types';

async function fetchCourses(): Promise<Course[]> {
  const courseUrl = 'https://tmp-se-project.azurewebsites.net/api/courses'; // note: removed extra slash
  const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
  if (!token) return [];

  const headers = {
    'Access-Control-Allow-Origin': 'https://lms-g-client.vercel.app',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const res = await fetch(courseUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch courses');
    const data = await res.json();
    // Ensure data matches Invoice[] structure
    return data as Course[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GET() {
  const courses = await fetchCourses();
  const response = NextResponse.json(courses);
  // Set the CORS header so your client can access this proxy response
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}