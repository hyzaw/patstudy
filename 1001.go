package main

import "fmt"

func main() {
	var num int
	_, err := fmt.Scan(&num)
	if err != nil {
		return
	}
	//fmt.Printf("%v",num)
	i := 0
	for {
		if num == 1 {
			break
		}
		if num%2 == 0 {
			num = num / 2
		} else {
			num = (3*num + 1) / 2
		}
		i++
	}
	fmt.Println(i)
}
