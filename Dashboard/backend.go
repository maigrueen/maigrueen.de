package main

import (
	"bufio"
	"bytes"
	"fmt"
	"html/template"
	"log"
	"os"
	"time"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/jwt"
	"google.golang.org/api/sheets/v4"
)

func main() {

	// Create a JWT configurations object for the Google service account
	conf := &jwt.Config{
		Email:        "github-deployment@dashboard-350519.iam.gserviceaccount.com",
		PrivateKey:   []byte("-----BEGIN PRIVATE KEY-----\thisismykey-----END PRIVATE KEY-----\n"),
		PrivateKeyID: "myid",
		TokenURL:     "https://oauth2.googleapis.com/token",
		Scopes: []string{
			"https://www.googleapis.com/auth/spreadsheets.readonly",
		},
	}

	client := conf.Client(oauth2.NoContext)

	// Create a service object for Google sheets
	srv, err := sheets.New(client)
	if err != nil {
		log.Fatalf("Unable to retrieve Sheets client: %v", err)
	}

	// Spreadsheet Stuff
	spreadsheetId := "1QdIWv_HQP3Mw8BCuqEknCkD-dqUDP_J7WkDnMZeV0wo"
	readRange := "Summary!A1:B5"
	resp, err := srv.Spreadsheets.Values.Get(spreadsheetId, readRange).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve data from sheet: %v", err)
	}

	if len(resp.Values) == 0 {
		fmt.Println("No data found.")
	} else {
		data := struct {
			Day     string
			Note    string
			Period  string
			Fertile string
			PMS     string
			Date    time.Time
		}{
			Day:     fmt.Sprintf("%s %s", resp.Values[0][0], resp.Values[0][1]),
			Note:    fmt.Sprintf("%s %s", resp.Values[1][0], resp.Values[1][1]),
			Period:  fmt.Sprintf("%s %s", resp.Values[2][0], resp.Values[2][1]),
			Fertile: fmt.Sprintf("%s %s", resp.Values[3][0], resp.Values[3][1]),
			PMS:     fmt.Sprintf("%s %s", resp.Values[4][0], resp.Values[4][1]),
			Date:    time.Now(),
		}

		//to HTML stuff
		template := template.Must(template.New("").ParseFiles("index.gohtml"))

		var processed bytes.Buffer
		template.ExecuteTemplate(&processed, "index.gohtml", data)

		outputPath := "./index.html"
		f, _ := os.Create(outputPath)
		w := bufio.NewWriter(f)
		w.WriteString(string(processed.String()))
		w.Flush()
	}

}
