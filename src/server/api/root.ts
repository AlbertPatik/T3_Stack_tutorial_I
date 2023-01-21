import { createTRPCRouter } from "./trpc";
import { itemRouter } from "./routers/itemRouter";

export const appRouter = createTRPCRouter({
  item: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
