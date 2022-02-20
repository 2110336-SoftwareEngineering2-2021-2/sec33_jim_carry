import { Application, Context, Converter, Reflection } from 'typedoc'
import * as ts from 'typescript'

import { ModuleMerger } from './ModuleMerger'

export class MergeModulesPlugin {
  public initialize(typedoc: Readonly<Application>) {
    this.subscribeToApplicationEvents(typedoc)
  }

  private subscribeToApplicationEvents(typedoc: Readonly<Application>): void {
    typedoc.converter.on(
      Converter.EVENT_CREATE_DECLARATION,
      (c: Readonly<Context>, r: Reflection, n?: Readonly<ts.Node>) =>
        this.onConverterCreateDeclaration(c, r, n)
    )
    typedoc.converter.on(
      Converter.EVENT_RESOLVE_BEGIN,
      (c: Readonly<Context>) => this.onConverterResolveBegin(c)
    )
  }

  /**
   * Triggered when the converter has created a declaration reflection.
   * @param _context Describes the current state the converter is in.
   * @param reflection The reflection that has been created.
   * @param node The triggering TypeScript node if available.
   */
  public onConverterCreateDeclaration(
    _context: Readonly<Context>,
    reflection: Reflection,
    _?: Readonly<ts.Node>
  ): void {
    if (reflection.name !== 'default') return

    const parent = reflection.parent
    if (!parent) return

    if (!parent.name.includes('/')) return
    const parts = parent.name.split('/').reverse()

    const [fileName, folderName] = parts
    if (folderName !== 'queries' && folderName !== 'mutations') return

    reflection.name = fileName!
    if (!reflection.sources) {
      reflection.sources = [...(parent.sources ?? [])]
    }
  }

  /**
   * Triggered when the TypeDoc converter begins resolving a project.
   * @param context Describes the current state the converter is in.
   */
  public onConverterResolveBegin(context: Readonly<Context>): void {
    new ModuleMerger(context.project).execute()
  }
}
