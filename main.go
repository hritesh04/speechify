package main

import (
	"web-scrapper/scrapper"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Body struct{
	Url string `json:"url"`
}

func main() {

	app := fiber.New()
	app.Use(cors.New())
	app.Static("/","./public")
	app.Post("/scrap", func(c *fiber.Ctx) error {
		var payload Body
		if err := c.BodyParser(&payload); err != nil {
			return err
		}

		content := scrapper.Scrap(payload.Url)
	
		return c.JSON(content)
	})
	app.Listen(":3000")
}