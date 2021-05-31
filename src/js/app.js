
/* CACHER/APPARAITRE un élément input password ADMIN */
$(".hideDiv_admin").hide();

function showDiv_connect_admin() {
  $(".hideDiv_admin:hidden").each(
    function(){
    $(this).show();
  });

  $(".hideEnsg").hide();
};

/* Hide input password and ADMIN  */
$(".hideDiv_ensg").hide();
function showDiv_connect_ensg() {
  $(".hideDiv_ensg:hidden").each(
    function(){
      $(this).show();
    }
  );
  $(".hideAdmin").hide();
}

/* REDIRECTION PAGE __ verification mdp */
function redirection_page() {
  let recup_pseudo_admin = $("#pseudo_admin").val();
  let recup_mdp = $("#mdp").val();
  eel.connect_admin(recup_pseudo_admin, recup_mdp)(verify_mdp);
};

//REDIRECTION DE LA PAGE__ verification mdp
function verify_mdp(data){
  if (data == true){
    document.location.href='../admin.html';
  }
  else{
    alert("Mot de passe incorrect et/ou \n Adresse email incorrecte!!");
  }
}

//recup pseudo et mdp ensg et vérification
function redirection_page_ensg() {
  let recup_pseudo = $("#pseudo_ensg").val();
  let recup_mdp_ensg = $("#mdp_ensg").val();
  eel.connect_ensg(recup_pseudo, recup_mdp_ensg)(verify_mdp_ensg);
}
//redirection to the page_ensg
function verify_mdp_ensg(data) {
  if ( data == true){
    document.location.href='../enseignant.html';
  } else {
    alert("Mot de passe incorrect et/ou \n Adresse email incorrecte!!");
  }
}

//AFFICHAGE DANS LES TABLEAUX
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
  let module = $("#module").val();
  let tel = $("#tel_prof").val();
  let cin = $("#cin_prof").val();
  let mdp = $("#mdp_prof").val();
  let data = [matricule_prof, annee_univ, nom, prenom, email, adresse, sexe, tel, cin, module, mdp];
  x = eel.setData(data, 'ensg');
  alert('Inscription terminée');
};

/* RECUPERATION DES INFOS PERSONNEL ADMINISTRATIF */
function recup_info_perso_admin() {
  let matri_perso_admin = $("#matricule_perso").val();
  let annee_univ = $("#annee_univ_admin :selected").text();
  let nom = $("#nom_perso_admin").val();
  let prenom = $("#prenom_perso_admin").val();
  let mail = $("#email_perso_admin").val();
  let adresse = $("#addr_perso_admin").val();
  let tel = $("#tel_perso_admin").val();
  let fonction = $("#asa").val();
  let cin = $("#cin_perso_admin").val();
  let sexe = $("input[name=genre_perso_admin]:checked").val();
  let donnee = [matri_perso_admin, nom, prenom,  fonction, annee_univ, tel, cin, mail, adresse,  sexe];
  x = eel.setData(donnee, 'perso_admin');
  alert('Inscription terminée');

}

/* Exporter les données en CSV */
function export_data(val_bdd) {
  eel.export_data_csv(val_bdd);
  alert('Exportation terminée');
};


//AFFICHAGE PROFIL
function print_profil_student(data){
  table_bdd = eel.getdata_profil('student_profil', data);
  document.location.href="../profil_etudiant.html";  
}

function print_profil_prof(data) {
  table_bdd = eel.getdata_profil('ensg_profil', data);
  document.location.href="../profil_prof.html";
}

//SUPPRESSION LIGNE LISTE ETUDIANT ET PROF
function delete_student(data_recup){
  eel.delete_person('student_list',data_recup);
  location.reload();
}

function delete_prof(data_recup){
  eel.delete_person('prof_list',data_recup);
  location.reload();
}

