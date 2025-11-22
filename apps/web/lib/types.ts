// apps/web/lib/types.ts

// TODO: Replace with a real Order type from the Prisma client
export type Order = {
  id: string;
  items: {
    product: {
      title: string;
    };
    price: number;
  }[];
  total: number;
};
