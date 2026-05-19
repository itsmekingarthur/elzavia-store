@echo off
cd /d "C:\arthur\opencode\store\elzavia-store"
set PATH=C:\Program Files\nodejs;%PATH%
start "Elzavia Dev Server" /B npm run dev
