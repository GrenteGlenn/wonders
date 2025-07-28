PREFIX_BACK = ./back/
SERVICES = blog_wonders countries_wonders fly_hotel_wonders quiz_wonders users_wonders activities_wonders 
FRONT = ./front/wonders-web/

.PHONY: db-all-services start-front all kill-ports caddy-start caddy-stop

# Lance tous les container docker pour le Back
start-docker:
	@echo "🚀 Starting docker"

# Tuer les processus qui occupent les ports 3000 à 3010
kill-ports:
	@echo "🚫 Killing ports 3000 à 3005..."
	@for port in 3000 3001 3002 3003 3004 3005 4200; do \
		if lsof -ti:$$port > /dev/null 2>&1; then \
			kill -9 $$(lsof -ti:$$port) 2>/dev/null || true; \
			echo "❌ Killed port $$port"; \
		fi \
	done

# Stop Caddy
caddy-stop:
	echo "🚫 Stoping Caddy"; \
	if [ -d "$(PREFIX_BACK)$$service" ]; then \
		(cd $(PREFIX_BACK) && make caddy-start) || echo "⚠️ Failed to start Caddy"; \
	else \
        echo "⚠️ Caddy directory $(PREFIX_BACK) does not exist. Skipping."; \
    fi

# Lancer make db sans démarrer le service
db-only-services:
	@for service in $(SERVICES); do \
		echo "🔄 Running db setup for $$service..."; \
		if [ -d "$(PREFIX_BACK)$$service" ]; then \
			(cd $(PREFIX_BACK)$$service && make db-setup) || echo "⚠️ Failed for $$service"; \
		else \
			echo "⚠️ Directory $(PREFIX_BACK)$$service does not exist. Skipping."; \
		fi \
	done

# Lance Caddy
caddy-start:
	echo "🚀 Starting Caddy"; \
	if [ -d "$(PREFIX_BACK)$$service" ]; then \
		(cd $(PREFIX_BACK) && make caddy-start) || echo "⚠️ Failed to start Caddy"; \
	else \
        echo "⚠️ Caddy directory $(PREFIX_BACK) does not exist. Skipping."; \
    fi

# Démarrer tous les microservices
start-services:
	@for service in $(SERVICES); do \
		echo "🚀 Starting service $$service..."; \
		if [ -d "$(PREFIX_BACK)$$service" ]; then \
			(cd $(PREFIX_BACK)$$service && make db-all -k) || echo "⚠️ Failed to start $$service"; \
		else \
			echo "⚠️ Directory $(PREFIX_BACK)$$service does not exist. Skipping."; \
		fi \
	done

# Démarrer l'application front-end
start-front:
	@echo "🚀 Starting web app"
	@if [ -d "$(FRONT)" ]; then \
		(cd $(FRONT) && npm start); \
	else \
		echo "⚠️ Front-end directory $(FRONT) does not exist. Skipping."; \
	fi

# Lancer db pour tous les services et démarrer le front-end et les services
start: start-services caddy-start start-front
end: kill-ports caddy-stop
restart: kill-ports start-services start-front
all: kill-ports db-only-services start-services start-front kill-ports