import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';
import moment from 'moment';

import {generate} from './lib/generator.js';
import {createRandomPicker} from './lib/random.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCorpus(src) {
  const path = resolve(__dirname, src);
  const data = readFileSync(path, {encoding: 'utf-8'});
  return JSON.parse(data);
}

const corpus = loadCorpus('corpus/data.json');

const pickTitle = createRandomPicker(corpus.title);
const title = pickTitle();

// const pickFamous = createRandomPicker(corpus.famous);
// const pickBosh = createRandomPicker(corpus.bosh);

// pickFamous(); // 随机取出一条名人名言
// pickBosh(); // 随机取出一条废话

const article = generate(title, {corpus});
// console.log(`${title}\n\n    ${article.join('\n    ')}`);

// 封装一个保存文件的函数
function saveCorpus(title, article) {
    const outputDir = resolve(__dirname, 'output');
    const time = moment().format('mmss');
    const outputFile = resolve(outputDir, `${title}${time}.txt`);
  
    // 检查outputDir是否存在，没有则创建一个
    if(!existsSync(outputDir)) {
      mkdirSync(outputDir);
    }
  
    const text = `${title}\n\n    ${article.join('\n    ')}`;
    writeFileSync(outputFile, text); // 将text写入outputFile文件中
  
    return outputFile;
  }

saveCorpus(title,article);

// const url = import.meta.url; // 获取当前脚本文件的url
// // url 是 Node.js 的内置模块，用来解析 url 地址。fileURLToPath 是这个模块的方法，可以将 url 转为文件路径。然后再通过内置模块 path 的 dirname 方法就可以取到当前 JS 文件目录
// // path 是 Node.js 处理文件路径的内置模块。dirname 和 resolve 是它的两个方法，dirname 方法可以获得当前 JS 文件的目录，而 resolve 方法可以将 JS 文件目录和相对路径 corpus/data.json 拼在一起，最终获得正确的文件路径
// const path = resolve(dirname(fileURLToPath(url)), 'corpus/data.json'); // 将当前脚本文件的 url 地址转化成文件路径，然后再通过 resolve 将相对路径转变成 data.json 文件的绝对路径
// // 注意，因为本项目采用 ES Modules 模块规范，所以需要通过 fileURLToPath 来转换路径。如果采用 CommonJS 规范，就可以直接通过模块中的内置变量__dirname 获得当前 JS 文件的工作目录。因此在使用 CommonJS 规范时，上面的代码可以简写为 const path = resolve(__dirname, 'corpus/data.json')。
// const data = readFileSync(path, {encoding: 'utf-8'});
// console.log(data);
// const corpus = JSON.parse(data);
// const title = randomPick(corpus.title); // 随机选一个title
// const pickFamous = createRandomPicker(corpus.famous); //随机选一句名人名言
// const pickBosh = createRandomPicker(corpus.bosh);
// pickFamous(); // 随机取出一条名人名言
// pickBosh(); // 随机取出一条废话