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
let numHealthPotion = 3; // numHealthPotion  
const healthPotionHealAmount = 30; // healthPotionHealAmount 
const healthPotionDorpChance = 50; // healthPotionDorpChance
let running = true;
GAME: while (running) {
    console.log(chalk.bold.red(`-------------------------------------------------------------------`));
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    chalkAnimation.pulse(`\t\t# ${enemy} is here #\n`);
    await sleep(2000);
    while (enemyHealth > 0) {
        console.log("");
        console.log(chalk.green(`\t Your HP: ${health}`));
        console.log(chalk.red(`\t ${enemy}'s HP: ${enemyHealth}`));
        console.log("");
        console.log(chalk.hex('#FFA500').bold(`\t What would you like to do?`));
        let answer = await inquirer.prompt([
            {
                type: "list",
                name: "choose",
                choices: [
                    chalk.yellow("Attack"),
                    chalk.yellow("Drink health potion"),
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
            console.log("");
            if (health < 1) {
                console.log(chalk.red(`You have taken too much damage, you are too weak to go on!`));
                break;
            }
        }
        else if (answer.choose == chalk.yellow("Drink health potion")) {
            if (numHealthPotion > 0) {
                health += healthPotionHealAmount;
                numHealthPotion--;
                console.log(chalk.hex("#FF4466").bold(` You drink a health potion \n ${`${chalk.green.bold(`You now have ${health} HP!`)}`}  \n You have ${numHealthPotion} health potions left`));
            }
            else {
                console.log(chalk.hex('#5ccd32').bold(`\t> You have no potions left. Defeat enemies for a chance to get one.`));
            }
        }
        else {
            console.log(chalk.yellow(`You run away from the ${enemy}`));
            continue GAME;
        }
    }
    if (health < 1) {
        console.log(chalk.red(`You limp out of the dungeon, weak from battle.`));
        break;
    }
    console.log(chalk.red(`-------------------------------------------------------------------`));
    console.log(chalk.green(` # ${enemy} was defeated! #`));
    console.log(chalk.green(` # You have ${health} HP left`));
    if (Math.floor(Math.random() * 100) > healthPotionDorpChance) {
        numHealthPotion++;
        console.log(chalk.green(` # The ${enemy} dropped a potion # `));
        console.log(` # You now have ${numHealthPotion} potion(s).`);
    }
    console.log(chalk.red(`-------------------------------------------------------------------`));
    let answer = await inquirer.prompt([
        {
            name: "choose",
            type: "list",
            choices: [
                chalk.yellow("Continue Fighting"),
                chalk.yellow("Exit Dungeon"),
            ],
            message: `${chalk.hex('#00cdff').bold(('What would you like to do now?'))}`
        },
    ]);
    if (answer.choose == chalk.yellow("Continue Fighting")) {
        console.log(chalk.yellow(`You continue on your adventure!`));
    }
    else {
        console.log("");
        console.log(`
            ${chalk.hex("#91aa79").bold(`You exit the dungeon, successfully from your adventures`)}
        `);
        break;
    }
}
console.log('');
async function endTheGame() {
    console.log('');
    const endTheGame = chalkAnimation.karaoke("--------------------------- The Game is Over ---------------------------------");
    await sleep(5500);
    endTheGame.stop();
}
await endTheGame();
