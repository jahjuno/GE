//const fs = require('fs');
//const path = require('path');


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
  //const fs = require('fs');
  let matricule_etud = $("#matricule_etud").val();
  let nom = $("#nom").val();
  let prenom = $("#prenom").val();
  let date_naissance = $("#date_nais").val();
  let adresse = $("#addr").val();
  let email = $("#email").val();
  let sexe = $("input[name=genre]:checked").val();
  let annee_univ = $("#annee").val();
  let niveau = $("#niveau").val();
  let tel = $("#tel").val();
  let cin = $("#cin").val();
  let value_pdp = document.getElementById('student_image').files[0];
  if (value_pdp) {
    let got_file_path = value_pdp.path;
    let data = [matricule_etud, annee_univ, nom, prenom, date_naissance, email, adresse, sexe, tel, cin, niveau, got_file_path];
    x = eel.setData(data, 'etud');
    $('#insert_text').html('Etudiant inscrit <i class="fas fa-check fa-sm"></i>');
    $('#foot_modal').hide();
  }
  else {
    got_file_path = "";
    let data = [matricule_etud, annee_univ, nom, prenom, date_naissance, email, adresse, sexe, tel, cin, niveau, got_file_path];
    x = eel.setData(data, 'etud');
    $('#insert_text').html('Etudiant inscrit <i class="fas fa-check fa-sm"></i>');
  }
  
  

};


/* RECUPERATION DES INFOS PROFS */
function recup_info_prof(){
  let value_pdp= document.getElementById('prof_image').files[0];
  let matricule_prof = $("#matricule_prof").val();
  let nom = $("#nom_prof").val();
  let prenom = $("#prenom_prof").val();
  let adresse = $("#addr_prof").val();
  let email = $("#email_prof").val();
  let sexe = $("input[name=genre_prof]:checked").val();
  let annee_univ = $("#annee_prof").val();
  let tel = $("#tel_prof").val();
  let cin = $("#cin_prof").val();
  let mdp = $("#mdp_prof").val();
  if (value_pdp) {
    let got_file_path = value_pdp.path;
    let data = [matricule_prof, annee_univ, nom, prenom, email, adresse, sexe, tel, cin, mdp, got_file_path];
    x = eel.setData(data, 'ensg');
    $('#insert_text').html('Prof inscrit <i class="fas fa-check fa-sm"></i>')
    $('#foot_modal').hide();

  }
  else{
    got_file_path ="";
    let data = [matricule_prof, annee_univ, nom, prenom, email, adresse, sexe, tel, cin, mdp, got_file_path];
    x = eel.setData(data, 'ensg');
    $('#insert_text').html('Prof inscrit <i class="fas fa-check fa-sm"></i>')
    $('#foot_modal').hide();
  }
  
};

/* RECUPERATION DES INFOS PERSONNEL ADMINISTRATIF */
function recup_info_perso_admin() {
  let value_pdp = document.getElementById('admin_image').files[0];
  let matri_perso_admin = $("#matricule_perso").val();
  let annee_univ = $("#annee_univ_admin").val();
  let nom = $("#nom_perso_admin").val();
  let prenom = $("#prenom_perso_admin").val();
  let mail = $("#email_perso_admin").val();
  let adresse = $("#addr_perso_admin").val();
  let tel = $("#tel_perso_admin").val();
  let fonction = $("#asa").val();
  let cin = $("#cin_perso_admin").val();
  let sexe = $("input[name=genre_perso_admin]:checked").val();
  if (value_pdp) {
    let got_file_path = value_pdp.path;
    let donnee = [matri_perso_admin, nom, prenom,  fonction, annee_univ, tel, cin, mail, adresse,  sexe, got_file_path];
    x = eel.setData(donnee, 'perso_admin');
    $('#insert_text').html('Personnel inscrit <i class="fas fa-check fa-sm"></i>');
    $('#foot_modal').hide();
  }
  else {
    got_file_path = ""
    let donnee = [matri_perso_admin, nom, prenom,  fonction, annee_univ, tel, cin, mail, adresse,  sexe, got_file_path];
    x = eel.setData(donnee, 'perso_admin');
    $('#insert_text').html('Personnel inscrit <i class="fas fa-check fa-sm"></i>')
    $('#foot_modal').hide();
  }
  

}

