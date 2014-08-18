function printInventory(input) {
    var bought_items = [];
    var all_items = loadAllItems();
    var free_items = loadPromotions();
    for (var i = 0; i < all_items.length; i++) {
        for (var j = 0; j < input.length; j++) {
            if(input[j].search(/-/) == 10) {
                if(input[j].substr(0,10) == all_items[i].barcode) {
                    all_items[i].count = parseInt(input[j].substr(11));
                }
            }
            else{
                if(input[j] == all_items[i].barcode) {
                    all_items[i].count++;
                }
            }
        }
    }

    for(var i = 0;i < all_items.length; i++) {
        if(all_items[i].count) {
            bought_items.push(all_items[i]);
        }
    }

    for(var i = 0;i < free_items[0].barcodes.length;i++) {
        for(var j = 0;j < bought_items.length;j++) {
            if(bought_items[j].barcode == free_items[0].barcodes[i]) {
                bought_items[j].status = "free";
            }
        }
    }

    var print_text = [];
    var free_text = [];
    var j = 0;
    var sum = 0 , free_sum = 0 ,no_free_sum = 0 , free = 0;

    for(var i = 0 ; i < bought_items.length ;i++) {
        if(bought_items[i].status == "free") {
            var free_count = parseInt(bought_items[i].count/3);
            print_text[i] = "名称：" + bought_items[i].name + "，数量：" + bought_items[i].count + bought_items[i].unit +"，单价："
                + (bought_items[i].price).toFixed(2) + "(元)，小计：" + (bought_items[i].price * (bought_items[i].count-free_count)).toFixed(2)
                + "(元)\n";
            free_sum = free_sum + bought_items[i].price * (bought_items[i].count-free_count);
            free = free + bought_items[i].price*free_count;
            if(bought_items[i].count>1) {
                free_text[j++] = "名称：" + bought_items[i].name + "，数量：" + free_count + bought_items[i].unit + "\n";
            }
        }
        else {
            print_text[i] = "名称：" + bought_items[i].name + "，数量：" + bought_items[i].count + bought_items[i].unit + "，单价："
                + (bought_items[i].price).toFixed(2) + "(元)，小计：" + (bought_items[i].price * bought_items[i].count).toFixed(2)
                + "(元)\n";
            no_free_sum = no_free_sum + bought_items[i].price * bought_items[i].count;
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

    var print_text =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' +
        print_text.join("") +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        free_text.join("") +
        '----------------------\n' +
        '总计：' + sum.toFixed(2) + '(元)\n' +
        '节省：' + free.toFixed(2) + '(元)\n' +
        '**********************';
    console.log(print_text);
}
