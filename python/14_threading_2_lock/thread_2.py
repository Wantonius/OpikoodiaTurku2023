from time import sleep
from random import randint
from threading import Thread
from threading import Lock

def task(lock, id, value):
    with lock:
        print("{} thread acquiring lock".format(id))
        print("Will sleep for {} seconds".format(value))
        sleep(value)
        
def main():
    lock = Lock()
    
    for i in range(10):
        Thread(target=task,args=(lock,i,randint(0,5))).start()
        
        
if __name__ == "__main__":
    main()