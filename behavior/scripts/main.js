import {world,system} from "@minecraft/server";

const map = {
    coordinates:[
        {
            blue:[
                {x:0,y:0,z:0},
                {x:0,y:0,z:0},
                {x:0,y:0,z:0},
                {x:0,y:0,z:0},
                {x:0,y:0,z:0}
            ],
            red:[
                {x:0,y:0,z:0},
                {x:0,y:0,z:0},
                {x:0,y:0,z:0},
                {x:0,y:0,z:0},
                {x:0,y:0,z:0}
            ]
        }
    ]
}

world.afterEvents.worldInitialize.subscribe(()=>{
    world.sendMessage("compass add-on has been loaded!");
})

system.runInterval(()=>{
    for(const player of world.getAllPlayers()){
        player.camera.setCamera("third_person");

        if(player.isSneaking){
            const viewingPortal = player.getEntitiesFromViewDirection({tags:["portal_key"],maxDistance:1.4});
            if(viewingPortal.length>=1){
                touch_portal(viewingPortal[0].entity)
            }
        }
    }
},1)

//ゲーム開始関数 blue:Player[],red:Player[],mapId:number
function start(blue,red,mapId){
    //移動不可付与とテレポート
    for(const i = 0; i < blue.length; i++){
        blue[i].inputPermissions.movementEnabled = false;
        blue[i].teleport(map.coordinates[mapId].blue[i]);
    }
    for(const p of red){
        red[i].inputPermissions.movementEnabled = false;
        red[i].teleport(map.coordinates[mapId].blue[i]);
    }
    //制限時間セット(180s*20tick+開始前ビューの時間)
    world.scoreboard.getObjective("time").setScore("time",3800);
}

//ポータルキー処理 portalEntity:entity
function touch_portal(portalEntity){
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
        
    }
}