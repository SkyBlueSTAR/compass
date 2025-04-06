import {world} from "@minecraft/server";

const cards=[
    {
        name:"テスト",
        itemId:"compass:test_item",
        atk:232,
        def:107,
        hp:1890,
        ef:(player)=>{
            world.sendMessage("test")
        }
    }
]
export default cards;