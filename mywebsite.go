package mywebsite

import (
    "fmt"
	"html/template"
    "github.com/julienschmidt/httprouter"
    "net/http"
    "log"
	"google.golang.org/appengine"
	"google.golang.org/appengine/user"
)
var returnUrl = "/"
type values struct {
	Name string
}

func init() {
	//setup router
    router := httprouter.New()
    router.GET("/", index)
    router.GET("/hello/:name", hello)
	router.GET("/welcome", welcome)
	
	log.Println("")
	log.Println("Starting Server")
	
	fs := http.FileServer(http.Dir("static_resources"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.Handle("/", router)
	
	log.Println("Server Started")
}


func index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    t, _ := template.ParseFiles("index.html")
	vals := values{"Dakota Ewigman"}
    t.Execute(w, vals)
}

func hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
    fmt.Fprintf(w, "hello, %s!\n", ps.ByName("name"))
}
func welcome(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	w.Header().Set("Content-type", "text/html; charset=utf-8")
	ctx := appengine.NewContext(r)
	u := user.Current(ctx)
	
	if u == nil {
			url, _ := user.LoginURL(ctx, returnUrl)
			fmt.Fprintf(w, `<a href="%s">Sign in or register</a>`, url)
			return
	}
	url, _ := user.LogoutURL(ctx, returnUrl)
	fmt.Fprintf(w, `Welcome, %s! (<a href="%s">sign out</a>)`, u, url)
}