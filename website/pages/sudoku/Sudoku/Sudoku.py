# - This program is desiged to build a functioning Sudoku game.
# - The program will...
#   - generate random puzzels, with user-set difficulty.
#   - check each input as valid or invalid.
#   - keep track of time
#   - notify user when game is complete and how long it took.

####to do list####
#   create a funtion to swap head to timer and Quit and start new game
#   create alert to make sure
#   fix '_' to be a none entry. filled blocks should be lables
#   create a check funcion if ever text is entered
#   only allow 1 character entry
#   if wrong turn red.
#   if all 81 are correct. replace body with you win, time and level.
#   build timer.


import Tkinter as tk
import random
import Sudoku_Generator

class MainApplication(tk.Frame):

#tkinter GUI
    def __init__(self, parent, *args, **kwargs):
        tk.Frame.__init__(self, parent, *args, **kwargs)
        self.parent = parent
        self.head = tk.Canvas(parent)
        self.head.pack()
        self.body = tk.Canvas(parent)
        self.body.pack()
        self.build_layout(81)
        self.select()

# start menu
    def easy(self):
        self.build_layout(31)
        self.custom.delete(0, 'end')
        self.custom.insert(0, '31')
        self.start_game()

    def medium(self):
        self.build_layout(41)
        self.custom.delete(0, 'end')
        self.custom.insert(0, '41')
        self.start_game()

    def hard(self):
        self.build_layout(51)
        self.custom.delete(0, 'end')
        self.custom.insert(0, '51')
        self.start_game()

    def custom(self):
        if self.custom.get() >=0 or self.custom.get() <=81:
            nums_removed = self.custom.get()
            self.build_layout(int(nums_removed))
            self.start_game()

#In-game menu
    def start_game(self):
        self.easyb.destroy()
        self.mediumb.destroy()
        self.hardb.destroy()
        self.cust_b.destroy()
        self.custom.destroy()
        quit_b = tk.Button(self.head, text="Quit & Start New Game", command=self.select)
        quit_b.grid(column=0, row=0, columnspan=4)

    def build_layout(self, level):
        key, bd,level = Sudoku_Generator.generate_random_complete_sudoku([],[],level)
        block, b, pk, vo= {}, 0, "pink","violet"
        for row in range(9):
            pk = "grey" if (row > 2 and row < 6) else "pink"
            vo = "pink" if (row > 2 and row < 6) else "violet"
            for col in range(9):
                color = pk if (col > 2 and col < 6) else vo
                block[b] = tk.Entry(self.body, width=3, font=("Purisa",25),
                                 justify="center", bg=color)
                block[b].grid(column=col, row=row+1, ipady=7)
                block[b].insert(0, bd[b])
                b += 1

    def select(self):
        self.easyb = tk.Button(self.head, text="Easy X31",command=self.easy)
        self.easyb.grid(column=0, row=0)

        self.mediumb = tk.Button(self.head, text="Medium X41",command=self.medium)
        self.mediumb.grid(column=1, row=0)

        self.hardb = tk.Button(self.head, text="Hard X51",command=self.hard)
        self.hardb.grid(column=2, row=0)

        self.cust_b = tk.Button(self.head, text="Custom X>",command=self.custom)
        self.cust_b.grid(column=3, row=0)

        self.custom = tk.Entry(self.head, text="Custom >",width=5)
        self.custom.grid(column=4, row=0,pady=5,padx=15)
        self.custom.insert(0, '81')

        time = tk.Label(self.head, text="00:00")
        time.grid(column=5, row=0)


if __name__ == "__main__":
    root = tk.Tk()
    MainApplication(root).pack(side="top", fill="both", expand=True)
    root.mainloop()
