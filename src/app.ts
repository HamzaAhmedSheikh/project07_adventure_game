#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import figlet from "figlet";

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(`
        \t \t Welcome to the DUNGEON!   
    `
    )

  await sleep();
  rainbowTitle.stop()

  console.log(gradient.pastel.multiline(figlet.textSync("Adventure Game", { horizontalLayout: 'full' })))

  const rainbowTitle2 = chalkAnimation.rainbow(`
        \t \t Welcome to the DUNGEON!   
    `
    )

  await sleep();
  rainbowTitle2.stop()
}

await welcome();

// text-based adventure game variables 
const enemies: string[] = ["Skeleton", "Warrior", "Assasin"];
const maxEnemyHealth: number = 75;
const enemyAttackDamage: number = 25;

let health: number = 100;
const attackDamage: number = 50;
let numBandages: number = 3; // numHealthPotion  
const numBandagesHealAmount: number = 30; // healthPotionHealAmount 
const bandagesDropChance: number = 50; // healthPotionDorpChance

let running: boolean = true;