
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
  location.reload();
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
  location.reload();
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
  location.reload();

}

//RECUPERATION MODULE
function recup_module(){
  let module_name = $("#module_name").val();
  let ref_module = $("#ref_module").val();
  let semestre_azo = $("#semestre").val();
  let semestre = semestre_azo.toUpperCase();
  let prof_matricule = $("#nom_prof_select :selected").val()
  let credit_btenu = $("#credit_obt").val()
  let data = [module_name, ref_module, semestre, prof_matricule, credit_btenu];
  set_data = eel.setData(data, 'module');
  alert('Module Enregistré');
  location.reload();
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

  let note_info1 = [matricule_etud, module_id, type_1, coeff_1, note_1, bonus_1];
  let set_to_note = eel.setData(note_info1, 'note');
  alert('Note 1 insérée');
 }

 function add_note_2(){
  //selection recuperation
  let matricule_etud = $("#prenom :selected").val();
  let module_id = $("#module :selected").val();
  //input recuperation
  let note_2 = $("#note_2").val();
  let type_2 = $("#type_2 :selected").val();
  let coeff_2 = $("#coeff_2").val();
  let bonus_2 = $("#bonus_2").val();

  let note_info2 = [matricule_etud, module_id, type_2, coeff_2, note_2, bonus_2];
  let set_to_note = eel.setData(note_info2, 'note');
  alert('Note 2 insérée');
 }

 function add_note_3(){
  //selection recuperation
  let matricule_etud = $("#prenom :selected").val();
  let module_id = $("#module :selected").val();
  //input recuperation
  let note_3 = $("#note_3").val();
  let type_3 = $("#type_3 :selected").val();
  let coeff_3 = $("#coeff_3").val();
  let bonus_3 = $("#bonus_3").val();

  let note_info3 = [matricule_etud, module_id, type_3, coeff_3, note_3, bonus_3];
  let set_to_note = eel.setData(note_info3, 'note');
  alert('Note 3 insérée');
 }

/* Exporter les données en CSV */
function export_data(val_bdd) {
  eel.export_data_csv(val_bdd);
  alert('Exportation terminée');
};


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
if (arg == 'prof_list') eel.getData('prof')(printData_prof); //AFFICHAGE LISTE PROF
else if (arg == 'student_list') eel.getData('student')(printData_etud);//AFFICHAGE LISTE ETUD
else if (arg == 'perso_admin_list') eel.getData('admin_personnel')(printData_perso_admin); //AFFICHER LISTE PERSONNEL ADMINISTRATIF

//AFFICHAGE PROF
function printData_prof(data_recupered) {
  $("#naissance").hide();
  $("#niveau").hide();
  $("#fonction").hide();
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
  let titre_left =  `LISTE DES PROFS INSCRITS`
  let grand_titre_left = `LISTE_PROF`
  let btn_exporte = `
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800" id="h1_liste"></h1>
          <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="export_data('prof')">
               <i class="fas fa-file-export fa-sm text-white-50"></i> Exporter en CSV
          </button>
      </div>
    `
  $('#h1_liste').append(titre_left);
  $('#list_title').append(grand_titre_left);
  $('#btn_export').append(btn_exporte);
};

