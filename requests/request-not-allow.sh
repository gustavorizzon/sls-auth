HOST=http://127.0.0.1:3000

TOKEN=$(curl -X POST \
  --silent \
  -H 'Content-Type: application/json' \
  --data '{"username":"Ronaldinho","password":"1234567"}' \
  $HOST/dev/login \
  | jq '.accessToken' \
  | sed 's/"//g'
)

echo "Token: $TOKEN"
echo

curl --silent $HOST/dev/public | xargs echo "Public API: $1"

curl --silent -H "Authorization:$TOKEN" $HOST/dev/private | xargs echo "Private API: $1"
