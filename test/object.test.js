var Epub = require("epub");


function enhanceEpubParser(c) {
  return class GutembergEpubParser extends c {
      constructor(filename) {
          //do your magic here
          super(filename);
      }
  }
}

const filename = "C:/Users/mormm/Git/ghstwrtr/data/test/pg16800.epub";

const GutembergEpubParser = enhanceEpubParser(Epub);
var epubParser = new GutembergEpubParser(filename);






// Initialize constructor functions
  function Hero(name, level) {
    this.name = name;
    this.level = level;
  }
  
  function Warrior(name, level, weapon) {
    Hero.call(this, name, level);
  
    this.weapon = weapon;
  }
  
  function Healer(name, level, spell) {
    Hero.call(this, name, level);
  
    this.spell = spell;
  }
  
  // Link prototypes and add prototype methods
  Warrior.prototype = Object.create(Hero.prototype);
  Healer.prototype = Object.create(Hero.prototype);
  
  Hero.prototype.greet = function () {
    return `${this.name} says hello.`;
  }
  
  Warrior.prototype.attack = function () {
    return `${this.name} attacks with the ${this.weapon}.`;
  }
  
  Healer.prototype.heal = function () {
    return `${this.name} casts ${this.spell}.`;
  }
  
  // Initialize individual character instances
  const hero1 = new Warrior('Bjorn', 1, 'axe');
  const hero2 = new Healer('Kanin', 1, 'cure');

 console.log(hero1);
 console.log(hero2);