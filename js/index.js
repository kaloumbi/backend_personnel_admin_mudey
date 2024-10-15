
API_KEY = "4e9f68c76b4e3d7a8b5f1c2d3e4f5a6b";
API = "http://localhost/e-bestcommerce_mudey/backend_personnel/api/";



openModale = ()  =>{
    console.log(`addProd`, 'azertyui'); 
    var myModal = new bootstrap.Modal($('#exampleModal'), {
        backdrop: true, // ou true/false selon vos besoins
        keyboard: false
    })
    console.log(`modal`, myModal);
    myModal.show()

}

//Ouverture du modal pour l'ajout de l'emprunt(c'est particulier) !
openModaleEmpruntAdd = ()  =>{
    console.log(`addProd`, 'azertyui'); 

   

    var myModal = new bootstrap.Modal($('#exampleModal'), {
        backdrop: true, // ou true/false selon vos besoins
        keyboard: false
    })
    console.log(`modal`, myModal);
    myModal.show()

}

/******************
                    FONCTIONS UPDATED 
*******************/
//modal Livre 
openModaleUpdateLivre = (id)  =>{
    console.log(`Opening update modal for product ID: ${id}`);
    var myModal = new bootstrap.Modal($(`#updateLivre-${id}`), {
        backdrop: true, // ou true/false selon vos besoins
        keyboard: false
    })
    console.log(`modal`, myModal);
    myModal.show()

}

openModaledDeleteLivreConfirmation = (id)  =>{
    console.log(`Opening update modal for product ID: ${id}`);
    var myModal = new bootstrap.Modal($(`#deleteLivre-${id}`), {
        backdrop: true, // ou true/false selon vos besoins
        keyboard: false
    })
    console.log(`modal`, myModal);
    myModal.show()

}

//fonction to update input form values
updateLivre = (id) => {
    let formUpdateLivre = document.getElementById("formUpdateLivre-"+id);
    let data = new FormData(formUpdateLivre);

    //parametres pour fonctionner
    data.append("API_KEY", API_KEY);
    data.append("id", id);

    let dataVAlue = {};
    for (var value of data.entries()) { //value = tableau de deux elts: clé et valeur settée
        dataVAlue[value[0]] = value[1];
    }

    console.log(dataVAlue);
    
    const url = API + 'livre?'+constructURLParams(dataVAlue);

    fetch(
        url,
        {method: "PUT"}

    ).then((response) => {
        if (response.ok) {
            return response.json();
        }else{
            console.log("Erreur déclanchée lors de l'execution de la requette de mise à jour du Livre ! ");
        }

    }).then((result) => {
        if (result.status == 200) {
           
            //raffraichissement après la mise à jour
            var table = $("#dataTable").DataTable();
            var livres = table.rows().data();

            var livre = livres.filter(element => element.id == id)[0];

            var index = livres.indexOf(livre);
            

            livre.titre = dataVAlue.titre;
            livre.isbn = dataVAlue.isbn;
            livre.autheur = dataVAlue.autheur;
            livre.datePub = dataVAlue.datePub;
            livre.disponibilite = dataVAlue.disponibilite;


            
            //la fonction fnUpdate ne marche pas. c'est à revoir
            // $("#dataTable").dataTable().fnUpdate(livre, index, undefined, false); //=> permet de mettre à jour une ligne, une colonne
            // console.log(livre[0]);

            // Mettre à jour la ligne dans la DataTable avec la nouvelle API
            table.row(index).data(livre).draw(false); // Mise à jour de la ligne à l'index donné
            
            // console.log(result.result);
            // document.getElementById("formUpdateLivre-"+id).reset(); //vider les champs

            
        }else{
            console.log(result.message);
            
        }
    })
    
}


//modal User
openModaleUpdateUser = (id)  =>{
    console.log(`Opening update modal for product ID: ${id}`);
    var myModal = new bootstrap.Modal($(`#updateUser-${id}`), {
        backdrop: true, // ou true/false selon vos besoins
        keyboard: false
    })
    console.log(`modal`, myModal);
    myModal.show()

}

