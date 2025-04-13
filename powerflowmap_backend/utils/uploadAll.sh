#!/bin/sh

# Brief:
#   This script will upload all data in `LOCAL_DATA_DIR`.
# Usage:
#   source ./uploadAll.sh tokyo 20240401 20240501
#   - 1: Area
#   - 2: Start Date
#   - 3: End Date (include this date)

AREA=$1
START_DATE=$2
END_DATE=$3

. ../.env

upload () {
echo $1
ftp -n <<END
open $FTP_SERVER
user $FTP_USER $FTP_PASS
cd ${SERVER_DATA_DIR}/${AREA}
lcd ${LOCAL_DATA_DIR}/${AREA}
mput $1
a
END
}

cd ${LOCAL_DATA_DIR}/${AREA}

FILE_LIST=""

for (( DATE=${START_DATE} ; ${DATE}<=${END_DATE} ; DATE=`date -d "${DATE} 1 day" '+%Y%m%d'` )) ; do
  if [ -e jisseki_${AREA}_${DATE}.csv ]; then
    FILE_LIST="${FILE_LIST} jisseki_${AREA}_${DATE}.csv"
  fi
done

upload "${FILE_LIST}"

cd ${SCRIPT_DIR}

