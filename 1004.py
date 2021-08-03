count = int(input())
data = []

for i in range(count):
    data.append(input().split(" "))

scores = []

for i in data:
    scores.append(int(i[2]))

scores.sort()
lowest = scores[0]
highest = scores[-1]

for i in data:
    if int(i[2])==highest:
        print(i[0],i[1])

for i in data:
    if int(i[2])==lowest:
        print(i[0],i[1])