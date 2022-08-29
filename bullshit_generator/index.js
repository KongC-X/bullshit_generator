import {options} from './lib/cmd.js';
import {loadCorpus, saveCorpus} from './lib/corpus.js';
import {generate} from './lib/generator.js';
import {createRandomPicker} from './lib/random.js';

const corpus = loadCorpus('corpus/data.json');
const title = options.title || createRandomPicker(corpus.title)();
const article = generate(title, {corpus, ...options});
const output = saveCorpus(title, article);

console.log(`生成成功！文章保存于：${output}`);


// import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'fs';
// import {fileURLToPath} from 'url';
// import {dirname, resolve} from 'path';
// import moment from 'moment';
// import commandLineArgs from 'command-line-args';
// import commandLineUsage from 'command-line-usage';

// import {generate} from './lib/generator.js';
// import {createRandomPicker} from './lib/random.js';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// function loadCorpus(src) {
//   const path = resolve(__dirname, src);
//   const data = readFileSync(path, {encoding: 'utf-8'});
//   return JSON.parse(data);
// }

// function parseOptions(options = {}) {
//     const argv = process.argv;
//     for(let i = 2; i < argv.length; i++) {
//       const cmd = argv[i - 1];
//       const value = argv[i];
//       if(cmd === '--title') {
//         options.title = value;
//       } else if(cmd === '--min') {
//         options.min = Number(value);
//       } else if(cmd === '--max') {
//         options.max = Number(value);
//       }
//     }
//     return options;
//   }

// 定义帮助的内容
// const sections = [
//     {
//       header: '狗屁不通文章生成器',
//       content: '生成随机的文章段落用于测试',
//     },
//     {
//       header: 'Options',
//       optionList: [
//         {
//           name: 'title',
//           typeLabel: '{underline string}',
//           description: '文章的主题。',
//         },
//         {
//           name: 'min',
//           typeLabel: '{underline number}',
//           description: '文章最小字数。',
//         },
//         {
//           name: 'max',
//           typeLabel: '{underline number}',
//           description: '文章最大字数。',
//         },
//       ],
//     },
//   ];
//   const usage = commandLineUsage(sections); // 生成帮助文本

//   const corpus = loadCorpus('corpus/data.json');
//   // 配置我们的命令行参数
//   const optionDefinitions = [
//     {name: 'help'}, // help命令配置
//     {name: 'title', type: String},
//     {name: 'min', type: Number},
//     {name: 'max', type: Number},
//   ];
//   const options = commandLineArgs(optionDefinitions); // 获取命令行的输入
//   if('help' in options) { // 如果输入的是help，就打印帮助文本
//     console.log(usage);
//   } else {
//     const title = options.title || createRandomPicker(corpus.title)();
//     const article = generate(title, {corpus, ...options});
//     const output = saveCorpus(title, article);
//     console.log(`生成成功！文章保存于：${output}`);
//   }

//   const corpus = loadCorpus('corpus/data.json');
//   const options = parseOptions();
//   const title = options.title || createRandomPicker(corpus.title)();
//   const article = generate(title, {corpus, ...options});
//   const output = saveToFile(title, article);
//   console.log(`生成成功！文章保存于：${output}`);

// const pickTitle = createRandomPicker(corpus.title);
// const title = pickTitle();

// const pickFamous = createRandomPicker(corpus.famous);
// const pickBosh = createRandomPicker(corpus.bosh);

// pickFamous(); // 随机取出一条名人名言
// pickBosh(); // 随机取出一条废话

// const article = generate(title, {corpus});
// console.log(`${title}\n\n    ${article.join('\n    ')}`);

// 封装一个保存文件的函数
// function saveCorpus(title, article) {
//     const outputDir = resolve(__dirname, 'output');
//     const time = moment().format('mmss');
//     const outputFile = resolve(outputDir, `${title}${time}.txt`);
  
//     // 检查outputDir是否存在，没有则创建一个
//     if(!existsSync(outputDir)) {
//       mkdirSync(outputDir);
//     }
  
//     const text = `${title}\n\n    ${article.join('\n    ')}`;
//     writeFileSync(outputFile, text); // 将text写入outputFile文件中
  
//     return outputFile;
//   }

// saveCorpus(title,article);

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