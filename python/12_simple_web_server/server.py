import socket
import os
def handle_request(request):
    
    headers = request.split('\n')
    filename = headers[0].split()[1]
    
    if filename == "/":
        filename = "/index.html"
    
    try:
        fin=open("public"+filename,"r")
        content = fin.read()
        fin.close()
        
        response = "HTTP/1.0 200 OK\nContent-Type:text/html\n\n"+content
    except:
        response = "HTTP/1.0 404 NOT FOUND\n\nFile not found\n\n"
        
    return response

def main():
    print(os.getcwd())
    SERVER_ADDRESS = "127.0.0.1"
    SERVER_PORT = 8080
    
    server_socket = socket.socket()
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server_socket.bind((SERVER_ADDRESS,SERVER_PORT))
    server_socket.listen(1)
    print("Listening in port",SERVER_PORT)
    while True:
        conn,address = server_socket.accept()
        
        request = conn.recv(1024).decode()
        print(request)
        if not request:
            continue
        response = handle_request(request)
        conn.sendall(response.encode())
        
        conn.close()
        
     #server_socket.close()

if __name__ == "__main__":
	main()