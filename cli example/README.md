# Setting up yourName cli

Run command to open/edit your bashrc file.
- $`sudo nano /etc/bashrc`

At the end of this file, add line 👇 like this to execute yourBashScript.sh when executing `yourName` in command lie
```
alias yourName="bash ~/yourBashScript.sh"
```
Note: you will need to restart terminal for it to work!

# Example
See `bob.sh` for an example of a cli script...
