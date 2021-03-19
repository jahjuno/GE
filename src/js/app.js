
/* CACHER/APPARAITRE un élément */
$(".hideDiv").hide();

function showDiv_connect_admin() {
  $(".hideDiv:hidden").each(function(){
    $(this).show();
  });

  $(".hideEnsg").hide();
};

/* REDIRECTION PAGE */
function redirection_page() {
  window.location.href("../liste_etud.html");
};




/* RECUPERATION DES INFOS ETUDIANTS */

function recup_info_etudiant(){
  let matricule_etud = $("#matricule_etud").val();
  let nom = $("#nom").val();
  let prenom = $("#prenom").val();
  let date_naissance = $("#date_nais").val();
  let adresse = $("#addr").val();
  let email = $("#email").val();
  let sexe = $("input[name=genre]:checked").val();
  let annee_univ = $("#annee :selected").text();
  let niveau = $("#niveau :selected").text();
  let tel = $("#tel").val();
  let cin = $("#cin").val();
  let data = [matricule_etud, annee_univ, nom, prenom, date_naissance, email, adresse, sexe, tel, cin, niveau];
  x = eel.setData(data, 'etud');
  alert('Inscription terminée');
};

/* RECUPERATION DES INFOS PROFS */
function recup_info_prof(){
  let matricule_prof = $("#matricule_prof").val();
  let nom = $("#nom_prof").val();
  let prenom = $("#prenom_prof").val();
  let adresse = $("#addr_prof").val();
  let email = $("#email_prof").val();
  let sexe = $("input[name=genre_prof]:checked").val();
  let annee_univ = $("#annee_prof :selected").text();
  let module = $("#module :selected").text();
  let tel = $("#tel_prof").val();
  let cin = $("#cin_prof").val();
  let mdp = $("#mdp_prof").val();
  let data = [matricule_prof, annee_univ, nom, prenom, email, adresse, sexe, tel, cin, module, mdp];
  x = eel.setData(data, 'ensg');
  alert('Inscription terminée');
};

/* Exporter les données en CSV */
function export_data(val_bdd) {
  eel.export_data_csv(val_bdd);
  alert('Exportation terminée');
};