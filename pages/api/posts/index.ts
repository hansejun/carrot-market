import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> {
  if (req.method == "POST") {
    const sessionId = req.session.user?.id;
    const { question, latitude, longitude } = req.body;
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: sessionId,
          },
        },
      },
    });
    res.json({ ok: true, post });
  } else if (req.method == "GET") {
    /*
    const {
      query: { latitude, longitude },
    } = req;
    const parseLatitude = parseFloat(latitude + "");
    const parseLongitude = parseFloat(longitude + "");
    */
    const posts = await client.post.findMany({
      /*
      where: {
        latitude: {
          gte: parseLatitude - 0.01,
          lte: parseLatitude + 0.01,
        },
        longitude: {
          gte: parseLongitude - 0.01,
          lte: parseLongitude + 0.01,
        },
      },
      */
      include: {
        user: {
          select: {
            id: true,
            name: true,
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
    res.json({ ok: true, posts });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
  })
);
