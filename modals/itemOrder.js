class ItemOrder {
    constructor(id,itemName,quantity,color,shipAddress,uId,orderedName,orderedDate,shippedDate) {
        this.id = id;
        this.itemName = itemName;
        this.quantity = quantity;
        this.color = color;
        this.shipAddress = shipAddress;
        this.uId = uId;
        this.orderedName = orderedName;
        this.orderedDate = orderedDate;
        this.shippedDate = shippedDate;
    }
}

export default ItemOrder;