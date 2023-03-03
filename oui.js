
const fs = require("fs");
let rawdata = fs.readFileSync("users.json","utf8");
var args = process.argv;

const data=JSON.parse(rawdata);
//console.log(data);
//console.log(args);

let countries =[];
let companies=[];

//fonction pour trier par insertion un tableau
function tri_insertion(tableau){
    
    for(let i=0; i<tableau.length;i++){
        let temp=tableau[i];
        let j=i-1;
        while((j>=0)&&(tableau[j].Count<temp.Count)){
            tableau[j+1]=tableau[j];
            j=j-1;
        }
        tableau[j+1]=temp;
    }
}

//fonction pour afficher les pays 
function affichage_pays(countrytable, string){
    for(let i=0; i<countrytable.length;i++){
        if(countrytable[i].country==string){
            return true;
        }
    }
}

//fonction pour afficher les sociétés
function affichage_compagnie(companytable, string){
    for(let i=0; i<companytable.length;i++){
        if(companytable[i].company==string){
            return true;
        }
    }
}

//main 
//si le deuxième argument est égal à "country", on affiche les pays et le nombre de fois qu'ils apparaissent
if(args[2]=="country"){
    for(let i=0; i<data.length; i++){
        if(!affichage_pays(countries,data[i].country)){
            let compteur={country:data[i].country, Count:1};
            countries.push(compteur);
        }
        
        else{
            let j=0;
            while(countries[j].country != data[i].country){
                j++;
            }
            countries[j].Count++;
        }
    }
    //tri du tableau contenant les pays et leurs itérations
    tri_insertion(countries);
    //affichage du tableau contenant les pays et leurs itérations
    console.log(countries);
    
}

//si le deuxième argument est égal à "company", on affiche les sociétés et le nombre de fois qu'elles apparaissent
else if(args[2]=="company"){
    for(let i=0; i<data.length; i++){
        if(!affichage_compagnie(companies,data[i].company)){
            let compteur={company:data[i].company, Count:1};
            companies.push(compteur);
        }
    
        else{
            let j=0;
            while(companies[j].company != data[i].company){
                j++;
            }
            companies[j].Count++;
        }
    }
    //tri du tableau contenant les sociétés et leurs itérations
    tri_insertion(companies);
    //affiachage du tableau contenant les sociétés et leurs itérations
    console.log(companies);
}

//sinon on affiche une erreur
else{
    console.log("not an option");
}