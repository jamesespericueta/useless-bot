const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Unable to fetch data:', error);
  }
}

function fetchNames(nameType) {
  return fetchData(`https://www.randomlists.com/data/names-${nameType}.json`);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function generateName(gender) {
  try {
    const response = await Promise.all([
      fetchNames(gender || pickRandom(['male', 'female'])),
      fetchNames('surnames')
    ]);

    const [firstNames, lastNames] = response;

    const firstName = pickRandom(firstNames.data);
    const lastName = pickRandom(lastNames.data);

    return `${firstName}`;
  } catch (error) {
    console.error('Unable to generate name:', error);
    }
}

function logRandomName(gender) {
  generateName(gender).then(console.log);
}

function getWeeks() {
    let todayDate = new Date();

    let oneJan = new Date(todayDate.getFullYear(), 0, 1);

    let numberOfDays = Math.floor((todayDate - oneJan)/(24*60*60*1000));

    let result = Math.ceil((todayDate.getDay() + numberOfDays) /7);
    return 52 - result;
}


client.once('ready', () => {
    console.log("Up and running sir");
    generateName().then(data => console.log(data + "test"))
})

client.on('ready', () => {
    setInterval(() => {
    let name = '';
    generateName('male').then(data => {
        let james = client.guilds.fetch('510558351378219019')
    .then(
        guild => guild.members
        .fetch('361985124486742016')
        .then(member => member.setNickname(data + ' ' + getWeeks(), ''))
        .catch(console.error))
    .catch(console.error);
    });
    
    }, 2000);
//1000*60*60*24
})

client.login('')
