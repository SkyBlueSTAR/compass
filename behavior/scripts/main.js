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
            {pos:{x:130,y:-40,z:300},rot:{x:15,y:0},tick:0,blackout:false},
            {pos:{x:120,y:-40,z:300},rot:{x:15,y:180},tick:60,blackout:false},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:0,blackout:true},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:10,blackout:false},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:40,blackout:false},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:10,blackout:false},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:0,blackout:true},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:10,blackout:false},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:40,blackout:false},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:10,blackout:true}
        ],
        [
            {pos:{x:100,y:-40,z:300},rot:{x:15,y:0},tick:0,blackout:false},
            {pos:{x:130,y:-40,z:300},rot:{x:15,y:180},tick:60,blackout:false},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:0,blackout:true},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:10,blackout:false},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:40,blackout:false},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:10,blackout:false},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:0,blackout:true},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:10,blackout:false},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:40,blackout:false},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:10,blackout:true}
        ],
        [
            {pos:{x:100,y:-40,z:300},rot:{x:15,y:0},tick:0,blackout:false},
            {pos:{x:130,y:-40,z:300},rot:{x:15,y:180},tick:60,blackout:false},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:0,blackout:true},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:0},tick:10,blackout:false},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:40,blackout:false},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:0},tick:10,blackout:false},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:0,blackout:true},
            {pos:{x:100,y:-40,z:300},rot:{x:0,y:180},tick:10,blackout:false},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:40,blackout:false},
            {pos:{x:90,y:-40,z:300},rot:{x:0,y:180},tick:10,blackout:true}
        ]
    ]
}

world.afterEvents.worldInitialize.subscribe(()=>{
    if(!world.scoreboard.getObjective("time")?.isValid())world.scoreboard.addObjective("time");
    if(!world.scoreboard.getObjective("time").hasParticipant("time"))world.scoreboard.getObjective("time").setScore("time",0);
})

system.runInterval(()=>{
    for(const player of world.getAllPlayers()){
        if(world.scoreboard.getObjective("time").getScore("time")<=3600){
            player.camera.setCamera("minecraft:third_person");
        }
        if(player.isSneaking){
            player.sneakingTime++;
        }else{
            player.sneakingTime = 0;
        }
        if(player.sneakingTime >= 1){
            const viewingPortal = player.getEntitiesFromViewDirection({tags:["portal_key"],maxDistance:1.4});
            if(viewingPortal.length>=1){
                touch_portal(viewingPortal[0].entity,player);
            }
        }
        switch(player.dimension.getBlock(player.location).below().permutation.type.id){
            case "minecraft:blue_wool":
                player.addTag("blue");
                player.removeTag("red");
            break;
            case "minecraft:red_wool":
                player.removeTag("blue");
                player.addTag("red");
            break;
            case "minecraft:light_gray_wool":
                player.removeTag("blue");
                player.removeTag("red");
            break;
        }
    }
    if(world.scoreboard.getObjective("time").getScore("time")>=1)world.scoreboard.getObjective("time").addScore("time",-1);
},1)

//ゲーム開始関数 blue:Player[],red:Player[],spectator:Player[],mapId:number
function start(blue,red,spectator,mapId){
    //移動不可付与とテレポート、カメラワーク起動
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
        spectator[i].teleport(map.coordinates[mapId].spectator);
        spectator[i].setGameMode(GameMode.spectator);
    }
    camera(map.camera[mapId],blue);
    camera(map.camera[mapId],red);
    camera(map.camera[mapId],spectator);
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

//試合前カメラ処理 cameraList:{pos:Vector3,rot:Vector2,tick:Number,blackout:boolean}[],players:Player[]
function camera(cameraList,players){
    for(const player of players){
        if(cameraList[0].tick >= 1){
            player.camera.setCamera("minecraft:free",{location:cameraList[0].pos,rotation:cameraList[0].rot,easeOptions:{easeTime:cameraList[0].tick/20,easeType:EasingType.InOutCubic}});
        }else{
            player.camera.setCamera("minecraft:free",{location:cameraList[0].pos,rotation:cameraList[0].rot});
        }
    }
    if(cameraList.length>=2){
        if(cameraList[0].tick>=1){
            system.runTimeout(()=>{
                let newCameraList = []
                for(let i = 1; i < cameraList.length; i++){
                    newCameraList.push(cameraList[i]);
                }
                camera(newCameraList,players);
            },cameraList[0].tick)
            if(cameraList[0].tick>=11 && cameraList[1].blackout){
                system.runTimeout(()=>{
                    for(const player of players){
                        player.camera.fade({fadeColor:{blue:0,green:0,red:0},fadeTime:{fadeInTime:0.5,holdTime:0.5,fadeOutTime:0.5}});
                    }
                },cameraList[0].tick-10)
            }else if(cameraList[0].tick==10 && cameraList[1].blackout){
                for(const player of players){
                    player.camera.fade({fadeColor:{blue:0,green:0,red:0},fadeTime:{fadeInTime:0.5,holdTime:0.5,fadeOutTime:0.5}});
                }
            }
        }else{
            let newCameraList = []
            for(let i = 1; i < cameraList.length; i++){
                newCameraList.push(cameraList[i]);
            }
            camera(newCameraList,players);
        }
    }else{
        for(const player of players){
            if(cameraList[0].blackout){
                for(const player of players){
                    player.camera.fade({fadeColor:{blue:0,green:0,red:0},fadeTime:{fadeInTime:0.5,holdTime:0.5,fadeOutTime:0.5}});
                }
            }
            player.camera.setCamera("minecraft:third_person");
        }
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
                const bluePlayers = world.getDimension("overworld").getPlayers({location:portalEntity.location,maxDistance:5,tags:["blue"]});
                const redPlayers = world.getDimension("overworld").getPlayers({location:portalEntity.location,maxDistance:5,tags:["red"]});
                const spectatePlayers = world.getDimension("overworld").getPlayers({location:portalEntity.location,maxDistance:5,excludeTags:["blue","red"]});
                start(bluePlayers,redPlayers,spectatePlayers,re.selection);
            }
        })
    }
}
