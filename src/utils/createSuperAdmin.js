const { randomBytes } = require('crypto')
const { promisify } = require('util')

module.exports = async (email, name, slackHandle, prisma, sgMail) => {
  const signupToken = (await promisify(randomBytes)(20)).toString('hex')
  const signupTokenExpiry = Date.now() + (3600000 * 24 * 14) // 1 week

  const user = await prisma.createUser({
    email,
    signupToken,
    signupTokenExpiry,
    name,
    slackHandle,
    role: 'SUPERADMIN',
  })

  if(!user) console.log('Something went wrong creating the superadmin')

  sgMail.send({
    to: email,
    from: process.env.COMPANY_EMAIL,
    subject: `Your ${process.env.COMPANY_NAME} devlist invite`,
    text: `You've been invited to join the ${process.env.COMPANY_NAME} devlist. Visit ${process.env.FRONTEND_URL}/signup?token=${signupToken}`,
    html: `<strong>You've been invited to join the ${process.env.COMPANY_NAME} devlist.</strong> Click <a href="${process.env.FRONTEND_URL}/signup?token=${signupToken}">here to get started</a>`,
  })
}