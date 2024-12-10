class Customer {
    private name:String
    private address:String

    constructor (name:String,address:String){
        this.name=name
        this.address=address
    }
 }
 class Order {
    private date:string
    private status:string
    private customer:Customer
    //ทำภายหลัง
    private payment: Payment = new Cash(0,0);
    private orderDetails:OrderDetail[] = [];

    constructor (date:string,status:string,customer:Customer, payment: Payment){
        this.date=date
        this.status=status
        this.customer=customer
        this.payment=payment
    }
    public addOrderDetils(orderDetail:OrderDetail):void{
        this.orderDetails.push(orderDetail)
    }
    public setPayment(payment:Payment):void{
        this.payment=payment
    }
}


class Item {
    private shippingWeight:number;
    private description:string;

    constructor (shippingWeight:number,description:string){
    this.shippingWeight=shippingWeight
    this.description=description
    }

    public getPriceForQuantity():number{
        return 0 
    }

    public getTax():number{
        return 0
    }

    public inStock():number{
        return 0 
    }
}

   class OrderDetail{
    private quantity:number;
    private taxStatus:string;

    constructor (quantity:number,taxStatus:string){
        this.quantity=quantity
        this.taxStatus=taxStatus
    }
    public calcSubTotal():number{
        return 0 
    }
    public calcWeight():number{
        return 0
    }
    public calcTax():string{
        return "nab"
    }
    
   }
   abstract class Payment{
    private amount:number

    constructor(amount:number){
        this.amount=amount
    }
}

class Cash extends Payment {
    private cashTendered:number;

    constructor (amount:number,cashTendered:number){
        super(amount);
        this.cashTendered=cashTendered
        
    }
}

class Check extends Payment{
    private name:String
    private bankID:String

constructor (amount:number,name:string,bankID:String){
    super(amount);
    this.name=name
    this.bankID=bankID
}
public authorized():boolean{
    return true
}
     
}

class Crerdit extends Payment{
    private number:String
    private type:String
    private expDate:Date

    constructor (amount:number,number:String,type:String,expDate:Date){
        super(amount);
        this.number=number
        this.type=type
        this.expDate=expDate
    }
    public authorized():boolean{
        return true
    }
}

