import Chance from 'chance'
import { Factory } from 'rosie'


const chance = new Chance()

const Location = new Factory()
  .attrs({
    name: () => chance.province({ full: true }),
    numberOfFemales: () => chance.natural({ min: 0, max: 1000 }),
    numberOfMales: () => chance.natural({ min: 0, max: 1000 }),
    createdAt: () => chance.date(),
    updatedAt: () => chance.date()
  })

export default Location
