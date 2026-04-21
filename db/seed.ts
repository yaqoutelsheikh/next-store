
import sampleData from './sample-data';
import {prisma} from "@/db/prisma";

// تأكد من وجود ssl: true

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: sampleData.products });

  console.log("Database seed successfully!");
}

main();

