# :trollface: VTubers API

RESTful API server to get all Southeast Asia Virtual YouTubers data without hassle by just providing their YouTube @handle.

Base URL: http://localhost:3000/api

> **Note**
> Please note that this is still under development. Any additions or breaking changes to the endpoints in future may happen.

## 🚦 Endpoints

| Route           | Method | Parameters | Required | Examples               | Region |
| --------------- | ------ | ---------- | -------- | ---------------------- | ------ |
| `/id`           | GET    | -          | -        | `/id`                  | 🇮🇩     |
| `/id/active`    | GET    | -          | -        | `/id/active`           | 🇮🇩     |
| `/id/graduated` | GET    | -          | -        | `/id/graduated`        | 🇮🇩     |
| `/id/:handle`   | GET    | `/:handle` | Yes      | `/id/@amayaclorentine` | 🇮🇩     |

## 💖 Credits

Thanks to [bun](https://bun.sh) for their super-fast runtime and [GitHub Codespaces](https://github.com/codespaces) for providing their fast developer environment.

## 📃 License

This project is licensed under [MIT License](./LICENSE).
