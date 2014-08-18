function BoughtItems(input,all_items,free_items) {
    this.input = input;
    this.all_items = all_items;
    this.free_items = free_items;
}

//统计每件物品的数量
BoughtItems.prototype.count_items = function() {
    for (var i = 0; i < this.all_items.length; i++) {
        for (var j = 0; j < this.input.length; j++) {
            if (this.input[j].search(/-/) == 10) {
                if (this.input[j].substr(0, 10) == this.all_items[i].barcode) {
                    this.all_items[i].count = parseInt(this.input[j].substr(11));
                }
            }
            else {
                if (this.input[j] == this.all_items[i].barcode) {
                    this.all_items[i].count++;
                }
            }
        }
    }
};

//将买了的物品提取出来
BoughtItems.prototype.get_bought_items = function() {
    var bought_items = [];
    for(var i = 0;i < this.all_items.length; i++) {
        if(this.all_items[i].count) {
            bought_items.push(this.all_items[i]);
        }
    }
    return bought_items;
};

//将买了的物品中的优惠的物品状态改为free
BoughtItems.prototype.get_free_items_in_bought = function(bought_items) {
    for(var i = 0;i < this.free_items[0].barcodes.length;i++) {
        for(var j = 0;j < bought_items.length;j++) {
            if(bought_items[j].barcode == this.free_items[0].barcodes[i]) {
                bought_items[j].status = "free";
            }
        }
    }
//    return bought_items;
};

//各个物品各自应该打印的内容
BoughtItems.prototype.get_items_text = function (bought) {
    var items_text = [];
    for(var i = 0 ; i < bought.length ;i++) {
        if (bought[i].status == "free") {
            var free_count = parseInt(bought[i].count / 3);

            items_text[i] = "名称：" + bought[i].name + "，数量：" + bought[i].count + bought[i].unit + "，单价："
                + (bought[i].price).toFixed(2) + "(元)，小计：" + (bought[i].price * (bought[i].count - free_count)).toFixed(2)
                + "(元)\n";
        }
        else {
            items_text[i] = "名称：" + bought[i].name + "，数量：" + bought[i].count + bought[i].unit + "，单价："
                + (bought[i].price).toFixed(2) + "(元)，小计：" + (bought[i].price * bought[i].count).toFixed(2)
                + "(元)\n";
        }
    }
    return items_text;
};


//获取顾客购买的商品里优惠的商品的名称和数量
BoughtItems.prototype.get_free_items_text = function (bought) {
    var free_items_text = [];
    var j = 0;
    for(var i = 0 ; i < bought.length ;i++) {
        if (bought[i].status == "free" && bought[i].count > 1) {
            var free_count = parseInt(bought[i].count/3);
            free_items_text[j++] = "名称：" + bought[i].name + "，数量：" + free_count + bought[i].unit + "\n";
        }
    }
    return free_items_text;
};

//得到商品总共要付的钱
BoughtItems.prototype.get_sum_price = function (bought) {
    var sum = 0 , free_sum = 0 ,no_free_sum = 0 , free = 0;
    for(var i = 0 ; i < bought.length ;i++) {
        if (bought[i].status == "free") {
            var free_count = parseInt(bought[i].count/3);
            free_sum = free_sum + bought[i].price * (bought[i].count-free_count);
        }
        else {
            no_free_sum = no_free_sum + bought[i].price * bought[i].count;
        }
    }
    return sum = free_sum + no_free_sum;
};

//得到优惠的价钱
BoughtItems.prototype.get_free = function(bought) {
    var free = 0;
    for(var i = 0 ; i < bought.length ;i++) {
        if (bought[i].status == "free" && bought[i].count > 1) {
            var free_count = parseInt(bought[i].count/3);
            free = free + bought[i].price*free_count;
        }
    }
    return free;
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
BoughtItems.prototype.print_text = function(formattedDateString,item_text,free_item_text,sum,free) {
    var print_all_text =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' +
        item_text.join("") +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        free_item_text.join("") +
        '----------------------\n' +
        '总计：' + sum.toFixed(2) + '(元)\n' +
        '节省：' + free.toFixed(2) + '(元)\n' +
        '**********************';

    return print_all_text;

};
