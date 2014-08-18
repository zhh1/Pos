function printInventory(input) {
    var bought_items = new BoughtItems(input,loadAllItems(),loadPromotions());
    var print_text = bought_items.print_text(bought_items.get_free_items_in_bought(bought_items.get_bought_items()));
    console.log(print_text);
}
