import "./pizza-viewer.css"

import type { Pizza } from "../../../models/pizza"

type PizzaProperties = {
    pizza: Pizza,
    onEdit: (pizza: Pizza) => void
}

export function PizzaViewer({ pizza, onEdit }: PizzaProperties)
{
    return <div className="pizza-viewer">
        <div className="pizza-details">
            <div className="pizza-name" onClick={() => { onEdit(pizza) }}>{pizza.name}</div>
            <div className="pizza-ingredients">
                {
                    pizza.ingredients.map(i => <div key={`pizza-${pizza.id}-ingredient-${i.id}`} className={`pizza-ingredient ${i.outOfStock ? "out-of-stock" : ""}`}>{i.name}</div>)
                }
            </div>
        </div>
        <div className="pizza-price">{pizza.price.toFixed(2)} €</div>
    </div>
}