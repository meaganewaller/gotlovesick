import { WPMenuItem, Nullable, MenuItem, NestedMenuItem } from "@/types"

type ConvertedMenu = (MenuItem | NestedMenuItem)[]

/**
 * Convert a flat array of menu items to a hierarchal structure
 * @param data - flat array of menu items
 * @param idKey - key to use for the unique identifier
 * @param parentKey - key to use for the parent identifier
 * @param childrenKey - key to use for the children
 * @returns hierarchal structure of menu items
 */
export function convertMenuToHierarchal(
  data: WPMenuItem[] = [],
  { idKey = "key", parentKey = "parentId", childrenKey = "children" } = {}): ConvertedMenu {
  const tree: MenuItem[] = []
  const childrenOf: Record<string, WPMenuItem[]> = {}

  data.forEach((item) => {
    const newItem = { ...item }
    const id = newItem[idKey as keyof WPMenuItem] as string
    const parentId = newItem[parentKey as keyof WPMenuItem] as Nullable<string> || null

    childrenOf[id] = childrenOf[id] || [];
    (newItem as any)[childrenKey] = childrenOf[id]

    if (parentId) {
      childrenOf[parentId] = childrenOf[parentId] || []
      childrenOf[parentId].push(newItem)
    } else {
      tree.push(newItem)
    }
  })

  return tree
}
