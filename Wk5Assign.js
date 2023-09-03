class Item {   //Will represent items in shopping list
  constructor(name, location) {  //(Item name, shop location)
    this.name = name; 
    this.location = location; 
  }

  describe() {
    return `${this.name} is at ${this.location}.`; 
  }
}

class ShopperList {  
  constructor(name) { 
    this.name = name; //refering to the shopper's name
    this.items = [];  //this array is holding all the items on shopper's list
  }

  addItem(item) {  //method addItem that takes items   
    if (item instanceof Item) { //Chks to see if item is from our Item class.(REMEMBER item is diff from Item at top) 
      this.items.push(item);
    } else {
      throw new Error(`You can only add an instance of Item. Argument is not a item: ${item}`);
    }
  }

  describe() {
    return `${this.name} has ${this.items.length} Items.`;
  }
}

class Menu {
  constructor() {
    this.shopperlists = []; //This initialize our (array Of ShopperLists)
    this.selectedShopperList = null; //(null starts at 0 list)
  }

  start() {
    let selection = this.showMainMenuOptions();
    
    while (selection != 0) {
      switch (selection) {
        case '1':
          this.createShopperList();    
          break;                      //breaks will stop the process of these casses or stop looping
        case '2':
          this.viewShopperList();
          break     
        case '3':
          this.deleteShopperList();  
          break;
        case '4':
          this.displayLists(); 
          break;
        default:
          selection = 0;
          break;
      }
      
      if (selection === 0) {
        break;
      }

      selection = this.showMainMenuOptions();
    }

    alert('Goodbye!');
  }

  showMainMenuOptions() {
    return prompt(`
      0) Exit
      1) Create new shopper list
      2) View shopper list
      3) Delete shopper list
      4) Display all shopper list
    `);
  }

  showShopperListMenuOptions(itemInfo) { 
    return prompt(`
      0) Back
      1) Choose item(s)
      2) Delete item(s)
      ------------------------
      ${itemInfo}  
    `);                       
  }

  displayLists() { // list of items in 
    let ShopperListString = ''; 
    for (let i = 0; i < this.shopperlists.length; i++) { //
      ShopperListString += i + ') ' + this.shopperlists[i].name + '\n'; 
    }
    alert(ShopperListString);
  }

  createShopperList() { //DO NOT confuse yourself with Menu shopperlists
    let name = prompt('Enter shopper name:'); 
    this.shopperlists.push(new ShopperList(name)); //(ShopperList) is referring to your class "ShopperList"
  }

  viewShopperList() {  
    let index = prompt('Enter the index of the shopper list to view:'); //
    if (index > -1 && index < this.shopperlists.length) { //referencing shopper's list
      this.selectedShopperList = this.shopperlists[index];   //or array of lists
      let description = 'Shopper Name: ' + this.selectedShopperList.name + '\n';

      for (let i = 0; i < this.selectedShopperList.items.length; i++) { 
        description += i + ') ' + this.selectedShopperList.items[i].name 
          + ' - ' + this.selectedShopperList.items[i].location + '\n';
      }

      let selection = this.showShopperListMenuOptions(description);
      switch (selection) {
        case '1':
          this.createItem(); 
          break;
        case '2':
          this.deleteItem(); 
          
      }
    }
  }

  deleteShopperList() {   
    let index = prompt('Enter the index of the shopper list to delete:');
    if (index > -1 && index < this.shopperlists.length) { 
      this.shopperlists.splice(index, 1); 
    }
  }

  createItem() {  
    let name = prompt('Enter the name of food item wanted'); 
    let location = prompt('Enter location to shop;'); 
    this.selectedShopperList.items.push(new Item(name, location)); //will show up when Menu option 2 is selected 
  }                                                             //after selecting index of shopper

  deleteItem() {
    let index = prompt('Enter the index of the food list you wish to delete:');  
    if (index > -1 && index < this.selectedShopperList.items.length) { // class Shopper List
      this.selectedShopperList.items.splice(index, 1); 
    }
  }
}

let menu = new Menu();
menu.start();