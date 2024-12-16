class Customer {
    private name:String
    private address:String

    constructor (name:String,address:String){
        this.name=name
        this.address=address
    }
    public getInfo ():string{
        return " Name: "+this.name + " /nAddress: "+this.address
    }
 }
 class Order {
    private date:string
    private status:string
    private customer:Customer
    //ทำภายหลัง
    private payment: Payment = new Cash(0,0);
    private orderDetails:OrderDetail[] = [];

    constructor (date:string,status:string,customer:Customer){
        this.date=date
        this.status=status
        this.customer=customer
       
    }
    public addOrderDetils(orderDetail:OrderDetail):void{
        this.orderDetails.push(orderDetail)
    }
    public setPayment(payment:Payment):void{
        this.payment=payment
    }
    public calcTax(){
        let vat = 0;
        for(let i = 0; i<this.orderDetails.length;i++){
            vat = vat+this.orderDetails[i].calcTax();
    }
    return vat;
}
    public calcSubtotal(){
        let subtotal = 0;
        for(let i = 0; i<this.orderDetails.length;i++){
            subtotal = subtotal+this.orderDetails[i].calcSubTotal();
             
        }
return subtotal;
        
    }
    public printOrdrDetail():void{
        for(let i=0; i<this.orderDetails.length;i++){
            this.orderDetails[i].printDetail();
        }
    }
    public calsTotal(){
        return this.calcSubtotal()+this.calcTax();
    }
    public calcTotalWeight(){
        let weight = 0;
        for(let i = 0; i<this.orderDetails.length;i++){
            weight = weight+this.orderDetails[i].calcWeight();
             
    }
      return weight;
    }
    public payOrder(payment:Payment){
        this.payment=payment
    }
    public getPayment():Payment{
        return this.payment;
    }
}

    class Item {
    private shippingWeight:number;
    private description:string;
    private price:number;

    constructor (shippingWeight:number,description:string,price:number){
    this.shippingWeight=shippingWeight
    this.description=description
    this.price=price

    }

    public getPriceForQuantity():number{
        return this.price
    }

    public getTax(){
        return this.price * 7/100;
    }
    public getShippingWeight():number{
        return this.shippingWeight;
    }

    public inStock(){
        return true
    }
    public getName():string{
        return this.description;
    }
    public getInfo():string{
        return "Name:"+ this.description+",Price:"+this.price +"฿,Weight:"+this.shippingWeight+" kg.";
    }
  
    }

   

   class OrderDetail{
    private item:Item;
    private quantity:number;
    private taxStatus:string;
    

    constructor (item:Item,quantity:number,taxStatus:string){
        this.item=item
        this.quantity=quantity
        this.taxStatus=taxStatus
    }
    public calcSubTotal():number{
        return this.quantity*this.item.getPriceForQuantity();
    }
    public calcWeight():number{
        return this.quantity * this.item.getShippingWeight();
    }
    public calcTax(){
        if(this.taxStatus === "not include"){
            return this.quantity * this.item.getTax();
        }
        return 0;
    }
    public printDetail():void{
        console.log(this.item.getName() +"\t"+this.quantity +"(ชิ้น)\t"+this.calcSubTotal()+"฿")

    }
    
   }
   abstract class Payment{
    private amount:number

    constructor(amount:number){
        this.amount=amount
    }
    public getAmount():number{
        return this.amount
    }
}

class Cash extends Payment {
    private cashTendered:number;

    constructor (amount:number,cashTendered:number){
        super(amount);
        this.cashTendered=cashTendered
        
    }
    public getChange():number{
        return this.cashTendered - this.getAmount();
    }
    public getCashTendered ():number{
        return this.cashTendered
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


//create object

//Customer
const customer1 = new Customer("Mr.Choke Dee","Malaiman rd,Nakhon Pathom");
console.log(customer1.getInfo);

//item
const item1 = new Item(1.5,"lotus's water",15);
// console.log(item1.getInfo());

const item2 = new Item(1.5,"lotus's kanommm",20);
// console.log(item2.getInfo());

const item3 = new Item(2,"mama",6);
// console.log(item2.getInfo());

//orders
const order1 = new Order("16/12/2567","in progress",customer1);

//orderde
const OrderDetail1 = new OrderDetail(item1,1,"not include")
const OrderDetail2 = new OrderDetail(item2,2,"not include")
const OrderDetail3 = new OrderDetail(item3,5,"not include")
//orderDetail => order
order1.addOrderDetils(OrderDetail1);
order1.addOrderDetils(OrderDetail2);
order1.addOrderDetils(OrderDetail3);

const amount = order1.calsTotal();
//pay
const cash = new Cash(amount,1000);
// order1.printOrdrDetail();
order1.payOrder(cash);

// console.log("total:" +order1.getPayment().getAmount());
console.log("Subtotal:"+order1.calcSubtotal());
console.log("VAT:" + order1.calcTax());

console.log("Recieve"+ (order1.getPayment() as Cash).getCashTendered());
console.log("Change:"+(order1.getPayment() as Cash).getChange());

// buy mama

order1.printOrdrDetail()
