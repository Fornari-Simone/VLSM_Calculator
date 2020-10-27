class IP {
    constructor (net, mask){
        this.net = net.split(".").map(value => parseInt(value));
        this.cidr = parseInt(mask);
        this.mask = this.CidrToMask()
        this.net = this.toNet();
        this.wildcard = this.Wildcard()
        this.broadcast = this.Broadcast()
        this.firstHost = this.FirstHost()
        this.lastHost = this.LastHost()
    }

    toNet(){
        return this.net.map((value, idx) => value & this.mask[idx])
    }

    CidrToMask(){
        let tempCidr = this.cidr;
        let outMask = ""
        for (let i = 0; i < 32; i++) {
            if(tempCidr > 0){
                outMask += "1"
                tempCidr--;
            }
            else outMask += "0";
        }
        let tempMask = outMask.match(/.{8}/g)
        return tempMask.map(value => parseInt(value,2))
    }

    Wildcard() {
        let tempCidr = this.cidr
        let tempMask = ""
        for(let i = 0; i <  32; i++){
            if(tempCidr > 0){
                tempMask += "0"
                tempCidr--;
            }
            else tempMask += "1";
        }
        let tempWildcard = tempMask.match(/.{8}/g)
        return tempWildcard.map(value => parseInt(value,2))
    }

    FirstHost() {
        return [this.net[0], this.net[1], this.net[2], this.net[3] | 1]
    }

    Broadcast() {
        return this.net.map((value, idx) => value | this.wildcard[idx]);
    }

    LastHost() {
        return this.net.map((value, idx) => {
            let wildcardAdjust = idx != 3 ? this.wildcard[idx] : this.wildcard[idx]-1
            return value | wildcardAdjust
        });
    }

    HighButton(listener, id) {
        return `<h3 onclick="${listener}" id="${id}">${this.net.join(".")} (/${this.cidr})</h3>`
    }

    Dom(){
        return [
            this.net.join("."),
            `${this.mask.join(".")} (/${this.cidr})`,
            this.firstHost.join("."),
            this.lastHost.join("."),
            this.broadcast.join("."),
            this.wildcard.join(".")
        ]
    }
}