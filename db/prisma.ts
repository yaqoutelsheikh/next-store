import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient} from "@/app/generated/prisma/client";
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({ adapter, }).$extends({
      result: {
        product: {
          price: {
            compute(product) {
              return product.price.toString();
            },
          },
          rating: {
            compute(product) {
              return product.rating.toString();
            },
          },
        },
      },
    });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;


