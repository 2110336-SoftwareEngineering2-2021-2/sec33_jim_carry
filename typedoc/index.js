const util = require('util')
const glob = util.promisify(require('glob'))
const TypeDoc = require('typedoc')

async function main() {
  const app = new TypeDoc.Application()

  app.options.addReader(new TypeDoc.TSConfigReader())
  app.options.addReader(new TypeDoc.TypeDocReader())

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
