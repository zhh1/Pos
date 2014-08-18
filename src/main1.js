function printInventory(input) {
    var bought_items = new BoughtItems(input,loadAllItems(),loadPromotions());
    bought_items.count_items();
    var bought = bought_items.get_bought_items();
    console.log(bought);
    bought_items.get_free_items_in_bought(bought);

    var item_text = bought_items.get_items_text(bought);
    var free_item_text = bought_items.get_free_items_text(bought);
    var sum = bought_items.get_sum_price(bought);
    var free = bought_items.get_free(bought);
    var formattedDateString = bought_items.get_time();
    var print_text = bought_items.print_text(formattedDateString,item_text,free_item_text,sum,free);

    console.log(print_text);
}
