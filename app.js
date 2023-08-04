// To Do Tracker

// import npm packages
import inquirer from "inquirer";
import chalk from 'chalk';
import chalkRainbow from 'chalk-rainbow';

// creating the global variables for personName and tasks
let personName;
let tasks = []; // set tasks as an array

// launches To Do Tracker
async function startApp() {
    const welcomeUser = await inquirer.prompt({
        name: 'person_name',
        type: 'input',
        message: 'Hello user! What is your name?'
    });
    personName = welcomeUser.person_name;
    console.log(`Welcome ${personName} to the To Do Tracker! You will select options from the menu.`);
    console.log(`You will ${chalk.bold('add')} tasks that you need to complete. The task that you need to complete will be tracked.`);
    console.log(`If you complete a task, you can ${chalk.bold('remove')} it.\n`);
}

// select options from the main menu
async function mainMenu() {
    console.log(chalkRainbow('Main Menu'));
    const options = await inquirer.prompt({
        name: 'menu_options',
        type: 'list',
        message: 'Select the options below.\n',
        choices: [
            { name: 'A - Add Task', value: 'A' },
            { name: 'R - Remove Task', value: 'R' },
            { name: 'T - Track Task', value: 'T' },
            { name: 'E - Exit To Do Tracker', value: 'E' }
        ]
    });

    if (options.menu_options === 'A') {
        // add tasks to the To Do Tracker
        await addTask();
    }
    else if (options.menu_options === 'R') {
        await removeTask();
    }
    else if (options.menu_options === 'T') {
        // track tasks to the To Do Tracker
        await trackTask();
    }
    else if (options.menu_options === 'E') {
        // exits the To Do Tracker
        await exitApp();
    }
}

// adds the tasks to the array
async function addTask() {
    console.log(chalkRainbow("Add Task"));
    const responseAdd = await inquirer.prompt({
        name: 'add_task',
        type: 'input',
        message: 'Please enter which task you want to add.'
    });

    tasks.push(responseAdd.add_task); // add task to the array
    console.log(`Added Task: ${responseAdd.add_task}.`);
    console.log(`Exiting ${chalk.bgGreen('Add Task')} and returning to the main menu...\n`);
    await mainMenu();
}

// view and track the tasks
async function trackTask() {
    console.log(chalkRainbow(`Track Task`));
    let track;
    if (tasks.length === 0) {
        // no tasks in array
        console.log("You have no tasks to track!");
    }
    else {
        for (let i in tasks) {
            console.log(`Each task must be ${chalk.underline('entered')} in the order it was added.`);
            const responseTrack = await inquirer.prompt({
                name: 'track_task',
                type: 'input',
                message: 'Please enter a task to track. If you entered more than 1 tasks and want to exit, enter "exit" to exit Track Task.'
            });

            track = responseTrack.track_task;
            console.log('Tracking Task...');
            console.log(`Task: ${tasks[i]} was tracked`);
            // if user enters "exit", exit the loop
            // otherwise, the loop terminates when i equals to the size of the tasks array
            if (track === 'exit') {
                break;
            }
        }
    }

    console.log(`Exiting Track Task and returning to the main menu...\n`);
    await mainMenu();
}

// removes the task from the array
async function removeTask() {
    console.log(chalkRainbow("Remove Task"));
    if (tasks.length === 0) {
        // no tasks in the array
        console.log("You have no tasks to remove!");
    }
    else {
        const responseRemove = await inquirer.prompt({
            name: 'remove_task',
            type: 'input',
            message: 'Please enter which task you want to remove.'
        });

        let removedFromTask = tasks.pop(responseRemove.remove_task);
        console.log(`${removedFromTask} removed.`); // output the removed task
    }

    console.log(`Exiting ${chalk.bgRed('Remove Task')} and returning to the main menu...\n`);
    await mainMenu();
}

// exits the app
async function exitApp() {
    console.log(`${personName}, ${chalk.bgCyanBright('thank you')} for using the ${chalk.magenta('To Do Tracker')}!`);
}

async function main() {
    await startApp();
    await mainMenu();
}

main();