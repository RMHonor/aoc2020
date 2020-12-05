package main

import (
	"fmt"
	"io/ioutil"
	"sort"
	"strings"
)

func main() {
	dat, err := ioutil.ReadFile("./day5.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	seats := make([]int, len(lines)-1)

	for _, line := range lines[:len(lines)-1] {
		row := 0
		for _, operator := range line[:7] {
			row <<= 1
			if operator == 'B' {
				row |= 1
			}
		}
		column := 0
		for _, operator := range line[7:10] {
			column <<= 1
			if operator == 'R' {
				column |= 1
			}
		}

		seats = append(seats, row*8+column)
	}

	sort.Ints(seats)

	fmt.Printf("Part 1: %d\n", seats[len(seats)-1])

	for i, seat := range seats {
		if seat-seats[i+1] == -2 {
			fmt.Printf("Part 2: %d\n", seat+1)
			return
		}
	}
}
