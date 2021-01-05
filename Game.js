class Game{
    constructor(){

    }
    //reads the gameState value from the database
    getState(){
        database.ref("gameState").on("value", function(data){
            gameState = data.val()
        })
    }

    //writes the gameState value in the database
    updateState(state){
        database.ref("/").update({
            gameState: state
        })
    }

    async start(){
        if(gameState ===0){
            player = new Player()
            var playerRef = await database.ref("playerCount").once("value")
            if (playerRef.exists()){
                playerCount = playerRef.val()
                player.getCount()
            }
            form = new Form()
            form.display()
        }
        car1 = createSprite(100,200)
        car2 = createSprite(300,200)
        car3 = createSprite(500,200)
        car4 = createSprite(700,200)
        car1.addImage(car1img)
        car2.addImage(car2img)
        car3.addImage(car3img)
        car4.addImage(car4img)
        cars = [car1, car2, car3, car4]
    }

    play(){
      form.hide()
      Player.getPlayerInfo()
      player.getCarsAtEnd()
      //!== means not equal to
      if(players!== undefined){
          background("black")    
          image(trackimg, 0, -displayHeight*4, displayWidth, displayHeight*5)
          var index = 0
          var x = 185
          var y
          for (var i in players){
              index = index+1
              x = x+220
              y = displayHeight - players[i].distance
              cars[index-1].x = x
              cars[index-1].y = y
              if (index === player.index){
                  stroke("blue")
                  fill("purple")
                  ellipse(x,y,60)
                  camera.position.x = displayWidth/2
                  camera.position.y = cars[index-1].y
              }
          }
      }
      if(keyDown("up") && player.index!==null){
          player.distance = player.distance+10
          player.updateInfo()
      }
     if (player.distance>4390){
          gameState = 2
          player.rank+=1
          Player.updateCarsAtEnd(player.rank)
      }
        drawSprites()
    }

    end (){
        console.log("Game Finished")
        console.log(player.rank)
    }
}