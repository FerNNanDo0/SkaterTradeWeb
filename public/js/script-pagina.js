/*
navigator.userAgent.match(/webOS/i) 
navigator.userAgent.match(/iPhone/i) 
navigator.userAgent.match(/iPad/i) 
navigator.userAgent.match(/iPod/i) 
navigator.userAgent.match(/BlackBerry/i) 
navigator.userAgent.match(/Windows Phone/i)
*/
$(function(){
  function detectar_mobile() {  
    if( navigator.userAgent.match(/Android/i) ){ 
       return true; 
     }else { 
       return false; 
     } 
   }

  $('[name=clickitem]').on('click', function(e){
    if(detectar_mobile){
      console.log('Click do Item feito no Android');
    }else {
      console.log('Click do Item');
    }
  });
  
   console.log('Paginá carregada!');
})