//AFFICHAGE LISTE ETUDIANT
function printData_etud(data_recupered) {
    $('#module').hide();
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
                <a class="edit" title="Editer" data-toggle="tooltip"><i class="fas fa-fw fa-edit"></i></a>
                <a class="edit" type="button" onclick='print_profil_student("${data_recupered[i][0]}"); print_note()' title="Voir Profil" data-toggle="tooltip"><i class="fas fa-fw fa-user-circle"></i></a>
                <a class="edit" title="Supprimer" type="button" onclick='delete_student("${data_recupered[i][0]}")' data-toggle="tooltip"><i class="fas fa-fw fa-trash"></i></a>
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
          <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="export_data('student')">
               <i class="fas fa-file-export fa-sm text-white-50"></i> Exporter en CSV
          </button>
      </div>
    `
    $('#h1_liste').append(titre_left);
    $('#list_title').append(grand_titre_left);
    $('#btn_export').append(btn_exporte);
};

//AFFICHAGE LISTE PERSONNEL ADMINISTRATIF
function printData_perso_admin(data_recupered) {
  $("#naissance").hide();
  $("#niveau").hide();
  $("#module").hide();
  for (i=0; i<data_recupered.length; i++) {
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
                <a class="edit" title="Editer" data-toggle="tooltip"><i class="fas fa-fw fa-edit"></i></a>
                <a class="edit" type="button" onclick='print_person_admin_profil("${data_recupered[i][0]}")' title="Voir Profil" data-toggle="tooltip"><i class="fas fa-fw fa-user-circle"></i></a>
                <a class="edit" title="Supprimer" type="button" onclick='delete_perso_admin("${data_recupered[i][0]}")' data-toggle="tooltip"><i class="fas fa-fw fa-trash"></i></a>
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
          <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="export_data('perso_admin')">
               <i class="fas fa-file-export fa-sm text-white-50"></i> Exporter en CSV
          </button>
      </div>
    `
  $('#h1_liste').append(titre_left);
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
                        <span class="font-weight-bold text-primary" id="nom">N° MATRICULE : </span>
                        <span>${data_profil_student[i][1]}</span><br>

                        <span class="font-weight-bold text-primary" id="matricule">NOM:</span>
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

                        <span class="font-weight-bold text-primary">ADRESSE ACTUEL: </span>
                        <span>${data_profil_student[i][10]}</span><br>

                        <span class="font-weight-bold text-primary">NIVEAU: </span>
                        <span>${data_profil_student[i][11]}</span>
                    </div>
                </div>
                `
                $('#info').append(print_profil);
            };
                let title_profil = `PROFIL ETUDIANT`
                let title_left = `PROFIL_ETUDIANT`
                $('#title_profil_var').append(title_profil);  
                $('#side_title').append(title_left);   

                                                            
          }
        
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

        function print_prof_profil(data_profil_prof){
            $(".notes").hide();
            for (i=0; i < data_profil_prof.length; i++) {
                let print_profil = `
                
                    <div class="card-body card_profil">
                        <span class="font-weight-bold text-primary" id="nom">N° MATRICULE : </span>
                        <span>${data_profil_prof[i][1]}</span><br>

                        <span class="font-weight-bold text-primary" id="matricule">NOM:</span>
                        <span>${data_profil_prof[i][3]}</span><br>

                        <span class="font-weight-bold text-primary" id="tel">PRENOM:</span>
                        <span>${data_profil_prof[i][4]}</span><br>

                        <span class="font-weight-bold text-primary" id="email">TEL:</span>
                        <span>${data_profil_prof[i][5]}</span><br>

                        <span class="font-weight-bold text-primary" id="niveau">EMAIL: </span>
                        <span>${data_profil_prof[i][6]}</span><br>

                        <span class="font-weight-bold text-primary" id="date_naiss">CIN: </span>
                        <span>${data_profil_prof[i][7]}</span><br>

                        <span class="font-weight-bold text-primary" id="cin">ADRESSE ACTUEL: </span>
                        <span>${data_profil_prof[i][9]}</span><br>

                        <span class="font-weight-bold text-primary">MODULE: </span>
                        <span>${data_profil_prof[i][10]}</span><br>

                        
                    </div>
                </div>
                `
                $('#info').append(print_profil);
                }; 
                
                let title_profil = `PROFIL PROFESSEUR`
                let title_left = `PROFIL_PROF`
                $('#title_profil_var').append(title_profil);
                $('#side_title').append(title_left);
        }

        function print_admin_profil(data_profil_admin) {
          $(".notes").hide();
            for (i=0; i < data_profil_admin.length; i++) {
                let print_profil = `
                
                    <div class="card-body card_profil">
                        <span class="font-weight-bold text-primary" id="nom">N° MATRICULE : </span>
                        <span>${data_profil_admin[i][0]}</span><br>

                        <span class="font-weight-bold text-primary" id="matricule">NOM:</span>
                        <span>${data_profil_admin[i][1]}</span><br>

                        <span class="font-weight-bold text-primary" id="tel">PRENOM:</span>
                        <span>${data_profil_admin[i][2]}</span><br>

                        <span class="font-weight-bold text-primary" id="email">FONCTION:</span>
                        <span>${data_profil_admin[i][3]}</span><br>

                        <span class="font-weight-bold text-primary" id="niveau">TEL: </span>
                        <span>${data_profil_admin[i][5]}</span><br>

                        <span class="font-weight-bold text-primary" id="date_naiss">CIN: </span>
                        <span>${data_profil_admin[i][6]}</span><br>

                        <span class="font-weight-bold text-primary" id="cin">EMAIL: </span>
                        <span>${data_profil_admin[i][7]}</span><br>

                        <span class="font-weight-bold text-primary">ADRESSE ACTUEL: </span>
                        <span>${data_profil_admin[i][8]}</span><br>

                        
                    </div>
                </div>
                `
                $('#info').append(print_profil);
                }; 
                let title_profil = `PROFIL PERSONNEL ADMINISTRATIF`
                let title_left = `PROFIL_ADMIN`
                $('#title_profil_var').append(title_profil);
                $('#side_title').append(title_left);

        }