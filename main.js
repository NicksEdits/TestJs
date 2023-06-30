// Validation du formulaire
let id = 0;
function ValidForm() {
    let namec = document.getElementById('namec').value;
    let name = document.getElementById('n').value;
    let nameMecene = document.getElementById('ndm').value;
    let dateDeDebut = document.getElementById('datedd').value;
    let dateDeFin = document.getElementById('datedf').value;
 
    if (namec == "") {
        alert('Veuillez remplir le Nom du contrat');
        return false;
    }
    if (name == "") {
        alert('Veuillez remplir le Nom');
        return false;
    }
    if (nameMecene == "") {
        alert('Veuillez remplir le Nom du mecene');
        return false;
    }
    if (dateDeDebut == "") {
        alert('Veuillez remplir la date de debut');
        return false;
    }
    if (dateDeFin == "") {
        alert('Veuillez remplir la date de fin');
        return false;
    }
    if (dateDeDebut > dateDeFin) {
        alert('la date de fin est antérieur à la date de début');
        return false;
    }
    return true;
}
// affichage des données
function showData() {
    let listContrat;
    if (localStorage.getItem("listContrat") == null) {
        listContrat = [];
    } else {
        listContrat = JSON.parse(localStorage.getItem("listContrat"));
    }
    let html = "";
    listContrat.forEach(function (e, i) {
        html += "<tr>";
        html += "<td>" + e.namec + "</td>";
        html += "<td>" + e.name + "</td>";
        html += "<td>" + e.nameMecene + "</td>";
        html += "<td>" + e.dateDeDebut + "</td>";
        html += "<td>" + e.dateDeFin + "</td>";
        html += '<td> <button onclick="delData(' + i + ')" class="btn btn-danger"> Supprimer </button><button onclick="updateData(' + i + ')" class="btn btn-outline-warning m-1"> Modifier </button> <button onclick="AfficheContrat(' + i + ')" class="btn btn-outline-success m-1"> Afficher </button></td> ';
        html += "<tr>";
    });
    document.querySelector("#tableCrud tbody").innerHTML = html;
}
// recupère les données apres un reload
document.onload = showData();

//ajout de données 

function AddContrat() {
    if (ValidForm()) {
        let namec = document.getElementById('namec').value;
        let name = document.getElementById('n').value;
        let nameMecene = document.getElementById('ndm').value;
        let dateDeDebut = document.getElementById('datedd').value;
        let dateDeFin = document.getElementById('datedf').value;

        let listContrat;
        if (localStorage.getItem("listContrat") == null) {
            listContrat = [];
        } else {
            listContrat = JSON.parse(localStorage.getItem("listContrat"));
        }
        listContrat.push({
            id: id,
            namec: namec,
            name: name,
            nameMecene: nameMecene,
            dateDeDebut: dateDeDebut,
            dateDeFin: dateDeFin,
        });
        localStorage.setItem("listContrat", JSON.stringify(listContrat));
        showData();
        document.getElementById('namec').value = "";
        document.getElementById('n').value = "";
        document.getElementById('ndm').value = "";
        document.getElementById('datedd').value = "";
        document.getElementById('datedf').value = "";
        id++;
    }
}

// Suppression des données 

function delData(i) {
    let listContrat;
    if (localStorage.getItem("listContrat") == null) {
        listContrat = [];
    } else {
        listContrat = JSON.parse(localStorage.getItem("listContrat"));
    }
    listContrat.splice(i, 1);
    localStorage.removeItem("listContrat", JSON.stringify(listContrat));
    showData();
}

// modification des données

function updateData(i) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let listContrat;
    if (localStorage.getItem("listContrat") == null) {
        listContrat = [];
    } else {
        listContrat = JSON.parse(localStorage.getItem("listContrat"));
    }
    document.getElementById('namec').value = listContrat[i].namec;
    document.getElementById('n').value = listContrat[i].name;
    document.getElementById('ndm').value = listContrat[i].nameMecene;
    document.getElementById('datedd').value = listContrat[i].dateDeDebut;
    document.getElementById('datedf').value = listContrat[i].dateDeFin;

    document.querySelector("#update").onclick = function () {
        if (ValidForm()) {
            listContrat[i].namec = document.getElementById('namec').value;
            listContrat[i].name = document.getElementById('n').value;
            listContrat[i].nameMecene = document.getElementById('ndm').value;
            listContrat[i].dateDeDebut = document.getElementById('datedd').value;
            listContrat[i].dateDeFin = document.getElementById('datedf').value;
            localStorage.setItem("listContrat", JSON.stringify(listContrat));
            document.getElementById('namec').value = "";
            document.getElementById('n').value = "";
            document.getElementById('ndm').value = "";
            document.getElementById('datedd').value = "";
            document.getElementById('datedf').value = "";
            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
            showData();
        }
    }
}

//afficher contrat avant de telecharger
function AfficheContrat(i) {
    let listContrat;
    if (localStorage.getItem("listContrat") == null) {
        listContrat = [];
    } else {
        listContrat = JSON.parse(localStorage.getItem("listContrat"));
    }
    let html = "";

    html += '<dialog id="modal" aria-labelledby="dialog_title" aria-describedby="dialog_description"> ';
    html += '<div class="container" id="contratpd">'
    html += '<h2 class="mt-5 mb-5">' + listContrat[i].namec + '</h2>';
    html += '<div class="mt-3">Entre<br/><p class="text">' + listContrat[i].name + '</p></div>';
    html += '<div class="mt-3">Et<br/><p>"' + listContrat[i].nameMecene + '"</p></div>';
    html += '<div class="mt-3">du &nbsp;<span>' + listContrat[i].dateDeDebut + '</span>&nbsp; au &nbsp;<span>' + listContrat[i].dateDeFin + '</span> </div>';
    html += " <div class='mt-3'>Signature : <span class='boxsign'> </span> </div>";
    html += "</div>";
    html += '<button onclick="dlPdf(' + i + ')" class="btn btn-success"> Telecharger </button><button onclick="Closemodal()" class="btn btn-danger m-1"> Fermer </button> ';
    html += '</dialog>';


    document.querySelector("#contratpdf tbody").innerHTML = html;
    let dialog = document.getElementById('modal');
    dialog.showModal();

}
//fermeture de la modale
function Closemodal() {
    let dialog = document.getElementById('modal');
    dialog.close();
}
//telechargement pdf
function dlPdf(i) {
    let listContrat;
    if (localStorage.getItem("listContrat") == null) {
        listContrat = [];
    } else {
        listContrat = JSON.parse(localStorage.getItem("listContrat"));
    }
    var opt = {
        margin: 1,
        filename: listContrat[i].namec + '_n°_' + listContrat[i].id + '.pdf',
    };
    let contrat = document.getElementById('contratpd');
    html2pdf().set(opt).from(contrat).save();

}