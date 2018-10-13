window.onload=function(){
  var board=document.getElementById('board');
  var list=document.getElementById('list');
  var buttons=document.getElementById('buttons').getElementsByTagName('span');
  var pre=document.getElementById('prev');
  var next=document.getElementById('next');
  var index=1;
  var animated=false;
  var timer;

  function showButton(){
    for(var i=0;i<buttons.length;i++){
      if(buttons[i].className=='on'){
        buttons[i].className='';
        break;
      }
    }
    buttons[index-1].className="on";
  }

  function animate(offset){
    animated=true;
    var newleft=parseInt(list.style.left)+offset;
    var time=300;
    var interval=10;
    var speed=offset/(time/interval);
   
    function go(){
      if((speed<0&&parseInt(list.style.left)>newleft)
        ||(speed>0&&parseInt(list.style.left)<newleft))
      {
        list.style.left=parseInt(list.style.left)+speed+'px';
        setTimeout(go,interval);
      }
      else
      {
        animated=false;
        list.style.left=newleft+'px';
        if(newleft>-1000){
          list.style.left=-5000+'px'; 
        }
        if(newleft<-5000){
          list.style.left=-1000+'px'; 
        }
      }
    }
   go();
  }

  // automatically play
  function play(){
    timer=setInterval(function(){
      next.onclick();
    },3000);
  }
  // stop automatically play
  function stop(){
    clearInterval(timer);
  }
   
  // switch to next photo
  // index++, showButton()
  next.onclick=function(){
    if(index==5){
      index=1;
    }
    else{
    index+=1;
    }
    showButton();
    if(animated==false){
      animate(-1005);
    }
  }

  // switch to previous photo
  // index--, showButton()
  pre.onclick=function(){
    if(index==1){
      index=5;
    }
    else{
      index-=1;
    }
    showButton();
    if(animated==false){
     animate(996);
    }
  }
   
  //
  for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=function(){
      if(this.className=='on'){
        return;
      }
      var myIndex=parseInt(this.getAttribute('index'));
      var offset=-1000*(myIndex-index);
      index=myIndex;
      showButton();
      if(animated==false){
        animate(offset);
      }
    }
  }
   
  board.onmouseover=stop;
  board.onmouseout=play;
  play();
}