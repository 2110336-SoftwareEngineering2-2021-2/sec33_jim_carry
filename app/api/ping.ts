import { BlitzApiHandler } from 'blitz'

const handler: BlitzApiHandler = async (req, res) => {
  res.statusCode = 200
  res.end('Welcome to Mayday API!')
}
export default handler
