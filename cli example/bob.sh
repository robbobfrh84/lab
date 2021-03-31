#                         🚨   !!! BOB !!!    🚨
# Made any changes???? Don't forget to $`cd ~/github/hq` & add/commit/push! 🚨

command=${1:-default}; s=false

if [ $command == "help" ] || [ $command == "info" ] || [ $command == "default" ]
then command="default"; s=true; fi

if $s ; then clear ; fi
if $s ; then echo "" ; fi
if $s ; then echo "🌟 🎉 🎊 🥳 🎊 🎉🌟 🎉 🎊 🥳 🎊 🎉 🌟 🎊 🥳 🎊 🎉 🌟" ; fi
if $s ; then echo "🌟   Welcome to the bob command line interface!   🌟" ; fi
if $s ; then echo "🌟 🎉 🎊 🥳 🎊 🎉🌟 🎉 🎊 🥳 🎊 🎉 🌟 🎊 🥳 🎊 🎉 🌟" ; fi
if $s ; then echo "" ; fi
if $s ; then echo " Commands         | What they do" ; fi
if $s ; then echo " 🔴 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 🔴 " ; fi
if $s ; then echo " bob bash         | $'sudo nano /etc/bashrc' where bob came from" ; fi ; bash(){ sudo nano /etc/bashrc; }
if $s ; then echo " bob this         | 🤓Edit this file in atom" ; fi ; this(){ atom ~/github/hq/bob.sh; }
if $s ; then echo " bob lasypush     | $'./scripts/serve-local.sh'" ; fi ; lazypush(){ git add . ; git commit -m 'lasypush' ; git push ; }
if $s ; then echo " bob other        | Show other useful non-bob commands" ; fi ; other(){ otherCommands; }
if $s ; then echo " bob hi           | Calls the hi function" ; fi ; hi(){ printf "\n 🐿  Well hello there! You said $command 😃\n\n"; }
if $s ; then echo " bob gh           | Opens current repo's github url" ; fi ; gh(){ open https://github.$(git config remote.origin.url | cut -f2 -d. | tr ':' /); }
if $s ; then echo " bob gitall       | Opens current repo's github url + folder + atom" ; fi ; gitall(){ open https://github.$(git config remote.origin.url | cut -f2 -d. | tr ':' /); atom .; open .;}
if $s ; then echo " bob c1           | $'clasp push ; clasp version 1 redeploy'" ; fi ; c1(){ clasp push ; clasp version 1 redeploy ; }
if $s ; then echo " bob              | * replaces empty command with default, show this info" ; fi

if $s ; then echo " 🟡 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 🟡" ; fi
if $s ; then echo "" ; fi
if $s ; then echo "📝NOTE: This file is located at ~/github/hq/bob.sh" ; fi
if $s ; then echo " - and is executed as an alias from ~/etc/bashrc" ; fi
if $s ; then echo "" ; fi

# - - - - - Multi-line Functions - - - - - - - - - - - - - - - - - - - - - - - -
otherCommands(){
  echo ""
  echo " Other useful Commands"
  echo " gh                   | opens current directory's github in chrome"
  echo " ls -l                | show all files in folder permissions "
  echo " chmod 777 some.file  | gives full permissions "
  echo " contab -1            | lists cron jobs "
  echo " sudo lsof -i:8000    | lists all tcp ports running on 8000 (remove :8000 shows all ports)"
  echo " KILL -9 <PID>           | get PID FROM ☝️"
  echo " env EDITOR=nano crontab -e  | create and edit cron jobs "
  echo ""
}

coa(){
  echo ""
  echo " 🐓Usful COA Commands 👨‍💻"
  echo ""
  echo " DROP_DB=on ./scripts/serve-local.sh | drops DB then serves local"
  echo " DROP_DB=on ./scripts/undockered.sh | drops DB then serves local"
  echo " REBUILD_PIPENV=on ./scripts/undockered.sh | drops DB then serves local"
  echo " NO_STOP=on ./scripts/undockered.sh "
  echo " LOAD_DATA=dummy ./scripts/undockered.sh | runs fixtures as seed data "
  echo " LOAD_DATA=fixture ./scripts/undockered.sh | runs fixtures as seed data "
  echo " - bob jopDropFix           | drops DB and Loads fixtures undockered"
  echo ""
  echo " Migrations 🦆"
  echo " ./scripts/serve-local.sh   | Then open new tab 👇"
  echo " docker exec -it joplin_app_1 python joplin/manage.py makemigrations "
  echo " docker exec -it joplin_app_1 python joplin/manage.py migrate"
  echo ""
  echo " Tests"
  echo " pipenv run pytest   | runs all test && 👇specific test"
  echo " pipenv run pytest ./joplin/pages/location_page/tests.py"
}

# - - - - - Execute Command - - - - - - - - - - - - - - - - - - - - - - - - - -
if [ $command != "default" ]
then
  $command
fi
