import { PrismaClient } from "@prisma/client";

const PrismaSingleTon = () => {
  return new PrismaClient();
};
declare global {
  var prisma: undefined | ReturnType<typeof PrismaSingleTon>;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
