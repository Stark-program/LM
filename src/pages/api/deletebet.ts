import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "~/server/db";

type RequestBody = {
  time: string;
  gameId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as RequestBody;
  console.log(data);
  const session = await getServerSession(req, res, authOptions);

  try {
    if (!session) return null;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user?.isAdmin) {
      const findBet = await prisma.bet.findFirst({
        where: {
          gameId: data.gameId,
          timeslot: data.time,
        },
      });

      const deleteBet = await prisma.bet.delete({
        where: {
          id: findBet?.id,
        },
      });
      res.status(201).json({
        success: true,
        name: user.name,
        timeslot: data.time,
      });
    } else res.status(200).json({ failure: "Not an Admin" });
  } catch (err) {
    console.log(err);
  }
}
