package main

import (
	"fmt"
	"strconv"
)

func main() {
	var (
		num int
		b   int
		s   int
		g   int
		str string
	)
	_, err := fmt.Scan(&num)
	if err != nil {
		return
	}
	b = num / 100
	s = (num - 100*b) / 10
	g = num - 100*b - 10*s
	for i := 0; i < b; i++ {
		str = str + "B"
	}
	for i := 0; i < s; i++ {
		str = str + "S"
	}
	for i := 1; i <= g; i++ {
		str = str + strconv.Itoa(i)
	}
	fmt.Println(str)
}
