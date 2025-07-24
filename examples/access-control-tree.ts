/**
 * Composite Pattern Example: Access Control Tree
 */

interface IPermission {
  allowed(perk: string): boolean
}

interface IRole extends IPermission {
  add(child: IRole): void
  remove(child: IRole): void
  listPerks(): string[]
}

class Perk implements IPermission {
  constructor(public name: string) {}
  allowed(perk: string): boolean {
    return this.name === perk
  }
}

class Role implements IRole {
  private children: Set<IPermission>
  constructor(permissions: IPermission[] = []) {
    this.children = new Set(permissions)
  }
  add(child: IPermission): void {
    this.children.add(child)
  }
  remove(child: IPermission): void {
    this.children.delete(child)
  }
  allowed(perk: string): boolean {
    return this.children.values().some((ch) => ch.allowed(perk))
  }
  listPerks(): string[] {
    const perks = new Set<string>()
    Role.fillPerks(this, perks)
    return Array.from(perks)
  }
  protected static fillPerks(ch: IPermission, perks: Set<string>): void {
    if (ch instanceof Perk) perks.add(ch.name)
    else if (ch instanceof Role)
      ch.children.forEach((child) => Role.fillPerks(child, perks))
  }
}

function main() {
  // 🧪 Demo setup
  const canEdit = new Perk('canEdit')
  const canDelete = new Perk('canDelete')
  const canBan = new Perk('canBan')

  // 🌲 Composite Role
  const moderator = new Role()
  moderator.add(canBan)
  moderator.add(canEdit)
  const admin = new Role()
  admin.add(moderator)
  admin.add(canDelete)

  // ✅ Usage
  console.log(admin.listPerks()) // all of them
  console.log(admin.allowed('canEdit')) // ✅ true
  console.log(admin.allowed('canDelete')) // ✅ true
  console.log(moderator.allowed('canDelete')) //❌ false
  moderator.remove(canEdit)
  console.log(admin.allowed('canEdit')) // ❌ false
}

main()
