import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import * as bcrypt from "bcrypt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqData = req.body as UserRequestType;
  const saltRounds = 10;
  const plainTextPassword: string = reqData.password;

  try {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(plainTextPassword, salt, async function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          const user = await prisma.user.create({
            data: {
              name: reqData.name,
              email: reqData.email,
              phone: reqData.phone,
              password: hash,
            },
          });
        }
      });
    });
    res.status(201);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ name: "John Doe" });
}

type UserRequestType = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
