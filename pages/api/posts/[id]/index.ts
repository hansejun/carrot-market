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
  const post = await client.post.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wonderings: true,
        },
      },
    },
  });
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: Number(id),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, post, isWondering });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
