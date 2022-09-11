import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> {
  const sessionId = req.session.user?.id;
  const user = await client.user.findUnique({ where: { id: sessionId } });
  res.json({ ok: true, user });
}

export default withApiSession(withHandler("GET", handler));
