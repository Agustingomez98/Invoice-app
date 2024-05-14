export const invoice = {
    id:1,
    name:"Componente PC",
    client:{
        name:"Eurelio",
        lastName:"Touch",
        address:{
            country:"Argentina",
            city:"Mendoza",
            street:"San Martin",
            number:12
        }
    },
    company: {
        name:"The Gomez Company",
        fiscalNummber:1234,
    },
    items: [
        {
            id:1,
            product:"Monitor",
            price:100,
            quantity:2
        },
        {
            id:2,
            product:"Mouse",
            price:50,
            quantity:1
        },
        {
            id:3,
            product:"Teclado",
            price:76,
            quantity:1
        }
    ]
}