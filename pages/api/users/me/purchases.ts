import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> {
  const sessionId = req.session.user?.id;
  const purchases = await client.purchase.findMany({
    where: { userId: sessionId },
    include: { product: { include: { _count: { select: { fav: true } } } } },
  });
  res.json({ ok: true, records: purchases });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
