import { getInvoice, calculateTotal } from "./services/getInvoice"
import { InvoiceDetails } from "./components/InvoiceDetails";
import { ClientDetails } from "./components/ClientDetails";
import { CompanyDetails } from "./components/CompanyDetails";
import { ListItemView } from "./components/ListItemsView";
import { TotalDetails } from "./components/TotalDetails";
import { useEffect, useState } from "react";
import { FormItemsView } from "./components/FormItemsView";

const invoiceInitial = {
    id: 0,
    name: "",
    client: {
        name: "",
        lastName: "",
        address: {
            country: "",
            city: "",
            street: "",
            number: 0,
        }
    },
    company: {
        name: "",
        fiscalNummber: 0,
    },
    items: []
}

export const InvoiceApp = () => {

    const [activeForm,setActiveForm] =  useState(false);

    const [total, setTotal] = useState(0);

    const [counter, setCounter] = useState(4);

    const [invoice, setInvoice] = useState(invoiceInitial);

    //Inicializamos los items
    const [items, setItems] = useState([]);

    //Deestructuracion de la factura
    const { id, name, client, company } = invoice;

    useEffect(() => {
        const data = getInvoice();
        setInvoice(data); //Pasamos el estado de la factura al estado
        setItems(data.items); //Pasamos los items al estado
    }, [])//Podriamos pasar dependencias u objeos que activen al modificarse el estado. Los corchetes son para que se ejecute una sola vez al crar el componente


    //Manejo del total de los prouctos
    useEffect(() => {
        setTotal(calculateTotal(items));
    }, [items])

    const handlerAddItems = ({ product, price, quantity }) => {

        setItems([...items, {
            id: counter,
            product: product.trim(),
            price: price.trim(),
            quantity: parseInt(quantity.trim(), 10),
        }])

        setCounter(counter +1)  
    }

    const handlerDeleteItem = (id) => {
        setItems(items.filter(item => item.id !== id))
    }

    const onActiveForm = () => {
        setActiveForm(!activeForm);
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
                        <ListItemView title='Productos de la factura' items={items} handlerDeleteItem = {id => handlerDeleteItem (id)} /> 
                        <TotalDetails total={total} />
                        <button className="btn btn-secondary"
                        onClick={onActiveForm}>{!activeForm ? 'Agegar Item' : 'Ocultar Form'}</button>
                        {!activeForm? '':<FormItemsView handler={(newItem) => handlerAddItems(newItem) } />}

                    </div>
                </div>
            </div>
        </>
    )

}