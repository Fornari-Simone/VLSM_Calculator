function createDom(value){
    let table = document.querySelectorAll("#table label");
    /*let text = value.split("/")
    let ip = new IP(text[0], text[1])
    let dom = ip.Dom();
    dom.forEach((value, idx) => {
        table.innerHTML += head[idx]
        table.innerHTML += value
    })*/
}

function textbox(e){
    this.createDom(e.parentNode.querySelector("input").value)
}