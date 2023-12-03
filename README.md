# VTubers API

RESTful API server to get all Southeast Asia Virtual YouTubers data by just providing their YouTube @handle.

Base URL: https://vtubers-api.cyclic.app/

> [!NOTE]
> Please note that this API is still under development. Breaking changes to the endpoints may happen.

## 🚦 Endpoints

Available regions: Indonesia (`id`), Malaysia (`my`), Singapore (`sg`), Vietnam (`vn`).

| Route                | Method | Parameters | Required | Examples               |
| -------------------- | ------ | ---------- | -------- | ---------------------- |
| `/:region`           | GET    | -          | -        | `/id`                  |
| `/:region/active`    | GET    | -          | -        | `/sg/active`           |
| `/:region/graduated` | GET    | -          | -        | `/my/graduated`        |
| `/:region/:handle`   | GET    | `/:handle` | Yes      | `/id/@amayaclorentine` |

## 🙌 Contributing

If you are interested in contributing to the data, please kindly wait for `POST` endpoints being developed. When it ready, you can directly contribute by just sending POST request to the API server.

## 💖 Credits

Thanks to [bun](https://bun.sh) for their super-fast runtime and [GitHub Codespaces](https://github.com/codespaces) for providing their fast developer environment.

## 📃 License

This project is licensed under [MIT License](./LICENSE).
