#!/usr/bin/env bash

# Setze Default-Port auf 8000, falls PORT nicht gesetzt ist
: "${PORT:=5000}"

uvicorn main:app --host 0.0.0.0 --port "$PORT"

