package scrapper

import (
	"context"
	"fmt"
	"log"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
)

func Scrap(url string) ([]string, error) {

	opts := append(chromedp.DefaultExecAllocatorOptions[:], chromedp.Headless)

	actx, acancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer acancel()

	ctx, cancel := chromedp.NewContext(actx, chromedp.WithLogf(log.Printf))
	defer cancel()

	var content []string
	var nodes []*cdp.Node

	if err := chromedp.Run(ctx, chromedp.Navigate(url), chromedp.Nodes("p", &nodes, chromedp.BySearch)); err != nil {
		log.Fatal(err)
		return []string{}, err
	}

	for _, n := range nodes {
		if len(n.Children) < 1 {
			break
		}
		content = append(content, fmt.Sprintf("%v", n.Children[0].NodeValue))
	}

	return content, nil
}
