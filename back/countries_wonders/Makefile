SEQUELIZE=npx sequelize-cli
JEST=npx jest

.PHONY: db-all db-migrate-undo-all db-migrate db-seed-all test db-create db-and-tests

db-all: db-migrate-undo-all db-migrate db-seed-all

db-and-tests : db-all test

db-create:
	@echo "database creation"
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
	@echo "Controllers tests..."
	$(JEST)