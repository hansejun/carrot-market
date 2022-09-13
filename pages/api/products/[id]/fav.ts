import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> {
  const { id } = req.query;
  const { user } = req.session;
  const exists = await client.fav.findFirst({
    where: {
      productId: Number(id),
      userId: user?.id,
    },
  });
  if (exists) {
    await client.fav.delete({
      where: { id: exists.id },
    });
  } else {
    await client.fav.create({
      data: {
        user: { connect: { id: user?.id } },
        product: { connect: { id: Number(id) } },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
