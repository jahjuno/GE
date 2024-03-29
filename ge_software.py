import eel, csv, time
import sqlite3, os
import hashlib
from shutil import copyfile, copy
from os import environ
from psutil import net_connections
from docxtpl import DocxTemplate, RichText
from docx2pdf import convert
from tempfile import gettempdir

eel.init('src')

data = []
storage_get_profil_data=None
#resultat_note=None

#CREATE DE LA BASE DE DONNEE
def createBDD():
	try : 
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		
		t_admin = cur.execute(''' 
		CREATE TABLE IF NOT EXISTS PERSONNEL_ADMINISTRATIF (
			id_admin						INTEGER		NOT 	NULL	PRIMARY KEY AUTOINCREMENT,
			matricule_perso_admin	TEXT			NOT 	NULL 	UNIQUE,
			nom							TEXT			NOT 	NULL,
			prenom						TEXT 			NOT 	NULL,
			fonction 					TEXT 			NOT 	NULL,
			annee_univ					TEXT 			NOT 	NULL,
			tel							TEXT			NOT 	NULL,
			cin							INTEGER 		NOT 	NULL,
			email							TEXT			NOT 	NULL,
			adresse						TEXT			NOT	NULL,
			mdp							TEXT						 ,
			sexe							TEXT			NOT	NULL,
			pdp_name						TEXT			NULL
		)
		''')


		t_ensg = cur.execute('''
		CREATE TABLE IF NOT EXISTS ENSEIGNANT (
			id_prof				INTEGER	NOT NULL	PRIMARY KEY AUTOINCREMENT,
			matricule_ensg		TEXT		NOT NULL	UNIQUE,
			annee_univ			TEXT		NOT NULL,
			nom					TEXT		NOT NULL,
			prenom				TEXT		NOT NULL,
			tel					TEXT		NOT NULL,
			email					TEXT		NOT NULL,
			cin					INTEGER	NOT NULL,
			sexe					TEXT		NOT NULL,
			adresse				TEXT		NOT NULL,
			mdp					TEXT		NOT NULL,
			pdp_name				TEXT		NULL
			);
		''')

		t_etudiant = cur.execute('''
		CREATE TABLE IF NOT EXISTS ETUDIANT(
			id_etud					INTEGER	NOT NULL	PRIMARY KEY AUTOINCREMENT,
			matricule_etud			TEXT	NOT NULL UNIQUE,
			annee_univ				TEXT	NOT NULL,
			nom						TEXT	NOT NULL,
			prenom					TEXT	NOT NULL,
			date_naissance			TEXT	NOT NULL,
			tel						TEXT	NOT NULL,
			email						TEXT	NOT NULL,
			cin						INTEGER	NOT NULL,
			sexe						TEXT	NOT NULL,
			adresse					TEXT	NOT NULL,
			niveau					TEXT	NOT NULL,
			pdp_name					TEXT	NULL
		)
		''')

		t_module = cur.execute('''
		CREATE TABLE IF NOT EXISTS MODULE (
			id_module			INTEGER		NOT NULL	PRIMARY KEY		AUTOINCREMENT,
			nom					TEXT			NOT NULL,
			reference			TEXT			NOT NULL,
			semestre 			TEXT 			NOT NULL,
			matricule_ensg		TEXT			NOT NULL,
			credit_obtenu		INTEGER		NOT NULL,
			archive				INTEGER		NOT NULL 	DEFAULT 0,	
			CONSTRAINT	module_ensg_fk	FOREIGN KEY	(matricule_ensg)	REFERENCES	ENSEIGNANT(matricule_ensg)
		)
		''')

		t_note = cur.execute('''
		CREATE TABLE IF NOT EXISTS NOTE (
			id_note				INTEGER		NOT NULL PRIMARY KEY AUTOINCREMENT,
			matricule_etud		TEXT			NOT NULL,
			id_module			INTEGER		NOT NULL,
			TYPE					TEXT			NOT NULL,
			coeff					INTEGER		NOT NULL,
			note					FLOAT			NOT NULL,
			bonus					REAL			NOT NULL		DEFAULT 0,
			CONSTRAINT note_etud_fk	FOREIGN	KEY (matricule_etud)	REFERENCES	ETUDIANT(matricule_etud),
			CONSTRAINT	note_module_fk	FOREIGN KEY	(id_module) REFERENCES MODULE(id_module)
		)
		''')


		t_etudier = cur.execute('''
		CREATE TABLE IF NOT EXISTS ETUDIER (
			matricule_etud	TEXT		NOT NULL,
			id_module		INTEGER	NOT NULL,
			CONSTRAINT	etudier_pk	PRIMARY KEY (matricule_etud, id_module),
			CONSTRAINT	etudier_fk	FOREIGN KEY (matricule_etud)	REFERENCES ETUDIANT(matricule_etud),
			CONSTRAINT	etudier_module_fk	FOREIGN KEY (id_module)	REFERENCES MODULE(id_module)
		)
		
		''')

		connect_to_bdd.commit()
		cur.close()
		connect_to_bdd.close()
	except sqlite3.Error as error: 
		print(error)		
