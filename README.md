# :trollface: VTubers API

RESTful API server to get all Southeast Asia Virtual YouTubers data without hassle by just providing their YouTube @handle.

Base URL: http://localhost:3000/api

> **Note**
> Please note that this is still under development. Any additions or breaking changes to the endpoints in future may happen.

## 🚦 Endpoints

Available regions: Indonesia (`id`), Malaysia (`my`), Singapore (`sg`), Vietnam (`vn`).

| Route                | Method | Parameters | Required | Examples               |
| -------------------- | ------ | ---------- | -------- | ---------------------- |
| `/:region`           | GET    | -          | -        | `/id`                  |
| `/:region/active`    | GET    | -          | -        | `/sg/active`           |
| `/:region/graduated` | GET    | -          | -        | `/my/graduated`        |
| `/:region/:handle`   | GET    | `/:handle` | Yes      | `/id/@amayaclorentine` |

## 💖 Credits

Thanks to [bun](https://bun.sh) for their super-fast runtime and [GitHub Codespaces](https://github.com/codespaces) for providing their fast developer environment.

## 📃 License

This project is licensed under [MIT License](./LICENSE).
