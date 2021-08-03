num = int(input(""))

step = 0

while num != 1:
    if num % 2 == 0:
        num = num / 2
    else:
        num = (3 * num + 1) / 2
    step += 1

print(step)