createBDD()


#INSERTION COMPTE ADMIN
def insert_admin_account():
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	add_admin_account = cur.execute('''
	INSERT OR IGNORE INTO PERSONNEL_ADMINISTRATIF (matricule_perso_admin, nom, prenom, fonction, annee_univ, tel, cin, email, adresse, mdp, sexe, pdp_name) 
	VALUES ('001_ADMIN', 'ADMIN', 'Admin', 'Administrateur', '2021','+261342404256', 1, 'admin', 'ambatoroka','d033e22ae348aeb5660fc2140aec35850c4da997', 'sexe', 'avatar_admin.jpg')
	''')
	connect_to_bdd.commit()
	connect_to_bdd.close()
insert_admin_account()


#INSERTION DES DONNEES
@eel.expose
def setData(d, e):
	global data
	data = d

	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	if e == 'etud':
		save_pdp = "pdp_" + str(time.time()) + '.jpg'
		if d[11] == '':
			d[11] = "\\face0.png"
		else:
			copyfile(d[11], "src\\dist\\img\\pdp\\"+ save_pdp)
			d[11] = save_pdp
		donnee_etudiant = ''' 
		INSERT INTO ETUDIANT(matricule_etud, annee_univ, nom, prenom, date_naissance, email, adresse, sexe, tel, cin, niveau, pdp_name)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		'''		
		cur.execute(donnee_etudiant, d)
	elif e == 'perso_admin':
		if d[10] == '':
			d[10] = "\\face0.png"
		else:
			save_pdp = "pdp_" + str(time.time()) + '.jpg'
			copyfile(d[10], "src\\dist\\img\\pdp\\"+ save_pdp)
			d[10] = save_pdp
		donnee_perso_admin = '''
		INSERT INTO PERSONNEL_ADMINISTRATIF(matricule_perso_admin, nom, prenom, fonction, annee_univ, tel, cin, email, adresse, sexe, pdp_name)
		VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		'''
		cur.execute(donnee_perso_admin, d)

	elif e == 'module':
		donnee_module = '''
		INSERT INTO MODULE(nom, reference, semestre, matricule_ensg, credit_obtenu)
		VALUES(?, ?, ?, ?, ?)
		'''
		cur.execute(donnee_module, d)
	elif e == 'note':
		donnee_note = ''' 
		INSERT INTO NOTE(matricule_etud, id_module, type, coeff, note, bonus)
		VALUES(?, ?, ?, ?, ?, ?)
		'''
		cur.execute(donnee_note, d)
			
	elif e == 'ensg' :
		d[9] = hashlib.sha1(d[9].encode()).hexdigest()
		save_pdp = "pdp_" + str(time.time()) + '.jpg'
		if d[10] == '':
			d[10] = "\\face0.png"
		else:
			copyfile(d[10], "src\\dist\\img\\pdp\\"+ save_pdp)
			d[10] = save_pdp
		donnee_enseignant = ''' 
		INSERT INTO ENSEIGNANT(matricule_ensg, annee_univ, nom, prenom, email, adresse, sexe, tel, cin, mdp, pdp_name)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		'''
		cur.execute(donnee_enseignant, d)

	connect_to_bdd.commit()
	cur.close()
	connect_to_bdd.close()


