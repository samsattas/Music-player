let input;//file selector
let pl = new Player();//music player
let ss = 0;//screen showing
let volumeSlider ;//Volume controller
let songTimeSlider;
let aux = true;
let mtitle;//Main Title
let play;//Play
let pause;//Pause
let bg;//Background
let upload = false;

let plImg = [];
let plToShow = -1;

let textInput;
let submit;
/*
1. Debe poder cargar archivos del disco duro.                           [✔]
2. Debe mostrar el archivo actual en reproducción.                      [✔]
3. Debe poder reproducir el sonido actual o uno disponible en lista.    [✔]
4. Debe poder pausar y detener.                                         [✔]
5. Debe poder adelantar o devolver la canción.                          [✔]
6. Debe poder definir el nivel de volumen.                              [✔]
7. Debe poder crear múltiples listas de reproducción.                   [✔]
8. Debe poder modificar la posición actual de reproducción.             [✔]
9. Debe mostrar el nivel de avance de la canción.                       [✔]
10. Debe mostrar el tiempo total de la canción.                         [✔]
11. Debe mostrar el nombre de las canciones de la lista de reproducción.[✔]
12. Debe poder cargar diversas listas de reproducción.                  [✔]
13. El tipo de interacción detallado depende de usted pero la           [✔]
usabilidad es un requisito obligatorio.
*/
function setupSongs(){
  let song1 = loadSound('songfolder/fuga.mp3');
  let song2 = loadSound('songfolder/Siento.mp3');
  let song3 = loadSound('songfolder/Die4You.mp3');
  let song4 = loadSound('songfolder/Goldrush Two.mp3');
  let song5 = loadSound('songfolder/Higher & Higher.mp3');
  let song6 = loadSound('songfolder/When You See Me.mp3');
  let song7 = loadSound('songfolder/Heroes.mp3');

  pl.addSong(song1);
  pl.addSong(song2);
  pl.addSong(song3);
  pl.addSong(song4);
  pl.addSong(song5);
  pl.addSong(song6);
  pl.addSong(song7);

  pl.addFile("La Fuga");
  pl.addFile("Hoy lo siento");
  pl.addFile("Die for you");
  pl.addFile("Goldrush Two");
  pl.addFile("Higher & Higher");
  pl.addFile("When You See Me");
  pl.addFile("Heroes");

  pl.addPlaylist(setupShowAllSongs());
  pl.addPlaylist([0,2,1]);
}

function setupShowAllSongs(){
  let a = [];
  for(let i in pl.getSongs()){
    a.push(i);
  }
  return a;
}

function setup() {
  createCanvas(1280, 720);
  mtitle = loadImage("src/maintitle.png");
  bg = loadImage("src/frame.png");
  pause = loadImage("src/pause.png");
  play = loadImage("src/play.png");

  plImg.push(loadImage('src/pl1.jpg'));
  plImg.push(loadImage('src/pl2.jpg'));
  plImg.push(loadImage('src/pl3.jpg'));
  plImg.push(loadImage('src/pl1.jpg'));
  plImg.push(loadImage('src/pl2.jpg'));
  plImg.push(loadImage('src/pl3.jpg'));

  input = createFileInput(addFile);
  input.position(1120, 690);
  input.hide();

  setupSongs();
  songTimeSlider = createSlider(0,100,0,1);
  songTimeSlider.position(1000,1000);
  songTimeSlider.style("width", "1280px");

  volumeSlider = createSlider(0, 100, 80);
  volumeSlider.style("width", "100px");
  volumeSlider.position(1000,1000);

  textInput = createInput();
  textInput.position(550,60);
  textInput.style('height','30px');
  textInput.hide();
  
  submit = createButton("Add playlist");
  submit.position(750,60);
  submit.style('height','30px');
  submit.mousePressed(addPlaylist);
  submit.hide();
}

function addFile(file){
  if (file.type === 'audio') {
    let inSong = loadSound(file);
    pl.addFileName(file);
    pl.getPlaylists()[0].push(pl.getPlaylists()[0].length);
    pl.addSong(inSong);
  }
}

function draw() {
  if(pl.allLoaded()){
    if(ss == 0){
      mainTitle();
    }else if(ss == 1){
      textInput.hide();
      submit.hide();
      screenNowPlaying();
      displayAllPlaylist();

      textSize(60)
      textStyle(BOLD);
      text('All Playlist',220, 60);
      textStyle(NORMAL);
      textSize(30);
      text('+ Playlist',160,100);
      
    }else if(ss == 2){
      textInput.hide();
      submit.hide();
      input.hide();
      screenNowPlaying();
      showPlaylist();

    }else if(ss == 3){
      input.hide();
      textInput.show();
      submit.show();
      screenNowPlaying();
      showCreatePlaylist();
      textSize(60)
      textStyle(BOLD);
      text('Add Playlist',150, 80);
      textStyle(NORMAL);

    }
  }else{
    textSize(30);
    text("Loading...",10,550);
  }
}
 
