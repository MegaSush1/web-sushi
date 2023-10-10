const menu = document.querySelector("#menu")
const navbutton = document.querySelector(".navbutton")

navbutton.onclick = function(){
	menu.classList.toggle("show")
}