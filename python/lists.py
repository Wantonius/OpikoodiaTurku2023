def main():
	mylist = ["apple","banana","orange","apple"]
    print(mylist)
    
    mylist.append("lemon")
    print(mylist)
    mylist_copy = mylist.copy()
    mylist.extend(mylist_copy)
    print(mylist)
    myslice = mylist[3:]
    print(mylist)
if __name__ == "__main__":
	main()