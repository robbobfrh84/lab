from random import randint
import operator
import itertools
from createOps import *


ops = {"+": operator.add, "-": operator.sub,"*": operator.mul, "/": operator.div}

p1 = []                 #create a list to hold all off the player 1 cards
crib = randint(1,9)
count,count1 = 0,0
correct, correct1 = {}, {}


for i in range(5):
    p1 += [float(randint(1,6))]

print "crib", crib

x = list(itertools.permutations(p1)) #creates a list all off arragments of cards
p1 = map(int, p1)

print "Player 1 cards", p1

for i in range(len(x)):
    A,B,C,D,E = x[i][0], x[i][1], x[i][2], x[i][3], x[i][4]
    for j in range(len(ops4)):
        o0, o1, o2, o3 = ops[ops4[j][0]], ops[ops4[j][1]], ops[ops4[j][2]], ops[ops4[j][3]]
        tot = o3((o2((o1((o0(A,B)),C)),D)),E)
        tot1 = o1((o0(B,C)), A)
        if tot == crib:
            correct[count] = (" ",int(A),ops4[j][0],int(B),ops4[j][1],int(C),
                              ops4[j][2],int(D),ops4[j][3],int(E),"=",int(tot)," ")
            correct[count] = map(str, correct[count])
            correct[count] = " ".join(correct[count])
            count += 1

        if tot1 == crib:
            correct1[count1] = (" ",int(A),ops4[j][0],int(B),ops4[j][1],int(C),
                              ops4[j][2],int(D),ops4[j][3],int(E),"=",int(tot1)," ")
            correct1[count1] = map(str, correct1[count1])
            correct1[count1] = " ".join(correct1[count1])

            count1 += 1

print "count, count1", count, count1

#for i in range(len(x)):
#    A,B,C,D,E = x[i][0], x[i][1], x[i][2], x[i][3], x[i][4]
#    for j in range(len(ops4)):
#        o0, o1, o2, o3 = ops[ops4[j][0]], ops[ops4[j][1]], ops[ops4[j][2]], ops[ops4[j][3]]
#        tot = o0(A+ o1(B,C) +
#        if tot == crib:
#            correct[count] = A,ops4[j][0],B,ops4[j][1],C,ops4[j][2],D,ops4[j][3],E,"=",tot
#            count += 1
