

export AWS_PROFILE=nucypher

BUCKET=s3://nc-nuit
URL=https://stake.nucypher.community
if [[ $1 == production ]]; then
    BUCKET=s3://nc-nuit-production
    URL=https://stake.nucypher.com
fi

echo "pushing local react/build to $BUCKET"
aws s3 sync packages/react-app/build $BUCKET --delete

countdown() {
    secs=$1
    shift
    msg=$@
    while [ $secs -gt 0 ]
    do
    printf "\r\033[KWaiting %.d seconds $msg" $((secs--))
        sleep 1
    done
    echo
}

countdown 5 "opening browser to $URL"
if read -r -s -n 1 -t 5 -p #key in a sense has no use at all
then
    echo "aborted"
else

    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        [[ -x $BROWSER ]] && exec "$BROWSER" "$URL"
        path=$(which xdg-open || which gnome-open) && exec "$path" "$URL"
        # ...
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        if [[ -x "$BROWSER" ]]; then
            open -a "$BROWSER" "$URL"
        elif open -Ra "safari" ; then
            open -a safari "$URL"
        else
            echo "Can't find any browser configure one by 'export BROWSER=<a path to a browser>"
        fi
    fi
fi

