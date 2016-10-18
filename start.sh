PORT="9090"
ARCH="i386"
SERVICENAME=`pwd | grep -o '[^/]*$' | tr '[:upper:]' '[:lower:]'`

docker build -t $SERVICENAME -f Dockerfile-$ARCH .
docker run -t -i -p $PORT:9090 -v $PWD:/datas $SERVICENAME
