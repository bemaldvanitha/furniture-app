class Orders {
    constructor(id,items,date,totalAmount,shipAddress,deliveryDate) {
        this.id = id;
        this.items = items;
        this.date = date;
        this.totalAmount = totalAmount;
        this.shipAddress = shipAddress;
        this.deliveryDate = deliveryDate;
    }
}

export default Orders;