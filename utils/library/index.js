export default {
  _comparison(a, b, c) {
    if (a === b) a = c;
    a = b;
    return a;
  },
  houseX(params){
    let length = params.length;
    let [minParam] = params[0];
    let [maxParam] = params[length - 1];
    let minParamsArr = minParam.split(" ");
    let maxParamsArr = maxParam.split(" ");
    let minTime = minParamsArr[1].split(":");
    let maxTime = maxParamsArr[1].split(":");
    let minArr = minParamsArr[0].split("/");
    let maxArr = maxParamsArr[0].split("/");
    let minYear = parseInt(minArr[0]);
    let minDay = parseInt(minArr[2]);
    let minMonth = parseInt(minArr[1]);
    let maxDay = parseInt(maxArr[2]);
    let charParams = [];
    let maxCharParams = [];
    let twoDay = [];
    if (minDay === maxDay) {
      for (let i = 0; i < parseInt(minTime[0]); i++) {
        charParams.push([`${minYear}-${minMonth}-${minDay} ${i >= 10 ? i : "0" + i}:00:00`, null]);
      }
      for (let i = parseInt(maxTime[1]); i < 24; i++) {
        maxCharParams.push([`${minYear}-${minMonth}-${minDay} ${i >= 10 ? i : "0" + i}:00:00`, null]);
      }
      for (let i = 0; i < 24; i++) {
        twoDay.push([`${minYear}-${minMonth}-${minDay + 1} ${i >= 10 ? i : "0" + i}:00:00`, null]);
      }
    }
    return [...charParams, ...params, ...maxCharParams, ...twoDay]
  }
};
