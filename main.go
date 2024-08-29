package main

import (
	"web-scrapper/scrapper"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Body struct {
	Url string `json:"url"`
}

func main() {

	app := fiber.New()
	app.Use(cors.New())
	app.Static("/", "./public")
	app.Post("/scrap", func(c *fiber.Ctx) error {
		var payload Body
		if err := c.BodyParser(&payload); err != nil {
			return err
		}

		log.Info("Scrapping : %v", payload.Url)
		content, err := scrapper.Scrap(payload.Url)
		if err != nil {
			return c.JSON(err)
		}
		log.Info("Success : %v", payload.Url)
		return c.JSON(content)
	})
	app.Listen(":3000")
}
