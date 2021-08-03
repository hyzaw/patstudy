package main

import (
	"fmt"
)

func main() {
	var (
		count     int
		num       int
	)
	_, err := fmt.Scan(&count, &num)
	if err != nil {
		return
	}
	data:=make([]int,0,100)
	for i:=0;i<count;i++ {
		fmt.Scanf("%d",&data[i])
	}
	fmt.Printf("%v", data)
}
