import {world,system, GameMode, BlockType, BlockTypes, BlockComponentTypes, EasingType, BlockPermutation, BlockVolume, InputPermissionCategory} from "@minecraft/server";
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
    if(!world.scoreboard.getObjective("portal_state")?.isValid())world.scoreboard.addObjective("portal_state")
    if(!world.scoreboard.getObjective("time").hasParticipant("time"))world.scoreboard.getObjective("time").setScore("time",0);
})

let loop = 0;
system.runInterval(()=>{
    for(const player of world.getAllPlayers()){
        if(world.scoreboard.getObjective("time").getScore("time")<=3600 && world.scoreboard.getObjective("time").getScore("time")>=1){
            player.camera.setCamera("minecraft:third_person");
        }
        if(player.isSneaking || player.lockMovement>=1){
            player.sneakingTime++;
            if(player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.LateralMovement))player.inputPermissions.setPermissionCategory(InputPermissionCategory.LateralMovement,false);
        }else{
            //剥がし時の行動ロック(0.25s)
            if(!player.lockMovement>=1 && player.sneakingTime>=1 && !player.isInAction){
                player.lockMovement = 5;
                player.sneakingTime = -5;
            }else{
                player.sneakingTime = 0;
            }
            if(!player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.LateralMovement))player.inputPermissions.setPermissionCategory(InputPermissionCategory.LateralMovement,true);
            if(!player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Camera))player.inputPermissions.setPermissionCategory(InputPermissionCategory.Camera,true);
            player.isInAction = false;
        }
        //スニークでポータルタッチ/HAの分岐処理
        if(player.sneakingTime >= 1){
            const viewingPortal = player.getEntitiesFromViewDirection({tags:["portal_key"],maxDistance:2});
            let portal_touch = false;
            if(viewingPortal.length>=1 && !player.isInAction && !player.notTouch){
                //ポータルタッチ処理
               portal_touch = touch_portal(viewingPortal[0].entity,player);
            }
            if(!portal_touch){
                //HA処理
                player.isInAction = true;
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
        if(player.lockMovement>=1)player.lockMovement--;
    }
    //各ポータルについての処理
    const portals = world.getDimension("overworld").getEntities({type:"armor_stand",tags:["portal_key","portal_A"]}).concat(
        world.getDimension("overworld").getEntities({type:"armor_stand",tags:["portal_key","portal_B"]}),
        world.getDimension("overworld").getEntities({type:"armor_stand",tags:["portal_key","portal_C"]}),
        world.getDimension("overworld").getEntities({type:"armor_stand",tags:["portal_key","portal_D"]}),
        world.getDimension("overworld").getEntities({type:"armor_stand",tags:["portal_key","portal_E"]})
    );
    for(const portal of portals){
        const portalRange = Math.abs(world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity)/288);
        if(portal.dimension.getPlayers({location:{x:portal.location.x-portalRange-0.5,y:portal.location.y,z:portal.location.z-portalRange-0.5},volume:{x:portalRange*2,y:10,z:portalRange*2},tags:["blue"]}).length>=1){
            portal.addTag("steppedByBlue");
        }else{
            portal.removeTag("steppedByBlue");
        }
        if(portal.dimension.getPlayers({location:{x:portal.location.x-portalRange-0.5,y:portal.location.y,z:portal.location.z-portalRange-0.5},volume:{x:portalRange*2+2,y:10,z:portalRange*2+2},tags:["red"]}).length>=1){
            portal.addTag("steppedByRed");
        }else{
            portal.removeTag("steppedByRed");
        }
        if(portal.hasTag("steppedByBlue") && !portal.hasTag("steppedByRed") && world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) >= 1 && !portal.lock){
            world.scoreboard.getObjective("portal_state").addScore(portal.scoreboardIdentity,4);
            if((portal.hasTag("portal_A") || portal.hasTag("portal_E")) && world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) > 2016){
                world.scoreboard.getObjective("portal_state").setScore(portal.scoreboardIdentity,2016);
            }
            if((portal.hasTag("portal_B") || portal.hasTag("portal_D")) && world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) > 1440){
                world.scoreboard.getObjective("portal_state").setScore(portal.scoreboardIdentity,1440);
            }
            if(portal.hasTag("portal_C") && world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) > 576){
                world.scoreboard.getObjective("portal_state").setScore(portal.scoreboardIdentity,576);
            }
        }
        if(!portal.hasTag("steppedByBlue") && portal.hasTag("steppedByRed") && world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) <= -1 && !portal.lock){
            world.scoreboard.getObjective("portal_state").addScore(portal.scoreboardIdentity,-4);
            if((portal.hasTag("portal_A") || portal.hasTag("portal_E")) && world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) < -2016){
                world.scoreboard.getObjective("portal_state").setScore(portal.scoreboardIdentity,-2016);
            }
            if((portal.hasTag("portal_B") || portal.hasTag("portal_D")) && world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) < -1440){
                world.scoreboard.getObjective("portal_state").setScore(portal.scoreboardIdentity,-1440);
            }
            if(portal.hasTag("portal_C") && world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) < -576){
                world.scoreboard.getObjective("portal_state").setScore(portal.scoreboardIdentity,-576);
            }
        }
        for(let x = Math.floor((-portalRange-0.5)/2)*2; x <= Math.ceil((portalRange+0.5)/2)*2; x+=2){
            for(let z = Math.floor((-portalRange-0.5)/2)*2; z <= Math.ceil((portalRange+0.5)/2)*2; z+=2){
                let nx = x;
                let nz = z;
                if(x == Math.floor((-portalRange-0.5)/2)*2){
                    nx = -portalRange-0.5;
                }
                if(x == Math.ceil((portalRange+0.5)/2)*2){
                    nx = portalRange+0.5;
                }
                if(z == Math.floor((-portalRange-0.5)/2)*2){
                    nz = -portalRange-0.5;
                }
                if(z == Math.ceil((portalRange+0.5)/2)*2){
                    nz = portalRange+0.5;
                }
                if(world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) >= 1 && loop%5 == 0){
                    portal.dimension.spawnParticle("minecraft:blue_flame_particle",{x:portal.location.x+nx,y:portal.location.y,z:portal.location.z+nz});
                }
                if(world.scoreboard.getObjective("portal_state").getScore(portal.scoreboardIdentity) <= -1 && loop%5 == 0){
                    portal.dimension.spawnParticle("minecraft:basic_flame_particle",{x:portal.location.x+nx,y:portal.location.y,z:portal.location.z+nz});
                }
            }
        }
    }
    if(world.scoreboard.getObjective("time").getScore("time")>=1)world.scoreboard.getObjective("time").addScore("time",-1);
    loop++;
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
    if(portalEntity.hasTag("portal_A") || portalEntity.hasTag("portal_B") || portalEntity.hasTag("portal_C") || portalEntity.hasTag("portal_D") || portalEntity.hasTag("portal_E")){
        if(world.scoreboard.getObjective("portal_state").getScore(portalEntity.scoreboardIdentity)==0){
            if(player.hasTag("blue")){
                player.inputPermissions.setPermissionCategory(InputPermissionCategory.Camera,false);
                //取得時の行動ロック(2.5s)
                if(!player.lockMovement>=1 && player.sneakingTime == 1){
                    player.lockMovement = 50;
                }
                //ポータル拡張ロック
                portalEntity.lock = true;
                system.runTimeout(()=>{
                    world.scoreboard.getObjective("portal_state").setScore(portalEntity.scoreboardIdentity,1);
                    place_blue_portal(portalEntity);
                    portalEntity.lock = false;
                },30)
            }
            if(player.hasTag("red")){
                player.inputPermissions.setPermissionCategory(InputPermissionCategory.Camera,false);
                //取得時の行動ロック(2.5s)
                if(!player.lockMovement>=1 && player.sneakingTime == 1){
                    player.lockMovement = 50;
                }
                //ポータル拡張ロック
                portalEntity.lock = true;
                system.runTimeout(()=>{
                    world.scoreboard.getObjective("portal_state").setScore(portalEntity.scoreboardIdentity,-1);
                    place_red_portal(portalEntity);
                    portalEntity.lock = false;
                },30)
            }
        }
        if(player.hasTag("blue") && world.scoreboard.getObjective("portal_state").getScore(portalEntity.scoreboardIdentity)>=1)return false;
        if(player.hasTag("red") && world.scoreboard.getObjective("portal_state").getScore(portalEntity.scoreboardIdentity)<=-1)return false;
        if(portalEntity.hasTag("steppedByBlue") && world.scoreboard.getObjective("portal_state").getScore(portalEntity.scoreboardIdentity)>=1)return false;
        if(portalEntity.hasTag("steppedByRed") && world.scoreboard.getObjective("portal_state").getScore(portalEntity.scoreboardIdentity)<=-1)return false;
        if(player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Camera))player.inputPermissions.setPermissionCategory(InputPermissionCategory.Camera,false);
        //タッチ時の行動ロック(1.7s)
        if(!player.lockMovement>=1 && player.sneakingTime == 1){
            player.lockMovement = 34;
        }
        if(player.sneakingTime>=21){
            if(player.hasTag("blue")){
                world.scoreboard.getObjective("portal_state").addScore(portalEntity.scoreboardIdentity,9);
                if(world.scoreboard.getObjective("portal_state").getScore(portalEntity.scoreboardIdentity)>=0){
                    //取得時の行動ロック(2.5s)
                    if(!player.lockMovement>=1){
                        player.lockMovement = 50;
                    }
                    //ポータル拡張ロック
                    portalEntity.lock = true;
                    system.runTimeout(()=>{
                        world.scoreboard.getObjective("portal_state").setScore(portalEntity.scoreboardIdentity,1);
                        place_blue_portal(portalEntity);
                        portalEntity.lock = false;
                    },30)
                }
            }
            if(player.hasTag("red")){
                world.scoreboard.getObjective("portal_state").addScore(portalEntity.scoreboardIdentity,-9);
                if(world.scoreboard.getObjective("portal_state").getScore(portalEntity.scoreboardIdentity)<=0){
                    //取得時の行動ロック(2.5s)
                    if(!player.lockMovement>=1){
                        player.lockMovement = 50;
                    }
                    //ポータル拡張ロック
                    portalEntity.lock = true;
                    system.runTimeout(()=>{
                        world.scoreboard.getObjective("portal_state").setScore(portalEntity.scoreboardIdentity,-1);
                        place_red_portal(portalEntity);
                        portalEntity.lock = false;
                    },30)
                }
            }
        }
        return true;
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
        return true;
    }
}