#EXPORTATION DONNEES EN CSV 
@eel.expose
def export_data_csv(val_bdd):

	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	if 	val_bdd == 'student' :
		cur.execute('''SELECT matricule_etud AS MATRICULE, annee_univ AS ANNEE_UNIVERSITAIRE, nom AS NOM, prenom AS PRENOM,
		 date_naissance DATE_DE_NAISSANCE, tel AS TELEPHONE, email AS EMAIL, cin AS CIN, sexe AS SEXE, adresse AS ADRESSE_ACTUEL, niveau AS NIVEAU
			FROM ETUDIANT''')
	#Exporting data into CSV file
		dirpath = os.environ.get('USERPROFILE') + "\\Desktop\\"
		with open(dirpath + "liste_etudiant.csv", "w") as csv_file :
			csv_writer = csv.writer(csv_file, delimiter = ";")
			csv_writer.writerow([i[0] for i in cur.description])
			csv_writer.writerows(cur)
		name_file_export = dirpath + "liste_etudiant.csv"
		return name_file_export
			
	elif val_bdd == 'prof' :
		cur.execute('''SELECT matricule_ensg AS MATRICULE, annee_univ AS ANNEE_UNIVERSITAIRE, nom AS NOM, prenom AS PRENOM, tel AS TELEPHONE,
			email AS EMAIL, cin AS CIN, sexe AS SEXE, adresse AS ADRESSE_ACTUELLE
		FROM ENSEIGNANT''')
		#Exporting data into CSV file
		dirpath = os.environ.get('USERPROFILE') + "\\Desktop\\"
		with open(dirpath + "liste_prof.csv", "w") as csv_file :
			csv_writer = csv.writer(csv_file, delimiter = ";")
			csv_writer.writerow([i[0] for i in cur.description])
			csv_writer.writerows(cur)
		name_file_export = dirpath + "liste_prof.csv"
		return name_file_export

	elif val_bdd == 'perso_admin' :
		cur.execute(''' SELECT matricule_perso_admin AS MATRICULE, nom AS NOM, prenom AS PRENOM, fonction AS FONCTION, annee_univ AS ANNEE_UNIVERSITAIRE,
		tel AS TELEPHONE, cin AS CIN, adresse AS ADRESSE_ACTUEL FROM PERSONNEL_ADMINISTRATIF ''')
		#Exporting data into CSV file
		dirpath = os.environ.get('USERPROFILE') + "\\Desktop\\"
		with open(dirpath + "liste_personnel_administratif.csv", "w") as csv_file :
			csv_writer = csv.writer(csv_file, delimiter =";")
			csv_writer.writerow([i[0] for i in cur.description])
			csv_writer.writerows(cur)
		name_file_export = dirpath + "liste_personnel_administratif.csv"
		return name_file_export
			


#AFFICHER LES DONNEES DANS LES TABLEAUX
@eel.expose
def getData(val_bdd):
	try :
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		if val_bdd == 'student':
			get_data = '''
			SELECT matricule_etud, annee_univ, nom, prenom, date_naissance, tel, email, cin, sexe, adresse, niveau 
			FROM ETUDIANT
			'''
		elif val_bdd == 'prof':
			get_data = '''
			SELECT matricule_ensg, annee_univ, nom, prenom, tel, email, cin, sexe, adresse
			FROM ENSEIGNANT
			'''
		elif val_bdd == 'admin_personnel':
			get_data = '''
			SELECT matricule_perso_admin, annee_univ, nom, prenom, fonction,  tel, email,  cin, sexe, adresse
			FROM PERSONNEL_ADMINISTRATIF
			'''
		elif val_bdd == 'module_created':
			get_data = ''' 
			SELECT id_module, nom, reference, semestre, credit_obtenu, archive  
			FROM MODULE
			'''
		elif val_bdd == 'module_prof_name':
			get_data = ''' 
			SELECT E.nom AS NOM_PROF, E.prenom AS PRENOM_PROF
			FROM MODULE M
			JOIN ENSEIGNANT E ON E.matricule_ensg=M.matricule_ensg
			'''

		cur.execute(get_data)
		return cur.fetchall()

	except sqlite3.Error as error: 
		print(error)

#AFFICHER PROFIL
@eel.expose
def new_data_profil():
	return storage_get_profil_data

@eel.expose
def getdata_profil(type_profil, profil_data):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	if type_profil == 'student_profil':
		search_profil = cur.execute('''
		SELECT * FROM etudiant WHERE matricule_etud=?;
		''', (profil_data,))
		global storage_get_profil_data
		storage_get_profil_data=cur.fetchall()
		
	elif type_profil ==  'prof_profil':
		search_profil = cur.execute('''
		SELECT * FROM enseignant WHERE matricule_ensg=?
		''', (profil_data,))
		storage_get_profil_data=cur.fetchall()
		
	elif type_profil == 'admin_perso_profil':
		search_profil = cur.execute('''
		SELECT * FROM personnel_administratif WHERE matricule_perso_admin=?
		''', (profil_data,))
		storage_get_profil_data = cur.fetchall()

