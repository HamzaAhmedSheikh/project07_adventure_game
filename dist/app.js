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
// text-based adventure game variables 
const enemies = ["Skeleton", "Warrior", "Assasin"];
const maxEnemyHealth = 75;
const enemyAttackDamage = 25;
let health = 100;
const attackDamage = 50;
let numBandages = 3; // numHealthPotion  
const numBandagesHealAmount = 30; // healthPotionHealAmount 
const bandagesDropChance = 50; // healthPotionDorpChance
let running = true;
GAME: while (running) {
    console.log(chalk.bold.red(`-------------------------------------------------------------------`));
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    chalkAnimation.pulse(`\t\t# ${enemy} is here #\n`);
    await sleep();
    while (enemyHealth > 0) {
        console.log(chalk.green(`\t Your HP: ${health}`));
        console.log(chalk.red(`\t ${enemy}'s HP: ${enemyHealth}`));
        console.log(chalk.hex('#FFA500').bold(`\t What would you like to do?`));
        let answer = await inquirer.prompt([
            {
                type: "list",
                name: "choose",
                choices: [
                    chalk.yellow("Attack"),
                    chalk.yellow("Bandage Wound"),
                    chalk.yellow("Run"),
                ],
            },
        ]);
        if (answer.choose === chalk.yellow("Attack")) {
            let damageDealt = Math.floor(Math.random() * attackDamage);
            let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
            enemyHealth -= damageDealt;
            health -= damageTaken;
            console.log(chalk.hex('#ff4700').bold(`\t> You strike the ${enemy} for ${damageDealt} damage.`));
            console.log(chalk.hex('#ff4700').bold(`\t> You recieve ${damageTaken} in retaliation!`));
            if (health < 1) {
                console.log(chalk.red(`You have taken too much damage, you are too weak to go on!`));
                break;
            }
        }
        else if (answer.choose == chalk.yellow("Bandage Wound")) {
            if (numBandages > 0) {
                health += numBandagesHealAmount;
                numBandages--;
                console.log(chalk.yellow(`You got a bandage \n You now have ${health} HP! \n You now have ${numBandages} left`));
            }
            else {
                console.log(chalk.hex('#5ccd32').bold(`\t> You have no bandages left. Defeat enemies for a chance to get one.`));
            }
        }
        else {
            console.log(chalk.yellow(`You run away from the ${enemy}`));
            continue GAME;
        }
    }
}
