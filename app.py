import eel
import sqlite3
from os import environ
from psutil import net_connections

eel.init('src')

@eel.expose()
def createBDD():
	try : 
		connect_to_bdd = sqlite3.connect('donnee.db')
		donnee = ''' 
		CREATE TABLE enseignant (
			matricule INT  PRIMARY KEY,
			nom TEXT,
			prenom TEXT,
			naissance TEXT NOT NULL,
			adresse TEXT,
			module TEXT,
			sexe TEXT,
			tel INT,
			cin INT,
		);
		'''
		cur = connect_to_bdd.cursor()
		cur.execute(donnee)
		connect_to_bdd.commit()
		cur.close()
		connect_to_bdd.close()
	except sqlite3.Error as error: 
		print(error)
		
createBDD()

@eel.expose()
def voirPort(port):
	#vérification port
	for proc in net_connections():
		if proc.laddr.port == port : return True

def main():
	PORT = 1333
	while voirPort(PORT):
		PORT += 1
	environ['gePORT'] = str(PORT)
	eel.start(mode='custom', cmdline_args=['node_modules/electron/dist/electron.exe', '.'], port=PORT)


if __name__ == '__main__':
	main()