//RECUPERATION MODULE
function recup_module(){
  let module_name = $("#module_name").val();
  let ref_module = $("#ref_module").val();
  let semestre = $("#semestre :selected").text();
  let prof_matricule = $("#nom_prof_select :selected").val()
  let credit_btenu = $("#credit_obt").val()
  let data = [module_name, ref_module, semestre, prof_matricule, credit_btenu];
  set_data = eel.setData(data, 'module');
  $('#insert_text').html('Module enregistré <i class="fas fa-check fa-sm"></i>');
}

//AJOUT NOTE
function add_note_1(){
  //selection recuperation
  let matricule_etud = $("#prenom :selected").val();
  let module_id = $("#module :selected").val();
  //input recuperation
  let note_1 = $("#note_1").val();
  let type_1 = $("#type_1 :selected").val();
  let coeff_1 = $("#coeff_1").val();
  let bonus_1 = $("#bonus_1").val();
  if (note_1 <= 20){
    let note_info1 = [matricule_etud, module_id, type_1, coeff_1, note_1, bonus_1];
    set_to_note = eel.setData(note_info1, 'note');
    
    $('#modal_note').modal('show');
    let confirm = `Note inserée <i class="fas fa-check fa-sm"></i>`;
    $('#note_insert').append(confirm);
    
  }
  else{
    $('#modal_error_note').modal('show');
    $('#modal_note').modal('hide');
  }
  
 }

/*  function add_note_2(){
  //selection recuperation
  let matricule_etud = $("#prenom :selected").val();
  let module_id = $("#module :selected").val();
  //input recuperation
  let note_2 = $("#note_2").val();
  let type_2 = $("#type_2 :selected").val();
  let coeff_2 = $("#coeff_2").val();
  let bonus_2 = $("#bonus_2").val();
  let note_info2 = [matricule_etud, module_id, type_2, coeff_2, note_2, bonus_2];
  set_to_note = eel.setData(note_info2, 'note');
  alert('Note 2 insérée');
 }
 */
/*  function add_note_3(){
  //selection recuperation
  let matricule_etud = $("#prenom :selected").val();
  let module_id = $("#module :selected").val();
  //input recuperation
  let note_3 = $("#note_3").val();
  let type_3 = $("#type_3 :selected").val();
  let coeff_3 = $("#coeff_3").val();
  let bonus_3 = $("#bonus_3").val();
  let note_info3 = [matricule_etud, module_id, type_3, coeff_3, note_3, bonus_3];
  set_to_note = eel.setData(note_info3, 'note');
  alert('Note 3 insérée');
 } */


//SUPPRESSION LIGNE LISTE ETUDIANT, PROF ET PERSONNEL_ADMINISTRATIF
function delete_student(data_recup){
  eel.delete_person('student_list',data_recup);
  location.reload();
}

function delete_prof(data_recup){
  eel.delete_person('prof_list',data_recup);
  location.reload();
}

function delete_perso_admin(data_recup){
  eel.delete_person('person_admin_list',data_recup);
  location.reload();
}


/* Ajouter autre note */
/* $(".add_notes").hide();
function add_new_note(){
  let i=0;
  $(".add_notes:hidden").each(function(){
    if (i==0){
      $(this).show();
    }
    i++;
  });
} */
/* Suppression note */
/* function remove_note() {
  let i=1;
  let line_note = $(".add_notes:visible");
  line_note.each(function() {
    if ((i) == line_note.length) {
      $(this).hide();
    } 
    i++;
  });
} */



let arg = window.location.search.substr(1);
if (arg == 'prof_list') eel.getData('prof')(printData_prof); //AFFICHAGE LISTE PROF
else if (arg == 'student_list') eel.getData('student')(printData_etud);//AFFICHAGE LISTE ETUD
else if (arg == 'perso_admin_list') eel.getData('admin_personnel')(printData_perso_admin); //AFFICHER LISTE PERSONNEL ADMINISTRATIF
else if (arg == 'module_got') eel.getData('module_created')(printData_module_created, archive_module); //AFFICHER LISTE DES MODULES CREEES
//else if (arg == 'prof_ensg') eel.getData('module_prof_name')(get_prof_name_on_module); //RECUPERER LE NOM DU PROF QUI ENSEIGNENT LE MODULE 

