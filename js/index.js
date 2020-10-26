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

function textbox(e){
    this.createDom(e.parentNode.querySelector("input").value)
}