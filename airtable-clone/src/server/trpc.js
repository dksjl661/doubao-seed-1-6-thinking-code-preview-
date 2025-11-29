import { initTRPC } from '@trpc/server';
import { auth } from './auth-simple';

const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
  middleware(async ({ ctx, next }) => {
    const session = await auth.api.getSession({ ctx });
    if (!session) {
      throw new Error('Unauthorized');
    }
    return next({
      ctx: {
        session,
      },
    });
  })
);