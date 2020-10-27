function createDom(value){
    let table = [...document.querySelectorAll("#table label")];
    let text = value.split("/")
    let ip = new IP(text[0], text[1])
    let dom = ip.Dom();
    dom.forEach((value, idx) => {
        table[idx].innerText = value
    })
    document.getElementById("Elenco").innerHTML += ip.HighButton();
}

function NHostToCidr(h){
    let out = "";
    for (let i = 0; i < 32; i++) {
        if(2**i < h+2) out += "0"
        else out += "1"
    }
    return (out.match(/1/g) || []).length
}

function OrdinamentoHost(param){
    return param.sort().reverse()
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
    let param = param.split(", ").map(value => parseInt(value))
    if(!controlSpace(param, parseInt(value.split("/")[1]))) return
    document.getElementById("table").style.display = "grid";
    document.getElementById("Elenco").style.display = "block";
    document.getElementById("hosts").style.display = "none";
    this.createDom(value)
}