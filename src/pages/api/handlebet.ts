import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqData = req.body as BetReqType;
  try {
    console.log("req", req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: reqData.email,
      },
    });

    if (!user) {
      return null;
    }

    const bet = await prisma.bet.findFirst({
      where: {
        gameId: reqData.gameId,
        userId: user.id,
      },
    });

    if (bet === null) {
      const sameTime = await prisma.bet.findFirst({
        where: {
          gameId: reqData.gameId,
          timeslot: reqData.time,
        },
      });

      if (sameTime !== null) {
        return res.status(200).json({
          success: false,
          timeTaken: true,
          message:
            "A bet has already been placed for that time, please choose another",
        });
      }
      const createBet = await prisma.bet.create({
        data: {
          gameId: reqData.gameId,
          userId: user.id,
          userName: user.name,
          timeslot: reqData.time,
        },
      });
      res.status(201).json({
        success: true,
        name: user.name,
        timeslot: reqData.time,
      });
    } else res.status(200).json({ success: false });
  } catch (err) {
    console.log(err);
  }
}

type BetReqType = {
  gameId: string;
  userId: string;
  userName: string;
  time: string;
  email: string;
};
