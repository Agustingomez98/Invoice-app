import { useEffect, useState } from "react";

export const FormItemsView = ({handler}) => {

    const [formItemState, setFormItemState] = useState({
        product: '',
        price: '',
        quantity: '',
    });
    //Deestructuracion de las variables
    const { product, price, quantity } = formItemState;

    const onInputChange = ({ target: { name, value } }) => {
        console.log(value);
        setFormItemState({
            ...formItemState,
            [name]: value,
        });
    }

    const onInvoiceItemSubmit = (event) => {
        event.preventDefault();

        //Validaciones
        if (product.trim().length <= 1) return;
        if (price.trim().length <= 1 || isNaN(price.trim())) {
            alert("El precio ingresado no es valido");
            return;
        };
        if (quantity.trim().length < 1 || isNaN(quantity.trim())) {
            alert("La cantidad no es valida");
            return
        };

        handler(formItemState);

        setFormItemState({
            product:'',
            price:'',
            quantity:'',
        });

    }

    return (<>
        <form className="w-50" onSubmit={onInvoiceItemSubmit}>
            <input type="text" name="product" value={product} placeholder="Producto" className="form-control m-3" onChange={onInputChange} />
            <input type="text" name="price" value={price} placeholder="Precio" className="form-control m-3" onChange={onInputChange} />
            <input type="text" name="quantity" value={quantity} placeholder="Cantidad" className="form-control m-3" onChange={onInputChange} />

            <button type="submit" className="btn btn-primary m-3">Nuevo Item</button>
        </form>
    </>)
}