import {world,system} from "@minecraft/server";

world.afterEvents.worldInitialize.subscribe(()=>{
    world.sendMessage("compass add-on has been loaded!")
})

system.runInterval(()=>{

},1)