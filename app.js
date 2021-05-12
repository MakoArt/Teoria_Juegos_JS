//Creamos el canvas 


const canvas=document.querySelector('canvas')
const ctx=canvas.getContext('2d')
const vidas=document.querySelector('#vidas')
const empezar=document.querySelector('#empezar')
const gameOver=document.querySelector('#gameOver')
const tituloMarcador=document.querySelector('h1')

//logica de empezar boton 

empezar.addEventListener('click',(e)=>{
  e.preventDefault()





//Estilos del canvas 

canvas.width=innerWidth 
canvas.height=innerHeight
canvas.style.backgroundColor='lightblue'


//Puntuacion inicial al empezar el juego 

parseInt(localStorage.setItem('vidas',10))

//Velocidad de enemigos en caida aleatorias 

let random=Math.random()*(1-1)+1
let random1=Math.random()*(2-1)+1
let random2=Math.random()*(1-1)+1
let random3=Math.random()*(2-1)+1
let random4=Math.random()*(1-1)+1
let random5=Math.random()*(2-1)+1
let random6=Math.random()*(1-1)+1

//Altura Aleatoria de los enemigos 

let altura=Math.random()*(-50+(-100))+1
let altura1=Math.random()*(-50+(-400))+1
let altura2=Math.random()*(-50+(-700))+1
let altura3=Math.random()*(-50+(-1000))+1
let altura4=Math.random()*(-50+(-1300))+1
let altura5=Math.random()*(-50+(-1600))+1
let altura6=Math.random()*(-50+(-1900))+1


//Player principal y enemigo

class Element{
    constructor(posX,posY,width,height,color,velocity){
        this.posX=posX;
        this.posY=posY;
        this.width=width;
        this.height=height;
        this.abajo=true;
        //pinta los elementos en pantalla
        this.paint=function(){
            ctx.fillStyle=color;
            ctx.fillRect(this.posX,this.posY,this.width,this.height)
        }
        //mueve la plataforma protagonista derecha
        this.derecha=function(){
            if(this.posX<innerWidth-90){
                this.posX+=8

            }
        }
        //mueve plataforma protagonista izquierda
        this.izquierda=function(){
            if(this.posX>0){
                this.posX-=8
            }
        }
        //mueve el enemigo en el eje de las Y
        this.bajarEnemigo=function(){
            if(this.abajo===true){
                if(this.posY>-2000)
                    this.posY+=velocity;
                }
                //para restar vidas cada vez que el enemigo nos sobrepase
                if(this.posY>=420){
                    this.posY=-10
                    
                    let cogerVidas=parseInt(localStorage.getItem('vidas'))
                    let restoVidas=cogerVidas-=1
                    localStorage.setItem('vidas',restoVidas)
                    vidas.innerHTML=`Vidas:${localStorage.getItem('vidas')}`
                
                //cuando nos quitan todas las vidas 
                       
                   if(restoVidas<=0){
                       vidas.innerHTML='0'
                       gameOver.innerHTML='¡¡¡HAS PERDIDO!!!'
                       setTimeout(()=>{window.location.href='index.html'},3000)
                   }
                
                
                
                }
            }
        }

    
    
    }


 
    //INSTANCIAS DE CLASE 

    let principalPlayer=new Element(10,400,90,20,'red',null)
    let water=new Element(0,450,innerWidth,100,'blue',null)
    let enemigo=new Element(10,altura,40,40,'white',random)
    let enemigo1=new Element(60,altura1,40,40,'yellow',random1)
    let enemigo2=new Element(110,altura2,40,40,'orangered',random2)
    let enemigo3=new Element(160,altura3,40,40,'green',random3)
    let enemigo4=new Element(210,altura4,40,40,'blue',random4)
    let enemigo5=new Element(260,altura5,40,40,'red',random5)
    let enemigo6=new Element(310,altura6,40,40,'black',random6)
  
    //LOGICA DE LAS COLISIONES 

    let marcador=parseInt(localStorage.setItem('marcador',0))
    let cogerMarcador=parseInt(localStorage.getItem('marcador'))
       
    function colisiones(){



    let enemigos=[enemigo,enemigo1,enemigo2,enemigo3,enemigo4,enemigo5,enemigo6]

     enemigos.map(ene=>{

        if(ene.posY+40>=principalPlayer.posY &&
           ene.posX>=principalPlayer.posX &&
           ene.posX<=principalPlayer.posX+90 && 
           ene.posX+40>=principalPlayer.posX){

                
             //suma de puntos de marcador 

             let sumaColision=cogerMarcador+=1
             localStorage.setItem('marcador',sumaColision)
             tituloMarcador.innerHTML=`Marcador:${sumaColision}`  
             ene.posY=-50


           }
     })






    }
    let intervaloColisiones=setInterval(()=>{colisiones(),600})

      
    
    //MOVIMIENTOS DEL JUGADOR  

       document.addEventListener('keydown',function(e){
        e.preventDefault()

        //derecha

        if(e.key==='ArrowRight'){
            e.preventDefault()
            principalPlayer.derecha()
        }
        //izquierda
        if(e.key==='ArrowLeft'){
            e.preventDefault()
            principalPlayer.izquierda()
        }
         
       


    })
  

    //BUCLE PRINCIPAL DEL JUEGO 

    function principal(){

    canvas.width=innerWidth
    canvas.height=500
    principalPlayer.paint()
    
    water.paint()
    enemigo.paint()
    enemigo1.paint()
    enemigo2.paint()
    enemigo3.paint()
    enemigo4.paint()
    enemigo5.paint()
    enemigo6.paint()
    enemigo.bajarEnemigo()
    enemigo1.bajarEnemigo()
    enemigo2.bajarEnemigo()
    enemigo3.bajarEnemigo()
    enemigo4.bajarEnemigo()
    enemigo5.bajarEnemigo()
    enemigo6.bajarEnemigo()

    
    
    
    
    
    
    window.requestAnimationFrame(principal)
    }
    principal()



  
})









