function on_off_menu (){
	const menu_aside = document.getElementById("menu-aside");
	const bottom = document.getElementById("bottom");
	
	if( menu_aside.className.match(/(?:^|\s)close(?!\S)/) ){
		
		menu_aside.className =
		menu_aside.className.replace( /(?:^|\s)close(?!\S)/g, '');
		
		bottom.className = 
		bottom.className.replace( /(?:^|\s)menuclose(?!\S)/g, '');
	}
	else{
		menu_aside.className += " close";
		
		bottom.className += " menuclose";
	}
}

function on_off_profil (){
	const menu = document.getElementById("profil-menu");
	
	if( menu.className.match(/(?:^|\s)open(?!\S)/) ){
		
		menu.className =
		menu.className.replace( /(?:^|\s)open(?!\S)/g, '');
	}
	else{
		menu.className += " open";
	}
}