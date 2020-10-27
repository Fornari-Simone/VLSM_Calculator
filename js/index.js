function createDom(value){
    let patt = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}[/](3[0-2]|[1-2][0-9]|[0-9)])$/g
    if (!patt.test(value)) {
        alert("wrong IP");
        return ;
    }
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

function textbox(e){
    this.createDom(e.parentNode.querySelector("input").value)
}