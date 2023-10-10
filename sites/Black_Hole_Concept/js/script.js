const menubox = document.querySelector("#menubox");
const body = document.querySelector("#body");
const menubutton = document.querySelector("#menubutton")

menubutton.onclick = function(){
	menubox.classList.toggle("open")
	body.classList.toggle("locked")
}