import { Application, TSConfigReader, TypeDocReader } from 'typedoc'
import { promisify } from 'util'

import { MergeModulesPlugin } from './MergeModulesPlugin'

const glob = promisify(require('glob'))

async function main() {
  const app = new Application()

  new MergeModulesPlugin().initialize(app)

  app.options.addReader(new TSConfigReader())
  app.options.addReader(new TypeDocReader())

  const rpcFunctions = await glob('app/**/+(queries|mutations)/*.ts')
  app.bootstrap({
    entryPoints: rpcFunctions,
  })

  const project = app.convert()

  if (project) {
    const outputDir = 'data-layer-docs'

    await app.generateDocs(project, outputDir)
  }
}

main().catch(console.error)
