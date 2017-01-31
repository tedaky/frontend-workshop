class Startup
    main: (arg) ->
        return arg

coffeescriptMegan = new Startup
coffeescriptMeganH1 = document.getElementById('Right-Megan-h1')
coffeescriptMeganH1String = 'Megan Elizabeth Bening'
coffeescriptMeganH1.innerHTML = coffeescriptMegan.main(coffeescriptMeganH1String)

coffeescriptDescription = new Startup
coffeescriptDescriptionText = document.getElementById('Right-description')
coffeescriptMeganDescriptionString = 'Megan Bening, age 22 of Arlington passed away Saturday, January 28, 2017 in Rapid City, South Dakota. Mass of Christian Burial will be 10:00 a.m. Saturday, February 4th at St. Mary’s Catholic Church in Arlington. Visitation will be 4:00 p.m. until 8:00 p.m. Friday and one hour prior to Mass on Saturday all at St. Mary’s Catholic Church in Arlington. Kolden Funeral Home of Arlington is assisting the family with arrangements.'
coffeescriptDescriptionText.innerHTML = coffeescriptDescription.main(coffeescriptMeganDescriptionString)
