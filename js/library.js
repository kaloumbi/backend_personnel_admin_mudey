class Library {

    constructor() {
       this.api_key = "API_KEY=4e9f68c76b4e3d7a8b5f1c2d3e4f5a6b";
       this.api = "http://localhost/e-bestcommerce_mudey/backend_personnel/api/";
       this.actions = ['livres', 'emprunts', 'historiques', 'users'];

       //tableau data
       this.data = [];
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
                    this.data.push({name: action, data: response.result});
                    // localStorage.setItem(action, JSON.stringify(response.result));
                } else {
                
                }
            })
        })
    }


    //function to getData permettant de recuperer puis parcourir les données en local
    getData(action){
        //tester si les données sont définies sinon tableau vide
        var object = this.data.find(element => element.name == action);
        return object.data;
        //tester si les données sont définies sinon tableau vide
        // return JSON.parse(localStorage.getItem(entity)) ? JSON.parse(localStorage.getItem(entity)) : [];
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
                { data: 'createdAt.date' },
                { data: 'id',
                    render: function ( id, type, row ) {
                       return `<button type="button" class="btn btn-success" data-toggle="modal" data-target="#updateLivre-${id}" onclick="openModaleUpdateLivre(${id})"> UPDATE </button> 
                       
                            <!-- Modal -->
                            <div class="modal" id="updateLivre-${id}" tabindex="-1" aria-labelledby="updateLivreModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Update Livre</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button>
                                    </div>
                                    <div class="modal-body">
                                    
                                    <form action="" id="formUpdateLivre-${id}">
                                        <div class="form-row">
                                            <div class="col">
                                                <label for="">Titre : </label>
                                                <input  type="text" name="titre" class="form-control" value="${row.titre}" >
                                            </div>
                            
                            
                                            <div class="col">
                                                <label for="">Autheur : </label>
                                                <input  type="text" name="autheur" class="form-control" value="${row.autheur}" >
                                            </div>
                            
                            
                                            <div class="col">
                                                <label for="">ISBN : </label>
                                                <input  type="text" name="isbn" class="form-control" value="${row.isbn}" >
                                            </div>
                            
                            
                                            <div class="col">
                                                <label for="">Date Pub :</label>
                                                <input  type="date" name="datePub" class="form-control" value="${new Date(row.datePub.date).toISOString().substring(0, 10)}" >
                                            </div>
                                            
                            
                            
                                            <div class="col">
                                                <label for="">Disponibilité :</label><br>
                                                <input  type="radio" name="disponibilite" value="true" ${row.disponibilite ? 'checked' : ''} > Oui
                                                <input  type="radio" name="disponibilite" value="false" ${!row.disponibilite ? 'checked' : ''} > Non
                                            </div>
                                            
                            
                            
                                        </div>
                                    </form>
                                    
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onclick="addLivre(${id})" type="button" class="btn btn-primary">Update Livre</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                       
                       
                       `;
                    }
                }
                
            ]
        });
    }


    /************
     * ************ FONCTION POUR CHARGER LES USERS ET LIVRES AVEC LES OPTIONS ******************
     ************/

    //Fonction pour charger les utilisateurs dans le <select> :
    loadUserOptions() {
        let userSelect = document.getElementById('userSelect');
        userSelect.innerHTML = ""; // Vider les options existantes
    
        const users = this.getData('users'); // Récupérer les utilisateurs
    
        users.forEach(user => {
            let option = document.createElement('option');
            option.value = user.id; // L'ID de l'utilisateur
            option.text = `${user.prenom} ${user.nom}`; // Nom complet de l'utilisateur
            userSelect.appendChild(option); // Ajouter l'option au select
        });
    }

    //Fonction pour charger les livres dans le <select> :
    loadLivreOptions() {
        let livreSelect = document.getElementById('livreSelect');
        livreSelect.innerHTML = ""; // Vider les options existantes
    
        const livres = this.getData('livres'); // Récupérer les livres
    
        livres.forEach(livre => {
            let option = document.createElement('option');
            option.value = livre.id; // L'ID du livre
            option.text = livre.titre; // Titre du livre
            livreSelect.appendChild(option); // Ajouter l'option au select
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
                { data: 'login' },
                { data: 'id', 
                    render: function ( id, type, row ) {
                        return `<button type="button" class="btn btn-success" data-toggle="modal" data-target="#updateUser-${id}" onclick="openModaleUpdateUser(${id})"> UPDATE </button>
                            <!-- Modal -->
                            <div class="modal" id="updateUser-${id}" tabindex="-1" aria-labelledby="updateUserModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Update User</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button>
                                    </div>
                                    <div class="modal-body">
                                    
                                    <form action="" id="formUpdateUser">
                                        <div class="form-row">
                                            <div class="col">
                                                <label for="">Prenom : </label>
                                                <input  type="text" name="prenom" class="form-control" value="${row.prenom}" >
                                            </div>
                            
                            
                                            <div class="col">
                                                <label for="">Nom : </label>
                                                <input  type="text" name="nom" class="form-control" value="${row.nom}" >
                                            </div>
                            
                            
                                            <div class="col">
                                                <label for="">Login : </label>
                                                <input  type="text" name="login" class="form-control" value="${row.login}" >
                            
                                            </div>
                            
                                        </div>
                                    </form>
                                    
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onclick="updateUser(${id})" type="button" class="btn btn-primary">Update User</button>
                                    </div>
                                </div>
                                
                            </div>


                        `;
                    } 
                }
            ]
        } );
    }


}

export {Library}