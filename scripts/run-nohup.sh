#!/bin/zsh

set -euo pipefail

PROJECT_DIR="/Users/choeyugyeong/Desktop/globalbuddy"
JAR_PATH="$PROJECT_DIR/build/libs/globalbuddy-0.0.1-SNAPSHOT.jar"
LOG_PATH="$PROJECT_DIR/app-nohup.log"
PID_PATH="$PROJECT_DIR/backend.pid"
ENV_PATH="$PROJECT_DIR/src/.env"

cd "$PROJECT_DIR"

if [[ ! -f "$JAR_PATH" ]]; then
  echo "JAR not found: $JAR_PATH"
  exit 1
fi

if [[ ! -f "$ENV_PATH" ]]; then
  echo "Env file not found: $ENV_PATH"
  exit 1
fi

if [[ -f "$PID_PATH" ]]; then
  OLD_PID="$(cat "$PID_PATH")"
  if [[ -n "$OLD_PID" ]] && kill -0 "$OLD_PID" 2>/dev/null; then
    echo "Stopping existing backend process: $OLD_PID"
    kill "$OLD_PID"
    sleep 2
  fi
  rm -f "$PID_PATH"
fi

set -a
source "$ENV_PATH"
set +a

export MAIL_USERNAME="xyukyeong@gmail.com"
export MAIL_PASSWORD="rhoq chop xnui mxxv"

nohup java -jar "$JAR_PATH" > "$LOG_PATH" 2>&1 &
NEW_PID=$!
echo "$NEW_PID" > "$PID_PATH"

sleep 3

if kill -0 "$NEW_PID" 2>/dev/null; then
  echo "Backend started with PID $NEW_PID"
  echo "Log: $LOG_PATH"
else
  echo "Backend failed to stay up. Check $LOG_PATH"
  exit 1
fi