//AFFICHAGE PROF
function printData_prof(data_recupered) {
  $("#naissance").hide();
  $("#niveau").hide();
  $("#fonction").hide();
  $("#id_module").hide();
  $("#module_name").hide();
  $("#reference").hide();
  $("#semestre_module").hide();
  $("#prof_module").hide();
  $("#crdt_obtenu").hide();
  $("#archive").hide();
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
          <td>
              <!--<a class="edit" title="Editer" data-toggle="tooltip"><i class="fas fa-fw fa-edit"></i></a>-->
              <a class="see_profil" title="Voir Profil" onclick='print_profil_prof("${data_recupered[i][0]}")' data-toggle="tooltip"><i class="fas fa-fw fa-user-circle"></i></a>
              <a class="delete" title="Supprimer"  onclick='delete_prof("${data_recupered[i][0]}")' data-toggle="tooltip"><i class="fas fa-fw fa-trash"></i></a>
          </td>
      </tr>
          `
      $('#bdd_print').append(line);
  };
  let titre_left =  `LISTE DES PROFS INSCRITS`
  let grand_titre_left = `LISTE_PROF`
  let btn_exporte = `
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800" id="h1_liste"></h1>
          <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style="margin-top: -40px;" onclick="export_data_to_csv('prof')">
               <i class="fas fa-file-export fa-sm text-white-50"></i> Exporter en CSV
          </button>
      </div>
    `
  $('#h1_liste').append(titre_left);
  $('#titre_table').append(titre_left);
  $('#list_title').append(grand_titre_left);
  $('#btn_export').append(btn_exporte);
};


//AFFICHAGE LISTE ETUDIANT
function printData_etud(data_recupered) {
    $('#fonction').hide();
    $("#id_module").hide();
    $("#module_name").hide();
    $("#reference").hide();
    $("#semestre_module").hide();
    $("#prof_module").hide();
    $("#crdt_obtenu").hide();
    $("#archive").hide();

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
                
                <a class="see_profil" title="Voir Profil" onclick='print_profil_student("${data_recupered[i][0]}"); print_note()' title="Voir Profil" data-toggle="tooltip"><i class="fas fa-fw fa-user-circle"></i></a>
                <a class="edit" title="Supprimer" onclick='delete_student("${data_recupered[i][0]}")' data-toggle="tooltip"><i class="fas fa-fw fa-trash"></i></a>
            </td>
        </tr>
            `
        $('#bdd_print').append(line);
    };
    let titre_left =  `LISTE DES ETUDIANTS INSCRITS`
    let grand_titre_left = `LISTE_ETUDIANT`
    let btn_exporte = `
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800" id="h1_liste"></h1>
          <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style="margin-top: -40px;" onclick="export_data_to_csv('student')">
               <i class="fas fa-file-export fa-sm text-white-50"></i> Exporter en CSV
          </button>
      </div>
    `
    $('#h1_liste').append(titre_left);
    $('#titre_table').append(titre_left);
    $('#list_title').append(grand_titre_left);
    $('#btn_export').append(btn_exporte);
};

