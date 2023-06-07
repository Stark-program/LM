import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("req", req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return null;
    }

    const bet = await prisma.bet.findFirst({
      where: {
        gameId: req.body.gameId,
        userId: user.id,
      },
    });

    if (bet === null) {
      const createBet = await prisma.bet.create({
        data: {
          gameId: req.body.gameId,
          userId: user.id,
          userName: user.name,
          timeslot: req.body.time,
        },
      });
      res
        .status(201)
        .json({
          success: "Bet Created",
          name: user.name,
          timeslot: req.body.time,
        });
    } else
      res.status(200).json({ failure: "Bet already placed for this game" });
  } catch (err) {
    console.log(err);
  }
}

// gameId String
// userId String
// timeslot DateTime
