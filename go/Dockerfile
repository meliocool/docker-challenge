FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o service .

FROM scratch

EXPOSE 8080

COPY --from=builder /app/service /service

CMD ["/service"]