//AFFICHAGE LISTE PERSONNEL ADMINISTRATIF
function printData_perso_admin(data_recupered) {
  $("#naissance").hide();
  $("#niveau").hide();
  $("#id_module").hide();
  $("#module_name").hide();
  $("#reference").hide();
  $("#semestre_module").hide();
  $("#prof_module").hide();
  $("#crdt_obtenu").hide();
  $("#archive").hide();

  for (i=1; i<data_recupered.length; i++) {
    let line = `
            <tr>
            <td id="t_matricule">${data_recupered[i][0]}</td>
            <td id="t_nom">${data_recupered[i][1]}</td>
            <td id="t_prenom">${data_recupered[i][2]}</td>
            <td id="t_fonction">${data_recupered[i][3]}</td>
            <td id="annee_univ">${data_recupered[i][4]}</td>
            <td id="t_tel">${data_recupered[i][5]}</td>
            <td id="t_cin">${data_recupered[i][6]}</td>
            <td id="t_email">${data_recupered[i][7]}</td>
            <td id="t_addr">${data_recupered[i][8]}</td>
            <td id="t_sexe">${data_recupered[i][9]}</td>
            <td>
                <!--<a class="edit" title="Editer" data-toggle="tooltip"><i class="fas fa-fw fa-edit"></i></a>-->
                <a class="see_profil"  onclick='print_person_admin_profil("${data_recupered[i][0]}")' title="Voir Profil" data-toggle="tooltip"><i class="fas fa-fw fa-user-circle"></i></a>
                <a class="delete" title="Supprimer"  onclick='delete_perso_admin("${data_recupered[i][0]}")' data-toggle="tooltip"><i class="fas fa-fw fa-trash"></i></a>
            </td>
        </tr>
            `
        $('#bdd_print').append(line);
  };
  let titre_left =  `LES PERSONNELS ADMINISTRATIFS INSCRITS`
  let grand_titre_left = `PERSO_ADMIN`
  let btn_exporte = `
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800" id="h1_liste"></h1>
          <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style="margin-top: -40px;" onclick="export_data_to_csv('perso_admin')">
               <i class="fas fa-file-export fa-sm text-white-50"></i> Exporter en CSV
          </button>
      </div>
    `
  $('#h1_liste').append(titre_left);
  $('#titre_table').append(titre_left);
  $('#list_title').append(grand_titre_left);
  $('#btn_export').append(btn_exporte);

}

// AFFICHAGE LISTE MODULE CREEE
function printData_module_created(data_recupered) {
  $("#naissance").hide();
  $("#matricule").hide();
  $("#niveau").hide();
  $("#annee_univ").hide();
  $("#name").hide();
  $("#lastname").hide();
  $("#fonction").hide();
  $("#naissance").hide();
  $("#tel").hide();
  $("#email").hide();
  $("#cin").hide();
  $("#sexe").hide();
  $("#adresse").hide();

  $("#id_module").show();
  $("#module_name").show();
  $("#reference").show();
  $("#semestre_module").show();
  $("#prof_module").show();
  $("#crdt_obtenu").show();
  $("#archive").show();

  $("#prof_module").hide();
  
  for (i=0; i<data_recupered.length; i++) {
    let line = `
            <tr>
            <td id="t_id_module">${data_recupered[i][0]}</td>
            <td id="t_module_name">${data_recupered[i][1]}</td>
            <td id="t_reference">${data_recupered[i][2]}</td>
            <td id="t_semestre_module">${data_recupered[i][3]}</td>
            <!--<td id="t_prof_module">${data_recupered[i][5]}</td>-->
            <td id="t_crdt_obtenu">${data_recupered[i][4]}</td>
            <td id="t_archive">${data_recupered[i][5]}</td>
            <td>
                <!--<a class="edit" title="Editer" data-toggle="tooltip"><i class="fas fa-fw fa-edit"></i></a>-->
                <a class="see_profil"  onclick='archive_module("${data_recupered[i][0]}")' title="Archiver le module" data-toggle="tooltip"><i class="fas fa-fw fa-user-circle"></i></a>
            </td>
        </tr>
            `
        $('#bdd_print').append(line);
  };
  let titre_left =  `LISTE DES MODULES`
  let grand_titre_left = `MODULE`

  $('#h1_liste').append(titre_left);
  $('#titre_table').append(titre_left);
  $('#list_title').append(grand_titre_left);
  //get_prof_name_on_module();
}


function archive_module(id_module_recup){
  let module_id = id_module_recup[0];
  eel.update_archive_module(module_id);
  $("#archive_module").modal('show');
}

// UPDATE PROFIL IMAGE
function call_modal_update_pdp_student(){
  $("#modal_change_pdp").modal('show');
  document.getElementById('pdp_function_change').setAttribute('onclick', 'update_profil_image()');
}

