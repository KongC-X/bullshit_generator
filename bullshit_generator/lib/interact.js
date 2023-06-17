import readline from 'readline';

// 我们每次输出一个提问并等待用户输入答案，所以将它封装成一个返回 Promise 的异步方法
function question(rl, {text, value}) {
  const q = `${text}(${value})\n`;
  return new Promise((resolve) => {
    rl.question(q, (answer) => {
      resolve(answer || value);
    });
  });
}
// readline.createInterface 返回的对象有一个 question 方法，它是个异步方法
// 接受一个问题描述和一个回调函数 —— 用于接受用户的输入
export async function interact(questions) {
  const rl = readline.createInterface({ // 创建一个可交互的命令行对象
    input: process.stdin,
    output: process.stdout,
  });
  const answers = [];
  for(let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const answer = await question(rl, q); // 等待问题的输入
    answers.push(answer);
  }
  rl.close();
  return answers;
}
