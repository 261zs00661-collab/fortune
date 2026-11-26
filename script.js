'use strict'

const userNameInput = document.getElementById('user-name');
const fortuneButton = document.getElementById('fortune-button');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');
const todayParagraph = document.getElementById('today');

const fortunes = [
  {
    className: 'daikichi',
    name: '大吉',
    message: '今日は何をやってもうまくいく日です。思い切って挑戦してみましょう！'
  },
   {
    className: 'kichi',
    name: '吉',
    message: 'いいことがありそうな一日です。周りの人に優しくすると運気アップ！'
  },
   {
    className: 'chukichi',
    name: '中吉',
    message: '落ち着いて過ごせば、順調に進む一日です。'
  },
  {
    className: 'shokichi',
    name: '小吉',
    message: '小さな幸せが見つかる日です。身の回りをよく見てみましょう。'
  },
  {
    className: 'kyo',
    name: '凶',
    message: '今日は無理をせず、のんびり過ごしましょう。明日はきっとよくなります。'
  }
];

const luckyColors = [
  { name: '赤', code: '#e53935'},
  { name: '青', code: '#1e88e5'},
  { name: '緑', code: '#43a047'},
  { name: '黄色', code: '#fdd835'},
  { name: 'ピンク', code: '#ec407a'},
  { name: '紫', code: '#8e24aa'},
  { name: 'オレンジ', code: '#fb8c00'}
];

const now = new Date();
const dateText =
  now.getFullYear() + '年' + (now.getMonth() + 1) + '月' +now.getDate() + '日';
todayParagraph.innerText = dateText;

function getSeed(userName){
  let sum = 0;
  for (let i = 0; i < userName.length; i++){
    sum = sum + userName.charCodeAt(i);
  }
  const dateNumber = now.getFullYear() + (now.getMonth() + 1) * 31 + now.getDate();
  return sum + dateNumber;
}

function getFortune(userName){
  const seed = getSeed(userName);
  const index = seed % fortunes.length;
  return fortunes[index];
}

function getLuckyColor(userName){
  const seed = getSeed(userName);
  return luckyColors[(seed * 3) % luckyColors.length];
}

function getLuckyNumber(userName){
  const seed = getSeed(userName);
  return(seed % 9) + 1;
}

fortuneButton.addEventListener('click', () => {
  const userName = userNameInput.value;
  if (userName.length === 0){
    return;
  }

const fortune = getFortune(userName);
const luckyColor = getLuckyColor(userName);
const luckyNumber = getLuckyNumber(userName);

resultDivision.innerText = '';
const card = document.createElement('div');
card.setAttribute('class','card ' + fortune.className);

const heading = document.createElement('h3');
heading.innerText = userName + 'さんの運勢は「' + fortune.name + '」';
card.appendChild(heading);

const messageParagraph = document.createElement('p');
messageParagraph.innerText = fortune.message;
card.appendChild(messageParagraph);

const colorParagraph = document.createElement('p');
colorParagraph.setAttribute('class','lucky');
const colorBox = document.createElement('span');
colorBox.setAttribute('class','color-box');
colorBox.style.backgroundColor = luckyColor.code;
colorParagraph.appendChild(colorBox);
colorParagraph.appendChild(
  document.createTextNode('ラッキーカラー：' + luckyColor.name)
);
card.appendChild(colorParagraph);

const numberParagraph = document.createElement('p');
numberParagraph.setAttribute('class','lucky')
numberParagraph.innerText = 'ラッキーナンバー：' + luckyNumber;
card.appendChild(numberParagraph);

resultDivision.appendChild(card);

tweetDivision.innerText = '';
const anchor = document.createElement('a');
const hrefValue =
  'https://x.com/intent/tweet?button_hashtag=' + 
  encodeURIComponent('今日の運勢') +
  '&ref_src=twsrc%5Etfw';

anchor.setAttribute('href',hrefValue);
anchor.setAttribute('class','twitter-hashtag-button');
anchor.setAttribute(
  'data-text',
  userName + 'さんの今日の運勢は「' + fortune.name + '」でした！'
)
anchor.innerText = 'Tweet #今日の運勢';
tweetDivision.appendChild(anchor);

const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
tweetDivision.appendChild(script);
});
