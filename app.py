import eel
import sqlite3
from os import environ
from psutil import net_connections

eel.init('src')

data = []


@eel.expose()
def setData(d):
	global data
	print("ato va")
	data = d
	try : 
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		donnee_1 = ''' 
		INSERT INTO etudiant(nom, prenom, naissance, adresse, sexe, tel, cin)
		VALUES (?, ?, ?, ?, ?, ?, ?)
		'''

		
		
		cur.execute(donnee_1, d)
		print("donnee insere")
		connect_to_bdd.commit()
		cur.close()
		connect_to_bdd.close()
	except sqlite3.Error as error: 
		print(error)
		

@eel.expose()
def getData():
	return data
	

def createBDD():
	try : 
		connect_to_bdd = sqlite3.connect('donnee.db')
		cur = connect_to_bdd.cursor()
		donnee_1 = ''' 
		CREATE TABLE IF NOT EXISTS enseignant (
			matricule INT AUTOINCRIMENT PRIMARY KEY,
			nom TEXT,
			prenom TEXT,
			naissance TEXT NOT NULL,
			adresse TEXT,
			module TEXT,
			sexe TEXT,
			tel INT,
			cin INT
		);
		'''
		cur.execute(donnee_1)
		
		donnee_2 = '''
		CREATE TABLE IF NOT EXISTS etudiant (
			matricule INT  AUTOINCRIMENT PRIMARY KEY,
			nom TEXT,
			prenom TEXT,
			naissance TEXT NOT NULL,
			adresse TEXT,
			sexe TEXT,
			tel INT,
			cin INT
			);
		'''
		cur.execute(donnee_2)
		connect_to_bdd.commit()
		cur.close()
		connect_to_bdd.close()
	except sqlite3.Error as error: 
		print(error)
		
createBDD()


def voirPort(port):
	#vérification port
	for proc in net_connections():
		if proc.laddr.port == port : return True

def main():
	PORT = 2500
	while voirPort(PORT):
		PORT += 1
	environ['gePORT'] = str(PORT)
	eel.start(mode='custom', cmdline_args=['node_modules/electron/dist/electron.exe', '.'], port=PORT)


if __name__ == '__main__':
	main()