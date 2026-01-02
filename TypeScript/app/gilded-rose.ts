export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

interface ItemService {
  updateItemQuality(item: Item): void;
}

class NormalItemService implements ItemService {
  updateItemQuality(item: Item): void {
    if (item.quality > 0) {
      item.quality -= 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1;
    }
  }
}

class AgedBrieItemService implements ItemService {
  updateItemQuality(item: Item): void {
    if (item.quality < 50) {
      item.quality += 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality += 1;
    }
  }
}

class BackstagePassesItemService implements ItemService {
  updateItemQuality(item: Item): void {
    if (item.quality < 50) {
      item.quality += 1;
      if (item.sellIn < 11) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
      if (item.sellIn < 6) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }
}

class ConjuredItemService implements ItemService {
  updateItemQuality(item: Item): void {
    if (item.quality > 0) {
      item.quality = Math.max(0, item.quality - 2);
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality = Math.max(0, item.quality - 2);
    }
  }
}

class SulfurasItemService implements ItemService {
  updateItemQuality(item: Item): void {
    return;
  }
}

class GildRoseItemServiceFactory {
  static getItemService(item: Item): ItemService {
    switch (true) {
      case item.name.includes("Aged Brie"):
        return new AgedBrieItemService();
      case item.name.includes("Backstage passes"):
        return new BackstagePassesItemService();
      case item.name.includes("Sulfuras"):
        return new SulfurasItemService();
      case item.name.includes("Conjured"):
        return new ConjuredItemService();
      default:
        return new NormalItemService();
    }
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    // for (let i = 0; i < this.items.length; i++) {
    //   if (
    //     this.items[i].name != "Aged Brie" &&
    //     this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
    //   ) {
    //     if (this.items[i].quality > 0) {
    //       if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
    //         this.items[i].quality = this.items[i].quality - 1;
    //       }
    //     }
    //   } else {
    //     if (this.items[i].quality < 50) {
    //       this.items[i].quality = this.items[i].quality + 1;
    //       if (
    //         this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
    //       ) {
    //         if (this.items[i].sellIn < 11) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //         if (this.items[i].sellIn < 6) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
    //     this.items[i].sellIn = this.items[i].sellIn - 1;
    //   }
    //   if (this.items[i].sellIn < 0) {
    //     if (this.items[i].name != "Aged Brie") {
    //       if (
    //         this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
    //       ) {
    //         if (this.items[i].quality > 0) {
    //           if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
    //             this.items[i].quality = this.items[i].quality - 1;
    //           }
    //         }
    //       } else {
    //         this.items[i].quality =
    //           this.items[i].quality - this.items[i].quality;
    //       }
    //     } else {
    //       if (this.items[i].quality < 50) {
    //         this.items[i].quality = this.items[i].quality + 1;
    //       }
    //     }
    //   }
    // }

    //new code
    for (let i = 0; i < this.items.length; i++) {
      const itemService = GildRoseItemServiceFactory.getItemService(
        this.items[i]
      );
      itemService.updateItemQuality(this.items[i]);
    }

    return this.items;
  }
}
