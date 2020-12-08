class User {
    constructor(id,name,email,telNum,address,imageUrl,isDealer,storedLoc) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.telNum = telNum;
        this.address = address;
        this.imageUrl = imageUrl;
        this.isDealer = isDealer;
        this.storedLoc = storedLoc;
    }
}

export default User;