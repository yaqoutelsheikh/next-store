
import sampleData from './sample-data';
import {prisma} from "@/db/prisma";

// تأكد من وجود ssl: true

async function main() {
  await prisma.product.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seed successfully!");
}

main();

