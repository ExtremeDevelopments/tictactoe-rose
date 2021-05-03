import { permissions } from '../../utils'
import { CommandContext } from '../lib/CommandContext'

export default () => {
  return async (ctx: CommandContext) => {
    const perms = ctx.command.userPerms
    if (!perms || perms.length === 0) return true

    if (ctx.hasPerms('administrator')) return true
    const mappedPerms = perms.map((perm: any) => ctx.hasPerms(perm) ? null : perm).filter(e => e) as Array<keyof typeof permissions>
    const hasPerms = mappedPerms.every((perm: any) => perm === true)
    if (hasPerms) return true

    const requiredPerms = mappedPerms.map(perm => `\`${permissions[perm]}\``)
    await ctx.error(`You're missing the following permissions: ${requiredPerms.join(', ')}`)
    return false
  }
}
