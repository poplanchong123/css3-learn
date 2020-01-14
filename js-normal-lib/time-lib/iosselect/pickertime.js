// 数据初始化
var startYear;
var endYear;
var now = new Date();
var nowYear = now.getFullYear();
var nowYear = now.getFullYear();
var nowMonth = now.getMonth() + 1;
var nowDate = now.getDate();

function formatYear(nowYear) {
  var arr = [];
  for (var i = startYear; i <= endYear; i++) {
    arr.push({
      id: i + "",
      value: i + "年"
    });
  }
  return arr;
}
function formatMonth() {
  var arr = [];
  for (var i = 1; i <= 12; i++) {
    arr.push({
      id: i + "",
      value: i + "月"
    });
  }
  return arr;
}
function formatDate(count) {
  var arr = [];
  for (var i = 1; i <= count; i++) {
    arr.push({
      id: i + "",
      value: i + "日"
    });
  }
  return arr;
}
var yearData = function(callback) {
  callback(formatYear(nowYear));
};
var monthData = function(year, callback) {
  callback(formatMonth());
};
var dateData = function(year, month, callback) {
  if (/^(1|3|5|7|8|10|12)$/.test(month)) {
    callback(formatDate(31));
  } else if (/^(4|6|9|11)$/.test(month)) {
    callback(formatDate(30));
  } else if (/^2$/.test(month)) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      callback(formatDate(29));
    } else {
      callback(formatDate(28));
    }
  } else {
    throw new Error("month is illegal");
  }
};
var hourData = function(one, two, three, callback) {
  var hours = [];
  for (var i = 0, len = 24; i < len; i++) {
    hours.push({
      id: i,
      value: i + "时"
    });
  }
  callback(hours);
};
var minuteData = function(one, two, three, four, callback) {
  var minutes = [];
  for (var i = 0, len = 60; i < len; i++) {
    minutes.push({
      id: i,
      value: i + "分"
    });
  }
  callback(minutes);
};
var dateFormat = function(date, format = "YYYY-MM-DD HH:mm:ss") {
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  };
  for (const key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
};

var pickerTime = function(options) {
  if (isNaN(options.dateTime) && !isNaN(Date.parse(options.dateTime))) {
    options.dateTime = new Date(options.dateTime);
  }
  let dateTime = options.dateTime || new Date();
  options = Object.assign(
    {},
    {
      startYear: 1919,
      endYear: dateTime.getFullYear() + 2,
      formatDateTime: "YYYY-MM-DD HH:mm"
    },
    options
  );
  var yearLevelId = dateTime.getFullYear();
  var monthLevelId = dateTime.getMonth() + 1;
  var dateLevelId = dateTime.getDate();
  var hourLevelId = dateTime.getHours();
  var minuteLevelId = dateTime.getMinutes();
  startYear = options.startYear;
  endYear = options.endYear;
  var iosSelect = new IosSelect(
    5,
    [yearData, monthData, dateData, hourData, minuteData],
    {
      title: "选择日期",
      itemHeight: 35,
      itemShowCount: 5,
      oneLevelId: yearLevelId,
      twoLevelId: monthLevelId,
      threeLevelId: dateLevelId,
      fourLevelId: hourLevelId,
      fiveLevelId: minuteLevelId,
      callback: function(
        selectOneObj,
        selectTwoObj,
        selectThreeObj,
        selectFourObj,
        selectFiveObj
      ) {
        var result = {
          year: selectOneObj.id,
          month: selectTwoObj.id,
          date: selectThreeObj.id,
          hour: selectFourObj.id,
          minute: selectFiveObj.id,
          dateTime: dateFormat(
            new Date(
              selectOneObj.id,
              selectTwoObj.id,
              selectThreeObj.id,
              selectFourObj.id,
              selectFiveObj.id
            ),
            options.formatDateTime
          )
        };
        options.callback(result);
      }
    }
  );
};
