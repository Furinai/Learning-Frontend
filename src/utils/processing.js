export function buildTree(data) {
    let map = new Map()
    let items = []
    for (let item of data) {
        item.children = []
        map.set(item.id, item)
    }
    for (let [, item] of map) {
        if (item.parentId === 0) {
            items.push(item)
        } else {
            let parent = map.get(item.parentId)
            parent.children.push(item)
        }
    }
    return items
}