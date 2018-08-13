How to quickly setup a static file server?
------------------------------------------

### Node / Npm

```bash
npm install http-server -g
```

To use it:

```
cd D:\Folder
http-server
```

Or, like this:

```bash
http-server D:\Folder
```

### Python

```bash
python -m SimpleHTTPServer
```

or

```bash
python3 -m http.server
```

### Golang

create file web-server.go

```golang
package main

import (
  "net/http"
  "fmt"
)

func ping(w http.ResponseWriter, r *http.Request) {
  w.Write([]byte("pong"))
}

func main() {
  http.Handle("/", http.FileServer(http.Dir("./public")))
  http.HandleFunc("/ping", ping)
  fmt.Printf("listening on port 8080\n");
  if err := http.ListenAndServe(":8080", nil); err != nil {
    panic(err)
  }
}
```

run

```golang
go run web-server.go
```

