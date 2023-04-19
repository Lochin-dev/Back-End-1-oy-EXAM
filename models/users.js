class User {
    id;
    name;
    weight;
    password;
    data;
    constructor(id, name, weight,password, date){
        this.id=id;
        this.name=name;
        this.weight=weight;
        this.password = password;
        this.data=date
    }
}

module.exports=User
