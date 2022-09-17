import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> {
  const sessionId = req.session.user?.id;
  const reviews = await client.review.findMany({
    where: {
      createForId: sessionId,
    },
    include: { createBy: { select: { id: true, name: true, avatar: true } } },
  });
  res.json({ ok: true, reviews });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