function mousePressed(){
  if(ss == 0){
    ss = 1;
  }else if(ss == 1){
    pl.listen();
    if(mouseX > 95 && mouseX < 225 && mouseY > 70 && mouseY < 105){//Add playlist
      ss = 3
    }
    if(mouseY > 620 && mouseY < 635){//Change current time of song
        aux = false;
    }
    if(mouseY > 170 && mouseY < 470){//Show playlist
      for(let i in pl.getPlaylists()){
        if(mouseX > (i*350+50) && mouseX < (i*350+350)){
          plToShow = i;
          ss = 2;
        }
      }
    }
    if(mouseX > 1185 && mouseX < 1225 && mouseY > 650 && mouseY < 685){//Upload
      if(upload){
        input.show();
        upload = false
      }else{
        input.hide();
        upload = true;
      }
    }
    
  }else if(ss == 2){
    if(mouseX > 50 && mouseX < 120 && mouseY > 30 && mouseY < 50){
      ss = 1;
    }
    pl.listen();
    if(mouseY > 620 && mouseY < 635){
        aux = false;
    }
    if(mouseX > 130 && mouseX < 165 && mouseY > 60 && mouseY < 100){//Play playlist
      pl.getSongs()[pl.getPlaylists()[pl.getCurrentPlaylist()][pl.getNowPlayingPlaylist()]].stop();
      pl.setCurrentPlaylist(plToShow);
      pl.setNowPlayingPlaylist(0);
      pl.playPlaylist();
    }
  }else if(ss == 3){
    pl.listen();
    if(mouseX > 50 && mouseX < 120 && mouseY > 30 && mouseY < 50){
      ss = 1;
    }
  }
}

function mouseReleased(){
  aux = true;
}

function mainTitle(){
  image(mtitle,0,0);
}


function screenNowPlaying(){//SCREEN 1
  background(220);
  image(bg,0,0);
  textAlign(CENTER);  

  //SONG NAME//
  fill(255);
  textSize(40);
  let auxName = pl.getFiles()[pl.getPlaylists()[pl.getCurrentPlaylist()][pl.getNowPlayingPlaylist()]];
  text(auxName, 200, 690);


  //PLAY BUTTON//
  if(!pl.getIsPlaying()){
    pause.resize(100,100);
    image(pause,590, 625);
  }else{
    play.resize(100,100);
    image(play,595, 625);
  }
  

  //VOLUME SLIDER//
  textSize(30);
  if(volumeSlider.value() == 0){
    text("🔈",960,685);
  }else if(volumeSlider.value()>0 && volumeSlider.value() <50){
    text("🔉",960,685);
  }else{
    text("🔊",960,685);
  }
  pl.setVolume(volumeSlider.value());
  volumeSlider.position(990,665);


  //DISPLAY DURATION//
  if(aux){
    songTimeSlider.value(pl.getCurrentTime());
  }
  songTimeSlider.position(0,620);
  songTimeSlider.attribute('max',pl.getSongDuration());
  text(pl.getFinalDuration(pl.getSongDuration()),1250,660);
  text(pl.getFinalDuration(pl.getCurrentTime()),40,660);
  

  //MODIFY//
  if(!aux){
    pl.modifySong(songTimeSlider.value());
  }  
}

function displayAllPlaylist(){
  for(let i in pl.getPlaylists()){
    imageMode(CENTER);
    plImg[i].resize(300,300);
    image(plImg[i],i*350+200,320);
    imageMode(CORNER);
    textAlign(CENTER);
    if(i == 0){
      text("All Songs",i*350+200, 500);
    }else{
      text("Playlist "+ i,i*350+200, 500);
    }
    
    textAlign(CORNER);
  }
}

function getPlaylistSongs(){
  for(let i in pl.getPlaylists()[plToShow]){
    text((+i+1) + '. ' + pl.getFiles()[pl.getPlaylists()[plToShow][i]], 100, i*50 + 200);
  }
}

function showPlaylist(){//SCREEN 2
  textAlign(CORNER);
  textSize(50);
  if(plToShow == 0){
    text('All Songs',300,100);
  }else{
    text('Playlist #'+plToShow,300,100);
  }

  image(play,100, 35);

  textAlign(LEFT);
  textSize(20);
  getPlaylistSongs();

  text('⮌ Back', 50,50);
}


function showCreatePlaylist(){//SCREEN 3
  plToShow = 0;
  
  textAlign(LEFT)
  getPlaylistSongs();
  textAlign(LEFT);
  textSize(20);
  text('⮌ Back', 50,50);
  textSize(15);
  text('Write the number of the songs you want to add\nseparated by a coma and no spaces (i.e.: 1,3,6,2)',550,30);
}

function addPlaylist(){
  let t = textInput.value().split(',');
  if(t.length > 0){
    pl.addPlaylist();
    ss = 1;
  }
  textInput.value('');
}
