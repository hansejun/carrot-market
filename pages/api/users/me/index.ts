import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> {
  if (req.method == "GET") {
    const sessionId = req.session.user?.id;
    const user = await client.user.findUnique({ where: { id: sessionId } });
    res.json({ ok: true, profile: user });
  }
  if (req.method == "POST") {
    const {
      session: { user },
      body: { email, phone, name },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email && email !== currentUser?.email) {
      const exists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      if (exists) {
        return res.json({ ok: false, error: "Email already taken" });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      res.json({ ok: true });
    }
    if (phone && phone !== currentUser?.phone) {
      const exists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        })
      );
      if (exists) {
        return res.json({ ok: false, error: "Phone number already taken" });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
      res.json({ ok: true });
    }
    if (name) {
      await client.user.update({
        where: { id: user?.id },
        data: { name },
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
