import { DeclarationReflection, ProjectReflection } from 'typedoc'

export class ModuleBundle {
  private readonly name: string
  private readonly project: ProjectReflection
  private readonly modules: DeclarationReflection[] = []

  public constructor(name: string, project: ProjectReflection) {
    this.name = name
    this.project = project
  }

  public add(module: DeclarationReflection): void {
    this.modules.push(module)
  }

  public merge() {
    const allChildren = this.modules
      .flatMap((module) => module.children)
      .filter(
        (child): child is DeclarationReflection => typeof child !== 'undefined'
      )
    const [firstModule, ...restModules] = this.modules

    allChildren.forEach((child) => (child.parent = firstModule))
    firstModule!.name = this.name
    firstModule!.children = allChildren

    restModules.forEach((module) => {
      delete module.children
      this.project.removeReflection(module)
    })
  }
}
