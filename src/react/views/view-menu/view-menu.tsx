import { useEffect, useState } from "react";
import "./view-menu.css"
import type { Pizza } from "../../../models/pizza";
import { PizzaViewer } from "../../components/pizza-viewer/pizza-viewer";
import { DialogEditPizza } from "../../dialogs/dialog-edit-pizza/dialog-edit-pizza";
import { pizzasService } from "../../../services/pizzas.service";

export function ViewMenu()
{
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [editedPizza, setEditedPizza] = useState<Pizza | null>(null);

    const loadPizzas = async () =>
    {
        setPizzas(await pizzasService.findAll())
    }

    const createPizza = async () =>
    {
        const newPizza = await pizzasService.create();

        setPizzas([...pizzas, newPizza]);

        editPizza(newPizza);
    }

    const editPizza = (pizza: Pizza) =>
    {
        setEditedPizza(pizza);
    }

    const savePizza = (pizza: Pizza) =>
    {
        const newList = pizzas.filter(p => p.id !== pizza.id);
        newList.push(pizza);
        newList.sort((p1, p2) => p1.name.localeCompare(p2.name));

        setPizzas([...newList]);

        setEditedPizza(null);
    }

    const deletePizza = () =>
    {
        if (!editedPizza)
            return;

        setPizzas(pizzas.filter(p => p.id !== editedPizza.id));
        setEditedPizza(null);
    }

    useEffect(() =>
    {
        loadPizzas();
    }, []);

    return (
        <div className="view view-menu">
            <h1>Menu</h1>
            <div className="actions">
                <button className="success" onClick={createPizza}>Nouvelle pizza</button>
                <input className="search" type="text" placeholder="Rechercher une pizza" />
            </div>
            <div className="pizzas">
                {
                    pizzas.map(pizza => <PizzaViewer key={`pizza-${pizza.id}`} pizza={pizza} onEdit={editPizza} />)
                }
            </div>
            <DialogEditPizza
                pizza={editedPizza ?? null}
                onSave={savePizza}
                onDelete={deletePizza}
                onCancel={() => setEditedPizza(null)}
            />
        </div>
    )
}