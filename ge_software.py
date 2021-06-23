import eel, csv
import sqlite3, os
from os import environ
from psutil import net_connections

eel.init('src')

data = []
storage_get_profil_data=None

#CREATE DE LA BASE DE DONNEE
def createBDD():
	try : 
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		
		t_admin = cur.execute(''' 
		CREATE TABLE IF NOT EXISTS PERSONNEL_ADMINISTRATIF (
			id_admin		INTEGER	NOT NULL	PRIMARY KEY AUTOINCREMENT,
			matricule_perso_admin	TEXT	NOT NULL UNIQUE,
			nom			TEXT	NOT 	NULL,
			prenom		TEXT 	NOT 	NULL,
			fonction 	TEXT 	NOT 	NULL,
			annee_univ	TEXT 	NOT 	NULL,
			tel			TEXT	NOT 	NULL,
			cin			INTEGER NOT NULL,
			email			TEXT	NOT 	NULL,
			adresse		TEXT	NOT	NULL,
			mdp			TEXT	,
			sexe			TEXT	NOT	NULL
		)
		''')


		t_ensg = cur.execute('''
		CREATE TABLE IF NOT EXISTS ENSEIGNANT (
			id_prof			INTEGER	NOT NULL	PRIMARY KEY AUTOINCREMENT,
			matricule_ensg	TEXT	NOT NULL	UNIQUE,
			annee_univ		TEXT	NOT NULL,
			nom				TEXT	NOT NULL,
			prenom			TEXT	NOT NULL,
			tel				TEXT	NOT NULL,
			email			TEXT	NOT NULL,
			cin				INTEGER	NOT NULL,
			sexe			TEXT	NOT NULL,
			adresse			TEXT	NOT NULL,
			module			TEXT	NOT NULL,
			mdp				TEXT	NOT NULL
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
			niveau					TEXT	NOT NULL
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
			matricule_etud		TEXT		NOT NULL,
			id_module			INTEGER	NOT NULL,
			TYPE					TEXT		NOT NULL,
			coeff					INTEGER	NOT NULL,
			CONSTRAINT note_etud_fk	FOREIGN	KEY (matricule_etud)	REFERENCES	ETUDIANT(matricule_etud),
			CONSTRAINT	note_module_fk	FOREIGN KEY	(id_module) REFERENCES MODULE(id_module)
		)
		''')

		t_bonus_malus = cur.execute('''
		CREATE TABLE IF NOT EXISTS BONUS_MALUS (
			id_bonus_malus		INTEGER	NOT NULL	PRIMARY KEY AUTOINCREMENT,
			id_note				INTEGER	NOT NULL,
			bonus_malus			REAL	NOT NULL,
			CONSTRAINT	note_etud_bm_fk FOREIGN KEY (id_note) REFERENCES NOTE(id_note)
		)
		''')

		t_etudier = cur.execute('''
		CREATE TABLE IF NOT EXISTS ETUDIER (
			matricule_etud	TEXT	NOT NULL,
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
	INSERT OR IGNORE INTO PERSONNEL_ADMINISTRATIF (matricule_perso_admin, nom, prenom, fonction, annee_univ, tel, cin, email, adresse, mdp, sexe) 
	VALUES ('001_ADMIN', 'ADMIN', 'Admin', 'Administrateur', '2021','+261342404256', 1, 'admin', 'ambatoroka','admin', 'sexe')
	''')
	connect_to_bdd.commit()
	connect_to_bdd.close()
insert_admin_account()


#INSERTION DES DONNEES
@eel.expose
def setData(d, e):
	global data
	data = d
	try : 
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		if e == 'etud':
			donnee_etudiant = ''' 
			INSERT INTO ETUDIANT(matricule_etud, annee_univ, nom, prenom, date_naissance, email, adresse, sexe, tel, cin, niveau)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			'''		
			cur.execute(donnee_etudiant, d)

		elif e == 'perso_admin':
			donnee_perso_admin = '''
			INSERT INTO PERSONNEL_ADMINISTRATIF(matricule_perso_admin, nom, prenom, fonction, annee_univ, tel, cin, email, adresse, sexe)
			VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			'''
			cur.execute(donnee_perso_admin, d)

		elif e == 'module':
			donnee_module = '''
			INSERT INTO MODULE(nom, reference, semestre, matricule_ensg, credit_obtenu)
			VALUES(?, ?, ?, ?, ?)
			'''
			cur.execute(donnee_module, d)
			
		else :
			donnee_enseignant = ''' 
			INSERT INTO ENSEIGNANT(matricule_ensg, annee_univ, nom, prenom, email, adresse, sexe, tel, cin, module, mdp)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			'''
			cur.execute(donnee_enseignant, d)

		connect_to_bdd.commit()
		cur.close()
		connect_to_bdd.close()
	except sqlite3.Error as error: 
		print(error)

#INSERTION NOTES
""" @eel.expose
def insert_notes(note_recup):
	try:
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		note_insert = cur.execute('''
		INSERT INTO NOTE(note_sur20, note_sur10, bonus, malus)
		VALUES (?, ?, ?, ?)
		''')
		connect_to_bdd.commit()
	except sqlite3.Error as erro:
		print(error) """



#EXPORTATION DONNEES EN CSV 
@eel.expose
def export_data_csv(val_bdd):

	try :
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		if 	val_bdd == 'student' :
			cur.execute('''SELECT matricule_etud, annee_univ, nom, prenom, date_naissance, tel, email, cin, sexe, adresse, niveau 
				FROM ETUDIANT''')
		#Exporting data into CSV file
			dirpath = os.environ.get('USERPROFILE') + "\\Desktop\\"
			with open(dirpath + "student_data.csv", "w") as csv_file :
				csv_writer = csv.writer(csv_file, delimiter = ";")
				csv_writer.writerow([i[0] for i in cur.description])
				csv_writer.writerows(cur)
			
		else :
			cur.execute('''SELECT matricule_ensg, annee_univ, nom, prenom, tel, email, cin, sexe, adresse, module 
			FROM ENSEIGNANT''')
			#Exporting data into CSV file
			dirpath = os.environ.get('USERPROFILE') + "\\Desktop\\"
			with open(dirpath + "prof_data.csv", "w") as csv_file :
				csv_writer = csv.writer(csv_file, delimiter = ";")
				csv_writer.writerow([i[0] for i in cur.description])
				csv_writer.writerows(cur)
			
	except sqlite3.Error as e:
		print(e)


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
			SELECT matricule_ensg, annee_univ, nom, prenom, tel, email, cin, sexe, adresse, module 
			FROM ENSEIGNANT
			'''
		else :
			get_data = '''
			SELECT matricule_perso_admin, annee_univ, nom, prenom, fonction,  tel, email,  cin, sexe, adresse
			FROM PERSONNEL_ADMINISTRATIF
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
		SELECT * FROM etudiant WHERE matricule_etud=?
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



#AFFICHER TOUS LES NIVEAUX DANS la selection espace_prof
@eel.expose
def get_niveau(data) :
	connect_to_bdd = sqlite3.connect('donnee.db')
	cur = connect_to_bdd.cursor()
	get_niveau_study = cur.execute('''
	SELECT DISTINCT niveau FROM etudiant ORDER BY niveau
	''')
	return cur.fetchall()

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