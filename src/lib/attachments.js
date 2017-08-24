/* global TrelloPowerUp */
const trello = TrelloPowerUp.iframe();
const sessionToken = trello.arg('sessionToken');

console.log(sessionToken);

const url = 'https://app.rung.com.br/api/trello/extensions/593bdb87b43ac0601189b497/alerts?sessionToken=e759755c6c9f3db44197e7a0e7216146848bad9ee39ba1ba13b04b572609b7bc7f318323618ee4b21c96d66a25abe834190ceafd820c32f844d7d9ecaa8ad4d1fbb4dde137cfcca85a83b4633a6697c6ce1d6124532d657da2400837055695b7';