//ポータルリセット portal:Entity
function portal_reset(portal){
    if(!portal.hasTag("portal_key"))return false;
    portal.dimension.fillBlocks(new BlockVolume(portal.location,{x:portal.location.x,y:portal.location.y+3,z:portal.location.z}),BlockPermutation.resolve("andesite_wall"));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+1,z:portal.location.z},BlockPermutation.resolve("pale_oak_fence"));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+4,z:portal.location.z},BlockPermutation.resolve("pale_oak_trapdoor",{direction:0,open_bit:false,upside_down_bit:false}));
    portal.dimension.setBlockPermutation({x:portal.location.x+1,y:portal.location.y+3,z:portal.location.z},BlockPermutation.resolve("pale_oak_trapdoor",{direction:0,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x-1,y:portal.location.y+3,z:portal.location.z},BlockPermutation.resolve("pale_oak_trapdoor",{direction:1,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+3,z:portal.location.z+1},BlockPermutation.resolve("pale_oak_trapdoor",{direction:2,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+3,z:portal.location.z-1},BlockPermutation.resolve("pale_oak_trapdoor",{direction:3,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x+portal.getViewDirection().x,y:portal.location.y+portal.getViewDirection().y,z:portal.location.z+portal.getViewDirection().z},BlockPermutation.resolve("iron_bars"));
}

//青ポータル設置 portal:Entity
function place_blue_portal(portal){
    if(!portal.hasTag("portal_key"))return false;
    portal.dimension.fillBlocks(new BlockVolume(portal.location,{x:portal.location.x,y:portal.location.y+3,z:portal.location.z}),BlockPermutation.resolve("prismarine_wall"));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+1,z:portal.location.z},BlockPermutation.resolve("warped_fence"));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+4,z:portal.location.z},BlockPermutation.resolve("warped_trapdoor",{direction:0,open_bit:false,upside_down_bit:false}));
    portal.dimension.setBlockPermutation({x:portal.location.x+1,y:portal.location.y+3,z:portal.location.z},BlockPermutation.resolve("warped_trapdoor",{direction:0,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x-1,y:portal.location.y+3,z:portal.location.z},BlockPermutation.resolve("warped_trapdoor",{direction:1,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+3,z:portal.location.z+1},BlockPermutation.resolve("warped_trapdoor",{direction:2,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+3,z:portal.location.z-1},BlockPermutation.resolve("warped_trapdoor",{direction:3,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x+portal.getViewDirection().x,y:portal.location.y+portal.getViewDirection().y,z:portal.location.z+portal.getViewDirection().z},BlockPermutation.resolve("iron_bars"));
}

//赤ポータル設置 portal:Entity
function place_red_portal(portal){
    if(!portal.hasTag("portal_key"))return false;
    portal.dimension.fillBlocks(new BlockVolume(portal.location,{x:portal.location.x,y:portal.location.y+3,z:portal.location.z}),BlockPermutation.resolve("granite_wall"));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+1,z:portal.location.z},BlockPermutation.resolve("crimson_fence"));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+4,z:portal.location.z},BlockPermutation.resolve("crimson_trapdoor",{direction:0,open_bit:false,upside_down_bit:false}));
    portal.dimension.setBlockPermutation({x:portal.location.x+1,y:portal.location.y+3,z:portal.location.z},BlockPermutation.resolve("crimson_trapdoor",{direction:0,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x-1,y:portal.location.y+3,z:portal.location.z},BlockPermutation.resolve("crimson_trapdoor",{direction:1,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+3,z:portal.location.z+1},BlockPermutation.resolve("crimson_trapdoor",{direction:2,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x,y:portal.location.y+3,z:portal.location.z-1},BlockPermutation.resolve("crimson_trapdoor",{direction:3,open_bit:true,upside_down_bit:true}));
    portal.dimension.setBlockPermutation({x:portal.location.x+portal.getViewDirection().x,y:portal.location.y+portal.getViewDirection().y,z:portal.location.z+portal.getViewDirection().z},BlockPermutation.resolve("iron_bars"));
}

system.afterEvents.scriptEventReceive.subscribe(ev=>{
    if(ev.id == "cp:portal"){
        ev.sourceEntity.addTag("portal_key");
        portal_reset(ev.sourceEntity);
        ev.sourceEntity.removeTag("portal_key")
    }
})