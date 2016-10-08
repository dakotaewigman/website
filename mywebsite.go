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

type values struct {
	Name string
	Count    uint
}
var returnUrl = "/"

func index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

    t, _ := template.ParseFiles("index.html")
	
	vals := values{"Dakota Ewigman", 10}
    t.Execute(w, vals)
}

func hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
    fmt.Fprintf(w, "hello, %s!\n", ps.ByName("name"))
}

func init() {
	fs := http.FileServer(http.Dir("static_resources"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	
    router := httprouter.New()
    router.GET("/", index)
    router.GET("/hello/:name", hello)
	log.Println("")
	log.Println("starting")
	log.Println("")
	
	http.Handle("/", router)
	http.HandleFunc("/welcome", welcome)
}
func welcome(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "text/html; charset=utf-8")
	ctx := appengine.NewContext(r)
	u := user.Current(ctx)
	log.Println("")
	log.Println(u)
	if u == nil {
			url, _ := user.LoginURL(ctx, returnUrl)
			fmt.Fprintf(w, `<a href="%s">Sign in or register</a>`, url)
			return
	}
	url, _ := user.LogoutURL(ctx, returnUrl)
	fmt.Fprintf(w, `Welcome, %s! (<a href="%s">sign out</a>)`, u, url)
}