
// C:\Users\benbe\OneDrive\Desktop\AZUBI\TMP\g-client\src\app\api\auth\invoices\route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Invoice } from '@/lib/types';

async function fetchInvoices(): Promise<Invoice[]> {
  const invoiceUrl = 'https://tmp-se-project.azurewebsites.net/api/invoices'; // note: removed extra slash
  const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
  if (!token) return [];

  try {
    const res = await fetch(invoiceUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch invoices');
    const data = await res.json();
    // Ensure data matches Invoice[] structure
    return data as Invoice[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GET() {
  const invoices = await fetchInvoices();
  return NextResponse.json(invoices);
}
