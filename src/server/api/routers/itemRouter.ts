import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const itemRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(z.object({ name: z.string().min(3) }))
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.shoppingItem.create({
        data: { name: input.name, checked: false },
      });

      return item;
    }),
});
