import eel

eel.init('src')

def main():
	eel.start('index.html', mode='custom', cmdline_args=['node_modules/electron/dist/electron.exe', '.'])


if __name__ == '__main__':
	main()