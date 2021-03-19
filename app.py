import eel, csv
import sqlite3, os
from os import environ
from psutil import net_connections

eel.init('src')

data = []


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
			print("donnee_etudiant inseré")
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
		else:
			get_data = '''
			SELECT matricule_ensg, annee_univ, nom, prenom, tel, email, cin, sexe, adresse, module 
			FROM ENSEIGNANT
			'''

		cur.execute(get_data)
		return cur.fetchall()

	except sqlite3.Error as error: 
		print(error)
	
	
def createBDD():
	try : 
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		t_admin = ''' 
		CREATE TABLE IF NOT EXISTS PERSONNEL_ADMINISTRATIF (
			matricule_admin	TEXT	NOT NULL,
			email	TEXT	NOT NULL,
			mdp	TEXT	NOT NULL,
			CONSTRAINT perso_admin_pk	PRIMARY KEY (matricule_admin)
		);
		'''
		print("Création tables en cours ...")
		cur.execute(t_admin)

		t_ensg = '''
		CREATE TABLE IF NOT EXISTS ENSEIGNANT (
			matricule_ensg	TEXT	NOT NULL,
			annee_univ		TEXT	NOT NULL,
			nom				TEXT	NOT NULL,
			prenom			TEXT	NOT NULL,
			tel				TEXT	NOT NULL,
			email			TEXT	NOT NULL,
			cin				INTEGER	NOT NULL,
			sexe			TEXT	NOT NULL,
			adresse			TEXT	NOT NULL,
			module			TEXT	NOT NULL,
			mdp				TEXT	NOT NULL,
			CONSTRAINT ensg_pk PRIMARY KEY (matricule_ensg)
			
			);
		'''
		cur.execute(t_ensg)
		

		t_etudiant = '''
		CREATE TABLE IF NOT EXISTS ETUDIANT(
			matricule_etud	TEXT	NOT NULL,
			annee_univ		TEXT	NOT	NULL,
			nom				TEXT	NOT NULL,
			prenom			TEXT	NOT NULL,
			date_naissance	TEXT	NOT NULL,
			tel				TEXT	NOT NULL,
			email			TEXT	NOT NULL,
			cin				INTEGER	NOT NULL,
			sexe			TEXT	NOT NULL,
			adresse			TEXT	NOT NULL,
			niveau			TEXT	NOT	NULL,
			CONSTRAINT etudiant_pk	PRIMARY KEY (matricule_etud)
			
		)
		'''
		cur.execute(t_etudiant)
		

		t_module = '''
		CREATE TABLE IF NOT EXISTS MODULE (
			id_module		INTEGER		NOT NULL	PRIMARY KEY		AUTOINCREMENT,
			nom		TEXT		NOT NULL,
			reference	TEXT	NOT NULL,
			matricule_ensg	TEXT	NOT NULL,
			CONSTRAINT	module_ensg_fk	FOREIGN KEY	(matricule_ensg)	REFERENCES	ENSEIGNANT(matricule_ensg)
		)
		'''
		cur.execute(t_module)


		t_note = '''
		CREATE TABLE IF NOT EXISTS NOTE (
			id_note		TEXT		NOT NULL,
			note_module		REAL		NOT NULL,
			matricule_etud	TEXT	NOT NULL,
			id_module		INTEGER	NOT NULL,
			CONSTRAINT	note_pk	PRIMARY KEY (id_note),
			CONSTRAINT note_etud_fk	FOREIGN	KEY (matricule_etud)	REFERENCES	ETUDIANT(matricule_etud),
			CONSTRAINT	note_module_fk	FOREIGN KEY	(id_module) REFERENCES MODULE(id_module)
		)
		'''
		cur.execute(t_note)
	

		t_etudier = '''
		CREATE TABLE IF NOT EXISTS ETUDIER (
			matricule_etud	TEXT	NOT NULL,
			id_module		INTEGER	NOT NULL,
			CONSTRAINT	etudier_pk	PRIMARY KEY (matricule_etud, id_module),
			CONSTRAINT	etudier_fk	FOREIGN KEY (matricule_etud)	REFERENCES ETUDIANT(matricule_etud),
			CONSTRAINT	etudier_module_fk	FOREIGN KEY (id_module)	REFERENCES MODULE(id_module)
		)
		
		'''
		cur.execute(t_etudier)
		print('terminée !!')

		connect_to_bdd.commit()
		cur.close()
		connect_to_bdd.close()
	except sqlite3.Error as error: 
		print(error)
		
createBDD()

#CONNECTION EN TANT ADMIN
def connect_admin() :
	try :
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		recup_mdp = cur.execute('''
		SELECT mdp FROM PERSONNEL_ADMINISTRATIF
		''')
		print(recup_mdp.fetchone())
		


	except sqlite3.Error as e : 
		print(e)

connect_admin()

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
	eel.start(mode='custom', cmdline_args=['./node_modules/electron/dist/electron.exe', '.'], port=PORT)


if __name__ == '__main__':
	main()