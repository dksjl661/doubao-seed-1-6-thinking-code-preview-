import { auth } from '../../../../server/auth-simple';

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await auth.register({ email, password, name });

    const response = new Response(JSON.stringify({
      user: result.user,
      message: 'Registration successful'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    response.headers.set('Set-Cookie', `session=${result.session.id}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`);

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}