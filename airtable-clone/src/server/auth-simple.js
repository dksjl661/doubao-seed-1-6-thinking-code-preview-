// Simplified authentication for demonstration
// This uses in-memory storage and doesn't require a database

import { createHash } from 'crypto';

let users = [];
let sessions = [];

let userIdCounter = 1;
let sessionIdCounter = 1;

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

export const auth = {
  api: {
    async getSession({ ctx }) {
      const cookie = ctx?.req?.headers?.cookie;
      if (!cookie) return null;

      const sessionCookie = cookie.split(';').find(c => c.trim().startsWith('session='));
      if (!sessionCookie) return null;

      const sessionId = sessionCookie.split('=')[1];
      const session = sessions.find(s => s.id === sessionId && s.expiresAt > Date.now());

      if (!session) return null;

      const user = users.find(u => u.id === session.userId);
      if (!user) return null;

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    },
  },

  async register({ email, password, name }) {
    const existing = users.find(u => u.email === email);
    if (existing) {
      throw new Error('User already exists');
    }

    const user = {
      id: `user_${userIdCounter++}`,
      email,
      password: hashPassword(password),
      name: name || email.split('@')[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(user);

    const session = {
      id: `session_${sessionIdCounter++}`,
      userId: user.id,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      createdAt: new Date(),
    };

    sessions.push(session);

    return {
      user,
      session,
    };
  },

  async login({ email, password }) {
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.password !== hashPassword(password)) {
      throw new Error('Invalid credentials');
    }

    const session = {
      id: `session_${sessionIdCounter++}`,
      userId: user.id,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      createdAt: new Date(),
    };

    sessions.push(session);

    return {
      user,
      session,
    };
  },

  async logout({ sessionId }) {
    const index = sessions.findIndex(s => s.id === sessionId);
    if (index !== -1) {
      sessions.splice(index, 1);
    }
  },
};