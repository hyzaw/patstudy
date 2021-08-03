import re

count = int(input())
list1 = []
for i in range(count):
    list1.append(input())


def main(str):
    p = 0
    t = 0
    a = 0
    listed = list(str)
    for i in listed:
        if i == "P":
            p += 1
            if p == 2:
                return "NO"
        elif i == "T":
            t += 1
            if t == 2:
                return "NO"
        elif i == "A":
            pass
        else:
            return "NO"
    try:
        PAT = re.findall(r"PA(.*)T", str)[0]
        listed = list(PAT)
        for i in listed:
            if i != "A":
                return "NO"
            else:
                a += 1
                if a == 2:
                    return "NO"
        a = re.findall(r"(.*)P.*T", str)[0]
        b = re.findall(r"P.*T(.*)", str)[0]
        if a != b and a + a != b:
            return "NO"
    except:
        return "NO"
    return "YES"


for i in list1:
    print(main(i))
