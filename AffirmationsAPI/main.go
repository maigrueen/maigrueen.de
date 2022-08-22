package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

type Affirmation struct {
	Id      string `json:"Id"`
	Content string `json:"content"`
}

var Affirmations []Affirmation

func returnAllAffirmations(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Affirmations)
}

func returnSingleAffirmation(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]

	for _, affirmation := range Affirmations {
		if affirmation.Id == key {
			json.NewEncoder(w).Encode(affirmation)
		}
	}
}

func returnRandomAffirmation(w http.ResponseWriter, r *http.Request) {
	max := len(Affirmations) - 1
	key := rand.Intn(max-1) + 1

	for _, affirmation := range Affirmations {
		if affirmation.Id == strconv.Itoa(key) {
			json.NewEncoder(w).Encode(affirmation)
		}
	}
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	version := "/api/v1"

	myRouter.HandleFunc(version+"/", homePage)
	myRouter.HandleFunc(version+"/all", returnAllAffirmations)
	myRouter.HandleFunc(version+"/affirmation/{id}", returnSingleAffirmation)
	myRouter.HandleFunc(version+"/random", returnRandomAffirmation)

	log.Fatal(http.ListenAndServe(":210120", myRouter))
}

func main() {
	Affirmations = []Affirmation{
		Affirmation{Id: "1", Content: "Everything I need is within myself."},
		Affirmation{Id: "2", Content: "I accept myself exactly as I am."},
		Affirmation{Id: "3", Content: "I am a kind person."},
		Affirmation{Id: "4", Content: "I am a passionate human."},
		Affirmation{Id: "5", Content: "I am able to love unconditionally."},
		Affirmation{Id: "6", Content: "I am able to love."},
		Affirmation{Id: "7", Content: "I am allowed to be different."},
		Affirmation{Id: "8", Content: "I am at peace with my past."},
		Affirmation{Id: "9", Content: "I am attracting all of the love I dream of and deserve."},
		Affirmation{Id: "10", Content: "I am beautiful and loved."},
		Affirmation{Id: "11", Content: "I am brave."},
		Affirmation{Id: "12", Content: "I am desirable."},
		Affirmation{Id: "13", Content: "I am doing the best I can, and it is enough."},
		Affirmation{Id: "14", Content: "I am doing the right thing."},
		Affirmation{Id: "15", Content: "I am exactly where I should be."},
		Affirmation{Id: "16", Content: "I am grateful to exist."},
		Affirmation{Id: "17", Content: "I am grateful."},
		Affirmation{Id: "18", Content: "I am in perfect balance."},
		Affirmation{Id: "19", Content: "I am inspiring others."},
		Affirmation{Id: "20", Content: "I am peaceful and focused."},
		Affirmation{Id: "21", Content: "I am powerful, and I use my power for doing good."},
		Affirmation{Id: "22", Content: "I am speaking up for myself and for others."},
		Affirmation{Id: "23", Content: "I am surrounded by the love and support of my ancestors."},
		Affirmation{Id: "24", Content: "I am unique and important."},
		Affirmation{Id: "25", Content: "I am worthy of abundance."},
		Affirmation{Id: "26", Content: "I believe in me."},
		Affirmation{Id: "27", Content: "I can accept compliments."},
		Affirmation{Id: "28", Content: "I can comfortably express my sexual energy and desire."},
		Affirmation{Id: "29", Content: "I can do anything I set my mind to."},
		Affirmation{Id: "30", Content: "I can make a difference."},
		Affirmation{Id: "31", Content: "I choose faith over fear."},
		Affirmation{Id: "32", Content: "I choose to enjoy every moment."},
		Affirmation{Id: "33", Content: "I create mindful moments."},
		Affirmation{Id: "34", Content: "I deserve a break."},
		Affirmation{Id: "35", Content: "I deserve respect."},
		Affirmation{Id: "36", Content: "I deserve to have my boundaries respected."},
		Affirmation{Id: "37", Content: "I do not compare myself to others."},
		Affirmation{Id: "38", Content: "I do not have to prove myself to anyone."},
		Affirmation{Id: "39", Content: "I don’t have to apologize for who I am."},
		Affirmation{Id: "40", Content: "I have the power to create the life I want."},
		Affirmation{Id: "41", Content: "I have the power to give compliments."},
		Affirmation{Id: "42", Content: "I have the power to shift my mindset."},
		Affirmation{Id: "43", Content: "I know that everything will be alright in the end."},
		Affirmation{Id: "44", Content: "I learn and grow from my mistakes."},
		Affirmation{Id: "45", Content: "I let go of all expectations."},
		Affirmation{Id: "46", Content: "I let go of limiting beliefs."},
		Affirmation{Id: "47", Content: "I let my soul shine."},
		Affirmation{Id: "48", Content: "I like my body because it serves me."},
		Affirmation{Id: "49", Content: "I make my environment better."},
		Affirmation{Id: "50", Content: "I minimize the noise and distractions around me."},
		Affirmation{Id: "51", Content: "I open myself for inspiration."},
		Affirmation{Id: "52", Content: "I protect my energy and use it for good."},
		Affirmation{Id: "53", Content: "I radiate confidence."},
		Affirmation{Id: "54", Content: "I set healthy boundaries."},
		Affirmation{Id: "55", Content: "I set intentions and pursue them as good as I can."},
		Affirmation{Id: "56", Content: "I stand in my truth and show up with authenticity."},
		Affirmation{Id: "57", Content: "I take all the time that I need."},
		Affirmation{Id: "58", Content: "I trust my inner voice."},
		Affirmation{Id: "59", Content: "I use my talents for doing good."},
		Affirmation{Id: "60", Content: "I will do the things I want to do, even if I can’t do them perfectly."},
		Affirmation{Id: "61", Content: "I will take care of myself."},
		Affirmation{Id: "62", Content: "My fearless freedom lights up the world."},
		Affirmation{Id: "63", Content: "The boundaries I set for myself will benefit me and the ones around me."},
		Affirmation{Id: "64", Content: "The challenges I’ve overcome have made me stronger and more compassionate."},
		Affirmation{Id: "65", Content: "What I have to say matters."},
		Affirmation{Id: "66", Content: "What is meant for me will come to me."},
		Affirmation{Id: "67", Content: "I am proud of myself and the things that I have done."},
		Affirmation{Id: "68", Content: "Everyone is the confirmation of the possiblities of the universe, and so am I."},
	}
	handleRequests()
}
