import { auth } from '../../../../server/auth-simple';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await auth.login({ email, password });

    const response = new Response(JSON.stringify({
      user: result.user,
      message: 'Login successful'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    response.headers.set('Set-Cookie', `session=${result.session.id}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`);

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}