function call_modal_update_pdp_prof(){
  $("#modal_change_pdp").modal('show');
  document.getElementById('pdp_function_change').setAttribute('onclick', 'update_profil_prof_image()');
}

function call_modal_update_pdp_admin(){
  $("#modal_change_pdp").modal('show');
  document.getElementById('pdp_function_change').setAttribute('onclick', 'update_profil_admin_image()');
}


function update_profil_image(pdp_new_path, matricule_student){
  let matricul_etud = $("#matricule_etud").text();
  let new_pdp = document.getElementById('pdp_new').files[0];
  if (new_pdp){
    let new_image = new_pdp.path;
    let data  = [new_image];
    eel.change_profil_student_image(data, matricul_etud);
    $("#btn_footer").hide();
    $("#img_pdp_new").html('Photo de Profil changée <i class="fas fa-check fa-sm"></i>')
  }else {
    new_image = "";
    data =[new_image];
    $("#img_pdp_new").html('<i class="fas fa-exclamation-triangle fa-sm" style="color: red;"></i> Veuillez vérifiez le fichier !')
    eel.change_profil_student_image(data, matricul_etud);
  }
 
}

function update_profil_prof_image(pdp_new_path, matricule_prof__){
  let matricule_prof = $("#val_matricule").text();
  let new_pdp = document.getElementById('pdp_new').files[0];
  if (new_pdp){
    let new_image = new_pdp.path;
    let data  = [new_image];
    eel.change_profile_prof_image(data, matricule_prof);
    $("#btn_footer_prof").hide();
    $("#img_pdp_new").html('Photo de Profil changée <i class="fas fa-check fa-sm"></i>')
  }else {
    new_image = "";
    data =[new_image];
    $("#img_pdp_new").html('<i class="fas fa-exclamation-triangle fa-sm" style="color: red;"></i> Veuillez vérifiez le fichier !')
    eel.change_profile_prof_image(data, matricule_prof);
  }
 
}

function update_profil_admin_image(pdp_new_path, admin_person_matricule){
  let matricule_admin__ = $("#matricule_person_admin").text();
  let new_pdp = document.getElementById('pdp_new').files[0];
  if (new_pdp){
    let new_image = new_pdp.path;
    let data  = [new_image];
    eel.change_profile_admin_image(data, matricule_admin__);
    $("#btn_footer_prof").hide();
    $("#img_pdp_new").html('Photo de Profil changée <i class="fas fa-check fa-sm"></i>')
  }else {
    new_image = "";
    data =[new_image];
    $("#img_pdp_new").html('<i class="fas fa-exclamation-triangle fa-sm" style="color: red;"></i> Veuillez vérifiez le fichier !')
    eel.change_profile_prof_image(data, matricule_admin__);
  }
 
}

/* eel.getData('module_prof_name')(get_prof_name_on_module);
function get_prof_name_on_module(data_recup){
  alert(data_recup);
  for(i=0; i < data_recup.length; i++){
    let line = `
    <tr>
      <td id="t_prof_module">${data_recup[i][0]}</td>
    </tr>
    `
    $('#bdd_print').append(line);
  }
} */



//AFFICHAGE PROFILES

        function print_profil_student(data){
          table_bdd = eel.getdata_profil('student_profil', data);
          document.location.href="../profil.html?student_profile";  
        }
        
        function print_profil_prof(data) {
          table_bdd = eel.getdata_profil('prof_profil', data);
          document.location.href="../profil.html?prof_profile";
        }

        function print_person_admin_profil(data) {
          table_bdd = eel.getdata_profil('admin_perso_profil', data);
          document.location.href="../profil.html?person_admin";
        }



/* Exporter les données en CSV */
function export_data_to_csv(val_bdd) {
  eel.export_data_csv(val_bdd)(export_data_csv_finished);
};

function export_data_csv_finished(file_link){
  $('#export_csv_f').html('Exportation liste terminée <i class="fas fa-check fa-sm"></i><br> CHEMIN : ' + '<strong>' + file_link + '</strong>');
  $('#modal_csv').modal('show');
}
