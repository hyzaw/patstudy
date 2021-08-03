package main

import (
	"fmt"
	"strconv"
	"time"
)

func calc(n int, sushu1 []int) bool {
	for _, value := range sushu1 {
		if n%value == 0 {
			return false
		}
	}
	for ii := sushu1[len(sushu1)-1]; ii*ii <= n; ii = ii + 2 {
		if n%ii == 0 {
			return false
		}
	}
	return true
}

func main() {
	var (
		num    int
		//result int
	)
	_, err := fmt.Scan(&num)
	if err != nil {
		return
	}
	sushu := make([]int, 0, 30000)
	t1:=time.Now()
	if num >= 2 {
		sushu = append(sushu, 2)
	}
	for i := 2; i <= num; i++ {
		if calc(i,sushu){
			sushu = append(sushu, i)
		}
	}
	println(strconv.Itoa(len(sushu)))
	elapsed := time.Since(t1)
	fmt.Println("App elapsed: ", elapsed)
	//for index, value := range sushu {
	//	if index >= 2 {
	//		if value-sushu[index-1] == 2 {
	//			result++
	//		}
	//	}
	//}
	//fmt.Println(strconv.Itoa(result))
}
