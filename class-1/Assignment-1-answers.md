Q 1 

{ person(personID: 22) { name } }

Q2 

{
  person(personID: 20) {
    name
    height
    eyeColor
  }
}

Q3

{
  person(personID: 10) {
    name
    homeworld {
      name
    }
  }
}

Q4

{
  allSpecies{
    totalCount
  }
}


Q5

{
  allVehicles {
    vehicles {
      name
    }
  }
}

Q6

{
  person(personID:1) {
    name 
    vehicleConnection {
      vehicles {
        name
      }
    }
  }
}


Q7 

{
  person(personID:4) {
    name 
    starshipConnection {
      starships {
        name
        maxAtmospheringSpeed
      }
    }
  }
}


Q8

{
  a: person(personID: 2) {
    name
    eyeColor
  }
  
  b:person(personID:3) {
    name
    eyeColor
  }
}

Q9 


{
  a: person(personID: 13) {
    name
    homeworld {
      name
    }
  }
  
  b:person(personID: 14) {
    name
    homeworld {
      name
    }
  }
}


Q10 

{
  a: person(personID: 4) {
    name
    filmConnection {
      films {
        title
      }
    }
  }
  
  b:person(personID: 2) {
    name
    filmConnection {
      films {
        title
      }
    }
  }
}

