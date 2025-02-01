#!/bin/sh

# Usage:
#   source ./fetchNotExistingFileAll.sh tokyo 20240401 20240501 /path/to/dirSeek
#   - 1: Area
#   - 2: Start Date
#   - 3: End Date (include this date)
#   - 4: Seek Directory: seek missing files in this directory

AREA=$1
START_DATE=$2
END_DATE=$3
SEEK_DIR=$4

SCRIPT_DIR=$(cd $(dirname $0) && pwd)  # directory where this script is saved

cd ${SEEK_DIR}/${AREA}

for (( DATE=${START_DATE} ; ${DATE}<=${END_DATE} ; DATE=`date -d "${DATE} 1 day" '+%Y%m%d'` )) ; do
  if [ ! -e jisseki_${AREA}_${DATE}.csv ]; then  # if not exist
    cd ${SCRIPT_DIR}
    ../venv/bin/python ../jissekiFetcher.py ${DATE} ${AREA}
    cd ${SEEK_DIR}/${AREA}
  fi  
done

cd ${SCRIPT_DIR}

