# - The purpose of this program is to generate two variations of the
#   same string.
# - The string will be 81 characters long. representing all
#   letter boxes inside a sudoku board. the first 9 charactors
#   representing the first row left to right. Charactors 10-18
#   representing the second row and so on.
# - One string will have all 81 Charactors filled in. The
#   second will randomly replace individual charactors with a blank
#   space; represeting the starting puzzel the user to play.
#   This file is an EXECUTED FUNCTION whose parameters except the number of hidden
#   block/difficulty. and returns both strings to Sudoku.py

import random   #include the builtin python library for random selections

difficulty = 31  #how many blocks to randomly remove easy:31 medium:41 hard:51
puzzle,full = [], [] #create blank lists to be used to store puzzle blocks a string

def generate_random_complete_sudoku(full, puzzle, difficulty): #main function called by sudoku.py

    impossible = False     #Build 1st row
    full = list("123456789")
    random.shuffle(full)

    for i in range(8):    #Build 2nd-to-9th row
        full, impossible = row_builder((i+2), full)
        if impossible == True:
            full, puzzle, difficulty = generate_random_complete_sudoku(full,puzzle, difficulty)
            break

    if True == 0 and impossible==False: #True==True to print psuedo-sudoku board on REPL
        print "\nboard\n",full[:9],'\n',full[9:18],'\n',full[18:27], '\n'
        print full[27:36],'\n',full[36:45],'\n',full[45:54],'\n\n',
        print full[54:63],'\n',full[63:72],'\n',full[72:81]

    check(full) #check for errors

    puzzle = list(full) #Randomly remove blocks from the completed puzzle
    track_list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80']
    for i in range(difficulty):
        random_block = random.choice(track_list)
        track_list.remove(random_block)
        puzzle.pop(int(random_block))
        puzzle.insert(int(random_block), ' ')
    puzzle = ''.join(puzzle)
    full = ''.join(full)
    return full,puzzle,difficulty

def row_builder(row_num, full):
    n, out,callout,repeat_counter = list("123456789"), [],[], 0
    random.shuffle(n)
    row = list(n)
    while True:
        for k in range(9):
            out, callout = get_outs(row_num,k, full, out,callout)
            for i in range(len(row)):
                if row[i] not in out:
                    full.append(row[i])
                    row.remove(row[i])
                    break
        if len(full) > ((9*row_num)-1):
            return full, False
        if repeat_counter > 20:
            return full, True
        random.shuffle(n)
        row=list(n)
        full,puzzle = full[:(9*(row_num-1))], "puzzle"
        repeat_counter += 1

def get_outs(row_num, cell, full, out,callout):
    if (row_num == 2 or row_num == 3) and (cell == 0 or cell == 3 or cell == 6):
        out = list(full[0+cell]+full[1+cell]+full[2+cell])
        out.extend(full[9+cell]+full[10+cell]+full[11+cell]) if row_num == 3 else out
    if (row_num==5 or row_num==6 or row_num==8) and (cell==0 or cell==3 or cell==6):
        callout = list(full[27+cell]+full[28+cell]+full[29+cell])
        callout.extend(full[36+cell]+full[37+cell]+full[38+cell]) if row_num==6 else callout
        callout = list(full[54+cell]+full[55+cell]+full[56+cell]) if row_num==8 else callout
    if row_num >= 4:
        out = list(full[0+cell] + full[9+cell] + full[18+cell])
        out.extend(callout) if (row_num == 5 or row_num == 6 or row_num == 8) else out
        out.extend(full[27+cell] + full[36+cell] + full[45+cell]) if row_num == 7 else out
        out.extend(full[27+cell]+full[36+cell]+full[45+cell]) if row_num == 8 else out
        out.extend(full[27+cell]+full[36+cell]+full[45+cell]+full[54+cell]+full[63+cell]) if row_num==9 else out
    return out,callout

def check(full):
    for k in range(9): #Checking all 9 rows for doubles
        nums = list("123456789") #checked with replacing a num with a double and it errors.
        for i in range(9):#tested range(10) it'll fail
            nums.remove(full[(i*9)+k])
    for k in range(9):#Checking all 9 columns for doubles
        nums = list("123456789")
        x = []
        for i in range(9):
              nums.remove(full[i+(k*9)])
              x.append(full[i+(k*9)])
    for p in range(3): #Checking all 9 Boxes for doubles
        for r in range(3):
            nums = list("123456789")
            check_num = []
            for k in range(3):
                for i in range(3):
                     nums.remove(full[(i*9)+k])
for i in range(10):
    x = ''
    full, puzzle, difficulty = generate_random_complete_sudoku(full,puzzle,difficulty)
    print full, '\n', puzzle
    for k in range(9):
        for j in range(9):
            x += full[j+(k)*9]+'| '
        print ' '+x
        print '--|--|--|--|--|--|--|--|--|'
        x = ''
