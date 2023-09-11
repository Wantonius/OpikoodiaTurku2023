def main():
    greet()
    add(5,10)
    substract()
    substract(50,25)
    result = find_sum(1,5,7,20,23)
    print("Sum is",result)
    print("Sum is",find_sum())
    num = 6
    print("Factorial of 6 is",factorial(6))

def greet():
    print("Hello World")
        
def add(a,b):
    result = a + b
    print("Sum is:",result)

def substract(a = 0, b = 0):
    result = a - b
    print("Result is:",result)
    
def find_sum(*numbers):
    result = 0
    
    for num in numbers:
        result = result + num
       
    return result

def factorial(num):
    
    if num == 1:
        return 1
    else:
        return (num * factorial(num-1))
    
if __name__ == "__main__":
	main()