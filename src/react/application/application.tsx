import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import { ViewIngredients } from "../views/view-ingredients/view-ingredients";

export function Application()
{
    return (
        <>
            <Header />

            <div className="content">
                    <Sidebar />
                    <ViewIngredients />
            </div>
        </>
    )
}