const url='https://restcountries.com/v3.1/all';
const outputField=document.querySelector('.output-section');
const populationButton=document.querySelector('#population-button');
const languageButton=document.querySelector('#language-button');
let countries;
const fetchData= async ()=>{
    try{
        const response=await fetch(url);
        countries=await response.json();
    }catch(err){
        console.log(err);
    }
}

const mostPopulation=async ()=>{
    try{
        await fetchData();
        const sortByPopulation=await countries.sort((a,b)=>{
            if(a.population<b.population) return 1;
            else if(a.population>b.population) return -1;
            else return 0;
        });
        console.log(sortByPopulation);
        let worldPopulation=0;
        for(let c of countries){
            worldPopulation+=c.population;
        }
        const world=document.createElement('div');
        world.className='country';
        const worldNameField=document.createElement('div');
        const worldNameValue=document.createElement('span');
        worldNameField.className='name';
        worldNameValue.textContent='World';
        worldNameField.appendChild(worldNameValue);
        const populationField=document.createElement('div');
        const populationValue=document.createElement('span');
        populationField.className='population';
        populationValue.textContent=worldPopulation;
        populationField.appendChild(populationValue);
        const graph=document.createElement('div');
        graph.className='graph';
        const graphFill=document.createElement('div');
        graphFill.style.backgroundColor='#F2A93B';
        graphFill.style.width='100%';
        graphFill.style.height='100%';
        graph.appendChild(graphFill);
        world.appendChild(worldNameField);
        world.appendChild(graph);
        world.appendChild(populationField);
        outputField.appendChild(world);
        for(let i=0;i<10;i++){
            const name=sortByPopulation[i].name.common;
            const population=sortByPopulation[i].population;
            const country=document.createElement('div');
            country.className='country';
            const nameField=document.createElement('div');
            const nameValue=document.createElement('span');
            nameField.className='name';
            nameValue.textContent=name;
            nameField.appendChild(nameValue);
            const populationField=document.createElement('div');
            const populationValue=document.createElement('span');
            populationField.className='population';
            populationValue.textContent=population;
            populationField.appendChild(populationValue);
            const graph=document.createElement('div');
            graph.className='graph';
            const graphFill=document.createElement('div');
            const per=population/worldPopulation*100;
            console.log(per);
            graphFill.style.backgroundColor='#F2A93B';
            graphFill.style.width=`${per}%`;
            graphFill.style.height='100%';
            graph.appendChild(graphFill);
            country.appendChild(nameField);
            country.appendChild(graph);
            country.appendChild(populationField);
            outputField.appendChild(country);
        }
    }catch(err){
        console.log(err);
    }
}
const mostLanguage=async ()=>{
    try{
        await fetchData();
        const languages=await countries.map(e=> e.languages);
        const allLanguages=[];
        for(let l of languages){
            if(l){
                let lan=Object.values(l);
                allLanguages.push(lan);
            }else{
                continue;
            }
        }
        const arrLanguages=allLanguages.reduce((a,b)=> a.concat(b));

        const uniqLanguages=await languages.reduce((a,b)=> {
            return {...a,...b}; 
        });
        
        const uniqLanguagesArr=Object.values(uniqLanguages);
        const spokenLanguages=[];
        for(let i=0;i<uniqLanguagesArr.length;i++){
            let lang=arrLanguages.filter(l=> l==uniqLanguagesArr[i]);
            spokenLanguages.push({languages:uniqLanguagesArr[i],count:lang.length});
        }
        const sortedSpokenLanguages=spokenLanguages.sort((a,b)=>
        {
            if(a.count>b.count) return-1;
            else if(a.count<b.count) return 1;
            else return 0;
        });
        for(let i=0;i<10;i++){
            const name=sortedSpokenLanguages[i].languages;
            const count=sortedSpokenLanguages[i].count;
            const country=document.createElement('div');
            country.className='country';
            const nameField=document.createElement('div');
            const nameValue=document.createElement('span');
            nameField.className='name';
            nameValue.textContent=name;
            nameField.appendChild(nameValue);
            const populationField=document.createElement('div');
            const populationValue=document.createElement('span');
            populationField.className='population';
            populationValue.textContent=count;
            populationField.appendChild(populationValue);
            const graph=document.createElement('div');
            graph.className='graph';
            const graphFill=document.createElement('div');
            const per=count/91*100;
            console.log(per);
            graphFill.style.backgroundColor='#F2A93B';
            graphFill.style.width=`${per}%`;
            graphFill.style.height='100%';
            graph.appendChild(graphFill);
            country.appendChild(nameField);
            country.appendChild(graph);
            country.appendChild(populationField);
            outputField.appendChild(country);
        }
    }catch(err){
        console.log(err);
    }
}
mostPopulation();
populationButton.addEventListener('click',e=>{
    deleteChild();
    mostPopulation();
    
});
languageButton.addEventListener('click',e=>{
    deleteChild();
    mostLanguage();
});
function deleteChild() {
    while (outputField.firstChild) {
        outputField.removeChild(outputField.firstChild);
    }
}