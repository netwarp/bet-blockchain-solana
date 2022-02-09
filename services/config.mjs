import toml from 'toml'
import fs from 'fs'


let config = fs.readFileSync(new URL('../config.toml', import.meta.url))
config = toml.parse(config)

export default config