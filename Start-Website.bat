@echo off
title Kidzee Globus International School Website
echo Starting Kidzee Globus local web server...
start "" "http://localhost:3000/"
node "%~dp0serve.cjs"
pause
