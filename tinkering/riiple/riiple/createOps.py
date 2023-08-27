import itertools

allOps = list("**++--//")
allp2 = []
ops = []
ops4 = []

allp = list(itertools.permutations(allOps))
for i in range(len(allp)): allp2.append([allp[i][0], allp[i][1]])
for i in range(len(allp2)):
    if allp2[i] not in ops: 
        ops.append(allp2[i])

for i in range(len(ops)):
    for j in range(len(ops)):
        ops4.append([ops[i][0], ops[i][1], ops[j][0], ops[j][1]])
