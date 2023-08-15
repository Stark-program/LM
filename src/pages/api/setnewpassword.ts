import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { prisma } from "~/server/db";

type RequestBody = {
  email: string;
  phoneNumber: string;
  newPassword: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as RequestBody;
  const email = data.email;
  const phoneNumber = data.phoneNumber;
  const saltRounds = 10;
  const plainTextPassword = data.newPassword;

  console.log(data);
  try {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) console.log(err);
      bcrypt.hash(plainTextPassword, salt, async function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          const user = await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              password: hash,
            },
          });
          if (user) {
            res.status(201).json({ message: "password changed" });
          } else {
            res.status(404).json({ message: "password change unsuccessful" });
          }
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}
