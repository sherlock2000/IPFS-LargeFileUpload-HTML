package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"net/http/httputil"
	"net/url"
)
func UploadPoxy(c echo.Context) error{
	remote, err := url.Parse("http://127.0.0.1:5001")
	if err != nil {
		panic(err)
	}
	proxy := httputil.NewSingleHostReverseProxy(remote)
	proxy.ServeHTTP(c.Response(), c.Request())
	return nil
}
func main() {

	// Echo instance
	e := echo.New()
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))
	//static pages
	e.Static("/static", "static")

	//Routers
	e.File("/", "view/index.html")
	e.Any("/api/v0/add",UploadPoxy)
	// Start server
	e.Logger.Fatal(e.Start(":80"))


}