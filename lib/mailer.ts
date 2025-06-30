import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
})

export async function sendMagicLink(email: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/verify?token=${token}`

  await transporter.sendMail({
    from: `"Contact Pro" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your Magic Login Link',
    html: `<p>Click to login: <a href="${url}">${url}</a></p>`,
  })
}
