# Setting up bob cli

Add Terminal alias to command-line and have it run a bash script.
- Run this command to open/edit your bashrc file.
  - $`sudo nano /etc/bashrc`

At the end of this file, add this line 👇to execute bob.sh
```
alias bob="bash ~/mystuff/yourbashScript.sh"
```
Note: you will need to restart terminal for it to work!
