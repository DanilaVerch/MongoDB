require('dotenv').config();
let mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let newPerson = new Person ({name: "Danila", age: 19, favoriteFoods: ["Pizza", "chips", "eggs"]});
  newPerson.save(function(err, data){
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

let arrayOfPeople = [
  {name: "John", age: 19, favoriteFoods: "Pizza"}, 
  {name: "Danila", age: 39, favoriteFoods: "Rolls"}, 
  {name: "Dasha", age: 7, favoriteFoods: "Cake"}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people){
    if (err) {
      return console.error(err);
    }
    done(null, people);
  });
};

// Поиск по имени
const findPeopleByName = (personName, done) => {
  Person.find ({name: personName}, function(err, personFound){
    if (err) {
      return console.error(err);
    }
    done(null, personFound);
  });
};

// Поиск по любимой еде
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, foodFound){
    if(err) {
      return console.error(err);
    }
    done(null, foodFound);
  });
};

// Поиск по id
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, idFound) {
    if (err){
      return console.log(err);
    }
    done(null, idFound);
  });
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPerson) => {
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function (err, updatedDoc) {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.log(err);
    done(null, removedPerson);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec((err, data) => {
    if (err) {
      done (err, null)
    } else {
      done (null, data)
    }
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
