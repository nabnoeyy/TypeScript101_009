"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}
class Order {
    constructor(date, status, customer, payment) {
        //ทำภายหลัง
        this.payment = new Cash(0, 0);
        this.orderDetails = [];
        this.date = date;
        this.status = status;
        this.customer = customer;
        this.payment = payment;
    }
    addOrderDetils(orderDetail) {
        this.orderDetails.push(orderDetail);
    }
    setPayment(payment) {
        this.payment = payment;
    }
}
class Item {
    constructor(shippingWeight, description) {
        this.shippingWeight = shippingWeight;
        this.description = description;
    }
    getPriceForQuantity() {
        return 0;
    }
    getTax() {
        return 0;
    }
    inStock() {
        return 0;
    }
}
class OrderDetail {
    constructor(quantity, taxStatus) {
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
        return 0;
    }
    calcWeight() {
        return 0;
    }
    calcTax() {
        return "nab";
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
}
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
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
