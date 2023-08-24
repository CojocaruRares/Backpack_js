
class Backpack {
    constructor(small, medium, big){
        this.small = small;
        this.medium = medium;
        this.big = big;
        this.currentStatus = new Map([
            ["small", 0],
            ["medium", 0],
            ["big", 0],
            ]);
    }
}

class PackingService{
    constructor(backpack){
        this.backpack = backpack;
        this.packIndex = 1;
        this.packStatus = new Map([
            ["small", 0],
            ["medium", 0],
            ["big", 0],
            ]);
    }
    
    Pack(item){
        if (!["small", "medium", "big"].includes(item)) {
            console.log("Invalid item size.");
            return;
        }
        let current = this.backpack.currentStatus.get(item);
        if( current < this.backpack[item]){
            let nextPackIndex = this.packIndex;
            this.packIndex++;
            this.backpack.currentStatus.set(item, ++current);
            this.packStatus.set(item, nextPackIndex);
            return nextPackIndex;
        }
        else return -1;
    }
    
    Unpack(item){
        if (!["small", "medium", "big"].includes(item)) {
            console.log("Invalid item size.");
            return;
        }
        let current = this.backpack.currentStatus.get(item);
        let pack = this.packStatus.get(item);
        if(current <= 0)
            return -2;
        else{
            let nextPack = pack;
            this.packStatus.set(item, --nextPack);
            return pack;
        }
    }
    
    Execute(actionList){
        actionList.forEach((action) => {
            if(action[0] === "pack")
                console.log(this.Pack(action[1]));
            else if (action[0] === "unpack")
                console.log(this.Unpack(action[1]));
        });
    }
    
}

let actionList = [["pack", "small"], ["pack", "big"], ["pack", "big"], ["pack", "big"], ["unpack", "big"], ["unpack", "medium"]];
let backpack = new Backpack(8, 4, 2);
let pack = new PackingService(backpack);
pack.Execute(actionList);






