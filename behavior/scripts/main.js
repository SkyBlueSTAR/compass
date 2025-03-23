import {world,system, GameMode, BlockType, BlockTypes, BlockComponentTypes, EasingType} from "@minecraft/server";
import {ActionFormData} from "@minecraft/server-ui";

const map = {
    coordinates:[
        {
            blue:[
                {x:100,y:-48,z:300},
                {x:100,y:-48,z:300},
                {x:100,y:-48,z:300},
                {x:100,y:-48,z:300},
                {x:100,y:-48,z:300}
            ],
            red:[
                {x:100,y:-48,z:300},
                {x:100,y:-48,z:300},
                {x:100,y:-48,z:300},
                {x:100,y:-48,z:300},
                {x:100,y:-48,z:300}
            ],
            spectator:{x:100,y:-48,z:300}
        },
        {
            blue:[
                {x:105,y:-48,z:300},
                {x:105,y:-48,z:300},
                {x:105,y:-48,z:300},
                {x:105,y:-48,z:300},
                {x:105,y:-48,z:300}
            ],
            red:[
                {x:105,y:-48,z:300},
                {x:105,y:-48,z:300},
                {x:105,y:-48,z:300},
                {x:105,y:-48,z:300},
                {x:105,y:-48,z:300}
            ],
            spectator:{x:105,y:-48,z:300}
        },
        {
            blue:[
                {x:110,y:-48,z:300},
                {x:110,y:-48,z:300},
                {x:110,y:-48,z:300},
                {x:110,y:-48,z:300},
                {x:110,y:-48,z:300}
            ],
            red:[
                {x:110,y:-48,z:300},
                {x:110,y:-48,z:300},
                {x:110,y:-48,z:300},
                {x:110,y:-48,z:300},
                {x:110,y:-48,z:300}
            ],
            spectator:{x:110,y:-48,z:300}
        }
    ],
    name:[
        "でらクランクストリート",
        "けっこいスターパーク",
        "かけだせ！じっぱか城"
    ],
    camera:[
        [
            {pos:{x:100,y:-40,z:300},rot:{x:-15,y:0},tick:0},
            {pos:{x:130,y:-40,z:300},rot:{x:0,y:180},tick:60},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:0},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:10},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:40},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:10},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:0},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:10},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:40},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:10}
        ],
        [
            {pos:{x:100,y:-40,z:300},rot:{x:-15,y:0},tick:0},
            {pos:{x:130,y:-40,z:300},rot:{x:0,y:180},tick:60},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:0},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:10},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:40},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:10},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:0},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:10},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:40},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:10}
        ],
        [
            {pos:{x:100,y:-40,z:300},rot:{x:-15,y:0},tick:0},
            {pos:{x:130,y:-40,z:300},rot:{x:0,y:180},tick:60},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:0},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:10},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:40},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:10},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:0},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:10},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:40},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:10}
        ]
    ]
}

world.afterEvents.worldInitialize.subscribe(()=>{
    world.scoreboard.addObjective("time");
    if(!world.scoreboard.getObjective("time").hasParticipant("time"))world.scoreboard.getObjective("time").setScore("time",0);
    system.runTimeout(()=>{
        world.sendMessage("compass add-on has been loaded!");
    },200)
})

system.runInterval(()=>{
    for(const player of world.getAllPlayers()){
        player.camera.setCamera("minecraft:third_person");

        if(player.isSneaking){
            player.sneakingTime++;
        }else{
            player.sneakingTime = 0;
        }
        if(player.sneakingTime >= 1){
            const viewingPortal = player.getEntitiesFromViewDirection({tags:["portal_key"],maxDistance:1.4});
            if(viewingPortal.length>=1){
                touch_portal(viewingPortal[0].entity,player)
            }
        }
        if(player.dimension.getBlock(player.location).below().permutation.type.id == "minecraft:wool"){
            switch(player.dimension.getBlock(player.location).below().permutation.getState("color")){
                case "blue":
                    player.addTag("blue");
                    player.removeTag("red");
                break;
                case "red":
                    player.removeTag("blue");
                    player.addTag("red");
                break;
                case "silver":
                    player.removeTag("blue");
                    player.removeTag("red");
                break;
            }
        }
    }
    if(world.scoreboard.getObjective("time").getScore("time")>=1)world.scoreboard.getObjective("time").addScore("time",-1);
},1)