#UPDATE VALUE ARCHIVE OF MODULE
@eel.expose
def update_archive_module(archived):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	update_requete = cur.execute(''' UPDATE MODULE SET archive=1 WHERE id_module=? ''', (archived,))
	connect_to_bdd.commit()
	
#UPDATE PDP PROF, ETUDIANT, PERSONNEL ADMINISTRATIF
@eel.expose
def change_profil_student_image(new_pdp, matricule_etud_got):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	save_pdp = "pdp_" + str(time.time()) + '.jpg'
	if matricule_etud_got:
		if new_pdp[0] == '':
			new_pdp[0] = "\\face0.png"
		else:
			copyfile(new_pdp[0], "src\\dist\\img\\pdp\\"+ save_pdp)
			new_pdp[0] = save_pdp
			cur.execute(''' 
			UPDATE ETUDIANT SET pdp_name=? WHERE  matricule_etud=?
			''', (save_pdp, matricule_etud_got,))
			connect_to_bdd.commit()
	type_profil = 'student_profil'
	getdata_profil(type_profil,matricule_etud_got)

@eel.expose
def change_profile_prof_image(new_pdp, matricule_prof_got):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	save_pdp = "pdp_" + str(time.time()) + '.jpg'
	if matricule_prof_got:
		if new_pdp[0] == '':
			new_pdp[0] = "\\face0.png"
		else:
			copyfile(new_pdp[0], "src\\dist\\img\\pdp\\"+ save_pdp)
			new_pdp[0] = save_pdp
			cur.execute(''' 
			UPDATE ENSEIGNANT SET pdp_name=? WHERE  matricule_ensg=?
			''', (save_pdp, matricule_prof_got,))
			connect_to_bdd.commit()
	type_profil = 'prof_profil'
	getdata_profil(type_profil,matricule_prof_got)

@eel.expose
def change_profile_admin_image(new_pdp, matricule_admin_got):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	save_pdp = "pdp_" + str(time.time()) + '.jpg'
	if matricule_admin_got:
		if new_pdp[0] == '':
			new_pdp[0] = "\\face0.png"
		else:
			copyfile(new_pdp[0], "src\\dist\\img\\pdp\\"+ save_pdp)
			new_pdp[0] = save_pdp
			cur.execute(''' 
			UPDATE PERSONNEL_ADMINISTRATIF SET pdp_name=? WHERE  matricule_perso_admin=?
			''', (save_pdp, matricule_admin_got,))
			connect_to_bdd.commit()
	type_profil = 'admin_perso_profil'
	getdata_profil(type_profil,matricule_admin_got)
	

#afficher les notes
@eel.expose
def get_note():
	if not storage_get_profil_data:
		return []
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	requete = cur.execute(''' 
		SELECT M.nom, N.note, N.coeff, N.bonus
		FROM MODULE M
		INNER JOIN NOTE N ON N.id_module=M.id_module
		INNER JOIN ETUDIANT E ON E.matricule_etud=N.matricule_etud
		WHERE E.matricule_etud=?
	''', (storage_get_profil_data[0][1],))
	resu = cur.fetchall()
	return resu

#SUPPRESSION LIGNE DANS LA LISTE_ETUD, LISTE_PROF et LISTE PERSONNNEL ADMINISTRATIF
@eel.expose
def delete_person(type_person, data_perso) :
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	if type_person == 'student_list' :
		delete_data= cur.execute('''
		DELETE FROM etudiant WHERE matricule_etud=?
		''', (data_perso,))
		connect_to_bdd.commit()
	elif type_person == 'prof_list':
		delete_data= cur.execute('''
		DELETE FROM enseignant WHERE matricule_ensg=?
		''', (data_perso,))
		connect_to_bdd.commit()
	else:
		delete_data = cur.execute(''' 
		DELETE FROM PERSONNEL_ADMINISTRATIF WHERE matricule_perso_admin=?
		''', (data_perso,))
		connect_to_bdd.commit()

#AFFICHAGE SEULEMENT LES ETUDIANTS DANS LES NIVEAUX SELECTIONNEES

@eel.expose
def get_name_student(data):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_selected_niveau_name = cur.execute(''' 
	SELECT prenom, matricule_etud FROM ETUDIANT WHERE niveau = ?
	''', (data,))
	resu = cur.fetchall()
	return resu

