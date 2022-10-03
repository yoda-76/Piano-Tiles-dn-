var v=1200;
var curTile;
var hScore=0;
var started=false;
var score=0;
var seq=[];
var keySeq=[];
var tiles=document.querySelectorAll('.btn');
tiles.forEach(tile=>{
  
})
let rowNumber = 0;
var activeTile;
var a=setInterval(addRow,v);


document.querySelector('.start').addEventListener('click',()=>{
  started=true;
})
document.querySelector('.again').addEventListener('click',()=>{
  score=0;
  seq=[]
  keySeq=[]
  document.querySelector('.main-frame').innerHTML='';
  started=false;
  v=1200;
  rowNumber=0;
})

window.addEventListener('keydown',(e)=>{
  console.log("key pushed",keySeq.slice(-1).toString().toUpperCase());
  if(e.key==keySeq.slice(-1).toString().slice(-1).toLowerCase()){
      curTile=seq.pop();
      document.querySelector(`#${curTile}`).classList.add('safe');
      document.querySelector(`#${curTile}`).classList.add('clicked');
      console.log(event.target.classList)
      score++;
      
      if(score>hScore){
        hScore=score;
      }
      document.querySelector('#score').textContent=score;
      keySeq.pop();
  }
  else{
    curTile=seq.pop();
    
    if(e.key=='a'){
      activeTile=document.querySelector(`#R${curTile.slice(1,2)}T1`)
    }
    else if(e.key=='s'){
      activeTile=document.querySelector(`#R${curTile.slice(1,2)}T2`)
    }
    else if(e.key=='d'){
      activeTile=document.querySelector(`#R${curTile.slice(1,2)}T3`)
    }
    else if(e.key=='f'){
      activeTile=document.querySelector(`#R${curTile.slice(1,2)}T4`)
        event.target.classList.add('alert')
    }
    activeTile.classList.add('alert')
    started=false;
    document.querySelector('#h-score').textContent=hScore;

  }
})
// -------------------------------------------AddingNewRow------------------------------------------------
function addRow() {
  
  if(started==true){
    rowNumber++;
  const frame = document.querySelector(".main-frame");

  const newRow = document.createElement("div");
  newRow.setAttribute("class", "row flex flex-row");
  newRow.setAttribute("id", `row-${rowNumber}`);
  newRow.innerHTML = `
    <div data-key="65" class="btn" id="R${rowNumber}T1">A</div>
    <div data-key="83" class="btn" id="R${rowNumber}T2">S</div>
    <div data-key="68" class="btn" id="R${rowNumber}T3">D</div>
    <div data-key="70" class="btn" id="R${rowNumber}T4">F</div>
`;
  frame.insertBefore(newRow, document.getElementById(`row-${rowNumber - 1}`));
  //---------------------------------------------MakingRandomKeys-------------------------------
  let acti=Math.floor(Math.random() * (4 - 1 + 1)) + 1;

  if(acti==1)
  activeTile= document.querySelector(`div[data-key="${65}"]`);
  else if(acti==2)
  activeTile= document.querySelector(`div[data-key="${83}"]`);
  else if(acti==3)
  activeTile= document.querySelector(`div[data-key="${68}"]`);
  else
  activeTile= document.querySelector(`div[data-key="${70}"]`);

  activeTile.classList.add('active');
  activeTile.addEventListener('click',()=>{
    if(event.target.id==seq.slice(-1)){
      event.target.classList.add('safe')
      seq.pop()
      event.target.classList.add('clicked');
      console.log(event.target.classList)
      score++;
      
      if(score>hScore){
        hScore=score;
      }
      document.querySelector('#score').textContent=score;
    }
    else{
        event.target.classList.add('alert')
      
      // clearInterval(a)
      started=false
      document.querySelector('#h-score').textContent=hScore;
    }
    
  })

  newRow.querySelectorAll(".btn").forEach(tile=>{
    tile.addEventListener('click',()=>{
      console.log('btn clicked');
      if(!(event.target.classList.contains("active"))){
        event.target.classList.add('alert')
        
        // clearInterval(a)
        started=false
        document.querySelector('#h-score').textContent=hScore;
        
      }
    })
  })

  seq.unshift(activeTile.id);
  keySeq.unshift(`${activeTile.id}${activeTile.textContent}`)
  console.log(keySeq)

  // ........................................................................................

// --------------------------------------------------------------------------------
if(document.querySelectorAll(".row")[4]!=undefined && !(document.querySelectorAll(".row")[4].querySelector('.active').classList.contains('clicked'))){
  // clearInterval(a)
  document.querySelector('#h-score').textContent=hScore;

  started=false
  console.log('not clicked')
  
}
  }
}



window.addEventListener("keydown",function(e){
    const audio=document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key=document.querySelector(`.btn[data-key="${e.keyCode}"]`)

    if(!audio) return;
    audio.currentTime=0;
    audio.play()

    key.classList.add('playing')
});
// document.querySelector("#letsgo").addEventListener("click",()=>{
//   document.querySelector('.title').style.padding="-100%";
//   document.querySelector('.rules').style.paddingBottom="-100%";
//   console.log('clicked')
// })

// function removeTransition(e){
//    console.log(e)
// }
// const btns=document.querySelectorAll('.btn');
// btns.forEach(button=> button.addEventListener('transitionend',removeTransition))
