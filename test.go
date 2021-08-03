package main

import "fmt"

func main()  {
	for i := 2; i <= 5; i++ {
		for ii := 2; ii < i; ii++ {
			fmt.Println(i%ii,i,ii)
			if i%ii == 0 {
			}
			if i-ii==1 {
			}
		}
	}
}