//ゲーム開始関数 blue:Player[],red:Player[],spectator:Player[],mapId:number
function start(blue,red,spectator,mapId){
    //移動不可付与とテレポート
    for(let i = 0; i < blue.length; i++){
        blue[i].inputPermissions.movementEnabled = false;
        blue[i].teleport(map.coordinates[mapId].blue[i]);
        blue[i].setGameMode(GameMode.adventure);
    }
    for(let i = 0; i < red.length; i++){
        red[i].inputPermissions.movementEnabled = false;
        red[i].teleport(map.coordinates[mapId].red[i]);
        red[i].setGameMode(GameMode.adventure);
    }
    for(let i = 0; i < spectator.length; i++){
        spectator[i].inputPermissions.movementEnabled = false;
        spectator[i].teleport(map.coordinates[mapId].spectator[i]);
        spectator[i].setGameMode(GameMode.spectator);
    }
    //制限時間セット(180s*20tick+開始前ビューの時間)
    world.scoreboard.getObjective("time").setScore("time",3800);
    system.runTimeout(()=>{
        for(let i = 0; i < blue.length; i++){
            blue[i].inputPermissions.movementEnabled = true;
        }
        for(let i = 0; i < red.length; i++){
            red[i].inputPermissions.movementEnabled = true;
        }
        for(let i = 0; i < spectator.length; i++){
            spectator[i].inputPermissions.movementEnabled = true;
        }
    },200)
}

//試合前カメラ処理 cameraList:{pos:Vector3,rot:Vector2,tick:Number}[],players:Player[]
function camera(cameraList,players){
    for(const player of players){
        if(cameraList[0].tick>=1){
            player.camera.setCamera("minecraft:free",{location:cameraList[0].pos,rotation:cameraList[0].rot,easeOptions:{easeTime:cameraList[0].tick,easeType:EasingType.InOutCubic}})
        }else{
            player.camera.setCamera("minecraft:free",{location:cameraList[0].pos,rotation:cameraList[0].rot})
        }
    }
    if(cameraList.length>=2){
        system.runTimeout(()=>{
            cameraList.shift();
            camera(cameraList);
        },cameraList[0].tick)
    }
}

//ポータルキー処理 portalEntity:entity,player:Player
function touch_portal(portalEntity,player){
    if(portalEntity.hasTag("portal_A")){

    }
    
    if(portalEntity.hasTag("portal_B")){
        
    }
    
    if(portalEntity.hasTag("portal_C")){
        
    }
    
    if(portalEntity.hasTag("portal_D")){
        
    }
    
    if(portalEntity.hasTag("portal_E")){
        
    }
    if(portalEntity.hasTag("portal_lounge")){
        if(player.sneakingTime >= 2)return;
        let menu = new ActionFormData()
            .title("ステージ選択")
        for(const mapName of map.name){
            menu = menu.button(mapName);
        }
        menu.show(player).then(re=>{
            if(!re.canceled){
                world.sendMessage(portalEntity.location.x+","+portalEntity.location.y+","+portalEntity.location.z+",")
                const bluePlayers = world.getDimension("overworld").getPlayers({location:portalEntity.location,maxDistance:5,tags:["blue"]});
                const redPlayers = world.getDimension("overworld").getPlayers({location:portalEntity.location,maxDistance:5,tags:["red"]});
                const spectatePlayers = world.getDimension("overworld").getPlayers({location:portalEntity.location,maxDistance:5,excludeTagstags:["blue","red"]});
                start(bluePlayers,redPlayers,spectatePlayers,re.selection);
            }
        })
    }
}
/*
function randomTeam(players){
    const results={blue:[],red:[]};
    for(let i = 0; i < players.length; i++){
        if(i % 2==0){
            results.blue.push(players[i]);
        }else{
            results.red.push(players[i]);
        }
    }
    return results;
}*/