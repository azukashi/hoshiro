# VTubers API

An REST API application to get data about Virtual YouTubers.

## Available Routes

| Route           | Method | Parameters | Required |
| --------------- | ------ | ---------- | -------- |
| `/id`           | GET    | -          | -        |
| `/id/active`    | GET    | -          | -        |
| `/id/graduated` | GET    | -          | -        |
| `/id/:handle`   | GET    | `:handle`  | Yes      |