/* Ajouter autre note */
$(".add_notes").hide();
function add_new_note(){
  let i=0;
  $(".add_notes:hidden").each(function(){
    if (i==0){
      $(this).show();
    }
    i++;
  });
}
/* Suppression note */
function remove_note() {
  let i=1;
  let line_note = $(".add_notes:visible");
  line_note.each(function() {
    if ((i) == line_note.length) {
      $(this).hide();
    } 
    i++;
  });
}



let arg = window.location.search.substr(1);
if (arg == 'prof') eel.getData('prof')(printData_prof); //AFFICHAGE LISTE PROF
else if (arg == 'student') eel.getData('student')(printData_etud); //AFFICHAGE LIST ETUD

//AFFICHAGE PROF
function printData_prof(data_recupered) {
  $("#naissance").hide();
  $("#niveau").hide();
  $("#module").show();
  for (let i=0; i<data_recupered.length; i++){
      let line = `
          <tr>
          <td id="t_matricule">${data_recupered[i][0]}</td>
          <td id="annee_univ">${data_recupered[i][1]}</td>
          <td id="t_nom">${data_recupered[i][2]}</td>
          <td id="t_prenom">${data_recupered[i][3]}</td>
          <td id="t_tel">${data_recupered[i][4]}</td>
          <td id="t_mail">${data_recupered[i][5]}</td>
          <td id="t_cin">${data_recupered[i][6]}</td>
          <td id="t_sexe">${data_recupered[i][7]}</td>
          <td id="t_addr">${data_recupered[i][8]}</td>
          <td id="t_module">${data_recupered[i][9]}</td>
          <td>
              <a class="edit" title="Editer" data-toggle="tooltip"><i class="fas fa-fw fa-edit"></i></a>
              <a class="edit" title="Voir Profil" onclick='print_profil_prof("${data_recupered[i][0]}")' data-toggle="tooltip"><i class="fas fa-fw fa-user-circle"></i></a>
              <a class="edit" title="Supprimer"  onclick='delete_prof("${data_recupered[i][0]}")' data-toggle="tooltip"><i class="fas fa-fw fa-trash"></i></a>
          </td>
      </tr>
          `
      $('#bdd_print').append(line);
  };
  let titre_left =  `
  LISTE DES PROFS INSCRITS
  `
  $('#h1_liste').append(titre_left);
};

//AFFICHAGE LISTE ETUDIANT
function printData_etud(data_recupered) {
    $('#module').hide();
    for (let i=0; i<data_recupered.length; i++){
        let line = `
            <tr>
            <td id="t_matricule">${data_recupered[i][0]}</td>
            <td id="annee_univ">${data_recupered[i][1]}</td>
            <td id="t_nom">${data_recupered[i][2]}</td>
            <td id="t_prenom">${data_recupered[i][3]}</td>
            <td id="t_date">${data_recupered[i][4]}</td>
            <td id="t_tel">${data_recupered[i][5]}</td>
            <td id="t_mail">${data_recupered[i][6]}</td>
            <td id="t_cin">${data_recupered[i][7]}</td>
            <td id="t_sexe">${data_recupered[i][8]}</td>
            <td id="t_addr">${data_recupered[i][9]}</td>
            <td id="t_niveau">${data_recupered[i][10]}</td>
            <td>
                <a class="edit" title="Editer" data-toggle="tooltip"><i class="fas fa-fw fa-edit"></i></a>
                <a class="edit" type="button" onclick='print_profil_student("${data_recupered[i][0]}")' title="Voir Profil" data-toggle="tooltip"><i class="fas fa-fw fa-user-circle"></i></a>
                <a class="edit" title="Supprimer" type="button" onclick='delete_student("${data_recupered[i][0]}")' data-toggle="tooltip"><i class="fas fa-fw fa-trash"></i></a>
            </td>
        </tr>
            `
        $('#bdd_print').append(line);
    };
    let titre_left =  `
    LISTE DES ETUDIANTS INSCRITS
  `
  $('#h1_liste').append(titre_left);
};