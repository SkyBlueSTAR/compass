import {world,system} from "@minecraft/server";
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
            ]
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
            ]
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
            ]
        }
    ],
    name:[
        "でらクランクストリート",
        "けっこいスターパーク",
        "かけだせ！じっぱか城"
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
        if(player.sneakingTime == 1){
            const viewingPortal = player.getEntitiesFromViewDirection({tags:["portal_key"],maxDistance:1.4});
            if(viewingPortal.length>=1){
                touch_portal(viewingPortal[0].entity,player)
            }
        }
    }
    if(world.scoreboard.getObjective("time").getScore("time")>=1)world.scoreboard.getObjective("time").addScore("time",-1);
},1)

//ゲーム開始関数 blue:Player[],red:Player[],mapId:number
function start(blue,red,mapId){
    //移動不可付与とテレポート
    for(let i = 0; i < blue.length; i++){
        blue[i].inputPermissions.movementEnabled = false;
        blue[i].teleport(map.coordinates[mapId].blue[i]);
    }
    for(let i = 0; i < red.length; i++){
        red[i].inputPermissions.movementEnabled = false;
        red[i].teleport(map.coordinates[mapId].red[i]);
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
    },200)
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
        let menu = new ActionFormData()
            .title("ステージ選択")
        for(const mapName of map.name){
            menu = menu.button(mapName);
        }
        menu.show(player).then(re=>{
            if(!re.canceled){
                world.sendMessage(portalEntity.location.x+","+portalEntity.location.y+","+portalEntity.location.z+",")
                const nearPlayers = world.getDimension("overworld").getPlayers({location:{x:portalEntity.location.x,y:portalEntity.location.y,z:portalEntity.location.z},maxDistance:5})
                const teamedPlayers = randomTeam(nearPlayers);
                start(teamedPlayers.blue,teamedPlayers.red,re.selection);
            }
        })
    }
}

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
}