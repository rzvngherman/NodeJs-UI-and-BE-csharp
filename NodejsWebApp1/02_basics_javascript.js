//basics JS
const person = {
	name: 'Max',
	age: 29
}

const printName = ({name}) => {
	console.log(name);
}
//1
printName(person);

//2
const {name, age} = person
console.log(name, age)

//3
const hobbies = ['Sports', 'Cooking']
const [hobby1, hobby2] = hobbies
console.log(hobby1, hobby2)

//4-async code
setTimeout(() => {
	console.log('Timer is done')
}, 2000);