"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    getInfo() {
        return " Name: " + this.name + " /nAddress: " + this.address;
    }
}
class Order {
    constructor(date, status, customer) {
        //ทำภายหลัง
        this.payment = new Cash(0, 0);
        this.orderDetails = [];
        this.date = date;
        this.status = status;
        this.customer = customer;
    }
    addOrderDetils(orderDetail) {
        this.orderDetails.push(orderDetail);
    }
    setPayment(payment) {
        this.payment = payment;
    }
    calcTax() {
        let vat = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    }
    calcSubtotal() {
        let subtotal = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            subtotal = subtotal + this.orderDetails[i].calcSubTotal();
        }
        return subtotal;
    }
    printOrdrDetail() {
        for (let i = 0; i < this.orderDetails.length; i++) {
            this.orderDetails[i].printDetail();
        }
    }
    calsTotal() {
        return this.calcSubtotal() + this.calcTax();
    }
    calcTotalWeight() {
        let weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            weight = weight + this.orderDetails[i].calcWeight();
        }
        return weight;
    }
    payOrder(payment) {
        this.payment = payment;
    }
    getPayment() {
        return this.payment;
    }
}
class Item {
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }
    getPriceForQuantity() {
        return this.price;
    }
    getTax() {
        return this.price * 7 / 100;
    }
    getShippingWeight() {
        return this.shippingWeight;
    }
    inStock() {
        return true;
    }
    getName() {
        return this.description;
    }
    getInfo() {
        return "Name:" + this.description + ",Price:" + this.price + "฿,Weight:" + this.shippingWeight + " kg.";
    }
}
class OrderDetail {
    constructor(item, quantity, taxStatus) {
        this.item = item;
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
        return this.quantity * this.item.getPriceForQuantity();
    }
    calcWeight() {
        return this.quantity * this.item.getShippingWeight();
    }
    calcTax() {
        if (this.taxStatus === "not include") {
            return this.quantity * this.item.getTax();
        }
        return 0;
    }
    printDetail() {
        console.log(this.item.getName() + "\t" + this.quantity + "(ชิ้น)\t" + this.calcSubTotal() + "฿");
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
}
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    getChange() {
        return this.cashTendered - this.getAmount();
    }
    getCashTendered() {
        return this.cashTendered;
    }
}
class Check extends Payment {
    constructor(amount, name, bankID) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    authorized() {
        return true;
    }
}
class Crerdit extends Payment {
    constructor(amount, number, type, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    authorized() {
        return true;
    }
}
//create object
//Customer
const customer1 = new Customer("Mr.Choke Dee", "Malaiman rd,Nakhon Pathom");
console.log(customer1.getInfo);
//item
const item1 = new Item(1.5, "lotus's water", 15);
// console.log(item1.getInfo());
const item2 = new Item(1.5, "lotus's kanommm", 20);
// console.log(item2.getInfo());
const item3 = new Item(2, "mama", 6);
// console.log(item2.getInfo());
//orders
const order1 = new Order("16/12/2567", "in progress", customer1);
//orderde
const OrderDetail1 = new OrderDetail(item1, 1, "not include");
const OrderDetail2 = new OrderDetail(item2, 2, "not include");
const OrderDetail3 = new OrderDetail(item3, 5, "not include");
//orderDetail => order
order1.addOrderDetils(OrderDetail1);
order1.addOrderDetils(OrderDetail2);
order1.addOrderDetils(OrderDetail3);
const amount = order1.calsTotal();
//pay
const cash = new Cash(amount, 1000);
// order1.printOrdrDetail();
order1.payOrder(cash);
// console.log("total:" +order1.getPayment().getAmount());
console.log("Subtotal:" + order1.calcSubtotal());
console.log("VAT:" + order1.calcTax());
console.log("Recieve" + order1.getPayment().getCashTendered());
console.log("Change:" + order1.getPayment().getChange());
// buy mama
order1.printOrdrDetail();
