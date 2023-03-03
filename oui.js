const fs = require("fs");
const proc=require("process");
let rawdata = fs.readFileSync("users.json", "utf8");
var args = proc.argv;

const data = JSON.parse(rawdata);

//déclaration de deux tableaux vides qui vont être nos réponses finales, contenant la valeur et le nombre d'itérations
let countries =[];
let companies=[];

//fonction pour trier par insertion un tableau
function tri_insertion(tableau){
    
    //parcours
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

//fonction pour afficher le tableau sans les crochets
function afficher_tableau(tableau){
    for(let i of tableau){
        console.log(i);
    }
}

//fonction pour voir si un pays est déjà dans le tableau ou non 
function is_country(countrytable, string){
    for(let i=0; i<countrytable.length;i++){
        if(countrytable[i].country==string){
            return true;
        }
    }
}

//fonction pour voir si une société est déjà dans le tableau ou non
function is_company(companytable, string){
    for(let i=0; i<companytable.length;i++){
        if(companytable[i].company==string){
            return true;
        }
    }
}

//main 
//si le deuxième argument est égal à "country", on affiche les pays et le nombre de fois qu'ils apparaissent
if (args[1] == "country"){
    //parcours du tableau
    for(let i=0; i<data.length; i++){
        //si le pays n'est pas déjà dans le tableau on le rajoute
        if(!is_country(countries,data[i].country)){
            //rajout dans le tableau avec un coût défini à 1
            let compteur={country:data[i].country, Count:1};
            countries.push(compteur);
        }
            
        //sinon on rajoute 1 à notre tableau où se situe notre pays
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
    afficher_tableau(countries);
    
}

//si le deuxième argument est égal à "company", on affiche les sociétés et le nombre de fois qu'elles apparaissent
else if (args[2] == "company"){
    //parcours du tableau
    for(let i=0; i<data.length; i++){
        //si le tableau ne contient pas déjà la société, on la rajoute
        if(!is_company(companies,data[i].company)){
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
    afficher_tableau(companies);
}

//sinon on affiche une erreur
else{
    console.log("not an option");
}
