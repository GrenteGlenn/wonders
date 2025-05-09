# Reverse Proxy

Here's a simple reverse-proxy for the dev environment : Caddy ! 

🎉🎉 No more microservices ports merge conficts 🎉🎉

## Installation

### linux : 
```sh
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

### Mac :
```sh
brew install caddy
```

## Usage

### Start

```sh
cd back/
caddy start
```
Done !

### Stop

from anywhere :
```sh
caddy stop
```

## Register a new microservice

In the `back/Caddyfile` file, simply add :

```
<<MICROSERVICE_NAME>>.localhost:80 {
	reverse_proxy localhost:<<MICROSERVICE_PORT>>
}

```