

$(".hideDiv").hide();

function showDiv_connect_admin() {
  $(".hideDiv:hidden").each(function(){
    $(this).show();
  });

  $(".hideEnsg").hide();
};


/* RECUPERATION DES VALEURS DES INPUTS */

function recup_info(){
  let nom = $("#nom").val();
  let prenom = $("#prenom").val();
  let date_nais = $("#date_nais").val();
  let addr = $("#addr").val();
  let sexe = $("input[name=genre]:checked").val();
  let tel = $("#tel").val();
  let cin = $("#cin").val();
  let data = [nom, prenom, date_nais, addr, sexe, tel, cin];
  x = eel.setData(data);
};
