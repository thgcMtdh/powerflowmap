#!/bin/sh

echo "$(date '+%Y/%m/%d %H:%M:%S') fetchAndUpload.sh invoked."

# Fetch jisseki data
./venv/bin/python ./jissekiFetcher.py

# Set variables
. ./.env
today=$(TZ=UTC-9 date '+%Y%m%d')  # YYYYMMDD

# Function to upload data via FTP
# Usage: upload <area>
upload () {
ftp -n <<END
open $FTP_SERVER
user $FTP_USER $FTP_PASS
cd ${SERVER_DATA_DIR}/$1
lcd ${LOCAL_DATA_DIR}/$1
put jisseki_$1_${today}.csv
END
}

# Upload specified area
upload tokyo
upload kyushu

echo Fetch and upload completed!