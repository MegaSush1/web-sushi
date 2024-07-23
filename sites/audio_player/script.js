// Custom Cursor //

var cursor = document.querySelector('#cursor');
var a = document.querySelectorAll('.cursorhover');
var disable = document.querySelectorAll(".disablelock");


document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(${x-5}px, ${y-5}px, 0)`
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})

// AUDIO PLAYER //

var output = document.querySelector("#audiooutput");
var playbutton = document.querySelector("#ctrl-play-pause");
var sliderprogress = document.querySelector(".slider-play-progress")
var roundprogress = document.querySelector(".player-cover svg .progress")


output.onloadeddata = function(){
    playbutton.classList.remove("disablelock")

    output.controls = false;
    
    var slider = document.querySelector(".slider");
    var ISslidertime = false;
    var x=0;
    var width = slider.offsetWidth;
    var duration = output.duration ;
    var mousedown = false;
    var totalMinutes = Math.floor(duration / 60);
    var totalSeconds = Math.floor(duration % 60);

    if (totalSeconds < 10){
        totalSeconds = "0"+totalSeconds;
    }
    document.querySelector(".time-len").textContent = totalMinutes+":"+totalSeconds;

    playbutton.addEventListener("click",handleplaybutton);

    document.addEventListener("keypress",(e)=>{
        if (e.key==" "){
            handleplaybutton();
        }
    });

    slider.addEventListener("mousedown", ()=>{
        //console.log((x/width)*duration)
        mousedown = true;
    });
    document.addEventListener("mouseup", ()=>{
        //console.log((x/width)*duration)
        mousedown = false;
    });

    slider.addEventListener("mousemove",(e)=>{
        if (mousedown){
            x = e.offsetX;
            settime();
        }
    });

    slider.addEventListener("click",(e)=>{
        x = e.offsetX;
        settime();
    });

    output.addEventListener("timeupdate",handleTimeUpdate);

    function handleTimeUpdate(){
        let currentMinutes = Math.floor(output.currentTime / 60);
        let currentSeconds = Math.floor(output.currentTime % 60);
    
        updateProgressBar();

        if (currentSeconds < 10){
            currentSeconds = "0"+currentSeconds;
        }

        document.querySelector(".time-progress").textContent = currentMinutes+":"+currentSeconds;
    }

    function updateProgressBar(){
        var a = (output.currentTime/duration)*width;
        sliderprogress.style.width = (a+10)-5 +"px";
        roundprogress.style.strokeDashoffset = Math.floor(200-(output.currentTime/duration)*200);
    }

    function settime(){
        output.currentTime = Math.floor((x/width)*duration);
        updateProgressBar();
    }

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// Volume

    var volume = document.querySelector(".volume")
    var volumeP = document.querySelector(".volume div")
    var mousedownvol = false;
    var y = 0;

    volume.addEventListener("mousedown", ()=>{
        //console.log((x/width)*duration)
        mousedownvol = true;
    })
    document.addEventListener("mouseup", ()=>{
        //console.log((x/width)*duration)
        mousedownvol = false;
    })

    volume.addEventListener("mousemove",(e)=>{
        y = e.offsetX;
        if (mousedownvol){
            setvolume();
        }
    })

    volume.addEventListener("click",(e)=>{
        y = e.offsetX;
        setvolume();
    })

    volume.querySelector(".volinfo").addEventListener("click",()=>{
        document.querySelector(".volume .volinfo").textContent = "Mute";
        volume.style.setProperty("--_volwidth",39+"px");
        output.volume = 0;
    })

    function setvolume(){
        let alty = y - 39;
        let altwidth = volume.offsetWidth - 39 ;

        if (y/volume.offsetWidth > 39/volume.offsetWidth){
            let vol = ( Math.round((alty/altwidth)*100)/100 )*1;
            output.volume = vol; 
        
            if(vol<0.01){
                document.querySelector(".volume .volinfo").textContent = "Mute";
            }
            else{
                document.querySelector(".volume .volinfo").textContent = Math.round(100*vol)+"%";
            }
            volume.style.setProperty("--_volwidth",y+"px");
    }
    }

}



function handleplaybutton()
{
    let otext = playbutton.getAttribute("data-otext");
        playbutton.setAttribute("data-otext",playbutton.textContent);
        playbutton.textContent = otext;
        if (otext == "Pause"){output.play();}
        else{output.pause();}
}

function resetaudiostate()
{
    playbutton.setAttribute("data-otext","Pause");
    playbutton.textContent = "Play";
    output.pause();
}

const jsmediatags = window.jsmediatags;

//songInfoGetting("./Like Wooh Wooh - Radio Edit.mp3")

document.querySelector("#input").addEventListener("change", (event) => {
    output.load();
    const file = event.target.files[0];
    output.setAttribute("src",URL.createObjectURL(file));
    songInfoGetting(file);
});

function songInfoGetting(file){
    
    resetaudiostate();

    jsmediatags.read(file, {
        onSuccess: function(tag) { 

        // Array buffer to base64
        const data = tag.tags.picture.data;
        const format = tag.tags.picture.format;
        let base64String = "";
        for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
        }

        // Output media tags
        document.querySelector(".cover img").setAttribute("src",`data:${format};base64,${window.btoa(base64String)}`);
        document.querySelector(".songtitle").textContent = tag.tags.title;
        document.querySelector(".songartiste").textContent = tag.tags.artist;
        },
        onError: function(error) {
            console.log(error);
        }
    }); 
}

const colorThief = new ColorThief();

const imgcover = document.querySelector(".cover img");

imgcover.addEventListener("load", ()=>{
    let palette = colorThief.getColor(imgcover);
    let palette5 = colorThief.getPalette(imgcover, 5);

    document.documentElement.style.setProperty("--custom-accent","rgb("+palette+")");

    document.documentElement.style.setProperty("--custom-accent-1","rgb("+palette5[0]+")");
    document.documentElement.style.setProperty("--custom-accent-2","rgb("+palette5[1]+")");
    document.documentElement.style.setProperty("--custom-accent-3","rgb("+palette5[2]+")");
    document.documentElement.style.setProperty("--custom-accent-4","rgb("+palette5[3]+")");
    document.documentElement.style.setProperty("--custom-accent-5","rgb("+palette5[4]+")");
});

function getFile() {
    document.getElementById("input").click();
}
  
function sub(obj) {
    var file = obj.value;
    var fileName = file.split("\\");
    document.getElementById("filecache").innerHTML = fileName[fileName.length - 1];
}