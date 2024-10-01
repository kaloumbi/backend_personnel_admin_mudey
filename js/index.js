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

//creation de l'url qui sera associé à notre requette
constructURLParams = (objet) => {
    result = '';
    for (const property in objet) {
        result += `${property}=${objet[property]}&`;
    }

    return result;
}


