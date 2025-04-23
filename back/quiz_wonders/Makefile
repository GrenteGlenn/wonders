SEQUELIZE=npx sequelize-cli
JEST=npx jest
START=npm start

.PHONY: db-all db-and-tests db-create db-drop db-migrate-undo-all db-migrate db-seed-all test start

db-all: db-drop db-create db-migrate db-seed-all start

db-and-tests: db-all unit-test

db-drop:
	@echo "Dropping database..."
	$(SEQUELIZE) db:drop

db-create:
	@echo "Creating database..."
	$(SEQUELIZE) db:create

db-migrate-undo-all:
	@echo "Undoing all migrations..."
	$(SEQUELIZE) db:migrate:undo:all

db-migrate:
	@echo "Running migrations..."
	$(SEQUELIZE) db:migrate

db-seed-all:
	@echo "Seeding database..."
	$(SEQUELIZE) db:seed:all

test:
	@echo "Running controller tests..."
	$(JEST)

start:
	@echo "🔁 Starting microservice silently in background..."
	@$(START) >/dev/null 2>&1 &

