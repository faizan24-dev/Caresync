import { NextResponse } from 'next/server';

export async function GET(request) {
  // 1. Tell Next.js to redirect the user back to the home page ('/')
  const response = NextResponse.redirect(new URL('/', request.url));
  
  // 2. Delete the secure cookie by setting it to empty and its maxAge to 0
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0), // Instantly expires the cookie
    path: '/',
  });

  return response;
}