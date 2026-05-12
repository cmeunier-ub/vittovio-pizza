import { useEffect, useRef } from "react"
import type { Ingredient } from "../../../models/ingredient";

type DialogEditIngredientProperties = {
    ingredient: Ingredient,
    onSave: (ingredient: Ingredient) => void,
    onDelete: () => void,
    onCancel: () => void,
}

export function DialogEditIngredient({ingredient, onSave, onDelete, onCancel}: DialogEditIngredientProperties)
{
    const dialog = useRef<HTMLDialogElement>(null);
    const txtName = useRef<HTMLInputElement>(null);
    const chkOutOftock = useRef<HTMLInputElement>(null);

    const saveIngredient = () => {
        if(!ingredient || !txtName.current || !chkOutOftock.current)
            return;

        const editedIngredient = {
            id: ingredient.id,
            name: txtName.current.value,
            outOfStock: chkOutOftock.current.checked
        }

        onSave(editedIngredient);
    }

    const deleteIngredient = () => {
        if(ingredient && confirm(`Souhaitez-vous réellement supprimer l'ingrédient '${ingredient.name}' ?`))
        {
            onDelete();
        }
    }

    useEffect(() => {
        if(ingredient !== null)
        {
            if(txtName.current)
                txtName.current.value = ingredient.name;

            if(chkOutOftock.current)
                chkOutOftock.current.checked = ingredient.outOfStock;

            dialog.current?.showModal();
        }
        else
            dialog.current?.close();
    }, [ingredient]);

    return (
        <dialog ref={dialog}>
            <h2>Modification d'un ingrédient</h2>
            <div className="field">
                <label>Nom de l'ingrédient</label>
                <input ref={txtName} type="text" defaultValue={ingredient?.name} />
            </div>
            <div className="field">
                <label>Stock épuisé</label>
                <input ref={chkOutOftock} type="checkbox" defaultChecked={ingredient?.outOfStock} />
            </div>
            <div className="actions">
                <button className="success" onClick={saveIngredient}>Enregistrer</button>
                <button className="danger" onClick={deleteIngredient}>Supprimer</button>
                <button onClick={onCancel}>Annuler</button>
            </div>
        </dialog>
    )
}