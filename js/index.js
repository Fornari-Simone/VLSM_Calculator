function createDom(value){
    let text = value.split("/")
    let ip = new IP(text[0], text[1])
    document.getElementById("table").innerHTML = ip.Dom();
}