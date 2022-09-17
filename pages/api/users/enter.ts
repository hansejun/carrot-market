import mail from "@sendgrid/mail";
import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
mail.setApiKey(process.env.SENDGRID_API!);
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone: phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
            ...user,
          },
          create: {
            name: "Fizz",
            ...user,
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    /*
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}`,
    });
    */
  } else if (email) {
    /*
    const message = await mail.send({
      from: "tpwnszja2@gmail.com",
      to: "vyct7612@naver.com",
      subject: "Your carrot market Verification Email.",
      text: `Your token is ${payload}`,
      html: `Your token is <strong>${payload}</strong>`,
    });
    */
  }
  return res.status(200).json({ ok: true });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
