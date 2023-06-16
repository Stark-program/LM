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
          const findUser = await prisma.user.findFirst({
            where: {
              email: reqData.email,
            },
          });
          console.log(findUser);
          if (findUser?.email === reqData.email) {
            res.status(424).json({ message: "Account already exists" });
          } else if (!findUser) {
            const user = await prisma.user.create({
              data: {
                name: reqData.name,
                email: reqData.email,
                phone: reqData.phone,
                password: hash,
              },
            });
            console.log(user);
            res.status(201).json({ message: "user created" });
          }
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

type UserRequestType = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
