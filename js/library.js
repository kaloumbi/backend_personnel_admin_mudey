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

                    //tester si le click est sur les livres
                    if (action == 'livres') {
                        this.loadLivres();
                    }else if(action == 'emprunts'){
                        this.loadEmprunts();
                    }else if(action == 'historiques'){
                        this.loadHistoriques();
                    }else if(action == 'users'){
                        this.loadUsers();
                    }
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


    //function to getData permettant de recuperer puis parcourir les données en local
    getData(entity){
        //tester si les données sont définies sinon tableau vide
        return JSON.parse(localStorage.getItem(entity)) ? JSON.parse(localStorage.getItem(entity)) : [];
    }


    loadLivres() {
        // const data = this.getData('livres');
        // console.log('Data for Livres:', data);
        
        $('#dataTable').DataTable({
            data: this.getData('livres'),
            columns: [
                { data: 'id' },
                { data: 'titre' },
                { data: 'autheur' },
                { data: 'isbn' },
                { data: 'datePub.date' },
                { data: 'disponibilite' },
                { data: 'createdAt.date' }
            ]
        });
    }
        

    loadEmprunts(){
        // const data = this.getData('emprunts');
        // console.log('Data for Emprunts:', data);

        $('#dataTable').DataTable( {

            data: this.getData('emprunts'),
            columns: [
                { data: 'id' },
                { data: 'dateEmprunt.date' },
                { data: 'dateRetour.date' },
                { data: 'userId' },
                { data: 'livreId' }

            ]
        } );
    }

    loadHistoriques(){
        $('#dataTable').DataTable( {
            data: this.getData('historiques'),
            columns: [
                { data: 'id' },
                { data: 'dateEmprunt.date' },
                { data: 'dateRetour.date' },
                { data: 'userId' },
                { data: 'livreId' },
                {data: "empruntId" }
            ]
        } );
    }

    loadUsers(){
        $('#dataTable').DataTable( {
            data: this.getData('users'),
            columns: [
                { data: 'id' },
                { data: 'prenom' },
                { data: 'nom' },
                { data: 'login' }
            ]
        } );
    }


}

export {Library}