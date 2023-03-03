const fs = require('fs');
let rawdata = fs.readFileSync('users.json','utf8');

const data=JSON.parse(rawdata);

//fonction pour afficher le menu
function afficherMenu(){
    console.log("Taper le numéro de ce que vous voulez afficher :\n 1-Pays \n 2-Sociétés \n q-Quitter");
}


//fonction pour récupérer la donnée rentrée par l'utilisateur 
function getDataUser(){
    //déclaration d'une variable qui va être notre retour
    let data_user;
    const readline=require("readline");
    readline.emitKeypressEvents(process.stdin);
    if(process.stdin.isTTY) process.stdin.setRawMode(true);
    //appel à l'affichage du menu
    afficherMenu();
    //si touche pressée=1, data_user=1, etc.
    process.stdin.on("keypress",(str,key)=>{if(key.name=="1"){main(1);} if(key.name=="2"){main(2);} if(key.name=="q"){process.exit();}})
}

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
function main( data_user){
    //let data_user=getDataUser();
    //si la valeur rentrée est égale à 2, on affiche les pays et leur nombre d'itérations
    if(data_user==1){
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
        console.log(countries);
        
    }
    
    //si la valeur rentrée est égale à 2, on affiche les sociétés et le nombre de fois qu'elles apparaissent
    else if(data_user==2){
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
        console.log(companies);
    }
    
    //sinon on affiche une erreur
    else{
        console.log("not an option");
    }
}
main();