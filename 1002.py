num = list(input())

sum = 0

for i in num:
    sum += int(i)
sum = str(sum)

str = ""

list = list(sum)
len = len(list)

for i in range(len - 1):
    if list[i] == "0":
        str = str + "ling "
    elif list[i] == "1":
        str = str + "yi "
    elif list[i] == "2":
        str = str + "er "
    elif list[i] == "3":
        str = str + "san "
    elif list[i] == "4":
        str = str + "si "
    elif list[i] == "5":
        str = str + "wu "
    elif list[i] == "6":
        str = str + "liu "
    elif list[i] == "7":
        str = str + "qi "
    elif list[i] == "8":
        str = str + "ba "
    elif list[i] == "9":
        str = str + "jiu "

if list[-1] == "0":
    str = str + "ling"
elif list[-1] == "1":
    str = str + "yi"
elif list[-1] == "2":
    str = str + "er"
elif list[-1] == "3":
    str = str + "san"
elif list[-1] == "4":
    str = str + "si"
elif list[-1] == "5":
    str = str + "wu"
elif list[-1] == "6":
    str = str + "liu"
elif list[-1] == "7":
    str = str + "qi"
elif list[-1] == "8":
    str = str + "ba"
elif list[-1] == "9":
    str = str + "jiu"

print(str)
