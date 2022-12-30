class MyClass {
    constructor() {

        console.log("Hello, JavaScript!!!");
    }

    #my = 'Мое поле'

    get MyGetter(){
        return 2;
    }

    set MySetter(value) {
        this.#my = value;
    }
}

let myClass = new MyClass();
let count = 0;

let id = setInterval(() => {
    console.log(myClass.MyGetter);
    count++;
    if (count == 5)
      clearInterval(id);
}, 100)