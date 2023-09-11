def main():
    number = 0
    if number > 0:
        print("Number is positive")
    
    elif number == 0:
        print("Number is zero")
    
    else:
        print("Number is negative")

    for x in 'Python':
        print(x)

    values = range(4)
    
    for i in values:
        print(i)
    
    numbers = [0,1,2,5]
    
    for j in numbers:
        print(j)
    else:
        print("done")
        
    i = 1
    n = 5
    
    while i <= n:
        print(i)
        i = i + 1
    
    counter = 0
    
    while counter < 3:
        if counter == 1:
            break
        print("Inside loop")
        counter = counter + 1
    else:
        print("Done")

    a = 0
    
    if a == 0:
       pass
       
if __name__ == "__main__":
	main()