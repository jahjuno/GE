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
  let niveau = $("#niveau :selected").text();
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

//AFFICHAGE PROF
function printData_prof(data_recupered) {
  $("#naissance").hide();
  $("#niveau").hide();
  $("#fonction").hide();
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



//AFFICHAGE PROFILE ETUDIANT

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



        let arg_print_profile = window.location.search.substr(1);
        if (arg_print_profile =='student_profile') eel.new_data_profil()(print_student_profil);
        else if (arg_print_profile == 'prof_profile')  eel.new_data_profil()(print_prof_profil);
        else if (arg_print_profile == 'person_admin') eel.new_data_profil()(print_admin_profil);
        
        function print_student_profil(data_profil_student){
            for (i=0; i < data_profil_student.length; i++) 
            {
                let print_profil = `
                
                    <div class="card-body card_profil">
                        <span class="font-weight-bold text-primary" >N° MATRICULE : </span>
                        <span id="matricule_etud">${data_profil_student[i][1]}</span><br>

                        <span class="font-weight-bold text-primary" id="nom">NOM:</span>
                        <span>${data_profil_student[i][3]}</span><br>

                        <span class="font-weight-bold text-primary" id="tel">PRENOM:</span>
                        <span>${data_profil_student[i][4]}</span><br>

                        <span class="font-weight-bold text-primary" id="email">DATE DE NAISSANCE:</span>
                        <span>${data_profil_student[i][5]}</span><br>

                        <span class="font-weight-bold text-primary" id="niveau">TEL: </span>
                        <span>${data_profil_student[i][6]}</span><br>

                        <span class="font-weight-bold text-primary" id="date_naiss">EMAIL: </span>
                        <span>${data_profil_student[i][7]}</span><br>

                        <span class="font-weight-bold text-primary" id="cin">CIN: </span>
                        <span>${data_profil_student[i][8]}</span><br>

                        <span class="font-weight-bold text-primary">ADRESSE ACTUELLE: </span>
                        <span>${data_profil_student[i][10]}</span><br>

                        <span class="font-weight-bold text-primary">NIVEAU: </span>
                        <span>${data_profil_student[i][11]}</span>
                    </div>
                </div>
                `
                let profil_image = `
                <img class="avatar" src="dist/img/pdp/${data_profil_student[i][12]}" style="width: 150%; height: 85%;">
                `
                $('#profil_pdp_').append(profil_image);
                $('#info').append(print_profil);
                
            };
                let button_export = `
                <div class="mb-4 col-6" style="margin-top : -22px !important; margin-left : 280px !important;">
                  <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="export_pdf_student()">
                    <i class="fas fa-file-export fa-sm text-white-50"></i> Exporter en pdf
                  </button>
                </div>
                `
                let title_profil = `PROFIL ETUDIANT`
                let title_left = `PROFIL_ETUDIANT`
                
                $('#card_ohter_info').append(button_export);
                $('#title_profil_var').append(title_profil);  
                $('#side_title').append(title_left);
                   
                eel.get_note()(print_note);
                function print_note(data_note){
                  for(i=0; i<data_note.length; i++){
                    let resultat = `
                    <tr>
                      <td>${data_note[i][0]}</td>
                      <td>${data_note[i][1]}</td>
                      <td>${data_note[i][2]}</td>
                      <td>${data_note[i][3]}</td>
                    </tr>
                    ` 
                    $('#note_info').append(resultat);
                  }
                }
                                                            
          }
        
      

        function print_prof_profil(data_profil_prof){
            $(".notes").hide();
            $("#special_etud").hide();
            for (i=0; i < data_profil_prof.length; i++) {
                let print_profil = `
                
                    <div class="card-body card_profil">
                        <span class="font-weight-bold text-primary" id="matricule">N° MATRICULE : </span>
                        <span id="val_matricule">${data_profil_prof[i][1]}</span><br>

                        <span class="font-weight-bold text-primary" id="nom">NOM:</span>
                        <span>${data_profil_prof[i][3]}</span><br>

                        <span class="font-weight-bold text-primary" id="tel">PRENOM:</span>
                        <span>${data_profil_prof[i][4]}</span><br>

                        <span class="font-weight-bold text-primary" id="email">TEL:</span>
                        <span>${data_profil_prof[i][5]}</span><br>

                        <span class="font-weight-bold text-primary" id="niveau">EMAIL: </span>
                        <span>${data_profil_prof[i][6]}</span><br>

                        <span class="font-weight-bold text-primary" id="date_naiss">CIN: </span>
                        <span>${data_profil_prof[i][7]}</span><br>

                        <span class="font-weight-bold text-primary" id="cin">ADRESSE ACTUELLE: </span>
                        <span>${data_profil_prof[i][9]}</span><br>
                    </div>
                </div>
                `
                let profil_image = `
                <img class="avatar" src="dist/img/pdp/${data_profil_prof[i][11]}" style="width: 150%; height: 85%;">
                `
             
                $('#profil_pdp_').append(profil_image);
                $('#info').append(print_profil);
                }; 
                let button_export = `
                <div class="mb-4 col-6" style="margin-top : -22px !important; margin-left : 280px !important;">
                  <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="export_pdf_prof()">
                    <i class="fas fa-file-export fa-sm text-white-50"></i> Exporter en pdf
                  </button>
                </div>
                `
                let title_profil = `PROFIL PROFESSEUR`
                let title_left = `PROFIL_PROF`
                $('#card_ohter_info').append(button_export);
                $('#title_profil_var').append(title_profil);
                $('#side_title').append(title_left);
        }

        function print_admin_profil(data_profil_admin) {
          $(".notes").hide();
          $("#special_etud").hide();
            for (i=0; i < data_profil_admin.length; i++) {
                let print_profil = `
                
                    <div class="card-body card_profil">
                        <span class="font-weight-bold text-primary" id="matricule">N° MATRICULE : </span>
                        <span id="matricule_person_admin">${data_profil_admin[i][1]}</span><br>

                        <span class="font-weight-bold text-primary" id="nom">NOM:</span>
                        <span>${data_profil_admin[i][2]}</span><br>

                        <span class="font-weight-bold text-primary" id="tel">PRENOM:</span>
                        <span>${data_profil_admin[i][3]}</span><br>

                        <span class="font-weight-bold text-primary" id="email">FONCTION:</span>
                        <span>${data_profil_admin[i][4]}</span><br>

                        <span class="font-weight-bold text-primary" id="niveau">TEL: </span>
                        <span>${data_profil_admin[i][6]}</span><br>

                        <span class="font-weight-bold text-primary" id="date_naiss">CIN: </span>
                        <span>${data_profil_admin[i][7]}</span><br>

                        <span class="font-weight-bold text-primary" id="cin">EMAIL: </span>
                        <span>${data_profil_admin[i][8]}</span><br>

                        <span class="font-weight-bold text-primary">ADRESSE ACTUELLE: </span>
                        <span>${data_profil_admin[i][9]}</span><br>

                        
                    </div>
                </div>
                `
                let profil_image = `
                <img class="avatar" src="dist/img/pdp/${data_profil_admin[i][12]}" style="width: 150%; height: 85%;">
                `
                $('#profil_pdp_').append(profil_image);
                $('#info').append(print_profil);
                }; 
                let button_export = `
                <div class="mb-4 col-6" style="margin-top : -22px !important; margin-left : 280px !important;">
                  <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="export_pdf_perso_admin()">
                    <i class="fas fa-file-export fa-sm text-white-50"></i> Exporter en pdf
                  </button>
                </div>
                `
                let title_profil = `PROFIL PERSONNEL ADMINISTRATIF`
                let title_left = `PROFIL_ADMIN`
                $('#title_profil_var').append(title_profil);
                $('#card_ohter_info').append(button_export);
                $('#side_title').append(title_left);

        }



//EXPORTATION DES PROFILS EN PDF
function export_pdf_prof(){
  $('#close_modal').hide();
  $('#modal_chargement').modal({backdrop: 'static', keyboard: false}); //other event disabled
  let got_matricule = $('#val_matricule').text();
  eel.pdf_profil_prof(got_matricule)(exported_pdf_finished);
}

function exported_pdf_finished(lien_file){
  $('#close_modal').show();
  document.getElementById('body_modal').setAttribute('style', 'bottom: 0; left: 0; right: 0;');
  //document.getElementById('exampleModalLabel').setAttribute('style', 'margin-left: 150px !important;');
  $('#body_modal').html('Exportation profil terminée <i class="fas fa-check fa-sm"></i><br> CHEMIN : ' + '<strong>' + lien_file + '</strong>');
  $('#modal_chargement').modal('show');
}

function export_pdf_student(){
  $('#close_modal').hide();
  $('#modal_chargement').modal({backdrop: 'static', keyboard: false}); //other event disabled
  let got_matricule = $('#matricule_etud').text();
  eel.pdf_profil_student(got_matricule)(exported_pdf_finished);
}

function export_pdf_perso_admin(){
  $('#close_modal').hide();
  $('#modal_chargement').modal({backdrop: 'static', keyboard: false}); //other event disabled
  let got_matricule = $('#matricule_person_admin').text();
  eel.pdf_profil_person_admin(got_matricule)(exported_pdf_finished);
}

/* Exporter les données en CSV */
function export_data_to_csv(val_bdd) {
  eel.export_data_csv(val_bdd)(export_data_csv_finished);
};

function export_data_csv_finished(file_link){
  $('#export_csv_f').html('Exportation liste terminée <i class="fas fa-check fa-sm"></i><br> CHEMIN : ' + '<strong>' + file_link + '</strong>');
  $('#modal_csv').modal('show');
}
