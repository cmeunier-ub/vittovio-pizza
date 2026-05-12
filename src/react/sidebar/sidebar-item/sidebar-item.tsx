import "./sidebar-item.css"

type SidebarItemProperties = {
    title: string,
    path: string
}

export function SidebarItem({title, path}: SidebarItemProperties)
{

    const navigateToPath = () => {
        //TODO
    }

    return (
        <div className={`sidebar-item ${location.pathname === path ? "selected" : ""}`} onClick={navigateToPath}>{title}</div>
    )
}