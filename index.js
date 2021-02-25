const receipt = require('receipt');
const { v1: uuidv1 } = require('uuid');

class Product {
    constructor(item, description, price, qty) {
        try{
            if(arguments.length !== 4){
                throw new Error("Wrong number of arguments");
            }else if(typeof item !== "string" || typeof description !== "string"){
                throw new Error("Argument must be of type string")
            }else if(typeof price !==  "number" ||  typeof qty !== "number"){
                throw new Error("Argument must be of type number");
            }else if(price <= 0 || qty <= 0){
                throw new Error("Wrong qty or price");
            }else{
                this.item = item;
                this.description = description;
                this.cost = price;
                this.qty = qty;
                this.id = uuidv1();
            }
        }catch(e){
            console.error(e.message);
        }
    }
}

class Cart {
    constructor() {
        this.products = [];
        this.order;
        this.totalPrice = 0;
    }

    addProduct (name, description, price, qty) {
        this.order = new Product(name, description, price, qty); 
        this.products.push(this.order);
        this.totalPrice += (price * qty) / 100;
    }

    getOrder(){
        return this.products;
    }

    getReceipt () {
        const d = new Date();
        const date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        const hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        const fullDate = date+' '+hours;
        const TVA = this.totalPrice *  0.10;
        const priceTVA = this.totalPrice + TVA;

        receipt.config.currency = '€'; 
        receipt.config.width = 50;    
        receipt.config.ruler = '=';
        if(Object.keys(this.getOrder()).length > 0){
        const output = receipt.create([
            { type: 'text', value: [
                'TEST TECHNIQUE',
                'StoreLift',
                'storelift@store.com',
                'www.storelift.co/'
            ], align: 'center' },
            { type: 'empty' },
            { type: 'properties', lines: [
                { name: 'Order Number', value: this.order.id },
                { name: 'Date', value: fullDate }
            ] },
            { type: 'table', lines: 
                this.products
             },
            { type: 'empty' },
            { type: 'text', value: 'Some extra information to add to the footer of this docket.', align: 'center' },
            { type: 'empty' },
            { type: 'properties', lines: [
                { name: 'TVA (10.00%)', value: 'EUR ' + TVA},
                { name: 'Total amount (excl. TVA)', value: `EUR ${this.totalPrice}`},
                { name: 'Total amount (incl. TVA)', value: `EUR ${priceTVA}`}
            ] },
            { type: 'empty' },
            { type: 'properties', lines: [
                { name: 'Amount Received', value: `EUR ${priceTVA}` }
            ] },
            { type: 'empty' },
            { type: 'text', value: 'StoreLift', align: 'center', padding: 5 }
        ]);
        console.log(output);
        return true;
    } else {
        return null;
    }
     
    }
}

let  panier =  new Cart();
panier.addProduct("iphone11", "64gb", 1500, 1);
panier.addProduct("pomme", "pomme verte", 1500, 5);

console.log(panier.getOrder());

console.log(panier.getReceipt());