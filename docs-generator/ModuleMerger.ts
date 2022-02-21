import { ProjectReflection, ReflectionKind } from 'typedoc'

import { ModuleBundle } from './ModuleBundle'

export class ModuleMerger {
  private readonly project: ProjectReflection

  public constructor(project: ProjectReflection) {
    this.project = project
  }

  public execute() {
    const moduleBundles = this.createModuleBundles()
    moduleBundles.forEach((bundle) => bundle.merge())
  }

  private createModuleBundles() {
    const moduleBundleMap = new Map<string, ModuleBundle>()
    const modules = (this.project.children ?? []).filter((c) =>
      c.kindOf(ReflectionKind.Module)
    )
    modules.forEach((module) => {
      const name = this.getModuleName(module.name)
      if (name === null) return

      let moduleBundle = moduleBundleMap.get(name)
      if (!moduleBundle) {
        moduleBundle = new ModuleBundle(name, this.project)
        moduleBundleMap.set(name, moduleBundle)
      }
      moduleBundle.add(module)
    })

    const moduleBundles: ModuleBundle[] = []
    moduleBundleMap.forEach((value) => moduleBundles.push(value))
    return moduleBundleMap
  }

  private getModuleName(originalName: string): string | null {
    const parts = originalName.split('/').reverse()
    if (parts.length < 3) return null

    const [, folderName, ...rest] = parts
    if (folderName !== 'queries' && folderName !== 'mutations') return null

    return rest.reverse().join('/')
  }
}
