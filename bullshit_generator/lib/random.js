// randomInt 方法是返回一定范围内的整数，用来控制随机生成的文章和段落的长度范围
// randomInt 函数返回一个大于等于 min，小于 max 的随机整数
// 用 Math.random() 对 min 和 max 两个参数进行线性插值，然后将结果向下取整
export function randomInt(min, max) {
    const p = Math.random();
    return Math.floor(min + (max - min) * p);
  }

// randomPick 方法可以从数组中随机选择元素
// 随机选出数组中的一个元素
// export function randomPick(arr) {
//     const index = randomInt(0, arr.length);
//     return arr[index];
//   }
// 避免连续两次选择到同样的元素
// 将随机取数的范围从数组长度更改为数组长度减一，这样我们就不会取到数组最后一位的元素。然后我们把每次取到的元素都和数组最后一位的元素进行交换，这样每次取过的元素下一次就在数组最后一位了，下一次也就不能取到它了，而下一次取到的数又会将它换出来，那么再一次就又能取到它了
// export function randomPick(arr) {
//     const len = arr.length - 1;
//     const index = randomInt(0, len);
//     [arr[index], arr[len]] = [arr[len], arr[index]];
//     return arr[index];
//   }

// 避免原本数组末位的那个元素在第一次随机取时永远取不到的问题
  export function createRandomPicker(arr) {
    arr = [...arr]; // copy 数组，以免修改原始数据
    function randomPick() {
      const len = arr.length - 1;
      const index = randomInt(0, len);
      const picked = arr[index];
      [arr[index], arr[len]] = [arr[len], arr[index]];
      return picked;
    }
    randomPick(); // 抛弃第一次选择结果
    return randomPick;
  }