# Raw terminal commands

### General Commands
- $`zip -9 -r ../twitter-bot.zip *`


### Loops
- $`for i in myFolder/*; do echo "hello" $i; done` >>> loops through files/folders in folder.
- $`for i in lab/*.html; do echo "hello" $i; done` >>> only html files

---
### File/directory CRUD
- cd directory			>>> move into current directory
- cd ..				>>> move back a directory
- ls 				>>> shows all files/folders at current directory
- touch newFileName.whatever 	>>> create new file at current directory
- open filename.whatever		>>> opens file with default
- atom filename.whatever		>>> opens in atom.
- cat filename.whatever		>>> print contents of file in terminal
- rm filename.whatever		>>> removes/deletes file
- My\ Folder			>>> backslash+space for space if file/dir has spaces

---
### CPUish stuff
- ps -e				>>> shows all running directory locations
- top				>>> shows all running programs in real time on CPU
- htop			>>> same as top but nicer UI
- top -o cpu			>>> shows running programs sorted by cpu time
- kill <PID>			>>> find PID in ^^^. This will kill that program

----
### kill a local port when it freezes/blocks
- lsof -i :3000
	- this will check the port that stuck. Will return a few different results.
	- if new command line just shows up it means none r open. seems they oddly get stuck.
	- find PID in looks related to port i.e. stuck with a node app.
- kill -QUIT 10658		>>> 10658 === PID

- htop				>>> little program i installed that makes navigating top nice


# —————————— Other Systems running from Terminal ————————— #


### MongoDB
——————————————————————————————————————————————————
mongod (or: sudo mongo)		>>> opons the mongoDB service/programe/whatever…
mongo				>>> opens mongo command line for MongoDB files/database
- see men-crud-basics for more
