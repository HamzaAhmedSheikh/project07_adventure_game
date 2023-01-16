#!/usr/bin/env node
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import figlet from "figlet";
const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(`
        \t \t Welcome to the DUNGEON!   
    `);
    await sleep();
    rainbowTitle.stop();
    console.log(gradient.pastel.multiline(figlet.textSync("Adventure Game", { horizontalLayout: 'full' })));
    const rainbowTitle2 = chalkAnimation.rainbow(`
        \t \t Welcome to the DUNGEON!   
    `);
    await sleep();
    rainbowTitle2.stop();
}
await welcome();