#AFFICHAGE SEULEMENT LES MODULES DANS LE SEMESTRE SELECTIONNE
@eel.expose
def get_selected_module(data):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_selected_module_semestre = cur.execute('''
	SELECT nom, id_module FROM MODULE
	WHERE semestre = ?
	''', (data,))
	resu = cur.fetchall()
	return resu
	



#AFFICHER TOUS LES NIVEAUX DANS la selection espace_prof
@eel.expose
def get_niveau(data) :
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_niveau_study = cur.execute('''
	SELECT DISTINCT niveau FROM etudiant ORDER BY niveau
	''')
	return cur.fetchall()

#CALCUL MOYENNE
@eel.expose
def moyenne_calcul(moyenne):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	calcule = cur.execute(''' 
		SELECT (SUM(NOTE * coeff) / SUM(coeff)) 
		FROM NOTE 
		WHERE matricule_etud=?
	''', (moyenne,))
	resu = cur.fetchone()
	return resu


#AFFICHER TOUS LES PRENOMS des etudiants dans la selection espace_prof
@eel.expose
def get_lastname(data):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_lastname_student = cur.execute('''
	SELECT prenom, matricule_etud FROM etudiant
	''')
	return cur.fetchall()

#AFFICHER TOUS LES MODULES dans la selection enseignant
@eel.expose
def get_module(module_got):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_module_ensg = cur.execute ('''
	SELECT nom, id_module FROM module WHERE archive=0
	''')
	return cur.fetchall()

#AFFICHER TOUS LES SEMESTRE dans la selection 
@eel.expose
def get_semestre(semestre_got):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_semestre = cur.execute('''
	SELECT DISTINCT semestre FROM module ORDER BY semestre
	''')
	return cur.fetchall()

#AFFICHER LISTE PROF DANS LA CREATION MODULE
@eel.expose
def get_prof(prof_got):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_prof_list = cur.execute(''' 
	SELECT nom, prenom, matricule_ensg FROM enseignant
	''')
	return cur.fetchall()


#CONNECTION EN TANT ADMIN
@eel.expose
def connect_admin(usr, mdp) :
	mdp = hashlib.sha1(mdp.encode()).hexdigest()
	try :
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		recup_mdp = cur.execute('''
		SELECT 1 FROM PERSONNEL_ADMINISTRATIF WHERE email=? AND mdp=?
		''', (usr, mdp))
		if len(cur.fetchall()) == 1:
			return True
		else:
			return 'Authentification échouée'

	except sqlite3.Error as e : 
		print(e)



#CONNECTION EN TANT QU'ENSEIGNANT
@eel.expose
def connect_ensg(usr, mdp):
	mdp = hashlib.sha1(mdp.encode()).hexdigest()
	try:
		connect_to_bdd = sqlite3.connect("donnee.db")
		cur = connect_to_bdd.cursor()
		recup_mdp_prof = cur.execute('''
		SELECT 1 FROM ENSEIGNANT WHERE email=? AND mdp=?
		''', (usr, mdp))
		if len(cur.fetchall()) == 1:
			return True
		else:
			return 'Authentification échouée'
		
		
	except sqlite3.Error as e:
		print(e)

#EXPORTATION EN PDF DU PROFIL
@eel.expose
#profil_etudiant
def pdf_profil_student(data):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_profil_student = cur.execute(''' 
	SELECT matricule_etud, nom, prenom, date_naissance, tel, email, cin, adresse, niveau, pdp_name FROM ETUDIANT
	WHERE matricule_etud=?
	''', (data,))
	resu = get_profil_student.fetchall()
	info = {
		'num_matricule' : RichText(resu[0][0], font='Arial', bold=False, size=24),
		'nom' : RichText(resu[0][1], font='Arial', bold=False, size= 24),
		'prenom' : RichText(resu[0][2], font='Arial', bold=False, size= 24),
		'date_naissance' : RichText(resu[0][3], font='Arial', bold=False, size= 24),
		'tel' : RichText(resu[0][4], font='Arial', bold=False, size= 24),
		'email' : RichText(resu[0][5], font='Arial', bold=False, size= 24),
		'cin' : RichText(resu[0][6], font='Arial', bold=False, size= 24),
		'adresse' : RichText(resu[0][7], font='Arial', bold=False, size= 24),
		'niveau' : RichText(resu[0][8], font='Arial', bold=False, size=24)
	}

	#get tamplate
	document = DocxTemplate(f"template/template_etudiant.docx")

	#change image in the template
	if resu[0][9] != '' :
		document.replace_pic('face0.png', os.getcwd() + f"\\src\\dist\\img\\pdp\\{resu[0][9]}")

	#creation template
	document.render(info)
	name = "Profil_" + resu[0][1] + "_" + resu[0][2]

	#save doc created
	document.save(f"{gettempdir()}\\{name}.docx")
	
	#convertion template to pdf
	dirpath = os.environ.get('USERPROFILE') + "\\Desktop"
	pdf_got = f"{dirpath}\\{name}.pdf"
	convert(f"{gettempdir()}\\{name}.docx", pdf_got)
	return pdf_got



