package main

import (
	"bufio"
	"bytes"
	"context"
	"fmt"
	"html/template"
	"log"
	"os"

	"google.golang.org/api/sheets/v4"
)

func main() {

	//Reach API
	ctx := context.Background()
	sheetsService, err := sheets.NewService(ctx)

	if err != nil {
		log.Fatalf("Unable to retrieve Sheets client: %v", err)
	}

	// Spreadsheet Stuff
	spreadsheetId := "1cr0Id2OYiZOBZAr9GCiP6RTCPe722SU6mmpTb_Bg7Wc"
	readRange := "Summary!A1:B5"
	resp, err := sheetsService.Spreadsheets.Values.Get(spreadsheetId, readRange).Do()
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
		}{
			Day:     fmt.Sprintf("%s", resp.Values[0][0]),
			Note:    fmt.Sprintf("%s", resp.Values[1][0]),
			Period:  fmt.Sprintf("%s %s", resp.Values[2][0], resp.Values[2][1]),
			Fertile: fmt.Sprintf("%s %s", resp.Values[3][0], resp.Values[3][1]),
			PMS:     fmt.Sprintf("%s %s", resp.Values[4][0], resp.Values[4][1]),
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
