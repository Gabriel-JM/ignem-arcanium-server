import 'dotenv-safe/config'
import 'module-alias/register'
import { server } from './server/app'

const port = process.env.PORT || 8000

console.log('Server in development...')

server.listen(port, () => console.log('Server running at ' + port))
