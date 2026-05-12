import { SidebarItem } from "./sidebar-item/sidebar-item"
import "./sidebar.css"

export function Sidebar()
{
    return (
        <div className="sidebar">
            <SidebarItem title="Tableau de bord" path="/" />
            <SidebarItem title="Menu" path="/menu" />
            <SidebarItem title="Ingrédients" path="/ingredients" />
            <SidebarItem title="Commandes" path="/orders" />
        </div>
    )
}