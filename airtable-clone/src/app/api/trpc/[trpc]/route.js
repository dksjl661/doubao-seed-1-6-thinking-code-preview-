import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../../../server/routers/_app';
import { auth } from '../../../../server/auth-simple';

const handler = (req) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => {
      const session = await auth.api.getSession({ req });
      return { session };
    },
  });

export { handler as GET, handler as POST };