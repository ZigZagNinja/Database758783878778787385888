//listens for Enter keypress
document.body.addEventListener( 'keyup', function (e) {
  if ( e.keyCode == 13 ) {
    searchfor();
  }
});

//check if image exist
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
}

//security system
let pressed = 0;
document.body.addEventListener( 'keyup', function (e) {
  if ( e.keyCode == 83 ) {
    pressed++;
  }
});

function searchfor(){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        let response = JSON.parse(this.responseText);
	        let searchName = document.getElementById("searchforElement").value;


	        for(let i=0;i<response.Leute.length;i++){
	        	if(response.Leute[i].Name.includes(searchName)){

	        		console.log(response.Leute[i])
	        		document.getElementById("foundName").innerHTML = response.Leute[i].Name;
	        		if(imageExists(response.Leute[i].Bild)){
	        			document.getElementById("pic").src = response.Leute[i].Bild;
	        		}
	        		else{document.getElementById("pic").src = "/Bilder/kfv.jpg";}

	        		document.getElementById("Geburtstag").innerHTML = "Geburtstag: "+ response.Leute[i].Geburtstag;
	        		document.getElementById("Wohnort").innerHTML = "Wohnort: "+ response.Leute[i].Wohnort;
	        		document.getElementById("Stärken").innerHTML = "Stärken: "+ response.Leute[i].Stärken;
	        		document.getElementById("Schwächen").innerHTML = "Schwächen: "+ response.Leute[i].Schwächen;
	        		document.getElementById("Wertung").innerHTML = "Wertung: "+ response.Leute[i].Wertung;
	        		//break;
	        	}
	        }
	    }
	};
	xmlhttp.open("GET", "Database.json", true);
	xmlhttp.send();
}
