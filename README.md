# Hoshiro

Hoshiro is an RESTful API server to get all Southeast Asia (SEA) Virtual YouTubers data.

Base URL: https://vtubers-api.falcxxdev.cyou

> [!NOTE]
> Please note that this API is still under development. Breaking changes to the endpoints may happen.

## 🚦 Endpoints

Available regions: Indonesia (`id`), Malaysia (`my`), Singapore (`sg`).

| Route                | Method | Parameters             | Required | Examples               |
| -------------------- | ------ | ---------------------- | -------- | ---------------------- |
| `/auth/register`     | POST   | `username`, `password` | Yes      | `johndoe`, `john123`   |
| `/auth/login`        | POST   | `username`, `password` | Yes      | `johndoe`, `john123`   |
| `/:region`           | GET    | -                      | -        | `/id`                  |
| `/:region`           | POST   | `...`                  | Yes      | `/id`                  |
| `/:region`           | PATCH  | `...`                  | Yes      | `/id`                  |
| `/:region/active`    | GET    | -                      | -        | `/sg/active`           |
| `/:region/graduated` | GET    | -                      | -        | `/my/graduated`        |
| `/:region/:handle`   | GET    | `/:handle`             | Yes      | `/id/@amayaclorentine` |

## 🙌 Contributing

If you are interested in contributing to the data, please kindly wait for `POST` endpoints being developed. When it ready, you can directly contribute by just sending POST request to the API server.

## 💖 Thanks to

-   [Bun.sh](https://bun.sh) for their super-fast runtime
-   [GitHub Codespaces](https://github.com/codespaces) and [Project IDX](https://idx.dev) for providing their fast developer environment
-   [@BayuDC](https://github.com/BayuDC) for offering his VPS to host this RESTful API

## 📃 License

This project is licensed under [MIT License](./LICENSE).
