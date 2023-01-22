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

  getAllItems: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.shoppingItem.findMany();
    return items;
  }),

  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.shoppingItem.delete({
        where: {
          id: input.id,
        },
      });

      return item;
    }),

  toggleChecked: publicProcedure
    .input(z.object({ id: z.string(), checked: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.shoppingItem.update({
        where: {
          id: input.id,
        },
        data: {
          checked: input.checked,
        },
      });

      return item;
    }),
});
