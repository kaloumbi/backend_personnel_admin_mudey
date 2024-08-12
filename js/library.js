class Library {

    constructor() {
       this.api_key = "API_KEY=4e9f68c76b4e3d7a8b5f1c2d3e4f5a6b";
       this.api = "http://localhost/e-bestcommerce_mudey/backend_personnel/api/";
       this.actions = ['livres', 'emprunts', 'historiques', 'users'];

       //appel des fonctions
       this.initRouter();
       this.initDataApp();
    }


    //creation de nos router de navigation
   initRouter(){
        this.actions.forEach((action) =>{
            document.getElementById(action).addEventListener("click", () => {
                //à chaque click, qu'on nous charge (fetch) les données corcenant chaque button de navigation
                fetch("templates/"+action+".html")
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        console.log("Erreur de chargement du template");
                    }


                }).then((data) => {
                    document.getElementsByClassName('container-fluid')[0].innerHTML = data;
                })




            })
        })
    }

    initDataApp(){
        this.actions.forEach((action) =>{
            //question le server
            const url = this.api+action+"?"+this.api_key;
            //utiliser fetch pour charger une ressource externe
            fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json(); //retourner au format json
                } else {
                    console.log("Erreur de chargement des données !");
                }


            }).then((response) =>{
                if (response.status == 200) {
                    localStorage.setItem(action, JSON.stringify(response.result));
                } else {
                
                }
            })
        })
    }


}

export {Library}