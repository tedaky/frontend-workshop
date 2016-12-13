class Startup {
    public static main(): string {
        return 'Hello Typescript';
    }
}

var typescript = document.getElementById('Typescript');

typescript.innerHTML = Startup.main();