@eel.expose
#profil_prof
def pdf_profil_prof(data):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_profil_prof = cur.execute(''' 
	SELECT matricule_ensg, nom, prenom, tel, email, cin, adresse, pdp_name  FROM ENSEIGNANT
	WHERE matricule_ensg=?
	''', (data,))
	resu = get_profil_prof.fetchall()

	
	info = {
		'num_matricule' : RichText(resu[0][0], font='Arial', bold=False, size=18),
		'nom' : RichText(resu[0][1], font='Arial', bold=False, size= 18),
		'prenom' : RichText(resu[0][2], font='Arial', bold=False, size= 18),
		'tel' : RichText(resu[0][3], font='Arial', bold=False, size= 18),
		'email' : RichText(resu[0][4], font='Arial', bold=False, size= 18),
		'cin' : RichText(resu[0][5], font='Arial', bold=False, size= 18),
		'adresse' : RichText(resu[0][6], font='Arial', bold=False, size= 18)
	}

	#get tamplate
	document = DocxTemplate(f"template/template_prof.docx")

	#change image in the template
	if resu[0][7] != '' :
		document.replace_pic('face0.png', os.getcwd() + f"\\src\\dist\\img\\pdp\\{resu[0][7]}")

	#creation template
	document.render(info)

	name = "Profil_" + resu[0][1] + "_" + resu[0][2]

	#save doc created
	document.save(f"{gettempdir()}\\{name}.docx")
	
	#convertion template to pdf
	dirpath = os.environ.get('USERPROFILE') + "\\Desktop"
	pdf_got = f"{dirpath}\\{name}.pdf"
	convert(f"{gettempdir()}\\{name}.docx", pdf_got)
	return pdf_got

@eel.expose
#profil personnel administratif
def pdf_profil_person_admin(data):
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_profil_perso_admin = cur.execute(''' 
	SELECT matricule_perso_admin, nom, prenom, fonction, tel, cin, email, adresse, pdp_name FROM PERSONNEL_ADMINISTRATIF
	WHERE matricule_perso_admin=?
	''', (data,))
	resu = get_profil_perso_admin.fetchall()

	info = {
		'num_matricule' : RichText(resu[0][0], font='Arial', bold=False, size=24),
		'nom' : RichText(resu[0][1], font='Arial', bold=False, size= 24),
		'prenom' : RichText(resu[0][2], font='Arial', bold=False, size= 24),
		'fonction' : RichText(resu[0][3], font='Arial', bold=False, size= 24),
		'tel' : RichText(resu[0][4], font='Arial', bold=False, size= 24),
		'cin' : RichText(resu[0][5], font='Arial', bold=False, size= 24),
		'email' : RichText(resu[0][6], font='Arial', bold=False, size= 24),
		'adresse' : RichText(resu[0][7], font='Arial', bold=False, size= 24)
	}

	#get tamplate
	document = DocxTemplate(f"template/template_person_admin.docx")
	#change image in the template
	if resu[0][8] != '' :
		document.replace_pic('face0.png', os.getcwd() + f"\\src\\dist\\img\\pdp\\{resu[0][8]}")

	#creation template
	document.render(info)
	name = "Profil_" + resu[0][1] + "_" + resu[0][2]

	#save doc created
	document.save(f"{gettempdir()}\\{name}.docx")
	
	#convertion template to pdf
	dirpath = os.environ.get('USERPROFILE') + "\\Desktop"
	pdf_got = f"{dirpath}\\{name}.pdf"
	convert(f"{gettempdir()}\\{name}.docx", pdf_got)
	return pdf_got


def voirPort(port):
	#vérification port
	for proc in net_connections():
		if proc.laddr.port == port : return True

def main():
	PORT = 1998
	while voirPort(PORT):
		PORT += 1
	environ['gePORT'] = str(PORT)
	print(PORT)
	eel.start(mode='custom', cmdline_args=['./node_modules/electron/dist/electron.exe', '.'], port=PORT, shutdown_delay=5)


if __name__ == '__main__':
	main()