function printInventory(input) {
    var 可乐_count = 0;
    var 雪碧_count = 0;
    var 苹果_count = 0;
    var 荔枝_count = 0;
    var 电池_count = 0;
    var 方便面_count = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] == 'ITEM000000') {
            可乐_count++;
        }
        if (input[i] == 'ITEM000001') {
            雪碧_count++;
        }
        if (input[i].search(/ITEM000002/) == 0) {
            苹果_count = parseInt(input[i].substr(11));
        }
        if (input[i].search(/ITEM000003/) == 0) {
            荔枝_count = parseInt(input[i].substr(11));
        }
        if (input[i] == 'ITEM000004') {
            电池_count++;
        }
        if (input[i] == 'ITEM000005') {
            方便面_count++;
        }
    }
    var 雪碧 = [],雪碧促销 = [];
    var 可乐 = [],可乐促销 = [];
    var 苹果 = [],荔枝 = [],电池 = [];
    var 方便面 = [],方便面促销 = [];
    var 可乐_save = 0.00,方便面_save = 0.00,雪碧_save = 0.00;

    if(可乐_count) {
        可乐 = "名称：可乐，数量：" + 可乐_count + "瓶，单价：3.00(元)，小计：" + (可乐_count*3.00).toFixed(2) + "(元)\n";
        if(可乐_count > 1) {
            可乐促销 = '名称：可乐，数量：1瓶\n';
            可乐 = "名称：可乐，数量：" + 可乐_count + "瓶，单价：3.00(元)，小计：" + ((可乐_count - 1)*3.00).toFixed(2) + "(元)\n";
            可乐_save = 3.00;
        }
    }
    if(雪碧_count){
        雪碧 = "名称：雪碧，数量：" + 雪碧_count + "瓶，单价：3.00(元)，小计：" + (雪碧_count*3.00).toFixed(2) + "(元)\n";
        if(雪碧_count > 1) {
            雪碧促销 = '名称：雪碧，数量：1瓶\n';
            雪碧 = "名称：雪碧，数量：" + 雪碧_count + "瓶，单价：3.00(元)，小计：" + ((雪碧_count - 1)*3.00).toFixed(2) + "(元)\n";
            雪碧_save = 3.00;
        }
    }
    if(苹果_count) {
        苹果 = "名称：苹果，数量：" + 苹果_count + "斤，单价：5.50(元)，小计：" + (苹果_count*5.50).toFixed(2) + "(元)\n";
    }
    if(荔枝_count) {
        荔枝 = "名称：荔枝，数量：" + 荔枝_count + "斤，单价：15.00(元)，小计：" + (荔枝_count*15.00).toFixed(2) + "(元)\n";
    }
    if(电池_count) {
        电池 = "名称：电池，数量：" + 电池_count + "个，单价：2.00(元)，小计：" + (电池_count*2.00).toFixed(2) + "(元)\n";
    }
    if(方便面_count) {
        方便面 = "名称：方便面，数量：" + 方便面_count + "袋，单价：4.50(元)，小计：" + (方便面_count*4.50).toFixed(2) + "(元)\n";
        if(方便面_count > 1) {
            方便面促销 = '名称：方便面，数量：1袋\n';
            方便面 = "名称：方便面，数量：" + 方便面_count + "袋，单价：4.50(元)，小计：" + ((方便面_count - 1)*4.50).toFixed(2) + "(元)\n";
            方便面_save = 4.50;
        }
    }

    var save = 可乐_save + 雪碧_save + 方便面_save;
    var sum = 可乐_count*3.00 + 雪碧_count*3.00 + 苹果_count*5.50 + 荔枝_count*15.00 + 电池_count*2.00 + 方便面_count*4.50 - save;
    var dateDigitToString;
    dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

    var print_text =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' +
            可乐 +
            雪碧 +
            苹果 +
            荔枝 +
            电池 +
            方便面 +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        雪碧促销 +
        可乐促销 +
        方便面促销 +
        '----------------------\n' +
        '总计：' + sum.toFixed(2) + '(元)\n' +
        '节省：' + save.toFixed(2) + '(元)\n' +
        '**********************';
    console.log(print_text);
}
