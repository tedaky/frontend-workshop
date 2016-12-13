class Startup
    main: () ->
        return 'Hello Coffeescript'

startup = new Startup

coffeescript = document.getElementById('Coffeescript')

coffeescript.innerHTML = startup.main()
