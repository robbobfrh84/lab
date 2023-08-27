#   This program is used to generate all possible answers for a given puzzle
#for the game riiple. That is, 5 random numbers between 1 and 6, to be
#added, subtracted, multiplied and devided to equal a random number
#between 1 and 9. All 5 numbers must be used and only used once.


from random import randint      
import itertools                 #   This library will allow us to convert string operators
import operator                  #into functioning operaters concatenated into a algorithm. 
                                 #Library used to generate all permutations in a list.

operators = list("+-*/")
opList = []
#   These loops will generate all unique arrangments of 4 operators, (+-*/).
#Including, multiples of each operation, e.g. (*+*+) and (----).
#Totaling, 256 unique arrangments... 4*4*4*4 = 256.
for i in range(len(operators)):
	for j in range(len(operators)):
		for k in range(len(operators)):
			for v in range(len(operators)):
				opList.append([ operators[i]
					       ,operators[j]
					       ,operators[k]
					       ,operators[v]])

#Here, we used the operator Library we imported to transform string operators back to active.
ops = {"+": operator.add, "-": operator.sub,"*": operator.mul, "/": operator.div}
def main():                 #start programs mainloop
    p1 = []                 #create a list to hold all off the player 1 cards
    crib = randint(1,9)     #create random number to be used as the algorithm goal. 
    correct_sample, total_correct, = [], 0 #Dictionaries to contain all answers...
    for i in range(5):      #Generates 5 random numbers 1-to-six for players use. called hand
        p1 += [float(randint(1,6))]
    print "crib", crib
    p1 = map(int, p1) 
    x = list(itertools.permutations(p1)) #creates a list all off arragments of cards (120).
    print "Player 1 cards", p1
    #v...Do we need oL anymore
    oL = opList     #create shorthand for list of 256 operater combinations.
    for p in range(13):
        count = 0     #loop count variables to be used to count correct/incorrect answers.
        fail = 0
        save = 0
        for i in range(len(x)): #loop for every arrangment of hand (123).
            A,B,C,D,E = x[i][0], x[i][1], x[i][2], x[i][3], x[i][4]
            for j in range(len(oL)): #loop for every operation combo
                                     #...(256 per every 120 hand combo, (30720 total arrangments).
                #arrey of specific operation combos
                O = [ops[oL[j][0]], ops[oL[j][1]], ops[oL[j][2]], ops[oL[j][3]]]
                #call the function that will fetch specific parenthesis order or operations
                total, math_pass, fail, pID = get_parenthesis(A,B,C,D,E,O,p, fail,crib)
                #create an array that holds string with parenthesis for user to view possible answer.
                math_str = []
                #make sure the answer is correct and that there weren't any math errors
                if total == crib and math_pass == True:
                    if save < 1: #select ammount per array to save to sample answer array.
                        #create array with numbers and operators in order
                        all_math = [A,oL[j][0],B,oL[j][1],C,oL[j][2],D,oL[j][3],E]
                        #Create the first items to store parenthesis type
                        math_str = ["#",p,":  "]
                        #run a loop for lenth of pID(arrey code either - or ( or )
                        for s in range(len(pID)):
                            #if parenthesis, save in arrey in order
                            if pID[s] == "(" or pID[s] == ")":
                                math_str.append(pID[s])
                            #if no parenthesis insert number or operator into string
                            #... and remove from all_math string in order. 
                            else:    
                                math_str.append(all_math[0])
                                all_math.remove(all_math[0])
                        #extend end of array and combine and one string with answer at end                                   
                        math_str.extend(["=",crib])        
                        math_str = map(str, math_str)
                        math_str = ''.join(math_str)
                        #save into array that will display a sample of different possiblities as
                        #answers to the puzzle
                        correct_sample.append(math_str)
                    #add saved ammount to be changed if wanted PER parenthesis type and count correct.    
                    save+=1
                    count += 1
        #add to the total correct count.           
        total_correct += count
        #print "Of",30720," possible arrangements(Parenthesis Combo#",p,", correct=", count
        #print "math_rules fail #",p,": ", fail
    #after all 13 array loops complete return the sample, the number correct and the total
    #...arrangements possible
    return correct_sample,total_correct,30720*(p+1)

#This function takes every operation and checks for negative results, Zero divitions and fractions
#...return math_pass as false if the arrangment has math errors
def math_rules(opr, first, second):
    math = 0
    if opr == ops["/"]:
        try:
            #checks to see if divition doesn't return a whole number or starts with 0
            if first%second == 0 and first != 0:
                math_pass = True
                math = opr(first,second)
            else:
                math_pass = False
        #excepts zero divtion errors as false math_pass        
        except ZeroDivisionError:        
            math_pass = False
    #if operation returns a nagative value, return a false arrangement        
    elif opr(first,second)<0:
        math_pass = False;
    else:
        math_pass = True;
        math = opr(first,second)
    #returns if there was an error or if not what the result of the math operation was.    
    return math, math_pass

#Here we store the order of math for all 13 unique parenthesis order of math.
def get_parenthesis(A,B,C,D,E,O,p,fail,crib): #0 first is no parenthesis.
    pair = {}
