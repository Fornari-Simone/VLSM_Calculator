function createDom(value){
    let table = document.getElementById("table");
    let text = value.split("/")
    let ip = new IP(text[0], text[1])
    let head = [
        ip.HeadCell("NET"),
        ip.HeadCell("MASK"),
        ip.HeadCell("FIRST HOST"),
        ip.HeadCell("LAST HOST"),
        ip.HeadCell("BROADCAST"),
        ip.HeadCell("WILDCARD"),
    ]
    let dom = ip.Dom();
    dom.forEach((value, idx) => {
        table.innerHTML += head[idx]
        table.innerHTML += value
    })
}

function textbox(e){
    this.createDom(e.parentNode.querySelector("input").value)
}