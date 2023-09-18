import threading
from time import sleep
from random import randint

condition_value = 0

def worker(lock,id,value,condition):
    global condition_value
    with lock:
        print("{}: thread acquired lock".format(id))
        print("Will sleep for {}".format(value))
        sleep(value)
        condition_value = condition_value + 1
        if condition_value == 10:
            print("Last one. Notifying main")
            condition.notify()
    
def main():

    lock = threading.Lock()
    cond_lock = threading.Lock()
    condition = threading.Condition(lock)
    threads = []
    condition.acquire()
    for i in range(10):
        thread_id = threading.Thread(target=worker,args=(lock,i,randint(0,5),condition)).start()
        threads.append(thread_id)
    print("Main: Waiting for condition")
    condition.wait()
    print("Done")
    
    
if __name__ == "__main__":
    main()