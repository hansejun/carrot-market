import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> {
  const {
    query: { id },
  } = req;
  const { user } = req.session;
  const { answer: text } = req.body;
  const post = await client.post.findUnique({ where: { id: Number(id) } });

  if (!post) return res.json({ ok: false });

  const answer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: { id: Number(id) },
      },
      answer: text,
    },
  });

  res.json({ ok: true, answer });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
