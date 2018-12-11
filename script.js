const skills = document.querySelector('.skills');

let currentSkillSet = [
    'HTML',
    'CSS',
    'Flexbox',
    'Bootstrap',
    'JavaScript',
    'React',
    'NodeJs',
    'Git',
    'MySQL',
    'Swift',
    'MongoDB',
    'Express'
]
let count = 0;

const randomWord =()=>{
   
    skills.innerHTML = 'Skills: ' + currentSkillSet[count];
    count++
    if (count === currentSkillSet.length){
        count = 0
    }
    setTimeout(randomWord,2000)
}

randomWord()