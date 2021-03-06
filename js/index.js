let ips = []

function createDom(e){
    let table = [...document.querySelectorAll("#table label")];
    let ip = ips[parseInt(e.id)]
    let dom = ip.Dom();
    dom.forEach((value, idx) => {
        table[idx].innerText = value
    })
    let elenco = [...document.getElementById("Elenco").children]
    if(elenco.length > 3) document.getElementById("Elenco").style.overflowY = "scroll"
    e.classList.add("active")
    elenco.forEach(value => {
        if(!value.isSameNode(e))
            value.classList.remove("active")
    })

}



function OrdinamentoHost(param){
    return param.sort()
}

function controlSpace(param, cidr){
    return (param.reduce((a,b) => a+b)) < 2**(32-cidr)
}

function textbox(e){
    let value = document.getElementById("Net").value;
    let patt = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}[/](3[0-2]|[1-2][0-9]|[0-9)])$/g
    if (!patt.test(value)) {
        alert("wrong IP");
        return ;
    }
    let param = document.getElementById("host").value
    param = param.split(", ").map(value => parseInt(value))
    if(!controlSpace(param, parseInt(value.split("/")[1]))) return
    document.getElementById("table").style.display = "grid";
    document.getElementById("Elenco").style.display = "block";
    document.getElementById("hosts").style.display = "none";
    let hostDec = OrdinamentoHost(param)
    let net = (value.split("/"))[0]
    hostDec.forEach((value, idx) => {
        let ip = new IP(net, value)
        ips.push(ip)
        console.log(ip.broadcast)
        net = BroadcastToNextNet(ip.broadcast)
        document.getElementById("Elenco").innerHTML += ip.HighButton("createDom(this)",idx)
    })
    document.getElementById("Elenco").firstChild.click()
}

function BroadcastToNextNet(bc){
    let binBc = bc.map(value => add0(value.toString(2)))
    let decNet = parseInt(binBc.join(""), 2)+1
    
    let strNet = decNet.toString(2)
    let lung = 32 - strNet.length
    let out = ""
    for (let i = 0; i < lung; i++) {out += "0"}
    out += strNet
    out = out.match(/.{8}/g)
    out = out.map(value => parseInt(value,2))
    return out.join(".")
}

function add0(value){
    let lung = 8 - value.length
    let out = ""
    for (let i = 0; i < lung; i++) out += "0"
    return out + value
}

function reset(){
    document.getElementById("Net").value = ""
    document.getElementById("host").value = ""
    ips = []
    document.getElementById("table").style.display = "none";
    document.getElementById("Elenco").style.display = "none";
    document.getElementById("hosts").style.display = "block";
    document.getElementById("Elenco").style.overflowY = "hidden"
    document.getElementById("Elenco").innerHTML = "";
}