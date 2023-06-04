import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import * as bcrypt from 'bcrypt'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const saltRounds = 10
  const plainTextPassword = req.body.password
  try {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(plainTextPassword, salt, async function (err, hash) {
        if (err) {
          console.log(err)
        } else {
        const user = await prisma.user.create({
          data: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
          },
        });
        console.log("user", user);
      }
        
      })
    })
    res.status(201)
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ name: "John Doe" });
}
