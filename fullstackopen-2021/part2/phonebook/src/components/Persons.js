import Person from "./Person"
const Persons = ({ persons, removePerson }) => (
    <div>
        {persons.map(person =>
            <Person key={person.name} person={person} removePerson={removePerson} />
        )}
    </div>
)
export default Persons;