/****************************
            AJOUT LIVRE, USER, EMPRUNT
****************************/
addLivre = () => {
    //Amelioration de ma fonction add Livre
    let formLivre = document.getElementById("formLivre");

    let data = new FormData(formLivre);
    data.append("API_KEY", API_KEY);

    //nettoyer le localStorage
    localStorage.clear();

    //creation de l'url pour la sauvegarde en bd
    const url = API + 'livre';

    //console.log(url);

    fetch(url, 
        {
            method: "POST",
            body: data
        }).then((response) => { //un then pour recuperer la response
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => { //un autre then pour recuperer la response dans ce format
            if (response.status == 200) {
                console.log(response.result);
                document.getElementById("formLivre").reset(); //remettre à Zero tous les champs
                document.getElementsByClassName("btn-close")[0].click(); //fermer le modal

            }else{
                console.log(response.message);
            
            }
        })
    
    
    // console.log("Mon Produit affiché", constructURLParams(newProduct));
    
}


//Ajout User
addUser = () => {
    //Amelioration de ma fonction add Livre
    let formUser = document.getElementById("formUser");

    let data = new FormData(formUser);
    data.append("API_KEY", API_KEY);

    //nettoyer le localStorage
    localStorage.clear();

    //creation de l'url pour la sauvegarde en bd
    const url = API + 'user';

    //console.log(url);

    fetch(url, 
        {
            method: "POST",
            body: data
        }).then((response) => { //un then pour recuperer la response
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => { //un autre then pour recuperer la response dans ce format
            if (response.status == 200) {
                console.log(response.result);
                document.getElementById("formUser").reset(); //remettre à Zero tous les champs
                document.getElementsByClassName("btn-close")[0].click(); //fermer le modal

            }else{
                console.log(response.message);
            
            }
        })
    
    
    // console.log("Mon Produit affiché", constructURLParams(newProduct));
    
}

// Ajout Emprunt



addEmprunt = () => {
    //Amelioration de ma fonction add Livre
    let formEmprunt = document.getElementById("formEmprunt");

    let data = new FormData(formEmprunt);
    data.append("API_KEY", API_KEY);

    //nettoyer le localStorage
    localStorage.clear();

    //creation de l'url pour la sauvegarde en bd
    const url = API + 'emprunt';

    //console.log(url);

    fetch(url, 
        {
            method: "POST",
            body: data
        }).then((response) => { //un then pour recuperer la response
            if (response.ok) {
                return response.json();
            }else {
                throw new Error("Erreur lors de l'envoi des données.");
            }
        })
        .then((response) => { //un autre then pour recuperer la response dans ce format
            if (response.status == 200) {
                console.log(response.result);
                document.getElementById("formEmprunt").reset(); //remettre à Zero tous les champs
                document.getElementsByClassName("btn-close")[0].click(); //fermer le modal

            }else{
                console.log(response.message);
            
            }
        })
    
    
    // console.log("Mon Produit affiché", constructURLParams(newProduct));
    
}

//creation de l'url qui sera associé à notre requette
constructURLParams = (objet) => {
    result = '';
    for (const property in objet) {
        result += `${property}=${objet[property]}&`;
    }

    return result;
}


/****************************
            DELETE LIVRE
****************************/

deleteLivre = (id) => {
    const url = API + "livre?id="+id+"&API_KEY="+API_KEY;

    fetch(url, {
        method: "DELETE",
    }).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Erreur déclanchée lors de l'execution de la requette de suppression du livre !");
            
        }
    }).then((result) => {
        if (result.status == 200) {
            //raffraichissement après la mise à jour
            var table = $("#dataTable").DataTable();
            var livres = table.rows().data();
 
            var livre = livres.filter(element => element.id == id)[0];
 
            var index = livres.indexOf(livre);
 
            // Mettre à jour la ligne dans la DataTable avec la nouvelle API (fnDelete n'existe plus !)
            table.row(index).data(livre).draw(false);
            console.log(result.result);
            
        } else {
            console.log(result.message);
        }
    })
}


