import eel
from os import environ
from psutil import net_connections

eel.init('src')

#def main():
	#eel.start('index.html', mode='custom', cmdline_args=['node_modules/electron/dist/electron.exe', '.'])

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