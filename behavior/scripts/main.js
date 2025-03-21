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
    }
},1)

//ゲーム開始関数 blue:Player[],red:Player[],mapId:number
function start(blue,red,mapId){
    for(const i = 0; i < blue.length; i++){
        blue[i].inputPermissions.movementEnabled = false;
        blue[i].teleport(map.coordinates[mapId].blue[i]);
    }
    for(const p of red){
        red[i].inputPermissions.movementEnabled = false;
        red[i].teleport(map.coordinates[mapId].blue[i]);
    }
}