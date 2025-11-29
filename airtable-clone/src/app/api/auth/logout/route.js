import { auth } from '../../../../server/auth-simple';

export async function POST(req) {
  try {
    const cookie = req.headers.get('cookie');
    if (cookie) {
      const sessionCookie = cookie.split(';').find(c => c.trim().startsWith('session='));
      if (sessionCookie) {
        const sessionId = sessionCookie.split('=')[1];
        await auth.logout({ sessionId });
      }
    }

    const response = new Response(JSON.stringify({ message: 'Logout successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    response.headers.set('Set-Cookie', 'session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}