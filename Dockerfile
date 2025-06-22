FROM python:3.10-slim

WORKDIR /backend
ENV SERVER=server.py
ENV SERVER_RUN_HOST=0.0.0.0
COPY source dest