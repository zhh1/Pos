function printInventory(input) {
    var bought_items = new BoughtItems(input,loadAllItems(),loadPromotions());

    var print_text = bought_items.print_text();

    console.log(print_text);
}
