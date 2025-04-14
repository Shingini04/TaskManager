#!/bin/bash

echo "🔥 Script started!"

# Start server
echo "Starting GraphQL server..."
cd server
npm run dev &
SERVER_PID=$!

# Start client
echo "Starting React client..."
cd ../client
npm start &
CLIENT_PID=$!

# Function to clean up on exit
function cleanup {
  echo "🛑 Stopping server and client..."
  kill $SERVER_PID
  kill $CLIENT_PID
  exit
}

# Trap Ctrl+C (SIGINT) to trigger cleanup
trap cleanup SIGINT

# Wait for user to press Ctrl+C
echo "✅ Both server and client are running. Press Ctrl+C to stop."
wait

