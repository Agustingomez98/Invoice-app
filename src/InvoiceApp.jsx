import { getInvoice } from "./services/getInvoice"
import { InvoiceDetails } from "./components/InvoiceDetails";
import { ClientDetails } from "./components/ClientDetails";
import { CompanyDetails } from "./components/CompanyDetails";
import { ListItemView } from "./components/ListItemsView";
import { TotalDetails } from "./components/TotalDetails";
import { useState } from "react";

export const InvoiceApp = () => {

    const { id, name, client, company, items: intialItem, total } = getInvoice();

    const [formItemState, setFormItemState] = useState({
        product: '',
        price: '',
        quantity: '',
    });
    //Deestructuracion de las variables
    const { product, price, quantity } = formItemState;

    const [items, setItems] = useState(intialItem);

    const [counter, setCounter] = useState(4);

    const onInputChange = ({ target: { name, value } }) => {
        console.log(value);
        setFormItemState({
            ...formItemState,
            [name]: value,
        });
    }


    const onInvoiceItemSubmit = (event) => {
        event.preventDefault();

        if (product.trim().length <= 1) return;
        if (price.trim().length <= 1 || isNaN(price.trim())) {
            alert("El precio ingresado no es valido");
            return;
        };
        if (quantity.trim().length < 1 || isNaN(quantity.trim())) {
            alert("La cantidad no es valida");
            return
        };

        setItems([...items, {
            id: 4, product: product.trim(), price: +price.trim(), quantity:
                +quantity.trim()
        }])

        setFormItemState({
            product: '',
            price: '',
            quantity: '',
        })

        setCounter(counter + 1);
    }

    return (
        <>
            <div className="container">

                <div className="card my-3">
                    <div className="card-header">
                        Ejemplo factura
                    </div>

                    <div className="card-body">
                        <InvoiceDetails id={id} name={name} />
                        <div className="row my-3">
                            <div className="col">
                                <ClientDetails title={'Datos del cliente'} client={client} />
                            </div>

                            <div className="col">
                                <CompanyDetails title={'Datos de la compania'} company={company} />
                            </div>
                        </div>
                        <ListItemView title='Productos de la factura' items={items} />
                        <TotalDetails total={total} />

                        <form className="w-50" onSubmit={onInvoiceItemSubmit}>
                            <input type="text" name="product" value={product} placeholder="Producto" className="form-control m-3" onChange={onInputChange} />
                            <input type="text" name="price" value={price} placeholder="Precio" className="form-control m-3" onChange={onInputChange} />
                            <input type="text" name="quantity" value={quantity} placeholder="Cantidad" className="form-control m-3" onChange={onInputChange} />

                            <button type="submit" className="btn btn-primary m-3">Nuevo Item</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}