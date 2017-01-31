class Startup {
    public static main(arg: string): string {
        return arg;
    }
}

var typescriptMegan = document.getElementById('Left-Megan-h1');
var typescriptMeganString = 'Megan Elizabeth Bening';
typescriptMegan.innerHTML = Startup.main(typescriptMeganString);
var typescriptDates = document.getElementById('Left-dates');
var typescriptMeganString = 'April 15, 1994 - January 28, 2017';
typescriptDates.innerHTML = Startup.main(typescriptMeganString);