# A,B,C,D,E
    if p == 0:
        #pID is the code used when laying the array back into a string to show possible answers. 
        pID="---------"
        #all 4 operations are checked in the math_rules function for math errors
        #... if any (x1,x2,x3,x4) return negatives, fractions or Zerodivition errors...
        #... the arrangement doesn't pass and won't be added to correct list.
        AB,x1 = math_rules(O[0],A,B)
        ABC,x2 = math_rules(O[1],AB,C)
        ABCD,x3 = math_rules(O[2],ABC,D)
        tot,x4 = math_rules(O[3],ABCD,E)
# A,(B,C),D,E
    if p == 1:
        pID="--(---)----"    
        BC,x1 = math_rules(O[1],B,C)
        ABC,x2 = math_rules(O[0],A,BC)
        ABCD,x3 = math_rules(O[2],ABC,D)
        tot,x4 = math_rules(O[3],ABCD,E)       
#A,B,(C,D),E
    if p == 2:
        pID="----(---)--"    
        CD,x1 = math_rules(O[2],C,D)
        AB,x2 = math_rules(O[0],A,B)
        ABCD,x3 = math_rules(O[1],AB,CD)
        tot,x4 = math_rules(O[3],ABCD,E)
#A,B,C,(D,E)
    if p == 3:
        pID="------(---)"    
        DE,x1 = math_rules(O[3],D,E)
        AB,x2 = math_rules(O[0],A,B)
        ABC,x3 = math_rules(O[1],AB,C)
        tot,x4 = math_rules(O[2],ABC,DE)
#A,(B,C,D),E
    if p == 4:
        pID="--(-----)--"    
        BC,x1 = math_rules(O[1],B,C)
        BCD,x2 = math_rules(O[2],BC,D)
        ABCD,x3 = math_rules(O[0],A,BCD)
        tot,x4 = math_rules(O[3],ABCD,E)
#A,B,(C,D,E)
    if p == 5:
        pID="----(-----)"    
        CD,x1 = math_rules(O[2],C,D)
        CDE,x2 = math_rules(O[3],CD,E)
        AB,x3 = math_rules(O[0],A,B)
        tot,x4 = math_rules(O[1],AB,CDE)
#A,(B,C,D,E)
    if p == 6:
        pID="--(-------)"    
        BC,x1 = math_rules(O[1],B,C)
        BCD,x2 = math_rules(O[2],BC,D)
        BCDE,x3 = math_rules(O[3],BCD,E)
        tot,x4 = math_rules(O[0],A,BCDE)
#A,(B,C),(D,E)
    if p == 7:
        pID="--(---)-(---)"    
        BC,x1 = math_rules(O[1],B,C)
        DE,x2 = math_rules(O[3],D,E)
        ABC,x3 = math_rules(O[0],A,BC)
        tot,x4 = math_rules(O[2],ABC,DE)    
#A,(B,(C,D)),E
    if p == 8:
        pID="--(--(---))--"    
        CD,x1 = math_rules(O[2],C,D)
        BCD,x2 = math_rules(O[1],B,CD)
        ABCD,x3 = math_rules(O[0],A,BCD)
        tot,x4 = math_rules(O[3],ABCD,E)
#A,B,(C,(D,E))
    if p == 9:
        pID="----(--(---))"    
        DE,x1 = math_rules(O[3],D,E)
        CDE,x2 = math_rules(O[2],C,DE)
        AB,x3 = math_rules(O[0],A,B)
        tot,x4 = math_rules(O[1],AB,CDE)
#A,(B,C,(D,E))
    if p == 10:
        pID="--(----(---))"    
        DE,x1 = math_rules(O[3],D,E)
        BC,x2 = math_rules(O[1],B,C)
        BCDE,x3 = math_rules(O[2],BC,DE)
        tot,x4 = math_rules(O[0],A,BCDE)
#A,(B,(C,D,E))
    if p == 11:
        pID="--(--(-----))"    
        CD,x1 = math_rules(O[2],C,D)
        CDE,x2 = math_rules(O[3],CD,E)
        BCDE,x3 = math_rules(O[1],B,CDE)
        tot,x4 = math_rules(O[0],A,BCDE)        
#A,(B,(C,(D,E)))
    if p == 12:
        pID="--(--(--(---)))"
        DE,x1 = math_rules(O[3],D,E)
        CDE,x2 = math_rules(O[2],C,DE)
        BCDE,x3 = math_rules(O[1],B,CDE)
        tot,x4 = math_rules(O[0],A,BCDE)

    #check to see if all four operations passed, and return pass or fail.       
    if x1 == True and x2 == True and x3 == True and x4 == True:
            math_pass = True
    else:
            math_pass = False
            fail+=1
    #return the total number if passed and the parenthesis order/code        
    return tot, math_pass, fail,pID

#return values for random game and answer with specific number of possible correct answers. 
correct_sample, total_correct, possible_perms = main()
print total_correct, "/", possible_perms
for i in range(len(correct_sample)):
        print correct_sample[i]
        
#Here we can run the program several times to get correct answer results...
#x=[]        
#for i in range(100):
#    y = main()
#    x.append(y)
#print "done"    
