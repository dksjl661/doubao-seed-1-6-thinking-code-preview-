import { router } from '../trpc';
import { tableRouter } from './table-simple';

export const appRouter = router({
  table: tableRouter,
});

// Type exports are not supported in pure JavaScript
// export type AppRouter = typeof appRouter;