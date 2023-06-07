import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return null;
    }

    const bet = await prisma.bet.create({
      data: {
        gameId: req.body.gameId,
        userId: user.id,
        timeslot: req.body.time,
        userName: user.name,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

// gameId String
// userId String
// timeslot DateTime
