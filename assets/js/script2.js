const startingBtn=document.getElementById('starting-btn');
const outputSection=document.querySelector('.output-section');
const searchAnyBtn=document.getElementById('search-any-btn');
const searchBar=document.querySelector('.search-bar');
const keyWord=document.querySelector('.search-keyword');
const count=document.querySelector('.country-count');
const sortBtn=document.getElementById('sort-btn');
const url='https://restcountries.com/v3.1/all';
let countries;

const fetchData= async ()=>{
    try{
        const response=await fetch(url);
        countries=await response.json();
        //starting btn
        startingBtn.addEventListener('click',e=>{
            const display=document.querySelector('.header-section p');
            const value=searchBar.value;   
            const countriesFiltered=countries.filter(c=> c.name.common.toLowerCase().startsWith(value.toLowerCase()));
            keyWord.textContent=value;
            count.textContent=countriesFiltered.length;
            display.classList.remove('display-none');
            while(outputSection.firstChild){
                outputSection.removeChild(outputSection.firstChild);
            }
            for(let c of countriesFiltered){
                let country=document.createElement('div');
                let name=document.createElement('span');
                name.textContent=c.name.common;
                name.className='country-name';
                country.className='country';
                country.appendChild(name);
                outputSection.appendChild(country);
            }
            searchBar.value='';
        });
        searchAnyBtn.addEventListener('click',e=>{
            const display=document.querySelector('.header-section p');
            
            const value=searchBar.value;
            const countriesFiltered=countries.filter(c=> c.name.common.toLowerCase().includes(value.toLowerCase()));
            keyWord.textContent=value;
            count.textContent=countriesFiltered.length;
            display.classList.remove('display-none');
            while(outputSection.firstChild){
                outputSection.removeChild(outputSection.firstChild);
            }
            for(let c of countriesFiltered){
                let country=document.createElement('div');
                let name=document.createElement('span');
                name.textContent=c.name.common;
                name.className='country-name';
                country.className='country';
                country.appendChild(name);
                outputSection.appendChild(country);
            }
            searchBar.value='';
        });
        sortBtn.addEventListener('click',e=>{
            let outputValues=[];
            while(outputSection.firstChild){
                let first=outputSection.firstChild;
                let second=first.firstChild;
                if(second!==null){
                    outputValues.push(second.textContent);
                }
                
                outputSection.removeChild(outputSection.firstChild)
            }
            let sortedCountries=outputValues.sort();
            if(sortBtn.firstChild.className=='fa-solid fa-arrow-down-a-z'){
                sortedCountries=outputValues.sort();
            }else{
                sortedCountries=outputValues.reverse();
            }
            sortBtn.firstChild.classList.toggle('fa-arrow-down-a-z');
            sortBtn.firstChild.classList.toggle('fa-arrow-down-z-a');
            for(let c of sortedCountries){
                let country=document.createElement('div');
                let name=document.createElement('span');
                name.textContent=c;
                name.className='country-name';
                country.className='country';
                country.appendChild(name);
                outputSection.appendChild(country);
            }
        });
    }catch(err){
        console.log(err);
    }
}
const showFunction=async function(){
    try{
        await fetchData();
        for(let c of countries){
           
            let country=document.createElement('div');
            let name=document.createElement('span');
            
            name.textContent=c.name.common;
            name.className='country-name';
            country.className='country';
            country.appendChild(name);
            outputSection.appendChild(country);

        }
    }catch(err){
        console.log(err);
    }
}
showFunction()
.then(function(){
    document.querySelector('.spinner-wrapper').style.display='none';
    document.querySelector('body').style.overflowY='auto';
});

