FROM python:3.12-alpine AS builder

RUN apk add --no-cache build-base curl gcc musl-dev libffi-dev openssl-dev && \
    pip install --no-cache-dir poetry

WORKDIR /app
ENV POETRY_VIRTUALENVS_CREATE=false

COPY pyproject.toml poetry.lock ./

RUN poetry install --only main --no-interaction --no-ansi

FROM python:3.12-alpine AS production

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY --from=builder /usr/local/bin /usr/local/bin

COPY manage.py ./
COPY demo/ ./demo/

ENV PYTHONOPTIMIZE=1
ENV PYTHONDONTWRITEBYTECODE=1

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
