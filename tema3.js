
class Backpack {
    constructor(capacities) {
        this.capacities = capacities;
        this.currentStatus = {};
        for (const size in capacities) {
            this.currentStatus[size] = 0;
        }
    }

    canPack(item) {
        return this.currentStatus[item] < this.capacities[item];
    }

    pack(item, index) {
        if (!this.canPack(item)) {
            return -1;
        }
        this.currentStatus[item]++;
        this.lastPackIndex = index;
        return this.currentStatus[item];
    }

    unpack(item) {
        if (this.currentStatus[item] <= 0) {
            return -2;
        }
        this.currentStatus[item]--;
        return this.lastPackIndex || -1;
    }
}

class PackingService {
    constructor(backpack) {
        this.backpack = backpack;
        this.packIndex = 1;
    }

    pack(item) {
        if (!["small", "medium", "big"].includes(item)) {
            console.log("Invalid item size.");
            return;
        }

        if (this.backpack.canPack(item)) {
            const newPackIndex = this.packIndex++;
            this.backpack.pack(item, newPackIndex);
            return newPackIndex;
        }

        return -1;
    }

    unpack(item) {
        if (!["small", "medium", "big"].includes(item)) {
            console.log("Invalid item size.");
            return;
        }

        return this.backpack.unpack(item);
    }

    execute(actionList) {
        actionList.forEach((action) => {
            const [actionType, item] = action;
            if (actionType === "pack") {
                console.log(this.pack(item));
            } else if (actionType === "unpack") {
                console.log(this.unpack(item));
            }
        });
    }
}

const capacities = {
    small: 8,
    medium: 4,
    big: 2
};
const backpack = new Backpack(capacities);
const actionList = [["pack", "small"], ["pack", "big"], ["pack", "big"], ["pack", "big"], ["unpack", "big"], ["unpack", "medium"]];
const packingService = new PackingService(backpack);
packingService.execute(actionList);







