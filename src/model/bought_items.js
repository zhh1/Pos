function BoughtItems(input,all_items,free_items) {
    this.input = input;
    this.all_items = all_items;
    this.free_items = free_items;
}

BoughtItems.prototype.get_bought_items = function() {
    var bought_items = [];

    for (var i = 0; i < this.all_items.length; i++) {
        for (var j = 0; j < this.input.length; j++) {
            if(this.input[j].search(/-/) == 10) {
                if(this.input[j].substr(0,10) == this.all_items[i].barcode) {
                    this.all_items[i].count = parseInt(this.input[j].substr(11));
                }
            }
            else{
                if(this.input[j] == this.all_items[i].barcode) {
                    this.all_items[i].count++;
                }
            }
        }
    }

    for(var i = 0;i < this.all_items.length; i++) {
        if(this.all_items[i].count) {
            bought_items.push(this.all_items[i]);
        }
    }
    return bought_items;
};

BoughtItems.prototype.get_free_items_in_bought = function(bought_items) {
    for(var i = 0;i < this.free_items[0].barcodes.length;i++) {
        for(var j = 0;j < bought_items.length;j++) {
            if(bought_items[j].barcode == this.free_items[0].barcodes[i]) {
                bought_items[j].status = "free";
            }
        }
    }
    return bought_items;
};

BoughtItems.prototype.print_text = function(bought) {
    var print_text = [];
    var free_text = [];
    var j = 0;
    var sum = 0 , free_sum = 0 ,no_free_sum = 0 , free = 0;

    for(var i = 0 ; i < bought.length ;i++) {
        if(bought[i].status == "free") {
            var free_count = parseInt(bought[i].count/3);
            print_text[i] = "名称：" + bought[i].name + "，数量：" + bought[i].count + bought[i].unit +", 单价："
            + (bought[i].price).toFixed(2) + "(元)，小计：" + (bought[i].price * (bought[i].count-free_count)).toFixed(2)
            + "(元)\n";
            free_sum = free_sum + bought[i].price * (bought[i].count-free_count);
            free = free + bought[i].price*free_count;
            if(bought[i].count>1) {
                free_text[j++] = "名称：" + bought[i].name + "，数量：" + free_count + bought[i].unit + "\n";
            }
        }
        else {
            print_text[i] = "名称：" + bought[i].name + "，数量：" + bought[i].count + bought[i].unit + ", 单价："
            + (bought[i].price).toFixed(2) + "(元)，小计：" + (bought[i].price * bought[i].count).toFixed(2)
            + "(元)\n";
            no_free_sum = no_free_sum + bought[i].price * bought[i].count;
        }
    }
    sum = no_free_sum + free_sum;

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

    var print_text_others =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' ;

    var print_text_sum =
        '----------------------\n' +
        '总计：' + sum.toFixed(2) + '(元)\n' +
        '节省：'+ free.toFixed(2) + '(元)\n' +
        '**********************';

    var print_all_text =
        print_text_others +
        print_text.join("") +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        free_text.join("") +
        print_text_sum ;

    return print_all_text;

};
