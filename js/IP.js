class IP {
    constructor (ip, mask){
        this.ip = ip.split(".").map(value => parseInt(value));
        // if mask
        if(mask.length > 7 && (mask.match(/[.]/g)||[]).length === 3){
            this.mask = mask.split(".").map(value => parseInt(value));
            this.cidr = this.CidrToMask()
        }
        // if
        else{
            let tempCidr = mask.split("");
            tempCidr.shift();
            this.cidr = parseInt(tempCidr.join(""));
            this.mask = this.MaskToCidr(mask)
        }
        this.wildcard = this.Wildcard()
        this.gateway = this.Gateway()
        this.broadcast = this.Broadcast()
    }

    CidrToMask(cidr){
        let tempCidr = this.mask.map(value => (value.toString(2).match(/1/g) || []).length);
        let outCidr = 0;
        tempCidr.forEach(element => {
            outCidr += parseInt(element);
        });
        return outCidr
    }

    MaskToCidr() {
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

    Gateway() {
        return [this.ip[0], this.ip[1], this.ip[2], this.ip[3] | 1]
    }

    Broadcast() {
        return this.ip.map((value, idx) => value | this.wildcard[idx]);
    }

    FirsHost() {
    }
}