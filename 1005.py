num = int(input(""))
num2 = input("").split(" ")

temp = []
key = []
temp_list = []


for i in num2:
    temp = []
    i = int(i)
    while i != 1:
        temp.append(int(i))
        if i % 2 == 0:
            i = i / 2
        else:
            i = (3 * i + 1) / 2
    temp_list.append(temp)

for i in num2:
    i = int(i)
    numinit = 0
    # print(temp_list)
    for elist in temp_list:
        lenth = len(elist)
        for num3 in range(1, lenth):
            # print(num3)
            if i == elist[num3]:
                numinit = 1

    if numinit == 0 and i not in key:
        key.append(i)
    # print("------------------------")
key.sort()
key.reverse()
key=str(key)
key=key.replace("[","").replace("]","").replace(",","")
print(key)
