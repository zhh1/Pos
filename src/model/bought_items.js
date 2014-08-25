function BoughtItems(input,all_items,free_items) {
    this.boughtItems = {};
    this.count_items(input,all_items);
    this.count_free_items(free_items);
}

//统计每件物品的数量
BoughtItems.prototype.count_items = function(input,all_items) {
    _(input).each(function (raw) {
        var barcode = raw.substring(0,10);
        var number = parseInt(raw.substring(11)) || 1;
        var item = this.boughtItems[barcode] || _(all_items).findWhere({barcode: barcode});
        item.count += number;
        this.boughtItems[barcode] = item;
    }, this);
};

//将买了的物品中的优惠的物品状态改为free
BoughtItems.prototype.count_free_items = function(free_items) {
    _(free_items[0].barcodes).each(function (barcode) {
        if(this.boughtItems[barcode]) {
            this.boughtItems[barcode].status = true;
        }
    }, this);

    _(this.boughtItems).each(function (item) {
        if(item.status) {
            item.free = Math.floor(item.count / 3);
        }
    }, this);
};

//各个物品各自应该打印的内容
BoughtItems.prototype.get_bought_items = function () {
    var result = '';
    _(this.boughtItems).each(function (item) {
        result += "名称：" + item.name + "，数量：" + item.count + item.unit + "，单价："
                + item.price.toFixed(2) + "(元)，小计：" + (item.price * (item.count - item.free)).toFixed(2)
                + "(元)\n";
    });
    return result;
};

//获取顾客购买的商品里优惠的商品的名称和数量
BoughtItems.prototype.get_free_items = function () {
    var result = '';
    _(this.boughtItems).each(function (item) {
        if(item.status) {
            result += "名称：" + item.name + "，数量：" + item.free + item.unit + '\n';
        }
    });
    return result;
};

//得到商品总共要付的钱
BoughtItems.prototype.get_sum_price = function () {
    return '总计：' +
        _(this.boughtItems).reduce(function (sum, item){
            return sum + item.price * (item.count - item.free);
        }, 0, this).toFixed(2) + '(元)\n' + '节省：' +
        _(this.boughtItems).reduce(function (sum, item){
            return sum + item.price * item.free;
        }, 0, this).toFixed(2) + '(元)\n';
};

//获取打印时的时间
BoughtItems.prototype.get_time = function() {
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
    return formattedDateString;
};

//得到需要打印的内容
BoughtItems.prototype.print_text = function() {
    return '' +
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + this.get_time() + '\n' +
        '----------------------\n' +
        this.get_bought_items() +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        this.get_free_items() +
        '----------------------\n' +
        this.get_sum_price() +
        '**********************';
};
