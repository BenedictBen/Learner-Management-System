
// C:\Users\benbe\OneDrive\Desktop\AZUBI\TMP\g-client\src\app\api\auth\courses\route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Course } from '@/lib/types';

async function fetchInvoices(): Promise<Course[]> {
  const courseeUrl = 'https://tmp-se-project.azurewebsites.net/api/courses'; // note: removed extra slash
  const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
  if (!token) return [];

  try {
    const res = await fetch(courseeUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch invoices');
    const data = await res.json();
    // Ensure data matches Invoice[] structure
    return data as Course[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GET() {
  const courses = await fetchInvoices();
  return NextResponse.json(courses);
}
