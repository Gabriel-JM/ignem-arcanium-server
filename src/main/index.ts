import 'module-alias/register'
import { server } from './server/app'

console.log('Server in development...')

server.listen(8000, () => console.log('Server running at 8000'))
