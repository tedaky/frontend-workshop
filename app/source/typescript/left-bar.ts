class Startup {
    public static main(arg: string): string {
        return arg;
    }
}

var typescriptMegan = document.getElementById('Megan-h1');
var typescriptMeganString = 'Megan Elizabeth Bening';
typescriptMegan.innerHTML = Startup.main(typescriptMeganString);
