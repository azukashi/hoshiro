# VTubers API

An REST API application to get data about Virtual YouTubers.

Base URL: http://localhost:3000/api

## Available Routes

| Route           | Method | Parameters | Required | Examples               | Region |
| --------------- | ------ | ---------- | -------- | ---------------------- | ------ |
| `/id`           | GET    | -          | -        | `/id`                  | 🇮🇩     |
| `/id/active`    | GET    | -          | -        | `/id/active`           | 🇮🇩     |
| `/id/graduated` | GET    | -          | -        | `/id/graduated`        | 🇮🇩     |
| `/id/:handle`   | GET    | `/:handle` | Yes      | `/id/@amayaclorentine` | 🇮🇩     |
