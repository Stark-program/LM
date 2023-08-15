import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "~/server/db";

type RequestBody = {
  email: string;
  phoneNumber: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as RequestBody;
  const email = data.email;
  const phoneNumber = data.phoneNumber;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        phone: phoneNumber,
      },
    });
    if (user) {
      res.status(201).json({ message: "user found" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
}
